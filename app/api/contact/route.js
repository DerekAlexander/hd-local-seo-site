import fs from 'fs';
import os from 'os';
import path from 'path';
import { google } from 'googleapis';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    await sendToDiscord({ name, email, message });
    await appendToGoogleSheets({ name, email, message });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API unexpected error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function sendToDiscord({ name, email, message }) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not configured.');
      return;
    }

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: `New Lead: ${name}`,
            color: 7506394,
            fields: [
              { name: 'Email', value: email },
              { name: 'Message', value: message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      console.error('Discord webhook request failed with status:', discordResponse.status);
    }
  } catch (error) {
    console.error('Discord webhook error:', error);
  }
}

async function appendToGoogleSheets({ name, email, message }) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_CONTACT_ID;
    const serviceAccountKeyName = process.env.GOOGLE_SA_KEY_PATH;

    if (!spreadsheetId || !serviceAccountKeyName) {
      console.error('Google Sheets env vars are not configured.');
      return;
    }

    const cwdKeyPath = path.join(process.cwd(), serviceAccountKeyName);
    const hermesKeyPath = path.join(os.homedir(), '.hermes', serviceAccountKeyName);
    const keyFilePath = fs.existsSync(cwdKeyPath) ? cwdKeyPath : hermesKeyPath;

    if (!fs.existsSync(keyFilePath)) {
      console.error('Google service account key file not found:', keyFilePath);
      return;
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), name, email, message]],
      },
    });
  } catch (error) {
    console.error('Google Sheets append error:', error);
  }
}
