const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.getElementById("category-filters");
const newsContainer = document.getElementById("news-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const spinner = document.getElementById("loading-spinner");

const modal = new bootstrap.Modal(document.getElementById("articleModal"));
const modalTitle = document.getElementById("articleModalLabel");
const modalImage = document.getElementById("modal-image");
const modalContent = document.getElementById("modal-content");
const modalLink = document.getElementById("modal-link");

let currentArticles = [];

// Fetch news from GNews API
async function fetchNews(query = "", category = "") {
  try {
    showSpinner();

    const keyword = query || category;
    const url = keyword
      ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&lang=en&sortby=publishedAt&max=10&token=${API_KEY}`
      : `https://gnews.io/api/v4/top-headlines?lang=en&sortby=publishedAt&max=10&token=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    currentArticles = data.articles || [];
    newsContainer.innerHTML = "";

    if (currentArticles.length === 0) {
      newsContainer.innerHTML = `<p class="text-center">No news found.</p>`;
      loadMoreBtn.style.display = "none";
      return;
    }

    displayArticles(currentArticles);

    loadMoreBtn.style.display = "inline-block";
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    hideSpinner();
  }
}

// Display articles
function displayArticles(articles) {
  articles.forEach((article, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100 article-card" data-index="${index}">
        ${
          article.image
            ? `<img src="${article.image}" class="card-img-top" alt="${article.title}" />`
            : `<img src="https://dummyimage.com/600x400/cccccc/000000&text=No+Image" class="card-img-top" alt="No Image" />`
        }
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${
            article.description ? article.description.slice(0, 100) + "..." : ""
          }</p>
        </div>
      </div>
    `;
    newsContainer.appendChild(col);
  });

  document.querySelectorAll(".article-card").forEach((card) => {
    card.addEventListener("click", () => {
      const index = card.getAttribute("data-index");
      openModal(currentArticles[index]);
    });
  });
}

// Open article in modal
function openModal(article) {
  modalTitle.textContent = article.title || "No title";
  modalImage.src = article.image || "https://dummyimage.com/600x400/cccccc/000000&text=No+Image";
  modalContent.textContent = article.content || article.description || "No content available.";
  modalLink.href = article.url || "#";
  modal.show();
}

// Reset to default view
document.getElementById("resetHeader").addEventListener("click", () => {
  searchInput.value = "";
  resetActiveCategory();
  fetchNews();
});

// Handle search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  resetActiveCategory();
  const query = searchInput.value.trim();
  fetchNews(query);
});

// Handle category filter
categoryFilters.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const category = e.target.getAttribute("data-category");
    document.querySelectorAll("#category-filters button").forEach((btn) =>
      btn.classList.remove("active")
    );
    e.target.classList.add("active");
    searchInput.value = "";
    fetchNews("", category);
  }
});

// Reset to "All" category
function resetActiveCategory() {
  document.querySelectorAll("#category-filters button").forEach((btn) =>
    btn.classList.remove("active")
  );
  document.querySelector('#category-filters button[data-category=""]').classList.add("active");
}

// Simulated Load More (due to API limitation)
loadMoreBtn.addEventListener("click", () => {
  alert("Only 10 articles available in GNews free plan.");
});

// Show or hide loading spinner
function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

// Initial load
fetchNews();
