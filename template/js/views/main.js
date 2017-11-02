$(function () {
  'use strict';

  toastr.info('Bootstrap 4 on steroids', 'Welcome to Root Admin', {
    closeButton: true,
    progressBar: true,
  });

  //convert Hex to RGBA
  function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
  }


  //Random Numbers
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

});
