(function() {
  var item_index, list, question;

  list = [];

  question = '';

  item_index = 0;

  $('#list_action').live('click', function(event) {
    list = $('#list_area').attr('value').split('\n');
    $('#list').hide();
    return $('#question').fadeIn('fast');
  });

  $('#question_action').live('click', function(event) {
    question = $('#question_input').attr('value');
    $('.question').html(question);
    $('#item').html(list[item_index]);
    $('#question').hide();
    return $('#answer').fadeIn('fast');
  });

  $('.answer').live('click', function(event) {
    switch (this.id) {
      case 'yes_action':
        $('#yes_area').append(list[item_index] + '\n');
        break;
      default:
        $('#no_area').append(list[item_index] + '\n');
    }
    if (item_index >= list.length - 1) {
      $('#answer').hide();
      return $('#results').fadeIn('fast');
    } else {
      item_index += 1;
      return $('#item').html(list[item_index]);
    }
  });

  $(document).live('keyup', function(event) {
    if ($('#answer').css('display') !== 'none') {
      switch (event.keyCode) {
        case 89:
          return $('#yes_action').trigger('click');
        case 78:
          return $('#no_action').trigger('click');
      }
    }
  });

  $('#question_input').live('keydown', function(event) {
    if (event.keyCode === 13) return $('#question_action').trigger('click');
  });

}).call(this);
