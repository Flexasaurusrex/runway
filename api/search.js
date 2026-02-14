export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, creators } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are the AI style sommelier for RUNWAY, a live fashion discovery platform.

AVAILABLE CREATORS (currently streaming):
${JSON.stringify(creators.map(c => ({
  id: c.id,
  name: c.name,
  tags: c.tags,
  bio: c.bio,
  category: c.category,
  viewers: c.viewers,
  status: c.status
})), null, 2)}

USER QUERY: "${query}"

Your job: Recommend 1-3 creators that best match what the user is looking for. You can recommend both LIVE and OFFLINE creators - offline ones might go live soon! Be flexible and understanding - interpret their request generously.

Common patterns to recognize:
- "streetwear" / "hypebeast" / "urban" → street style, sneakers, fit checks
- "vintage" / "thrift" / "90s" → vintage styling, thrift hauls
- "sustainable" / "upcycle" / "eco" → sustainable fashion, upcycling
- "designer" / "couture" / "high fashion" → luxury fashion, runway shows
- "sneakers" / "kicks" / "jordans" → sneaker content, customs, releases
- "design" / "sewing" / "pattern" → fashion design, construction, technical
- "fit check" / "outfit" / "styling" → outfit styling, lookbooks
- Any mood/vibe words → match to appropriate style/category

ALWAYS return 1-3 recommendations, even if the query is vague or casual. Make your best guess!

Respond in JSON format:
{
  "matches": ["creator-id-1", "creator-id-2"],
  "explanation": "A brief, fri
