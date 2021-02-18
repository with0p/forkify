import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  _defaultSuccessMessage =
    'Your recipe was successfully uploaded! You also can fing it in your bookmarks :) ';

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerCloseModal();
  }

  _addHandlerShowModal() {
    this._btnOpen.addEventListener('click', this.toggleHiddenModal.bind(this));
  }

  _addHandlerCloseModal() {
    [this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this.toggleHiddenModal.bind(this))
    );
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      handler(dataObj);
    });
  }

  toggleHiddenModal() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
