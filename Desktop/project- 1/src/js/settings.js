export const select = {
  templateOf: {
    player: '#template-player',
  },
  containerOf: {
    pages: '.navigation ol',
    music: '.music',
  },
  nav: {
    links: '.navigation a',
  },
  pages: {
    section: 'section',
  },
  form: {
    input: 'input',
    button: '.search-form button',
    found: '.found span',
  }
};

export const className = {
  pages: {
    active: 'disable-view',
  },
  nav: {
    active: 'active-link',
  }
};

export const settings = {
  pages: {
    startPage: 'home',
  },
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  }
};

export const templates = {
  player : Handlebars.compile(document.querySelector(select.templateOf.player).innerHTML),
};
