import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/data', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : null,
    });

    const text = await response.text();
    let data = [];

    if (text) {
      try {
        data = JSON.parse(text);
        console.log(data);
        if (!Array.isArray(data)) {
          data = [data]; // Convert to array if it's not already one
        }
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        res.status(500).json({ error: 'Failed to parse JSON response from API' });
        return;
      }
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
