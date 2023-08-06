let buttonUp = document.querySelector('.btn-scroll');

window.addEventListener('scroll', onScrollFunction);

function onScrollFunction() {
  if (window.pageYOffset > 300) {
    buttonUp.classList.add('shown');
  } else {
    buttonUp.classList.remove('shown');
  }
}

buttonUp.addEventListener('click', onScrollUp);

function onScrollUp() {
  window.scrollTo(0, 0);
}
