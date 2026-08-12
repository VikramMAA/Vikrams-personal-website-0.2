/**
 * Contact form handler — sends the enquiry as an email through Resend.
 *
 * This is a Netlify Function (v2), mounted at /api/contact by the `config`
 * export at the bottom. The form on /contact/ posts to it directly, so the
 * whole flow still works with JavaScript disabled: on success the browser is
 * redirected to /thank-you/, on failure back to /contact/#form-error, where a
 * CSS `:target` rule reveals the error banner.
 *
 * Required environment variables (Netlify → Site configuration → Environment
 * variables). See .env.example.
 *
 *   RESEND_API_KEY      An API key from https://resend.com/api-keys
 *   CONTACT_FROM_EMAIL  Sender address on a domain verified in Resend,
 *                       e.g. "Vikram M A A <website@vikramhere.com>"
 *   CONTACT_TO_EMAIL    Where enquiries land. Defaults to the address below.
 */

import { Resend } from 'resend';

const DEFAULT_TO = 'vikram.1996523@gmail.com';

/** Longest we accept per field. Anything past this is spam, not a brief. */
const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  website: 300,
  service: 120,
  message: 5000,
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const clean = (value, max) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Deliberately loose — real validation is whether the reply bounces. */
const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const redirect = (location) =>
  new Response(null, { status: 303, headers: { Location: location } });

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return redirect('/contact/#form-error');
  }

  // Honeypot. Bots fill every field they can see; humans never see this one.
  // Pretend it worked so the bot has nothing to learn from.
  if (clean(form.get('bot-field'), 100)) {
    return redirect('/thank-you/');
  }

  const fields = {
    name: clean(form.get('name'), LIMITS.name),
    email: clean(form.get('email'), LIMITS.email),
    company: clean(form.get('company'), LIMITS.company),
    website: clean(form.get('website'), LIMITS.website),
    service: clean(form.get('service'), LIMITS.service),
    message: clean(form.get('message'), LIMITS.message),
  };

  if (!fields.name || !fields.message || !looksLikeEmail(fields.email)) {
    return redirect('/contact/#form-error');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;

  if (!apiKey || !from) {
    console.error(
      'Contact form is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.',
    );
    return redirect('/contact/#form-error');
  }

  const rows = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Company', fields.company || '—'],
    ['Website', fields.website || '—'],
    ['Service', fields.service || 'Not sure yet'],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    fields.message,
  ].join('\n');

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#0d1117">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from the website</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:4px 16px 4px 0;color:#57606a;white-space:nowrap">${label}</td>
          <td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td>
        </tr>`,
          )
          .join('')}
      </table>
      <div style="padding:16px;background:#f6f8fa;border-radius:8px;white-space:pre-wrap">${escapeHtml(
        fields.message,
      )}</div>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      // Hitting reply in the inbox replies to the person who filled the form.
      replyTo: fields.email,
      subject: `New enquiry — ${fields.name}${fields.company ? ` (${fields.company})` : ''}`,
      text,
      html,
    });

    if (error) {
      console.error('Resend rejected the message:', error);
      return redirect('/contact/#form-error');
    }
  } catch (err) {
    console.error('Could not reach Resend:', err);
    return redirect('/contact/#form-error');
  }

  return redirect('/thank-you/');
};

export const config = {
  path: '/api/contact',
};
