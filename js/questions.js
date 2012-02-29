(function() {
  var NO_KEY, UNDO_KEY, YES_KEY, item_index, list, list_votes, question, tally_results;

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
    if (this.id === 'yes_action') {
      list_votes[item_index] = 'yes';
    } else if (this.id === 'no_action') {
      list_votes[item_index] = 'no';
    } else {
      if (item_index === 1) $('#undo').hide();
      item_index -= 2;
    }
    if (item_index >= 0) $('#undo').fadeIn('fast');
    if (item_index >= list.length - 1) {
      tally_results();
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

  tally_results = function() {
    var i, _results;
    i = 0;
    _results = [];
    while (i < list.length) {
      if (list_votes[i] === 'yes') {
        $('#yes_area').append(list[i] + '\n');
      } else {
        $('#no_area').append(list[i] + '\n');
      }
      _results.push(i += 1);
    }
    return _results;
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
