document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('explore-search-input');
    const searchBtn = document.getElementById('explore-search-btn');
    const resultsContainer = document.querySelector('.explore-results');
  
    async function fetchExplore(query) {
      try {
        const response = await fetch(`/api/explore?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.articles || [];
      } catch (error) {
        console.error('Error fetching explore data:', error);
        return [];
      }
    }
  
    // Функция для рендеринга одной записи
    function createEntryElement(article) {

      const div = document.createElement('div');
      div.className = 'p-4 bg-white rounded-md shadow mb-4';
  
      div.innerHTML = `
        <h3 class="text-lg font-medium text-gray-900">${article.title}</h3>
        <p class="text-sm text-gray-700 my-2">${article.description}</p>
        <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Open Link</a>
      `;
  
      return div;
    }
  
    function renderEntries(articles) {
      resultsContainer.innerHTML = ''; // очистить предыдущие результаты
      if (articles.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500">No articles found.</p>';
        return;
      }
      articles.forEach(article => {
        const entryElem = createEntryElement(article);
        resultsContainer.appendChild(entryElem);
      });
    }
  
    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      if (!query) {
        resultsContainer.innerHTML = '<p class="text-gray-500">Please enter a search term.</p>';
        return;
      }
      resultsContainer.innerHTML = '<p class="text-gray-500">Searching...</p>';
      const articles = await fetchExplore(query);
      renderEntries(articles);
    });
  
   
 (async () => {
  const articles = await fetchExplore('');
   renderEntries(articles);
   })();
  });
  