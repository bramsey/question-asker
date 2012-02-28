list = []
question = ''
item_index = 0

$('#list_action').live 'click', (event) ->
	list = $('#list_area').attr('value').split('\n')
	$('#list').hide()
	$('#question').fadeIn('fast')
	
$('#question_action').live 'click', (event) ->
	question = $('#question_input').attr('value')
	$('.question').html(question)
	$('#item').html(list[item_index])
	$('#question').hide()
	$('#answer').fadeIn('fast')



$('.answer').live 'click', (event) ->
	switch this.value
		when 'Yes' then $('#yes_area').append(list[item_index] + '\n')
		else $('#no_area').append(list[item_index] + '\n')
	
	if (item_index >= list.length - 1) # done
		$('#answer').hide()
		$('#results').fadeIn('fast')
	else
		item_index += 1
		$('#item').html(list[item_index])
		