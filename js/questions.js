(function() {
  var NO_KEY, UNDO_KEY, YES_KEY, check_action, item_index, list, list_votes, question, remove_last_item;

  list = [];

  list_votes = [];

  question = '';

  YES_KEY = 89;

  NO_KEY = 78;

  UNDO_KEY = 85;

  item_index = 0;

  $('#list_action').live('click', function(event) {
    list = $('#list_area').attr('value').replace(/^\s+|\s+$/g, "").split('\n');
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
    check_action(this);
    if (item_index >= 0) $('#undo').fadeIn('fast');
    if (item_index >= list.length - 1) {
      $('#answer').hide();
      return $('#results').fadeIn('fast');
    } else {
      item_index += 1;
      while (list[item_index].replace(/^\s+|\s+$/g, "") === '') {
        list.splice(item_index, 1);
      }
      return $('#item').html(list[item_index]);
    }
  });

  check_action = function(action) {
    if (action.id === 'yes_action') {
      list_votes[item_index] = 'yes';
      return $('#yes_area').append(list[item_index] + '\n');
    } else if (action.id === 'no_action') {
      list_votes[item_index] = 'no';
      return $('#no_area').append(list[item_index] + '\n');
    } else {
      if (item_index === 1) $('#undo').hide();
      item_index -= 1;
      if (list_votes[item_index] === 'yes') {
        remove_last_item('#yes_area');
      } else {
        remove_last_item('#no_area');
      }
      return item_index -= 1;
    }
  };

  remove_last_item = function(area) {
    var val;
    val = $(area).attr('value').split('\n');
    val.splice(val.length - 1, 1);
    return $(area).html(val.join());
  };

  $(document).live('keyup', function(event) {
    if ($('#answer').css('display') !== 'none') {
      switch (event.keyCode) {
        case YES_KEY:
          return $('#yes_action').trigger('click');
        case NO_KEY:
          return $('#no_action').trigger('click');
        case UNDO_KEY:
          if ($('#undo').css('display') !== 'none') {
            return $('#undo').trigger('click');
          }
      }
    }
  });

  $('#question_input').live('keydown', function(event) {
    if (event.keyCode === 13) return $('#question_action').trigger('click');
  });

}).call(this);
