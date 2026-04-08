import nodemailer from 'nodemailer';

// Configure your email service
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || email,
        to: 'hydrodub@gmail.com',
        subject: `New Lead: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted from: Contractor SEO Website</small></p>
        `,
        replyTo: email,
      });

      return Response.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email send error:', emailError);
      
      // Log to console for debugging if email service fails
      console.log('Contact form submission:', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });

      // Still return success to avoid exposing email service issues
      return Response.json(
        { success: true, message: 'Message received' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
