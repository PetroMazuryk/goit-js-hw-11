const refs = {
  btn: document.querySelector('.js-theme'),
};

const currentTheme = localStorage.getItem('theme');
// Если поточна тема в localStorage = "dark"…
if (currentTheme === 'dark') {
  // …тоді ми використовуємо класс .dark-theme
  document.body.classList.add('shown');
}

refs.btn.addEventListener('click', onClickTheme);

function onClickTheme(event) {
  event.preventDefault();
  document.body.classList.toggle('shown');
  let theme = 'light';
  // Якщо <body> містить класс .dark-theme…
  if (document.body.classList.contains('shown')) {
    // …тоді робимо тему темною
    theme = 'dark';
  }

  localStorage.setItem('theme', theme);
}
