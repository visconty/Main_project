class App {

  constructor() {}

  init() {
    this.handlers();
  }

  handlers() {
    const self = this;
    $('body').on('click', function() {
      self.onClick(this);
    });
  }

  onClick(el) {
    console.log('Click', el);
    let test_1 = 1;
  }
}

$(document).ready(() => {
  new App().init();
});
