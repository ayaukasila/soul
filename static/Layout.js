document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
  
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const viewId = btn.getAttribute('data-view');
        const targetView = document.getElementById(viewId);
        if (targetView) {
          targetView.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
  