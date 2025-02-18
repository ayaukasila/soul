function renderProfile() {
    const container = document.getElementById('profile-view');
    if (!container) return;
    container.innerHTML = `
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar">
            <span>👤</span>
          </div>
          <div class="profile-info">
            <h2>Guest User</h2>
            <p>guest@example.com</p>
          </div>
        </div>
        <div class="profile-stats">
          <div class="stat">
            <p>Total Entries</p>
            <p>0</p>
          </div>
          <div class="stat">
            <p>Streak</p>
            <p>0 days</p>
          </div>
        </div>
        <div class="profile-settings">
          <button>Edit Profile</button>
          <button>Notification Preferences</button>
          <button>Privacy Settings</button>
          <button>Sign Out</button>
        </div>
      </div>
    `;
  }
  
  document.addEventListener('DOMContentLoaded', renderProfile);
  