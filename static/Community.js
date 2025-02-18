const mockPublicEntries = [
    {
      id: '1',
      user_id: '1',
      mood: 'good',
      feelings: ['Relaxed', 'Peaceful'],
      created_at: '2024-02-04',
      is_public: true
    },
    {
      id: '2',
      user_id: '2',
      mood: 'great',
      feelings: ['Excited', 'Energetic'],
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
  
  function createEntryElement(entry) {
    const div = document.createElement('div');
    div.className = 'entry-card';
    div.innerHTML = `
      <div class="entry-header">
        <div class="entry-icon">${getMoodEmoji(entry.mood)}</div>
        <div class="entry-info">
          <p class="entry-mood">${entry.mood}</p>
          <time>${new Date(entry.created_at).toLocaleDateString()}</time>
        </div>
      </div>
      <div class="entry-feelings">
        ${entry.feelings.map(feeling => `<span class="feeling">${feeling}</span>`).join('')}
      </div>
    `;
    return div;
  }
  
  function renderCommunity() {
    const container = document.getElementById('community-view');
    if (!container) return;
    container.innerHTML = `
      <h1>Community</h1>
      <div id="community-entries"></div>
    `;
    const entriesContainer = document.getElementById('community-entries');
    mockPublicEntries.forEach(entry => {
      entriesContainer.appendChild(createEntryElement(entry));
    });
  }
  
  document.addEventListener('DOMContentLoaded', renderCommunity);
  