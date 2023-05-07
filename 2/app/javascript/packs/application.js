// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//= require jquery
//= require jquery_ujs
//= require cocoon
//= require_tree .

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")



require('jquery')
import "cocoon";

$('#container').on('cocoon:before-insert', function(event, insertedItem) {
    var confirmation = confirm("Are you sure?");
    if( confirmation === false ){
      event.preventDefault();
    }
  });
  


