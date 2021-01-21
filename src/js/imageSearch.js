import refs from './refs.js';
import galleryCardTpl from '../templates/photoCard.hbs';
import pixabayApi from './pixabayApi.js';
import markupApi from './markup.js';
import loadMoreBtnApi from './loadMoreBtn.js';
import showError from './notifications.js';

const { galleryListRef, searchFormRef, loadMoreBtnRef } = refs;
const { markupRender, clearGallery } = markupApi;

const errorMessage = 'No matches were found!';

// Кнопка load more скрыта, пока не придут первые изображения
loadMoreBtnApi.hide();

// Слушатель событий на форму поиска
searchFormRef.addEventListener('submit', onImageSearch);
// Слушатель событий на кнопку load more
loadMoreBtnRef.addEventListener('click', onLoadMore);

//Функция, которая обрабатывает данные с сервера
function showSearchResult() {
  pixabayApi
    .fetchImages()
    .then(dataArray => galleryCardTpl(dataArray))
    .then(markup => {
      markupRender(markup, galleryListRef);
      if (pixabayApi.pageNumber > 2) {
        window.scrollBy({
          top: window.innerHeight - 110,
          behavior: 'smooth',
        });
      }
      if (pixabayApi.isLastPage) {
        loadMoreBtnApi.hide();
      } else {
        loadMoreBtnApi.show();
        loadMoreBtnApi.enable();
      }
    })
    .catch(er => {
      loadMoreBtnApi.hide();
      showError(er);
    });
}

// Функция, которая обрабатывает поисковый запрос после подтверждения
function onImageSearch(event) {
  event.preventDefault();

  pixabayApi.query = searchFormRef.elements.query.value;

  clearGallery(galleryListRef);
  pixabayApi.resetPage();

  showSearchResult();

  searchFormRef.reset();
}

// Функция, которая обрабатывает нажатие на load more
function onLoadMore() {
  loadMoreBtnApi.disable();
  showSearchResult();
}