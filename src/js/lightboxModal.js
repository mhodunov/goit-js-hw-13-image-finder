import refs from '../js/refs.js';
const basicLightbox = require('basiclightbox');
const {
  galleryListRef,
  modalContainer,
  modalCloseBtn,
  modalImageElement,
  overlay,
} = refs;

const galleryModal = basicLightbox.create(modalImageElement);

// Слушатели событий на модальное окно
galleryListRef.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Функция, которая срабатывает, когда модальное окно открывается
function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originalImageSource = event.target.dataset.source;
  modalImageElement.setAttribute('src', originalImageSource);

  galleryModal.show();

  modalContainer.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);
}

// Функция, которая срабатывает, когда модальное окно закрывается
function closeModal() {
  if (event.target.nodeName === 'IMG') {
    return;
  }

  modalImageElement.setAttribute('src', '');
  modalContainer.classList.remove('is-open');

  galleryModal.close();

  // Удаляем слушатель событий
  window.removeEventListener('keydown', onPressEscape);
}

// Функция, которая закрывает модалку при нажатии на Esc
function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}