const App = {
  init() {
    this.handlers();
  },

  handlers() {
    $('body').on('click', function() { App.onClick(this); });
  },

  onClick(el) {
    console.log('Click', el);
  }
};

$(document).ready(() => {
  App.init();
});
