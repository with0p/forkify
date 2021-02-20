import View from './View.js';
import icons from '../../img/icons.svg';

class SortingView extends View {
  _parentElement = document.querySelector('.sorting');

  _generateMarkup() {
    return `
      <div class="sorting-field">
      <span>Title</span>
      <div class="sorting-field__buttons">
        <button class="btn--tiny btn--sort" data-field="title" data-sort="asc">
          <svg class="sorting-field__icon">
            <use href="${icons}#icon-arrow-up-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--sort" data-field="title" data-sort="desc">
          <svg class="sorting-field__icon">
            <use
              href="${icons}#icon-arrow-down-circle"
              data-sort="desc"
            ></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="sorting-field">
      <span>Publisher</span>
      <div class="sorting-field__buttons">
        <button class="btn--tiny btn--sort" data-field="publisher" data-sort="asc">
          <svg class="sorting-field__icon">
            <use href="${icons}#icon-arrow-up-circle"></use>
          </svg>
        </button>
        <button
          class="btn--tiny btn--sort"
          data-field="publisher" data-sort="desc"
        >
          <svg class="sorting-field__icon">
            <use
              href="${icons}#icon-arrow-down-circle"
              data-sort="desc"
            ></use>
          </svg>
        </button>
      </div>
    </div>`;
  }

  addHandlerSortClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--sort');
      if (!btn) return;
      const field = btn.dataset.field;
      const sort = btn.dataset.sort;
      this._parentElement.querySelectorAll('.btn--sort').forEach(el => {
        if (el !== btn) el.classList.remove('pressed');
      });
      btn.classList.toggle('pressed');
      handler(field, sort, btn.classList.contains('pressed'));
    });
  }
}

export default new SortingView();
