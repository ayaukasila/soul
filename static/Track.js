const feelingsOptions = {
    awful: ['Depressed', 'Anxious', 'Overwhelmed', 'Heartbroken', 'Angry', 'Sick', 'Hopeless', 'Scared', 'Ashamed', 'Rejected'],
    bad: ['Tired', 'Stressed', 'Frustrated', 'Disappointed', 'Worried'],
    okay: ['Neutral', 'Content', 'Average', 'Fine', 'Stable'],
    good: ['Happy', 'Relaxed', 'Optimistic', 'Satisfied', 'Peaceful'],
    great: ['Excited', 'Joyful', 'Energetic', 'Grateful', 'Inspired']
  };
  
  let selectedMood = null;
  let selectedFeelings = [];
  let noteText = '';
  
  function renderFeelings() {
    const container = document.getElementById('feelings-container');
    if (!container) return;
    container.innerHTML = '';
  
    if (selectedMood && feelingsOptions[selectedMood]) {
      feelingsOptions[selectedMood].forEach(feeling => {
        const btn = document.createElement('button');
        btn.textContent = feeling;
        btn.className = selectedFeelings.includes(feeling)
          ? 'feeling-btn selected'
          : 'feeling-btn';
        btn.addEventListener('click', () => {
          if (selectedFeelings.includes(feeling)) {
            selectedFeelings = selectedFeelings.filter(f => f !== feeling);
          } else {
            selectedFeelings.push(feeling);
          }
          renderFeelings();
        });
        container.appendChild(btn);
      });
    }
  }
  
  function handleTrackSubmit(event) {
    event.preventDefault();
    console.log('Mood:', selectedMood);
    console.log('Feelings:', selectedFeelings);
    console.log('Note:', noteText);
    alert('Mood entry saved!');
  }
  
  function renderTrackPage() {
    const container = document.getElementById('track-view');
    if (!container) return;
    container.innerHTML = `
      <div class="track-container">
        <h1>Your Mood Journey</h1>
        <form id="mood-form">
          <div class="mood-selection">
            <h3>Select your mood</h3>
            <div id="mood-buttons" class="mood-buttons">
              ${Object.keys(feelingsOptions).map(mood => `
                <button type="button" data-mood="${mood}">
                  ${mood.charAt(0).toUpperCase() + mood.slice(1)}
                </button>
              `).join('')}
            </div>
          </div>
          <div id="feelings-container" class="feelings-container"></div>
          <div class="note-section">
            <label for="note">Add more details (optional)</label>
            <textarea id="note" placeholder="Write about your day..."></textarea>
          </div>
          <button type="submit" class="submit-btn">Save Entry</button>
        </form>
      </div>
    `;
  
    document.querySelectorAll('#mood-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        selectedMood = button.getAttribute('data-mood');
        selectedFeelings = [];
        renderFeelings();
      });
    });
  
    document.getElementById('note').addEventListener('input', (e) => {
      noteText = e.target.value;
    });
  
    document.getElementById('mood-form').addEventListener('submit', handleTrackSubmit);
  }
  
  document.addEventListener('DOMContentLoaded', renderTrackPage);
  