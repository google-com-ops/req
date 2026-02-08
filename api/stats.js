let requests = [];

export default function handler(req, res) {
  const now = new Date().toLocaleTimeString();

  const randomValue = Math.floor(Math.random() * 100);
  requests.push({ time: now, value: randomValue });

  if (requests.length > 20) {
    requests.shift();
  }

  res.status(200).json(requests);
}
