// Функция для входа
function loginUser() {
    // Для login.html используем id="username" и id="password",
    // для index.html – id="login-email" и id="login-password"
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
      // Добавляем сообщение пользователя
      chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;
      // Добавляем ответ ИИ
      chatBox.innerHTML += `<div class="ai-message">${data.response}</div>`;
    })
    .catch(error => console.error('Error:', error));
  }
  
  function loadProfile() {
    fetch('/api/profile')
      .then(res => {
        if (!res.ok) {
          // Если сервер вернул 401/404, значит не залогинен или ошибка
          throw new Error('Not logged in or user not found');
        }
        return res.json();
      })
      .then(data => {
        // Успешно получили JSON. Заполняем DOM
        document.getElementById('profile-username').textContent = data.username;
        document.getElementById('profile-email').textContent = data.email;
        document.getElementById('total-entries').textContent = data.total_entries;
        document.getElementById('streak').textContent = data.streak + ' days';
      })
      .catch(err => {
        console.error(err);
        // При желании: alert('Please log in first');
      });
  }
  
  // Привязка обработчика к кнопке отправки чата
  document.getElementById('send-btn')?.addEventListener('click', sendMessage);
  
  // Код для переключения вкладок (навигация) – без скрытия разделов
  document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
  
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Снимаем класс .active у всех кнопок и добавляем его на нажатую
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        // Получаем значение data-view, например "track-view"
        const viewId = btn.getAttribute('data-view');
        // Ищем элемент с этим id
        const targetView = document.getElementById(viewId);
        if (targetView) {
          // Плавно прокручиваем страницу к нужной секции
          targetView.scrollIntoView({ behavior: 'smooth' });
        }
        // Остальные секции остаются видимыми
      });
    });

  });
  