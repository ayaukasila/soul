document.addEventListener('DOMContentLoaded', () => {
    async function loadProfile() {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        if (data.error) {
          console.error('Profile error:', data.error);
          return;
        }
        document.getElementById('profile-username').textContent = data.username;
        document.getElementById('profile-email').textContent = data.email;
        document.getElementById('total-entries').textContent = data.total_entries;
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  
    async function loadUserMoods() {
      try {
        const response = await fetch('/api/user_moods');
        const data = await response.json();
        if (data.error) {
          console.error('Moods error:', data.error);
          return;
        }
        renderMoodHistory(data.moods || []);
      } catch (error) {
        console.error('Error loading user moods:', error);
      }
    }
  
    function renderMoodHistory(moods) {
      const moodList = document.getElementById('mood-list');
      if (!moodList) return;
  
      moodList.innerHTML = '';
  
      if (!moods.length) {
        const noItem = document.createElement('div');
        noItem.textContent = "No moods recorded yet.";
        noItem.className = "text-gray-500";
        moodList.appendChild(noItem);
        return;
      }
  
      moods.forEach(item => {
        const div = document.createElement('div');
        div.className = "p-3 border border-gray-200 rounded-md flex justify-between items-center";
        
        const dateStr = new Date(item.timestamp).toLocaleString(); 
        
        div.innerHTML = `
          <span class="font-medium capitalize">${item.mood}</span>
          <span class="text-sm text-gray-600">${dateStr}</span>
        `;
        moodList.appendChild(div);
      });
    }
  
    const profileBtn = document.querySelector('[data-view="profile-view"]');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        loadProfile();
        loadUserMoods();
      });
    }
  });
  