export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, city, service } = req.body

  const smsBody = `🔔 Nouveau lead PoseurEpoxy.ca\n👤 ${name}\n📞 ${phone}\n📍 ${city}\n🔧 ${service}`

  // Send SMS via Twilio
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken  = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_FROM_NUMBER
    const toNumber   = process.env.OWNER_PHONE

    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: fromNumber, To: toNumber, Body: smsBody }),
    })
  } catch (err) {
    console.error('Twilio error:', err)
  }

  // Also forward to Formspree as backup
  try {
    await fetch('https://formspree.io/f/mpqoobqw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, city, service, _subject: `PoseurEpoxy.ca — Nouveau lead — ${city}` }),
    })
  } catch (err) {
    console.error('Formspree error:', err)
  }

  return res.status(200).json({ ok: true })
}
