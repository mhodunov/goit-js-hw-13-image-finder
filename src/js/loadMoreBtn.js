import refs from './refs.js';
const { loadMoreBtnRef } = refs;

// Методы для управления кнопкой (показать/спрятать и активировать/деактивировать)
export default {
  show() {
    loadMoreBtnRef.classList.remove('is-hidden');
  },
  hide() {
    loadMoreBtnRef.classList.add('is-hidden');
  },
  enable() {
    loadMoreBtnRef.disabled = false;
    loadMoreBtnRef.textContent = 'Load more';
  },
  disable() {
    loadMoreBtnRef.disabled = true;
    loadMoreBtnRef.textContent = 'On the way...';
  },
};