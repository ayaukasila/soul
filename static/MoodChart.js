const moodToValue = {
    awful: 1,
    bad: 2,
    okay: 3,
    good: 4,
    great: 5
  };
  
  function renderMoodChart(entries, timeRange, onTimeRangeChange) {
    const container = document.getElementById('track-view');
    if (!container) return;
    container.innerHTML = `
      <div class="chart-wrapper">
        <div id="time-range-buttons">
          ${['1W', '1M', '3M', '6M', '1Y', 'ALL'].map(range => `
            <button data-range="${range}" class="${timeRange === range ? 'active' : ''}">
              ${range}
            </button>
          `).join('')}
        </div>
        <canvas id="moodChart"></canvas>
      </div>
    `;
  
    document.querySelectorAll('#time-range-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        const selectedRange = button.getAttribute('data-range');
        onTimeRangeChange(selectedRange);
      });
    });
  
    const data = {
      labels: entries.map(entry => new Date(entry.created_at).toLocaleDateString()),
      datasets: [{
        label: 'Mood',
        data: entries.map(entry => moodToValue[entry.mood]),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        borderWidth: 3,
      }]
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: () => '',
            label: (context) => {
              const value = context.parsed.y;
              return Object.keys(moodToValue)[value - 1].toUpperCase();
            }
          }
        }
      },
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: { callback: (value) => Object.keys(moodToValue)[value - 1] }
        },
        x: { ticks: {} }
      }
    };
  
    const ctx = document.getElementById('moodChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const mockEntries = [
      { id: '1', user_id: '1', mood: 'good', feelings: ['Happy'], created_at: '2024-02-01', is_public: true },
      { id: '2', user_id: '1', mood: 'great', feelings: ['Excited'], created_at: '2024-02-02', is_public: true },
      { id: '3', user_id: '1', mood: 'okay', feelings: ['Neutral'], created_at: '2024-02-03', is_public: true }
    ];
    let currentTimeRange = '1W';
    renderMoodChart(mockEntries, currentTimeRange, (newRange) => {
      currentTimeRange = newRange;
      renderMoodChart(mockEntries, currentTimeRange, renderMoodChart);
    });
  });
  