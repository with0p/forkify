import View from './View.js';
import icons from '../../img/icons.svg';

class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _defaultErrorMessage =
    'No recipes found for your query, please, try another one';
  _defaultSuccessMessage = 'Success!';
  _generateMarkup() {
    return this._data.map(this._generateResultElement).join('');
  }

  _generateResultElement(res) {
    return `
    <li class="preview">          
    <a class="preview__link" href="#${res.id}">
      <figure class="preview__fig">
        <img src="${res.image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
      </div>
    </a>
  </li>
    `;
  }
}

export default new SearchResultsView();
