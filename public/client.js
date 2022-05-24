// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $.get('/tags', function(tags) {
    tags.forEach(function(tag) {
      $('<li></li>').text(tag[0] + " " + tag[1]).appendTo('ul#tags');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var Tag = $('input#Tag').val();
    var Value = $('input#Value').val();
    $.post('/tags?' + $.param({Tag:Tag, Value:Value}), function() {
      $('<li></li>').text(Tag + " " + Value).appendTo('ul#tags');
      $('input#Tag').val('');
      $('input#Value').val('');
      $('input').focus();
    });
  });
});
