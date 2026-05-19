/**
 * Building Pro Solutions — Cloudflare Worker
 * Contact Form Email Handler (SendGrid)
 *
 * Environment variables required (set in Cloudflare dashboard):
 *   SENDGRID_API_KEY  — Your SendGrid API key (never exposed to the frontend)
 *
 * Endpoint: POST https://bp-solutions-florida.com/api/contact
 */

const ALLOWED_ORIGIN = 'https://bp-solutions-florida.com';
const TO_EMAIL       = 'admin@bp-solutions-florida.com';
const FROM_EMAIL     = 'noreply@bp-solutions-florida.com';  // Must be verified in SendGrid
const FROM_NAME      = 'Building Pro Solutions Website';

// ─── CORS headers ────────────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : null;
  return {
    'Access-Control-Allow-Origin':  allowed || ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
  };
}

// ─── Simple JSON response helper ─────────────────────────────────────────────
function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });
}

// ─── Email format validator ───────────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

// ─── Phone format validator (permissive) ─────────────────────────────────────
function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)\.]{7,20}$/.test(String(phone).trim());
}

// ─── SendGrid mailer ─────────────────────────────────────────────────────────
async function sendEmail(env, { name, email, phone, service, message }) {
  const body = {
    personalizations: [
      {
        to: [{ email: TO_EMAIL, name: 'Building Pro Solutions Admin' }],
        subject: `New Contact Form Submission — ${service}`,
      },
    ],
    from: { email: FROM_EMAIL, name: FROM_NAME },
    reply_to: { email, name },
    content: [
      {
        type: 'text/html',
        value: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; background: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
    .container { max-width: 620px; margin: 40px auto; background: #111; border: 1px solid #2a2a2a; }
    .header { background: #0a0a0a; border-bottom: 3px solid #c9a84c; padding: 32px 40px; }
    .header h1 { margin: 0; font-size: 22px; color: #c9a84c; letter-spacing: 0.1em; text-transform: uppercase; }
    .header p  { margin: 6px 0 0; font-size: 13px; color: #888; letter-spacing: 0.05em; }
    .body { padding: 40px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #c9a84c; font-weight: bold; margin-bottom: 6px; }
    .value { font-size: 15px; color: #e5e5e5; line-height: 1.6; border-left: 2px solid #c9a84c; padding-left: 12px; }
    .message-value { white-space: pre-wrap; }
    .footer { background: #0a0a0a; border-top: 1px solid #2a2a2a; padding: 20px 40px; font-size: 11px; color: #555; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Building Pro Solutions</h1>
      <p>New Contact Form Submission</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${email}" style="color:#c9a84c;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${phone || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Service Requested</div>
        <div class="value">${service}</div>
      </div>
      <div class="field">
        <div class="label">Message / Project Details</div>
        <div class="value message-value">${message}</div>
      </div>
    </div>
    <div class="footer">
      Submitted via bp-solutions-florida.com &nbsp;|&nbsp; Building Pro Solutions
    </div>
  </div>
</body>
</html>`,
      },
      {
        type: 'text/plain',
        value: `NEW CONTACT FORM SUBMISSION — Building Pro Solutions\n\nName:    ${name}\nEmail:   ${email}\nPhone:   ${phone || 'Not provided'}\nService: ${service}\n\nMessage:\n${message}\n\n---\nSubmitted via bp-solutions-florida.com`,
      },
    ],
  };

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${errText}`);
  }
}

// ─── Main fetch handler ───────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors   = corsHeaders(origin);

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // Reject non-POST
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405, cors);
    }

    // Parse body
    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: 'Invalid JSON body' }, 400, cors);
    }

    const { name, email, phone, service, message, _honey } = data;

    // ── Honeypot check (bots fill hidden fields) ──────────────────────────
    if (_honey) {
      // Silently accept so bots think they succeeded
      return json({ ok: true }, 200, cors);
    }

    // ── Required field validation ─────────────────────────────────────────
    const errors = {};
    if (!name?.trim())    errors.name    = 'Name is required';
    if (!email?.trim())   errors.email   = 'Email is required';
    else if (!isValidEmail(email)) errors.email = 'Email format is invalid';
    if (!message?.trim()) errors.message = 'Message is required';
    if (phone && !isValidPhone(phone)) errors.phone = 'Phone number format is invalid';

    if (Object.keys(errors).length > 0) {
      return json({ ok: false, errors }, 422, cors);
    }

    // ── Sanitize inputs ───────────────────────────────────────────────────
    const safe = {
      name:    name.trim().slice(0, 200),
      email:   email.trim().toLowerCase().slice(0, 254),
      phone:   (phone || '').trim().slice(0, 30),
      service: (service || 'Not specified').trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    };

    // ── Send via SendGrid ─────────────────────────────────────────────────
    try {
      await sendEmail(env, safe);
      return json({ ok: true, message: 'Your message has been sent successfully.' }, 200, cors);
    } catch (err) {
      console.error('SendGrid failure:', err.message);
      return json({ ok: false, error: 'Failed to send email. Please try again later.' }, 500, cors);
    }
  },
};
