(function() {
    const moodOptions = [
      { type: 'awful', emoji: '😢', label: 'Awful' },
      { type: 'bad', emoji: '😕', label: 'Bad' },
      { type: 'okay', emoji: '😐', label: 'Okay' },
      { type: 'good', emoji: '🙂', label: 'Good' },
      { type: 'great', emoji: '😊', label: 'Great' }
    ];
  
    let selectedMood = null;
    let noteText = '';
  
    function renderMoodSelector(onSelectCallback) {
      const container = document.getElementById('mood-selector');
      if (!container) return;
      container.innerHTML = '';
  
      moodOptions.forEach(({ type, emoji, label }) => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span>${emoji}</span> <span>${label}</span>`;
        btn.className = 'mood-btn px-4 py-2 rounded bg-gray-100 hover:bg-gray-200';
        btn.addEventListener('click', () => {
          selectedMood = type;
          onSelectCallback(type);
          updateSelectedMood(btn);
        });
        container.appendChild(btn);
      });
    }
  
    function updateSelectedMood(selectedButton) {
      const buttons = document.querySelectorAll('#mood-selector .mood-btn');
      buttons.forEach(btn => {
        btn.classList.remove('bg-violet-100', 'text-violet-800');
      });
      selectedButton.classList.add('bg-violet-100', 'text-violet-800');
    }
  
    function onMoodSelect(mood) {
      console.log('Selected Mood:', mood);
    }
  
    function handleTrackSubmit(event) {
      event.preventDefault();
  
      console.log('Mood:', selectedMood);
      console.log('Note:', noteText);
  
      fetch('/api/add_mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: selectedMood,
          note: noteText 
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        alert(data.message || 'Mood entry saved!');
        renderMoodStatsChart('1W');
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to save mood entry.');
      });
    }
  
    async function renderMoodStatsChart(range = '1W') {
      const ctx = document.getElementById('moodChart').getContext('2d');
      try {
        const res = await fetch(`/api/get_mood_stats?range=${range}`);
        const data = await res.json();
        console.log('Mood stats:', data); 
  
        const labels = Object.keys(data);   
        const values = Object.values(data); 
        if (window.moodChartInstance) {
          window.moodChartInstance.destroy();
        }
  
        window.moodChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Mood Frequency',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              fill: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } catch (error) {
        console.error("Error rendering mood stats chart:", error);
      }
    }
  
    function renderTrackPage() {
      const container = document.getElementById('track-view');
      if (!container) return;
  

      container.innerHTML = `
        <div class="track-container max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Your Mood Journey</h1>
          <form id="mood-form">
            <div class="mood-selection space-y-4">
              <h3 class="text-xl font-semibold">Select your mood</h3>
              <div id="mood-selector" class="mood-buttons flex gap-4"></div>
            </div>
            <div class="note-section mt-6">
              <label for="note" class="block text-sm font-medium text-gray-700">Add more details (optional):</label>
              <textarea id="note" placeholder="Write about your day..."
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <button type="submit" class="submit-btn mt-6 w-full py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700">
              Save Entry
            </button>
          </form>
        </div>
        <div class="chart-container">
          <div class="flex justify-center space-x-4 mb-4">
            <button class="mood-time-btn px-3 py-2 bg-gray-200 rounded-md" data-range="1W">Last Week</button>
            <button class="mood-time-btn px-3 py-2 bg-gray-200 rounded-md" data-range="1M">Last Month</button>
            <button class="mood-time-btn px-3 py-2 bg-gray-200 rounded-md" data-range="ALL">All Time</button>
          </div>
          <canvas id="moodChart"></canvas>
        </div>
      `;
  
      renderMoodSelector(onMoodSelect);
        document.getElementById('note').addEventListener('input', (e) => {
        noteText = e.target.value;
      });
  
      document.getElementById('mood-form').addEventListener('submit', handleTrackSubmit);
  
      document.querySelectorAll('.mood-time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const range = btn.getAttribute('data-range');
          renderMoodStatsChart(range);
        });
      });
  
      renderMoodStatsChart('1W');
    }
  
    document.addEventListener('DOMContentLoaded', renderTrackPage);
  })();
  