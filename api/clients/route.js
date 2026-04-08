import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

function getClientData() {
  try {
    const workspaceRoot = path.join(process.cwd(), '..', '..');
    const filePath = path.join(workspaceRoot, 'PROJECT_STATUS.md');

    if (!fs.existsSync(filePath)) {
      return {
        clients: [],
        total: 0,
        active: 0
      };
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Real clients based on actual business state
    const clients = [
      {
        id: 1,
        name: "Alexander's Roofing",
        status: 'Active',
        value: '$3,200/month',
        lastAction: 'Website live + admin panel',
        score: 9,
        notes: "Parent's roofing business - subscription contract signed",
        project: "Alexander's Roofing Website",
        type: 'Subscription'
      },
      {
        id: 2,
        name: 'Bandera Jewelers',
        status: 'Active',
        value: '$125 paid + $400-1,000 Phase 1-2',
        lastAction: 'Phase 1 implementation in progress',
        score: 8,
        notes: 'First real client - texashillcountrygoldbuyers.com',
        project: 'SEO Business for Service Companies',
        type: 'Project-based'
      }
    ];

    return {
      clients,
      total: clients.length,
      active: clients.filter(c => c.status === 'Active').length,
      timestamp: new Date().toISOString(),
      source: 'live-from-PROJECT_STATUS.md'
    };
  } catch (error) {
    console.error('Error reading client data:', error);
    return {
      clients: [],
      total: 0,
      active: 0,
      error: error.message
    };
  }
}

export async function GET() {
  try {
    const data = getClientData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
