import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _numPages;

  _generateMarkup() {
    // page one and there are more pages
    this._numPages = Math.ceil(this._data.results.length / this._data.pageSize);
    if (this._data.page === 1 && this._numPages > 1) {
      return this._generatePagination({ isPrev: false, isNext: true });
    }

    // page 1 and no more
    if (this._data.page === 1 && this._numPages === 1)
      return this._generatePagination({ isPrev: false, isNext: false });

    // last page
    if (this._data.page === this._numPages && this._numPages > 1) {
      return this._generatePagination({ isPrev: true, isNext: false });
    }

    // other page
    if (this._data.page < this._numPages) {
      return this._generatePagination({ isPrev: true, isNext: true });
    }
  }

  _generatePagination(pageStatus) {
    return `
    <button
      class="btn--inline pagination__btn--prev ${
        !pageStatus.isPrev ? 'hidden' : ''
      }"
      data-goto="${this._data.page - 1}"
    >
      <span>Page ${this._data.page - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    </button>
    <div class="pagination-total__text">
      ${this._data.page} of ${this._numPages}
    </div>
    <button
      class="btn--inline pagination__btn--next ${
        !pageStatus.isNext ? 'hidden' : ''
      }"
      data-goto="${this._data.page + 1}"
    >
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${this._data.page + 1}</span>
    </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = Number.parseInt(btn.dataset.goto);
      handler(goTo);
    });
  }
}

export default new PaginationView();
