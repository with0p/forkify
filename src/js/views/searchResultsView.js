import View from './View.js';
import previewView from './previewView';

class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _defaultErrorMessage =
    'No recipes found for your query, please, try another one';
  _defaultSuccessMessage = 'Success!';
  _initialText = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new SearchResultsView();
