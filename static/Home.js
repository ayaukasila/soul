const feedItems = [
    {
      id: '1',
      type: 'tip',
      content: 'Take a few minutes each day to practice mindful breathing. Focus on your breath and let go of racing thoughts.',
      likes: 128,
      saved: false,
      author: 'Mindfulness Expert',
      liked: false
    },
    {
      id: '2',
      type: 'image',
      content: 'Remember to take care of yourself first',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      likes: 256,
      saved: true,
      liked: false
    },
    {
      id: '3',
      type: 'quote',
      content: '"The greatest glory in living lies not in never falling, but in rising every time we fall." - Nelson Mandela',
      likes: 432,
      saved: false,
      author: '',
      liked: false
    }
  ];
  
  function createFeedItemElement(item) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden';
  

    let imageHtml = '';
    if (item.type === 'image' && item.imageUrl) {
      imageHtml = `
        <div class="h-56 overflow-hidden">
          <img
            src="${item.imageUrl}"
            alt="${item.content}"
            class="w-full h-full object-cover"
          />
        </div>
      `;
    }
  
    const authorHtml = item.author
      ? `<p class="text-sm text-gray-600 mt-2">— ${item.author}</p>`
      : '';
  
    const contentHtml = `
      ${imageHtml}
      <div class="p-4 space-y-3">
        ${
          item.type === 'quote'
            ? `<p class="text-gray-800 italic">${item.content}</p>`
            : `<p class="text-gray-800">${item.content}</p>`
        }
        ${authorHtml}
  
        <!-- Кнопка лайка -->
        <div class="flex items-center gap-4 pt-2 border-t border-gray-100 mt-3">
          <button
            class="flex items-center gap-1 text-gray-600 hover:text-red-600 focus:outline-none like-btn"
          >
            <span>❤️</span>
            <span class="like-count">${item.likes}</span>
          </button>
        </div>
      </div>
    `;
  
    card.innerHTML = contentHtml;
  
    const likeBtn = card.querySelector('.like-btn');
    const likeCountSpan = card.querySelector('.like-count');
    likeBtn.addEventListener('click', () => {
      // Переключаем состояние liked
      item.liked = !item.liked;
      // Если лайкнули, увеличиваем счётчик, иначе уменьшаем
      item.likes = item.liked ? item.likes + 1 : item.likes - 1;
      likeCountSpan.textContent = item.likes;
    });
  
    return card;
  }
  
  function renderHomePage() {
    const container = document.getElementById('today-view');
    if (!container) return;
  
    container.innerHTML = `
      <div class="max-w-xl mx-auto p-4 space-y-6">
        <h1 class="text-3xl font-bold text-gray-900">Today's Inspiration</h1>
        <div id="feed-container" class="space-y-6"></div>
      </div>
    `;

    const feedContainer = document.getElementById('feed-container');
  
    feedItems.forEach(item => {
      const feedCard = createFeedItemElement(item);
      feedContainer.appendChild(feedCard);
    });
  }
  
  document.addEventListener('DOMContentLoaded', renderHomePage);
  