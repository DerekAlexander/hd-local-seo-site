<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Command Center - SEO Agency Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            color: white;
            margin-bottom: 30px;
        }

        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 1.1em;
            opacity: 0.9;
        }

        /* Quick Metrics */
        .quick-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .metric-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .metric-label {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
        }

        .progress-bar {
            height: 8px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
        }

        .progress-text {
            font-size: 0.85em;
            color: #999;
            margin-top: 8px;
        }

        /* Tabs */
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid white;
            flex-wrap: wrap;
        }

        .tab-button {
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1em;
            border-radius: 8px 8px 0 0;
            transition: all 0.3s ease;
        }

        .tab-button.active {
            background: white;
            color: #667eea;
            font-weight: bold;
        }

        .tab-button:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .tab-content {
            display: none;
            background: white;
            padding: 30px;
            border-radius: 0 12px 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .tab-content.active {
            display: block;
        }

        /* Forms */
        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }

        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 1em;
            font-family: inherit;
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        button {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
            transition: transform 0.2s ease;
        }

        button:hover {
            transform: translateY(-2px);
        }

        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th {
            background: #f5f5f5;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #333;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }

        tr:hover {
            background: #f9f9f9;
        }

        /* Funnel */
        .funnel {
            display: flex;
            align-items: flex-end;
            gap: 15px;
            margin-top: 30px;
            height: 300px;
        }

        .funnel-stage {
            flex: 1;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 8px 8px 0 0;
            padding: 20px;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            min-height: 100px;
        }

        .funnel-label {
            font-weight: 600;
            margin-bottom: 8px;
        }

        .funnel-value {
            font-size: 1.8em;
            font-weight: bold;
            margin-bottom: 4px;
        }

        .funnel-rate {
            font-size: 0.9em;
            opacity: 0.9;
        }

        /* Daily Entry */
        .daily-entry {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .daily-entry h3 {
            margin-bottom: 15px;
            color: #333;
        }

        .entry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }

        .quick-stat {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }

        .quick-stat label {
            margin-bottom: 5px;
        }

        .quick-stat input {
            font-size: 1.5em;
            text-align: center;
        }

        /* Status */
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
        }

        .status-live {
            background: #d4edda;
            color: #155724;
        }

        .status-pending {
            background: #fff3cd;
            color: #856404;
        }

        .status-closed {
            background: #d1ecf1;
            color: #0c5460;
        }

        /* Success Message */
        .success-message {
            display: none;
            background: #d4edda;
            color: #155724;
            padding: 12px 20px;
            border-radius: 6px;
            margin-bottom: 20px;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Mobile */
        @media (max-width: 768px) {
            h1 {
                font-size: 1.8em;
            }

            .quick-metrics {
                grid-template-columns: 1fr;
            }

            .funnel {
                flex-direction: column;
                height: auto;
            }

            .funnel-stage {
                min-height: 60px;
            }

            .tabs {
                flex-direction: column;
            }

            .tab-button {
                border-radius: 6px;
            }

            .tab-content {
                border-radius: 6px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎯 Sales Command Center</h1>
            <p class="subtitle">SEO Agency - HVAC Contractor Focus</p>
        </header>

        <!-- Quick Metrics -->
        <div class="quick-metrics">
            <div class="metric-card">
                <div class="metric-label">Current MRR</div>
                <div class="metric-value" id="currentMRR">$3,500</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill" style="width: 35%"></div>
                </div>
                <div class="progress-text">35% toward $10k target</div>
            </div>

            <div class="metric-card">
                <div class="metric-label">Pipeline Value</div>
                <div class="metric-value" id="pipelineValue">$0</div>
                <div class="progress-text" id="pipelineText">0 deals in progress</div>
            </div>

            <div class="metric-card">
                <div class="metric-label">This Week</div>
                <div class="metric-value" id="weekSummary">0 calls</div>
                <div class="progress-text" id="weekDetail">0 meetings booked, 0 closes</div>
            </div>

            <div class="metric-card">
                <div class="metric-label">Win Rate</div>
                <div class="metric-value" id="winRate">0%</div>
                <div class="progress-text">Conversations → Closes</div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <button class="tab-button active" onclick="switchTab('funnel')">📊 Sales Funnel</button>
            <button class="tab-button" onclick="switchTab('revenue')">💰 Revenue</button>
            <button class="tab-button" onclick="switchTab('customers')">👥 Customers</button>
            <button class="tab-button" onclick="switchTab('coaching')">🎓 Coaching Notes</button>
        </div>

        <!-- FUNNEL TAB -->
        <div id="funnel" class="tab-content active">
            <h2>Sales Pipeline Funnel</h2>
            
            <div class="daily-entry">
                <h3>📝 Quick Daily Entry (2-3 minutes)</h3>
                <div class="entry-grid">
                    <div class="quick-stat">
                        <label for="emailsSent">Emails Sent</label>
                        <input type="number" id="emailsSent" value="0" min="0">
                    </div>
                    <div class="quick-stat">
                        <label for="replies">Replies</label>
                        <input type="number" id="replies" value="0" min="0">
                    </div>
                    <div class="quick-stat">
                        <label for="callsMade">Calls Made</label>
                        <input type="number" id="callsMade" value="0" min="0">
                    </div>
                    <div class="quick-stat">
                        <label for="meetingsBooked">Meetings Booked</label>
                        <input type="number" id="meetingsBooked" value="0" min="0">
                    </div>
                    <div class="quick-stat">
                        <label for="dealsClosed">Deals Closed</label>
                        <input type="number" id="dealsClosed" value="0" min="0">
                    </div>
                    <div class="quick-stat">
                        <label for="dealValue">Deal Value ($)</label>
                        <input type="number" id="dealValue" value="0" min="0" step="100">
                    </div>
                </div>
                <button onclick="saveDailyEntry()">💾 Save Entry</button>
                <div class="success-message" id="successMessage">✅ Entry saved!</div>
            </div>

            <h3 style="margin-top: 30px;">Conversion Funnel</h3>
            <div class="funnel">
                <div class="funnel-stage" style="height: 100%;">
                    <div class="funnel-label">Emails</div>
                    <div class="funnel-value" id="funnelEmails">0</div>
                    <div class="funnel-rate">Start</div>
                </div>
                <div class="funnel-stage" id="repliesStage" style="height: 50%;">
                    <div class="funnel-label">Replies</div>
                    <div class="funnel-value" id="funnelReplies">0</div>
                    <div class="funnel-rate" id="replyRate">0%</div>
                </div>
                <div class="funnel-stage" id="callsStage" style="height: 40%;">
                    <div class="funnel-label">Calls</div>
                    <div class="funnel-value" id="funnelCalls">0</div>
                    <div class="funnel-rate" id="callRate">0%</div>
                </div>
                <div class="funnel-stage" id="meetingsStage" style="height: 30%;">
                    <div class="funnel-label">Meetings</div>
                    <div class="funnel-value" id="funnelMeetings">0</div>
                    <div class="funnel-rate" id="meetingRate">0%</div>
                </div>
                <div class="funnel-stage" id="closesStage" style="height: 20%;">
                    <div class="funnel-label">Closes</div>
                    <div class="funnel-value" id="funnelCloses">0</div>
                    <div class="funnel-rate" id="closeRate">0%</div>
                </div>
            </div>
        </div>

        <!-- REVENUE TAB -->
        <div id="revenue" class="tab-content">
            <h2>Revenue Dashboard</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div class="metric-card">
                    <div class="metric-label">Current MRR (Live)</div>
                    <div class="metric-value" id="revenueMRR">$3,500</div>
                    <div class="progress-text">2 active customers</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Pipeline Value</div>
                    <div class="metric-value" id="revenuePipeline">$0</div>
                    <div class="progress-text" id="pipelineDealCount">0 deals in progress</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Projected MRR</div>
                    <div class="metric-value" id="projectedMRR">$3,500</div>
                    <div class="progress-text">When deals close</div>
                </div>
            </div>

            <h3>Active Customers</h3>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Monthly Fee</th>
                        <th>Go-Live</th>
                    </tr>
                </thead>
                <tbody id="customersTable">
                    <tr>
                        <td>Family Customer 1</td>
                        <td><span class="status-badge status-live">LIVE</span></td>
                        <td>$2,000</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Family Customer 2</td>
                        <td><span class="status-badge status-live">LIVE</span></td>
                        <td>$1,500</td>
                        <td>Active</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px;">Add Pipeline Deal</h3>
            <div class="form-group">
                <label for="dealName">Contractor Name</label>
                <input type="text" id="dealName" placeholder="HVAC Contractor Name">
            </div>
            <div class="form-group">
                <label for="dealStage">Deal Stage</label>
                <select id="dealStage">
                    <option>Conversation</option>
                    <option>Meeting Booked</option>
                    <option>Proposal Sent</option>
                    <option>Negotiating</option>
                    <option>Ready to Close</option>
                </select>
            </div>
            <div class="form-group">
                <label for="dealMonthly">Monthly Fee</label>
                <input type="number" id="dealMonthly" placeholder="1500" min="0" step="100">
            </div>
            <button onclick="addDeal()">➕ Add Deal to Pipeline</button>
        </div>

        <!-- CUSTOMERS TAB -->
        <div id="customers" class="tab-content">
            <h2>Customer Status</h2>

            <h3>Live Customers</h3>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Monthly Fee</th>
                        <th>Status</th>
                        <th>Go-Live</th>
                        <th>Sites Built</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Family Customer 1</td>
                        <td>$2,000</td>
                        <td><span class="status-badge status-live">LIVE</span></td>
                        <td>Active</td>
                        <td>25+ pages</td>
                    </tr>
                    <tr>
                        <td>Family Customer 2</td>
                        <td>$1,500</td>
                        <td><span class="status-badge status-live">LIVE</span></td>
                        <td>Active</td>
                        <td>25+ pages</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px;">Upcoming Customers (Pipeline)</h3>
            <div id="pipelineTable">
                <p style="color: #999; text-align: center; padding: 40px; background: #f9f9f9; border-radius: 8px;">No deals in pipeline yet. Start making calls! 📞</p>
            </div>
        </div>

        <!-- COACHING TAB -->
        <div id="coaching" class="tab-content">
            <h2>Sales Coaching Library</h2>

            <h3>📌 Objections You're Hearing</h3>
            <table id="objectionsTable">
                <thead>
                    <tr>
                        <th>Objection</th>
                        <th>Your Response</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="color: #999;">
                        <td colspan="3" style="text-align: center; padding: 30px;">Log objections as you hear them</td>
                    </tr>
                </tbody>
            </table>

            <div class="form-group" style="margin-top: 20px;">
                <label for="objection">Objection Heard</label>
                <textarea id="objection" placeholder="e.g., 'We're not interested in SEO right now'" rows="2"></textarea>
            </div>
            <div class="form-group">
                <label for="response">Your Response (What Worked?)</label>
                <textarea id="response" placeholder="e.g., 'That's fair. Quick question though...'" rows="2"></textarea>
            </div>
            <button onclick="logObjection()">➕ Log Objection</button>

            <h3 style="margin-top: 40px;">✨ What's Working (Best Scripts)</h3>
            <table id="workingTable">
                <thead>
                    <tr>
                        <th>Script/Frame</th>
                        <th>When to Use</th>
                        <th>Success Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="color: #999;">
                        <td colspan="3" style="text-align: center; padding: 30px;">Tag your best openers and closes</td>
                    </tr>
                </tbody>
            </table>

            <div class="form-group" style="margin-top: 20px;">
                <label for="workingScript">Winning Script/Frame</label>
                <textarea id="workingScript" placeholder="e.g., 'Quick question: When someone searches [city] emergency AC repair...'" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="whenToUse">When to Use It</label>
                <input type="text" id="whenToUse" placeholder="e.g., Cold call opener, Meeting close">
            </div>
            <button onclick="logWorking()">⭐ Log What's Working</button>
        </div>
    </div>

    <script>
        // Data Storage
        const storage = {
            pipeline: JSON.parse(localStorage.getItem('pipeline')) || [],
            entries: JSON.parse(localStorage.getItem('entries')) || [],
            objections: JSON.parse(localStorage.getItem('objections')) || [],
            working: JSON.parse(localStorage.getItem('working')) || []
        };

        // Tab Switching
        function switchTab(tab) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
            event.target.classList.add('active');
        }

        // Save Daily Entry
        function saveDailyEntry() {
            const entry = {
                date: new Date().toISOString().split('T')[0],
                emails: parseInt(document.getElementById('emailsSent').value) || 0,
                replies: parseInt(document.getElementById('replies').value) || 0,
                calls: parseInt(document.getElementById('callsMade').value) || 0,
                meetings: parseInt(document.getElementById('meetingsBooked').value) || 0,
                closes: parseInt(document.getElementById('dealsClosed').value) || 0,
                value: parseInt(document.getElementById('dealValue').value) || 0
            };

            storage.entries.push(entry);
            localStorage.setItem('entries', JSON.stringify(storage.entries));

            // Show success
            const msg = document.getElementById('successMessage');
            msg.style.display = 'block';
            setTimeout(() => msg.style.display = 'none', 3000);

            // Reset form
            document.getElementById('emailsSent').value = 0;
            document.getElementById('replies').value = 0;
            document.getElementById('callsMade').value = 0;
            document.getElementById('meetingsBooked').value = 0;
            document.getElementById('dealsClosed').value = 0;
            document.getElementById('dealValue').value = 0;

            updateMetrics();
        }

        // Add Deal
        function addDeal() {
            const deal = {
                name: document.getElementById('dealName').value,
                stage: document.getElementById('dealStage').value,
                monthly: parseInt(document.getElementById('dealMonthly').value) || 0,
                date: new Date().toISOString().split('T')[0]
            };

            if (!deal.name) {
                alert('Please enter contractor name');
                return;
            }

            storage.pipeline.push(deal);
            localStorage.setItem('pipeline', JSON.stringify(storage.pipeline));

            document.getElementById('dealName').value = '';
            document.getElementById('dealMonthly').value = '';
            updateMetrics();
        }

        // Log Objection
        function logObjection() {
            const objection = {
                text: document.getElementById('objection').value,
                response: document.getElementById('response').value,
                date: new Date().toISOString().split('T')[0]
            };

            if (!objection.text) return;
            storage.objections.push(objection);
            localStorage.setItem('objections', JSON.stringify(storage.objections));

            document.getElementById('objection').value = '';
            document.getElementById('response').value = '';
            updateObjections();
        }

        // Log Working Script
        function logWorking() {
            const working = {
                script: document.getElementById('workingScript').value,
                when: document.getElementById('whenToUse').value,
                date: new Date().toISOString().split('T')[0]
            };

            if (!working.script) return;
            storage.working.push(working);
            localStorage.setItem('working', JSON.stringify(storage.working));

            document.getElementById('workingScript').value = '';
            document.getElementById('whenToUse').value = '';
            updateWorking();
        }

        // Update Metrics
        function updateMetrics() {
            const totalEmails = storage.entries.reduce((sum, e) => sum + e.emails, 0);
            const totalReplies = storage.entries.reduce((sum, e) => sum + e.replies, 0);
            const totalCalls = storage.entries.reduce((sum, e) => sum + e.calls, 0);
            const totalMeetings = storage.entries.reduce((sum, e) => sum + e.meetings, 0);
            const totalCloses = storage.entries.reduce((sum, e) => sum + e.closes, 0);
            const totalValue = storage.entries.reduce((sum, e) => sum + e.value, 0);
            const pipelineValue = storage.pipeline.reduce((sum, d) => sum + d.monthly, 0);

            // Funnel
            document.getElementById('funnelEmails').textContent = totalEmails;
            document.getElementById('funnelReplies').textContent = totalReplies;
            document.getElementById('funnelCalls').textContent = totalCalls;
            document.getElementById('funnelMeetings').textContent = totalMeetings;
            document.getElementById('funnelCloses').textContent = totalCloses;

            // Conversion rates
            const replyRate = totalEmails > 0 ? Math.round((totalReplies / totalEmails) * 100) : 0;
            const callRate = totalReplies > 0 ? Math.round((totalCalls / totalReplies) * 100) : 0;
            const meetingRate = totalCalls > 0 ? Math.round((totalMeetings / totalCalls) * 100) : 0;
            const closeRate = totalMeetings > 0 ? Math.round((totalCloses / totalMeetings) * 100) : 0;

            document.getElementById('replyRate').textContent = replyRate + '%';
            document.getElementById('callRate').textContent = callRate + '%';
            document.getElementById('meetingRate').textContent = meetingRate + '%';
            document.getElementById('closeRate').textContent = closeRate + '%';

            // Heights
            if (totalEmails > 0) {
                document.getElementById('repliesStage').style.height = (totalReplies / totalEmails * 100) + '%';
                document.getElementById('callsStage').style.height = (totalCalls / totalEmails * 100) + '%';
                document.getElementById('meetingsStage').style.height = (totalMeetings / totalEmails * 100) + '%';
                document.getElementById('closesStage').style.height = (totalCloses / totalEmails * 100) + '%';
            }

            // Revenue
            const currentMRR = 3500 + totalValue;
            const projectedMRR = currentMRR + pipelineValue;
            const target = 10000;
            const progress = Math.min(100, (projectedMRR / target) * 100);

            document.getElementById('currentMRR').textContent = '$' + currentMRR.toLocaleString();
            document.getElementById('revenueMRR').textContent = '$' + currentMRR.toLocaleString();
            document.getElementById('pipelineValue').textContent = '$' + pipelineValue.toLocaleString();
            document.getElementById('revenuePipeline').textContent = '$' + pipelineValue.toLocaleString();
            document.getElementById('projectedMRR').textContent = '$' + projectedMRR.toLocaleString();
            document.getElementById('progressFill').style.width = progress + '%';
            document.getElementById('progressText').textContent = Math.round(progress) + '% toward $10k target';
            document.getElementById('pipelineDealCount').textContent = storage.pipeline.length + ' deals in progress';

            // Week summary
            const thisWeek = storage.entries.filter(e => {
                const entryDate = new Date(e.date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return entryDate > weekAgo;
            });

            const weekCalls = thisWeek.reduce((sum, e) => sum + e.calls, 0);
            const weekMeetings = thisWeek.reduce((sum, e) => sum + e.meetings, 0);
            const weekCloses = thisWeek.reduce((sum, e) => sum + e.closes, 0);

            document.getElementById('weekSummary').textContent = weekCalls + ' calls';
            document.getElementById('weekDetail').textContent = weekMeetings + ' meetings booked, ' + weekCloses + ' closes';

            // Win rate
            const winRate = totalMeetings > 0 ? Math.round((totalCloses / totalMeetings) * 100) : 0;
            document.getElementById('winRate').textContent = winRate + '%';

            updatePipelineTable();
        }

        function updateObjections() {
            const tbody = document.getElementById('objectionsTable').querySelector('tbody');
            if (storage.objections.length === 0) {
                tbody.innerHTML = '<tr style="color: #999;"><td colspan="3" style="text-align: center; padding: 30px;">No objections logged yet</td></tr>';
            } else {
                tbody.innerHTML = storage.objections.map(o => `
                    <tr>
                        <td>${o.text}</td>
                        <td>${o.response}</td>
                        <td>${o.date}</td>
                    </tr>
                `).join('');
            }
        }

        function updateWorking() {
            const tbody = document.getElementById('workingTable').querySelector('tbody');
            if (storage.working.length === 0) {
                tbody.innerHTML = '<tr style="color: #999;"><td colspan="3" style="text-align: center; padding: 30px;">No winning scripts logged yet</td></tr>';
            } else {
                tbody.innerHTML = storage.working.map(w => `
                    <tr>
                        <td>${w.script.substring(0, 50)}...</td>
                        <td>${w.when}</td>
                        <td>${w.date}</td>
                    </tr>
                `).join('');
            }
        }

        function updatePipelineTable() {
            const div = document.getElementById('pipelineTable');
            if (storage.pipeline.length === 0) {
                div.innerHTML = '<p style="color: #999; text-align: center; padding: 40px; background: #f9f9f9; border-radius: 8px;">No deals in pipeline yet. Start making calls! 📞</p>';
            } else {
                div.innerHTML = '<table style="width: 100%;"><thead><tr><th>Contractor</th><th>Stage</th><th>Monthly Fee</th><th>Date Added</th></tr></thead><tbody>' +
                    storage.pipeline.map(d => `
                        <tr>
                            <td>${d.name}</td>
                            <td><span class="status-badge status-pending">${d.stage}</span></td>
                            <td>$${d.monthly.toLocaleString()}</td>
                            <td>${d.date}</td>
                        </tr>
                    `).join('') +
                    '</tbody></table>';
            }
        }

        // Init
        updateMetrics();
        updateObjections();
        updateWorking();
    </script>
</body>
</html>