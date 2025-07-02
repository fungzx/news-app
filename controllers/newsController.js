const fetch = require("node-fetch");

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

exports.fetchNews = async (req, res) => {
  const { query, category } = req.query;
  const keyword = query || category;

  const url = keyword
    ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&lang=en&sortby=publishedAt&max=10&token=${GNEWS_API_KEY}`
    : `https://gnews.io/api/v4/top-headlines?lang=en&sortby=publishedAt&max=10&token=${GNEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news from GNews API" });
  }
};
