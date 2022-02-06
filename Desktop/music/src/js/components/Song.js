import {  select, templates } from '../settings.js';
import utils from '../utils.js';


class Song{
  constructor(data){
    const thisSong = this;

    thisSong.data = data;
    
    thisSong.songInfo();
    thisSong.renderView();   
  }

  renderView(){
    const thisSong = this;
    
    const generatedHtml = templates.player(thisSong.info);
    thisSong.element = utils.createDOMFromHTML(generatedHtml);
    
    const container = document.querySelector(select.containerOf.music);    
    container.appendChild(thisSong.element);
  }

  songInfo(){
    const thisSong = this;
    
    //find author form filename
    let title = thisSong.data.title;
    let author = thisSong.data.filename;
    
    const regEx = new RegExp(title,'ig');

    author = utils.createTextFromFilename(author);
    author = author.replaceAll(regEx,'');
    author = author.trim();
    //end find author

    thisSong.info = {};
    thisSong.info.source = thisSong.data.filename;
    thisSong.info.author = author;
    thisSong.info.title = title;
    thisSong.info.categories = thisSong.data.categories;
    thisSong.info.ranking = thisSong.data.ranking;
  }
  
}

export default Song;