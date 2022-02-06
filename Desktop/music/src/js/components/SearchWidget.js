import { select } from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

class SearchWidget{
  constructor(data){
    const thisWidget = this;

    thisWidget.data = data;

    thisWidget.dom = {};

    thisWidget.getElements();
    thisWidget.initAction();
  }

  getElements(){
    const thisWidget = this;

    thisWidget.dom.searchInput = document.querySelector(select.form.input);
    thisWidget.dom.searchButton = document.querySelector(select.form.button);
    thisWidget.dom.found = document.querySelector(select.form.found);
  }

  initAction(){
    const thisWidget = this;

    thisWidget.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      let containerMusic = document.querySelector(select.containerOf.music);
      containerMusic.innerHTML = '';
      thisWidget.initSearch(thisWidget.dom.searchInput.value);
    });
  }

  initSearch(search){
    const thisWidget = this;
    let find = 0;

    if(search != '' && search.length > 1){
      for(let song in thisWidget.data.songs){
        let filename = thisWidget.data.songs[song].filename;
        filename = utils.createTextFromFilename(filename); 
        const regEx = new RegExp(search,'ig');
        const isFind = filename.search(regEx, search); 
        
        if(isFind >= 0){
          find++;
          new Song(thisWidget.data.songs[song]);
        }
      }
      thisWidget.dom.found.innerHTML = find;
      utils.initGap();
    }    
  }    
}

export default SearchWidget;