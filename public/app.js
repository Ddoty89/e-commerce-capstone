function callToBackEnd() {
	$('#register').on('submit', function(event) {
		event.preventDefault();
		let userName = $('#regName').val();
		let password = $('#regPassword').val();
		console.log(userName, password)
		$.ajax({
			url:'http://localhost:8080/api/users/', 
			type: 'POST',
			dataType: 'json',
			data:JSON.stringify({
				userName,
				password
			}),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function() {
        console.log('successful add to database')
  		}
  	})	
  })
};

$(function () {
	callToBackEnd();
});