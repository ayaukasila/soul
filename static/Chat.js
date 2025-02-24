document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-user-input');
    const chatBox = document.getElementById('chat-box');
  
    sendBtn.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (!message) return;
  
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'user-message';
      userMsgDiv.textContent = message;
      chatBox.appendChild(userMsgDiv);
  
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      })
        .then(response => response.json())
        .then(data => {
          const aiMsgDiv = document.createElement('div');
          aiMsgDiv.className = 'ai-message';
          aiMsgDiv.textContent = data.response;
          chatBox.appendChild(aiMsgDiv);
        })
        .catch(error => console.error('Error:', error));
  
      chatInput.value = '';
    });
  });
  