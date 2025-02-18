const mockEntries = [
    {
      id: '1',
      user_id: '1',
      mood: 'great',
      feelings: ['Excited', 'Inspired'],
      created_at: '2024-02-04',
      is_public: true
    },
    {
      id: '2',
      user_id: '2',
      mood: 'good',
      feelings: ['Peaceful', 'Creative'],
      created_at: '2024-02-04',
      is_public: true
    }
  ];
  
  function getMoodEmoji(mood) {
    switch (mood) {
      case 'great': return '😊';
      case 'good': return '🙂';
      case 'okay': return '😐';
      case 'bad': return '😕';
      default: return '😢';
    }
  }
  
  function filterEntries(query) {
    return mockEntries.filter(entry =>
      entry.feelings.some(feeling =>
        feeling.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
  
  function createEntryElement(entry) {
    const div = document.createElement('div');
    div.className = 'article-card';
    div.innerHTML = `
      <div class="article-header">
        <div class="article-icon">${getMoodEmoji(entry.mood)}</div>
        <div class="article-info">
          <p class="article-mood">${entry.mood}</p>
          <time>${new Date(entry.created_at).toLocaleDateString()}</time>
        </div>
      </div>
      <div class="article-feelings">
        ${entry.feelings.map(feeling => `<span class="tag">${feeling}</span>`).join('')}
      </div>
    `;
    return div;
  }
  
  function renderExplore() {
    const container = document.getElementById('explore-view');
    if (!container) return;
    container.innerHTML = `
      <div class="explore-container">
        <h1>Explore</h1>
        <div class="search-bar">
          <input type="text" id="explore-search-input" placeholder="Search by feelings or emotions..." />
          <button id="explore-search-btn">Search</button>
        </div>
        <div id="explore-entries" class="explore-entries"></div>
      </div>
    `;
  
    const searchInput = document.getElementById('explore-search-input');
    const searchBtn = document.getElementById('explore-search-btn');
    const entriesContainer = document.getElementById('explore-entries');
  
    function renderEntries(entries) {
      entriesContainer.innerHTML = '';
      if (entries.length > 0) {
        entries.forEach(entry => {
          entriesContainer.appendChild(createEntryElement(entry));
        });
      } else {
        entriesContainer.innerHTML = '<p>No articles found.</p>';
      }
    }
  
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      const filtered = filterEntries(query);
      renderEntries(filtered);
    });
  
    // Initial render of all entries
    renderEntries(mockEntries);
  }
  
  document.addEventListener('DOMContentLoaded', renderExplore);
  