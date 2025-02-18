const moods = [
    { type: 'awful', emoji: '😢', label: 'Awful' },
    { type: 'bad', emoji: '😕', label: 'Bad' },
    { type: 'okay', emoji: '😐', label: 'Okay' },
    { type: 'good', emoji: '🙂', label: 'Good' },
    { type: 'great', emoji: '😊', label: 'Great' }
  ];
  
  let selectedMood = null;
  
  function renderMoodSelector(onSelectCallback) {
    const container = document.getElementById('mood-selector');
    if (!container) return;
    container.innerHTML = '';
    
    moods.forEach(({ type, emoji, label }) => {
      const btn = document.createElement('button');
      btn.innerHTML = `<span>${emoji}</span><span>${label}</span>`;
      btn.className = 'mood-btn';
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
      btn.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
  }
  
  function onMoodSelect(mood) {
    console.log('Selected Mood:', mood);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderMoodSelector(onMoodSelect);
  });
  