document.addEventListener('DOMContentLoaded', () => {
    // Загрузка базовых данных профиля
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
  
    // Загрузка истории настроений
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
  
    // Отрисовка истории настроений (список mood + timestamp)
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
  
    // ------------ NEW: Update username ------------
    async function updateUsername() {
      const newUsernameInput = document.getElementById('new-username');
      if (!newUsernameInput) return;
  
      const newUsername = newUsernameInput.value.trim();
      if (!newUsername) {
        alert('Please enter a new username.');
        return;
      }
  
      try {
        const res = await fetch('/api/user', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: newUsername })
        });
        const data = await res.json();
  
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert(data.message || 'Username updated!');
          // Перезагрузим профиль, чтобы увидеть изменения
          loadProfile();
        }
      } catch (error) {
        console.error('Update username error:', error);
        alert('Failed to update username.');
      }
    }
  
    // ------------ NEW: Delete account ------------
    async function deleteAccount() {
      if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
      }
  
      try {
        const res = await fetch('/api/user', { method: 'DELETE' });
        const data = await res.json();
  
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert(data.message || 'Account deleted.');
          // Перейдём на главную или страницу логина, т. к. аккаунт удалён
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Delete account error:', error);
        alert('Failed to delete account.');
      }
    }
  
    // Когда пользователь кликает на вкладку «Profile»
    const profileBtn = document.querySelector('[data-view="profile-view"]');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        loadProfile();
        loadUserMoods();
      });
    }
  
    // Привязываем кнопки «Update Username» и «Delete Account»
    const updateUsernameBtn = document.getElementById('update-username-btn');
    if (updateUsernameBtn) {
      updateUsernameBtn.addEventListener('click', updateUsername);
    }
  
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', deleteAccount);
    }
  });
  