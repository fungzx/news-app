# ANews - Simple News Aggregator

A lightweight, responsive news dashboard built with HTML, CSS, and JavaScript. It fetches real-time news articles from the [GNews API](https://gnews.io/) and supports category filtering, search, and modal previews.

🔗 **Live Demo**: https://fungzx.github.io/news-app/

---

## Features

- ✅ Responsive UI using Bootstrap
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

npx serve

Then visit http://localhost:3000

## API Setup

API Used: GNews API (https://gnews.io/)

API Key:
- The application uses a GNews API key stored in app.js (API_KEY variable).

To use your own key:
- Sign up at https://gnews.io/ to obtain a free API key.
- Replace the API_KEY constant in app.js with your key:

Note: The free GNews API plan limits requests to 10 articles per call and has a daily quota.

## Approach

Data Handling:
- The application fetches news articles using the GNews API, either by search query, category, or default top headlines.
- Articles are stored in a currentArticles array and rendered as Bootstrap cards in a responsive grid.

Interactivity:
- Search: Submitting the search form triggers a new API request with the user's query.
- Category Filters: Clicking a category button fetches articles for that category and updates the UI to reflect the active filter.
- Article Details: Clicking an article card opens a Bootstrap modal displaying the article's title, image, content (or description if content is unavailable), and a link to the full article.
- Reset: Clicking the header resets the search input and category filters, fetching the default top headlines.

## Notes

The GNews API's free tier limits the number of articles to 10 per request, so the "Load More" button currently displays an alert. In a production environment, pagination or a premium API plan could be implemented.
