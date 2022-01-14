'use strict';
{
  const templates = {
    bookView: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const select = {
    containerOf: {
      filterWrapper: '.filters',
    }
  };

  const rating = {
    colour: {
      default: '#c7c5c5',
      colour6: '#fefcea',
      colour8: '#b4df5b',
      colour9: '#299a0b',
      colour10: '#ff0084'
    }
  };
  class BooksList{
    constructor(){
      const thisBooksList = this;
      thisBooksList.readBooks();
      thisBooksList.initAction();
      thisBooksList.favoritesBooks = [];
      
    }
    //read and view books
    readBooks(){
      const books = dataSource.books;
      for(let book of books){
        const ratingSize = parseInt(book.rating * 10);
        let ratingColour = rating.colour.default;
        switch (true){
        case (ratingSize <= 60):
          ratingColour = rating.colour.colour6;
          break;
        case (ratingSize > 60 && ratingSize <=80):
          ratingColour = rating.colour.colour8;
          break;
        case (ratingSize > 80 && ratingSize <=90):
          ratingColour = rating.colour.colour9;
          break;
        case (ratingSize > 90 && ratingSize <=100):
          ratingColour = rating.colour.colour10;
          break;
        }

        book.ratingColour = ratingColour;
        book.defaultColour = rating.colour.default;
        book.ratingSize = ratingSize;

        const generatedHtml = templates.bookView(book);
        const createDOM = utils.createDOMFromHTML(generatedHtml);
        const bookContainer = document.querySelector('.books-list');
        bookContainer.appendChild(createDOM);    
      }
    }
    

    // add,remove favorite class to image
    favoriteClass(){
      const classFavorites = document.querySelectorAll('a.favorite');
      for(let classFavorite of classFavorites){
        classFavorite.classList.remove('favorite');
      }
    
      this.favoritesBooks.forEach(function(item){
        const favoriteClass = document.querySelector('a[data-id="' + item +'"]');
        favoriteClass.classList.add('favorite');
      }); 
    }

    //init dblclick to image
    initAction(){
      const thisBooksList = this;
      const imagePlaces = document.querySelector('.books-list');
      
      imagePlaces.addEventListener('dblclick', function(event){
        event.preventDefault();
        
        const link = event.target.offsetParent;
        
        if(link.classList.contains('book__image')){
          const bookId = link.getAttribute('data-id');
          thisBooksList.favorites(bookId);
        }  
      });

      const filterPlace = document.querySelector(select.containerOf.filterWrapper);

      filterPlace.addEventListener('click', function(event){
        const clickElement = event.target;
        if(clickElement.tagName == 'INPUT' && clickElement.type == 'checkbox' && clickElement.name == 'filter'){
          const adults = document.querySelector('input[value = "adults"]').checked;
          const nonfiction = document.querySelector('input[value = "nonFiction"]').checked;
          thisBooksList.filter(adults, nonfiction);
        }
      });
    }

    //add, remove to favorites 
    favorites(id){
      const thisBooksList = this;
      if (thisBooksList.favoritesBooks.indexOf(id) == -1){
        thisBooksList.favoritesBooks.push(id);
        thisBooksList.favoriteClass();
      } else {
        const bookPosition = this.favoritesBooks.indexOf(id);
        thisBooksList.favoritesBooks.splice(bookPosition,1);
        thisBooksList.favoriteClass();
      } 
    }
    //filters
    filter(adults, nonFiction){
      const books = dataSource.books;
      const allEnables = document.querySelectorAll('.book__image');

      for(let allEnable of allEnables){
        allEnable.classList.remove('hidden');
      }
      if(adults == true){
        for(let book of books){
          if(book.details.adults == true){
            const id = book.id;
            const element = document.querySelector('.book__image[data-id="'+id+'"]');
            element.classList.add('hidden');
          }
        }
      } 
      if(nonFiction == true){
        for(let book of books){
          if(book.details.nonFiction == true){
            const id = book.id;
            const element = document.querySelector('.book__image[data-id="'+id+'"]');
            element.classList.add('hidden');
          }
        }
      }       
    }
  }
  // eslint-disable-next-line no-unused-vars
  const app = new BooksList();
}