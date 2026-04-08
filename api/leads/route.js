import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// In-memory storage for lead status (persistent within process)
let leadsData = {
  emailed: [
    {
      id: 1,
      email: 'garagerepairco@outlook.com',
      company: '911 Garage Pros',
      industry: 'garage door',
      dateEmailed: '2026-03-18',
      status: 'emailed',
      contacted: true
    },
    {
      id: 2,
      email: 'info@willfixit.com',
      company: 'Will Fix It',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 3,
      email: 'info@airtron.com',
      company: 'Airtron San Antonio',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 4,
      email: 'info@goettl.com',
      company: 'Goettl',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 5,
      email: 'info@championac.com',
      company: 'Champion AC',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 6,
      email: 'info@airtegritycs.com',
      company: 'Airtegrity Comfort Solutions',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 7,
      email: 'info@emergencyhvacsquad.com',
      company: 'Emergency HVAC Squad',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 8,
      email: 'contact@gabespriorityac.com',
      company: "Gabe's Priority AC Service",
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    },
    {
      id: 9,
      email: 'contact@saspecialties.com',
      company: 'SA Specialties',
      industry: 'HVAC',
      dateEmailed: '2026-03-19',
      status: 'emailed',
      contacted: true
    }
  ],
  responded: [],
  won: [
    {
      id: 100,
      email: 'parent@alexander.roofing',
      company: "Alexander's Roofing",
      industry: 'roofing',
      dateEmailed: '2026-03-15',
      status: 'won',
      revenue: '$3,200/month',
      type: 'subscription'
    },
    {
      id: 101,
      email: 'banderajewelers@gmail.com',
      company: 'Bandera Jewelers',
      industry: 'jewelry',
      dateEmailed: '2026-03-16',
      status: 'won',
      revenue: '$125 paid + $400-1,000 Phase 1-2',
      type: 'project'
    }
  ]
};

function getLeadStats() {
  return {
    total: leadsData.emailed.length + leadsData.responded.length + leadsData.won.length,
    emailed: leadsData.emailed.length,
    responded: leadsData.responded.length,
    won: leadsData.won.length,
    conversionRate: (leadsData.won.length / (leadsData.emailed.length + leadsData.won.length) * 100).toFixed(1) + '%'
  };
}

export async function GET() {
  try {
    return NextResponse.json({
      ...leadsData,
      stats: getLeadStats(),
      timestamp: new Date().toISOString(),
      source: 'in-memory-with-persistence'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { leadId, fromStatus, toStatus } = await request.json();

    if (!fromStatus || !toStatus) {
      return NextResponse.json(
        { error: 'Missing fromStatus or toStatus' },
        { status: 400 }
      );
    }

    // Find and move the lead
    if (leadsData[fromStatus]) {
      const leadIndex = leadsData[fromStatus].findIndex(l => l.id === leadId);
      if (leadIndex !== -1) {
        const lead = leadsData[fromStatus][leadIndex];
        leadsData[fromStatus].splice(leadIndex, 1);
        
        // Add to new status
        if (!leadsData[toStatus]) {
          leadsData[toStatus] = [];
        }
        leadsData[toStatus].push(lead);

        return NextResponse.json({
          success: true,
          message: `Lead moved from ${fromStatus} to ${toStatus}`,
          leadsData,
          stats: getLeadStats()
        });
      }
    }

    return NextResponse.json(
      { error: 'Lead not found' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
