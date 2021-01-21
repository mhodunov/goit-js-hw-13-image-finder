const apiKey = '19973159-db573a6c5a26f25e5ce8b6bb0';
const BASE_URL = 'https://pixabay.com/api/';
const errorMessage = 'No matches were found! Try again :)';

// Обрабатываем поисковый запрос
export default {
  searchQuery: '',
  pageNumber: 1,
  perPage: 12,
  totalPages: 0,
  isLastPage: false,

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        this.totalPages = Math.ceil(totalHits / this.perPage);

        // Проверяем, является ли страничка последней
        if (this.totalPages === this.pageNumber) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        // Возвращаем ошибку, если ничего не найдено
        if (!this.totalPages) {
          return Promise.reject(errorMessage);
        }

        this.incrementPage();
        return hits;
      });
  },
  resetPage() {
    this.pageNumber = 1;
  },
  incrementPage() {
    this.pageNumber += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  },
};