function registerUser() {
	$('.register').on('submit', function(event) {
		event.preventDefault();
		let firstName = $('#firstName').val();
		let lastName = $('#lastName').val();
		let username = $('#regName').val();
		let password = $('#regPassword').val();
		const credentials = {
			username,
			password,
			firstName,
			lastName
		}
		$.ajax({
			url:'http://localhost:8080/api/users', 
			type: 'POST',
			data:JSON.stringify(credentials),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function(user) {
  			console.log(user);
  		}
  	})	
  })
};

function loginUser() {
	$('.login').on('submit', function(event) {
		event.preventDefault();
		let username = $('#loginUser').val();
		let password = $('#loginPassword').val();
		const credentials = {
			username,
			password
		}
		$.ajax({
			url:'http://localhost:8080/api/auth/login', 
			type: 'POST',
			data:JSON.stringify(credentials),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function(response) {
  			const {authToken} = response;
  			localStorage.setItem('username', username);
  			localStorage.setItem('token', authToken);
  		}
  	})	
  })
};

function accessProtectedEndpoint() {
	$('.protected').on('submit', function(event) {
		event.preventDefault();
		const authToken = localStorage.getItem('token');
		$.ajax({
			url:'http://localhost:8080/api/protected', 
			type: 'GET',
			headers: {
    		'Content-Type': 'application/json',
    		Authorization: `Bearer ${authToken}`
  		},
  		success: function(user) {
  			console.log(user);
  		}
  	})	
  })
};

function logout() {
	$('.logout').on('submit', function() {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
	})
}

$(function () {
	registerUser();
	loginUser();
	accessProtectedEndpoint();
	logout();
});