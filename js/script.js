window.addEventListener('DOMContentLoaded', () => {

    const timer = require('./modules/timer'),
          modal = require('./modules/modal'),
          tabs = require('./modules/tabs'),
          slider = require('./modules/slider'),
          forms = require('./modules/forms'),
          cars = require('./modules/cards'),
          calc = require('./modules/calc');
    
    timer();
    modal();
    tabs();
    slider();
    forms();
    cars();
    calc();
    
});