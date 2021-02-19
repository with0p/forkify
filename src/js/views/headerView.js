class HeaderView {
  _parentElement = document.querySelector('.header');

  addHandlerInit(handler) {
    this._parentElement
      .querySelector('.header__logo')
      .addEventListener('click', handler);
  }
}

export default new HeaderView();
