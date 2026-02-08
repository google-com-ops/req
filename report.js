let logs = [];

const BOT_TOKEN = "8203281432:AAGM0aze8Dt8CPXzW4svTzBw3ZB-iLt2GRs";
const CHAT_ID = "8468685075";

export default async function handler(req, res) {

  const now = new Date().toISOString();
  const ip = req.headers["x-forwarded-for"] || "unknown";

  logs.push({ time: now, ip });

  if (logs.length > 100) {
    logs.shift();
  }

  // kirim ke telegram tiap dipanggil
  const text = `Report 10 menit\nTotal Request: ${logs.length}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text
    })
  });

  res.status(200).json({
    total: logs.length,
    data: logs
  });
}
