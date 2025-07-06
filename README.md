# ANews - Simple News Aggregator

A lightweight, responsive news dashboard built with HTML, CSS, and JavaScript, and Node.js. It fetches real-time news articles from the [GNews API](https://gnews.io/) securely via a custom Express backend. The UI supports category filtering, search, and modal previews.

🔗 **Live Demo**: https://fungzx.github.io/news-app/
🖥️ **Local Backend Version**: Run instructions below

---

## Features

- ✅ Responsive UI using Bootstrap
- ✅ Secure backend API proxy with Express
- ✅ Fetches real-time news via GNews API
- ✅ Category filtering (business, tech, health, etc.)
- ✅ Search bar with dynamic keyword results
- ✅ Modal preview for article content
- ✅ "Load More" pagination simulation with explanation

## Setup Instructions

1. Clone this repo:

git clone https://github.com/fungzx/news-app.git
cd news-app

2. Run locally:

Install backend dependencies:
npm install

Create a .env file:
GNEWS_API_KEY=your_gnews_api_key_here
PORT=3000

Start the server:
node server.js

Then visit http://localhost:3000

## API Setup

API Used: GNews API (https://gnews.io/)

To use your own key:
- Sign up at https://gnews.io/ to obtain a free API key.

Note: The free GNews API plan limits requests to 10 articles per call and has a daily quota.

## Approach

Data Handling:
- All frontend fetches hit /api/news?query=... or /api/news, which is handled by an Express route.
- That route uses your secret API key to fetch data from GNews securely and returns JSON to the frontend.

Interactivity:
- Search: Submitting the search form triggers a new API request with the user's query.
- Category Filters: Clicking a category button fetches articles for that category and updates the UI to reflect the active filter.
- Article Details: Clicking an article card opens a Bootstrap modal displaying the article's title, image, content (or description if content is unavailable), and a link to the full article.
- Reset: Clicking the header resets the search input and category filters, fetching the default top headlines.
- Load More: Alerts user (API limited to 10 articles on free tier).

## Notes

The GNews API's free tier limits the number of articles to 10 per request, so the "Load More" button currently displays an alert. For production, consider caching or pagination with a paid plan or different API.
