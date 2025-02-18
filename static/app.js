// Функция для входа
function loginUser() {
    // Для login.html используем id="username" и id="password", для index.html – id="login-email" и id="login-password"
    const emailElem = document.getElementById('login-email') || document.getElementById('username');
    const passwordElem = document.getElementById('login-password') || document.getElementById('password');
    const email = emailElem.value;
    const password = passwordElem.value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
      if(response.ok) {
        window.location.href = '/';
      } else {
        response.json().then(data => alert(data.message));
      }
    });
}
  
// Функция для регистрации
function register() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, email: email, password: password })
    })
    .then(response => {
      if(response.ok) {
        alert('Registration successful. Please log in.');
        window.location.href = '/login';
      } else {
        response.json().then(data => alert(data.message));
      }
    });
}
  
// Функция для отправки сообщения в чат с ИИ
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
      const chatBox = document.getElementById('chat-box');
      chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;
      chatBox.innerHTML += `<div class="ai-message">${data.response}</div>`;
    });
}
  
document.getElementById('send-btn')?.addEventListener('click', sendMessage);
  
// Код для переключения вкладок (навигация) – без скрытия разделов
document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
  
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Убираем класс .active у всех кнопок
        navBtns.forEach(b => b.classList.remove('active'));
        // Добавляем .active текущей кнопке
        btn.classList.add('active');
  
        // Получаем значение data-view у нажатой кнопки
        const viewId = btn.getAttribute('data-view');
        const targetView = document.getElementById(viewId);
        if (targetView) {
          // Прокручиваем страницу до нужного раздела с плавной анимацией
          targetView.scrollIntoView({ behavior: 'smooth' });
        }
        // Никаких классов скрытия не добавляем – все разделы остаются видимыми
      });
    });
});
