document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
  
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Убираем класс .active у всех кнопок
        navBtns.forEach(b => b.classList.remove('active'));
        // Добавляем .active текущей кнопке
        btn.classList.add('active');
  
        // Получаем значение data-view у кнопки
        const viewId = btn.getAttribute('data-view');
        const targetView = document.getElementById(viewId);
        if (targetView) {
          // Плавная прокрутка к разделу, не скрывая другие
          targetView.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
  