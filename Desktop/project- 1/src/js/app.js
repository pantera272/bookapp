// eslint-disable-next-line no-unused-vars
import Song from './components/Song.js';
import SearchWidget from './components/searchWidget.js';
import { select, className, settings } from './settings.js';
import utils from './utils.js';

const app = {
  initPage: function(){
    const thisApp = this;
    
    const navLinks = document.querySelectorAll(select.nav.links);
    // eslint-disable-next-line no-unused-vars
    let pageHash = window.location.hash;
    thisApp.possiblePages = [];
    let page = '';
    
    for(let navLink of navLinks){
      navLink.addEventListener('click', function(event){
        event.preventDefault();
        let containerMusic = document.querySelector(select.containerOf.music);
        containerMusic.innerHTML = ''; 
        page = this.getAttribute('href');
        thisApp.activatePage(page);

      });
      let ad = navLink.getAttribute('href');
      thisApp.possiblePages.push(ad);
    }

    const wrongPages = thisApp.possiblePages.indexOf(pageHash);

    if (pageHash == '' || wrongPages == -1){
      const page = '#' + settings.pages.startPage;
      thisApp.activatePage(page);
    }
  },
  
  initSongs(){
    const thisApp = this;

    for(let song in thisApp.data.songs){
      new Song(thisApp.data.songs[song]);
    }
    utils.initGap(); 
  },

  initSearch(){
    const thisApp = this;
    new SearchWidget(thisApp.data);
  },

  activatePage: function(pageId){
    const thisApp = this;


    for(let navLink of thisApp.possiblePages){
      navLink = navLink.replace('#','.');
      const pages = document.querySelector(select.pages.section + navLink);
      if(!pages.classList.contains(className.pages.active)){
        pages.classList.add(className.pages.active);
      }  
    }
    
    window.location.hash = pageId;

    if(pageId == '#home'){
      thisApp.initSongs(); 
    } else if (pageId == '#discovery'){
      thisApp.randomSong();
    }

    pageId = pageId.replace('#','.');

    const active = document.querySelector(select.pages.section + pageId);
    active.classList.remove(className.pages.active);  
  },

  initData: function(){
    const thisApp = this;

    const connectDb = settings.db.url + '/' + settings.db.songs;
    thisApp.data = {};

    fetch(connectDb)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parseResponse){
        thisApp.data.songs = parseResponse;
      });
  },

  randomSong(){
    const thisApp = this;
    const songsNumber = thisApp.data.songs.length;
    const random = Math.floor(Math.random() * songsNumber);
    new Song(thisApp.data.songs[random]);
    utils.initGap();
  },

  init: function(){
    const thisApp = this;
    
    thisApp.initData();
    thisApp.initPage();
    thisApp.initSearch(thisApp.data);

  }
};

app.init();