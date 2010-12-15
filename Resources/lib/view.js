$(function() {

      $('img#diagram').css({display:'none'}).load(function() {
                                                      $('#loader').remove();
                                                      $(this).show();
                    });

  });