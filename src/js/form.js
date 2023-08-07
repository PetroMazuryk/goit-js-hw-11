import Notiflix from 'notiflix';

import cardTpl from '../templates/cards.hbs';
import GalleryServis from './gallery_servis';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryServis = new GalleryServis();

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  submitBtn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  sentinel: document.querySelector('#sentinel'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onFormSubmit(e) {
  e.preventDefault();

  let inputValue = e.currentTarget.elements.searchQuery.value;

  refs.loadMoreBtn.style.display = 'none';

  if (!inputValue) {
    renderClear(refs.gallery);
    return Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  galleryServis.query = inputValue;
  galleryServis.resetPage();

  const { photoArray, totalPhotos } = await galleryServis.getPhotos();

  if (photoArray.length === 0) {
    renderClear(refs.gallery);
    return Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderClear(refs.gallery);
  cardRenderMurkup(photoArray);

  refs.loadMoreBtn.style.display = 'block';

  addSimpleLightbox();
}

async function onClickLoadMoreBtn() {
  const { photoArray, totalPhotos } = await galleryServis.getPhotos();

  if (refs.gallery.children.length === totalPhotos) {
    refs.loadMoreBtn.style.display = 'none';
    return Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  cardRenderMurkup(photoArray);

  addSimpleLightbox();

  scroll();
}

// function cardRenderMurkup(array) {
//   const markup = array.map(card => cardTpl(card)).join('');
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

function cardRenderMurkup(array) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(array));
}

function renderClear(element) {
  const markup = ``;
  element.innerHTML = markup;
}

function addPreventDefaultLink(link) {
  return link.addEventListener('click', e => {
    e.preventDefault();
  });
}

function addSimpleLightbox() {
  const linksEl = document.querySelectorAll('.photo');
  linksEl.forEach(link => {
    addPreventDefaultLink(link);
  });
  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function onEntry(entryes) {
  entryes.forEach(async entry => {
    if (entry.isIntersecting && galleryServis.query !== '') {
      const { photoArray, totalPhotos } = await galleryServis.getPhotos();

      cardRenderMurkup(photoArray);

      addSimpleLightbox();

      if (refs.gallery.children.length === totalPhotos) {
        refs.loadMoreBtn.style.display = 'none';
        return Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    }
  });
}

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);
