jQuery_T4NT(document).ready(function($) {
  
});

jQuery( document ).ready(function() {
  var dev = jQuery(document).width();
  var con_width = jQuery('.container').width();
  var total =  dev - con_width;
  var div =  (total/2 + 4)+'px';
  jQuery('#bk_16172601471ae3bff4-2').css('left', div);

  //jQuery("#mb_nav_header_close").addClass("act_current");
  
});


jQuery( window ).resize(function() {
  var dev = jQuery(document).width();
  var con_width = jQuery('.container').width();
  var total =  dev - con_width;
  var div =  (total/2 + 4)+'px';
  jQuery('#bk_16172601471ae3bff4-2').css('left', div);
});




var acc = document.getElementsByClassName("size-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


