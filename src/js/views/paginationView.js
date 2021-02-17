import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.pageSize);
    // page one and there are more pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateButton('next');
    }

    // page 1 and no more
    if ((this._data.page === numPages) === 1) return '';

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateButton('prev');
    }

    // other page
    if (this._data.page < numPages) {
      return this._generateButton('prev') + this._generateButton('next');
    }
  }

  _generateButton(direction) {
    if (direction === 'next') {
      return `      
          <button class="btn--inline pagination__btn--next" data-goto="${
            this._data.page + 1
          }">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    if (direction === 'prev') {
      return `      
        <button class="btn--inline pagination__btn--prev" data-goto="${
          this._data.page - 1
        }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>`;
    }
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
