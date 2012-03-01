list = []
list_votes = []
question = ''
YES_KEY = 89
NO_KEY = 78
UNDO_KEY = 85
item_index = 0
question_div = $('#question')
answer_div = $('#answer')
item = $('#item')
undo = $('#undo')
yes_area = $('#yes_area')
no_area = $('#no_area')
question_input = $('#question_input')
question_action = $('#question_action')

$('#list_action').live 'click', (event) ->
	# populate the list array and remove leading and trailing empty results
	list = $('#list_area').attr('value').replace( /^\s+|\s+$/g, "").split('\n')
	
	# transition to the question stage
	$('#list').hide()
	question_div.fadeIn('fast')
	
question_action.live 'click', (event) ->
	# assign the question
	question = question_input.attr('value')
	$('.question').html(question)
	
	# transition to the answering stage
	item.html(list[item_index])
	question_div.hide()
	answer_div.fadeIn('fast')

$('.answer').live 'click', (event) ->
	check_action(this)
	
	# show undo button if not on the first item
	undo.fadeIn('fast') if item_index >= 0
	
	# display the results when done
	if (item_index >= list.length - 1) # done
		answer_div.hide()
		$('#results').fadeIn('fast')
	else
		item_index += 1
		
		# remove empty items from the list before displaying next
		while list[item_index].replace( /^\s+|\s+$/g, "") is ''
			list.splice(item_index, 1)
			
		# show the next item
		item.html(list[item_index])

# store votes based on action clicked and add to right text area
check_action = (action) ->
	if action.id is 'yes_action'
		list_votes[item_index] = 'yes'
		yes_area.append(list[item_index] + '\n')
	else if action.id is 'no_action'
		list_votes[item_index] = 'no'
		no_area.append(list[item_index] + '\n')
	else
		# resets to the previous item for re-answering
		undo.hide() if item_index == 1
		item_index -= 1
		if list_votes[item_index] is 'yes'
			remove_last_item(yes_area)
		else
			remove_last_item(no_area)
		item_index -= 1

# removes the last item from the specified text area
remove_last_item = (area) ->
	val = area.attr('value').replace( /^\s+|\s+$/g, "").split('\n')
	val.splice(val.length-1, 1)
	area.html(val.join('\n'))

	
# shortcut listener
$(document).live 'keyup', (event) ->
	if(answer_div.css('display') != 'none')
		switch event.keyCode
			when YES_KEY then $('#yes_action').trigger('click')
			when NO_KEY then $('#no_action').trigger('click')
			when UNDO_KEY then undo.trigger('click') if undo.css('display') != 'none'

# allows using the enter key to submit the question			
question_input.live 'keydown', (event) ->
	if event.keyCode is 13
		question_action.trigger('click')
		