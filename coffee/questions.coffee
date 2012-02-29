list = []
list_votes = []
question = ''
YES_KEY = 89
NO_KEY = 78
UNDO_KEY = 85
item_index = 0

$('#list_action').live 'click', (event) ->
	# populate the list array and remove leading and trailing empty results
	list = $('#list_area').attr('value').replace( /^\s+|\s+$/g, "").split('\n')
	
	# transition to the question stage
	$('#list').hide()
	$('#question').fadeIn('fast')
	
$('#question_action').live 'click', (event) ->
	# assign the question
	question = $('#question_input').attr('value')
	$('.question').html(question)
	
	# transition to the answering stage
	$('#item').html(list[item_index])
	$('#question').hide()
	$('#answer').fadeIn('fast')



$('.answer').live 'click', (event) ->
	# store votes based on action clicked
	if this.id is 'yes_action'
		list_votes[item_index] = 'yes'
	else if this.id is 'no_action'
		list_votes[item_index] = 'no'
	else
		# resets to the previous item for re-answering
		$('#undo').hide() if item_index == 1
		item_index -= 2
	
	# show undo button if not on the first item
	$('#undo').fadeIn('fast') if item_index >= 0
	
	# tally and display the results when done
	if (item_index >= list.length - 1) # done
		tally_results()
		$('#answer').hide()
		$('#results').fadeIn('fast')
	else
		item_index += 1
		
		# remove empty items from the list before displaying next
		while list[item_index].replace( /^\s+|\s+$/g, "") is ''
			list.splice(item_index, 1)
			
		# show the next item
		$('#item').html(list[item_index])

# add each item to the appropriate list based on it's vote
tally_results = () ->
	i = 0
	while i < list.length
		if list_votes[i] is 'yes'
			$('#yes_area').append(list[i] + '\n')
		else
			$('#no_area').append(list[i] + '\n')
		i += 1
	
# shortcut listener
$(document).live 'keyup', (event) ->
	if($('#answer').css('display') != 'none')
		switch event.keyCode
			when YES_KEY then $('#yes_action').trigger('click')
			when NO_KEY then $('#no_action').trigger('click')
			when UNDO_KEY then $('#undo').trigger('click') if $('#undo').css('display') != 'none'

# allows using the enter key to submit the question			
$('#question_input').live 'keydown', (event) ->
	if event.keyCode is 13
		$('#question_action').trigger('click')
		