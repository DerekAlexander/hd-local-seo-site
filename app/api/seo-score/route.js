import { promises as fs } from 'fs';
import path from 'path';

const PAGE_SPEED_ENDPOINT =
  'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const REQUEST_TIMEOUT_MS = 15000;
const SEARCHED_URLS_FILE_PATH = path.join(process.cwd(), 'searched-urls.json');

function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('URL is required');
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsedUrl;
  try {
    parsedUrl = new URL(withProtocol);
  } catch {
    throw new Error('Please enter a valid URL');
  }

  if (!parsedUrl.hostname) {
    throw new Error('Please enter a valid URL');
  }

  return parsedUrl.toString();
}

function getCategoryScore(categories, categoryKey) {
  const rawScore = categories?.[categoryKey]?.score;
  if (typeof rawScore !== 'number') {
    return 0;
  }

  return Math.round(rawScore * 100);
}

function getMetrics(audits) {
  return {
    firstContentfulPaint: audits?.['first-contentful-paint']?.displayValue ?? 'N/A',
    speedIndex: audits?.['speed-index']?.displayValue ?? 'N/A',
    largestContentfulPaint:
      audits?.['largest-contentful-paint']?.displayValue ?? 'N/A',
    totalBlockingTime: audits?.['total-blocking-time']?.displayValue ?? 'N/A',
    cumulativeLayoutShift:
      audits?.['cumulative-layout-shift']?.displayValue ?? 'N/A',
  };
}

function getSeoChecks(lighthouseResult) {
  const auditRefs = lighthouseResult?.categories?.seo?.auditRefs ?? [];
  const audits = lighthouseResult?.audits ?? {};

  return auditRefs.flatMap((auditRef) => {
    const audit = audits[auditRef.id];
    if (!audit || typeof audit.score !== 'number') {
      return [];
    }

    return [
      {
        name: audit.title ?? auditRef.id,
        status: audit.score >= 0.9 ? 'pass' : 'fail',
      },
    ];
  });
}

async function appendSearchedUrl(url) {
  let existingEntries = [];

  try {
    const rawContents = await fs.readFile(SEARCHED_URLS_FILE_PATH, 'utf8');
    const parsedContents = JSON.parse(rawContents);
    if (Array.isArray(parsedContents)) {
      existingEntries = parsedContents;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Failed to read searched URLs file:', error);
    }
  }

  existingEntries.push({
    url,
    timestamp: new Date().toISOString(),
  });

  await fs.writeFile(
    SEARCHED_URLS_FILE_PATH,
    JSON.stringify(existingEntries, null, 2),
    'utf8'
  );
}

async function fetchPageSpeedInsights(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const requestUrl =
    `${PAGE_SPEED_ENDPOINT}?url=${encodeURIComponent(url)}` +
    '&strategy=mobile' +
    '&category=performance' +
    '&category=accessibility' +
    '&category=seo' +
    '&category=best-practices';

  try {
    return await fetch(requestUrl, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const normalizedUrl = normalizeUrl(body?.url ?? '');

    await appendSearchedUrl(normalizedUrl);

    let pageSpeedResponse;
    try {
      pageSpeedResponse = await fetchPageSpeedInsights(normalizedUrl);
    } catch (error) {
      if (error.name === 'AbortError') {
        return Response.json(
          { error: 'Analysis timed out, try again' },
          { status: 504 }
        );
      }

      return Response.json(
        { error: 'Could not analyze this site' },
        { status: 502 }
      );
    }

    if (!pageSpeedResponse.ok) {
      return Response.json(
        { error: 'Could not analyze this site' },
        { status: 502 }
      );
    }

    const pageSpeedData = await pageSpeedResponse.json();
    const lighthouseResult = pageSpeedData?.lighthouseResult;

    if (!lighthouseResult) {
      return Response.json(
        { error: 'Could not analyze this site' },
        { status: 502 }
      );
    }

    const scores = {
      performance: getCategoryScore(lighthouseResult.categories, 'performance'),
      accessibility: getCategoryScore(
        lighthouseResult.categories,
        'accessibility'
      ),
      seo: getCategoryScore(lighthouseResult.categories, 'seo'),
      bestPractices: getCategoryScore(
        lighthouseResult.categories,
        'best-practices'
      ),
    };

    const overallScore = Math.round(
      (scores.performance +
        scores.accessibility +
        scores.seo +
        scores.bestPractices) /
        4
    );

    return Response.json({
      url: normalizedUrl,
      scores,
      overallScore,
      metrics: getMetrics(lighthouseResult.audits),
      seoChecks: getSeoChecks(lighthouseResult),
    });
  } catch (error) {
    if (
      error.message === 'URL is required' ||
      error.message === 'Please enter a valid URL'
    ) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error('SEO score API error:', error);
    return Response.json(
      { error: 'Could not analyze this site' },
      { status: 500 }
    );
  }
}
