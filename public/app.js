function registerUser() {
	$('.register').on('submit', () => {
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
	$('.login').on('submit', () => {
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
	$('.protected').on('submit', () => {
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
	$('.logout').on('submit', () => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
	})
}

function postingItem() {
	const username = localStorage.getItem('username');
	$('.user').text(username);
	$('.uploadProduct').on('submit', () => {
		event.preventDefault();
		const itemName = $('#itemName').val();
    const productType = $('#productType').val();
    const productValue = $('#productValue').val();
    const condition = $('#condition').val();
    const description = $('#description').val();
		const product = {
		username,
		item: [{
	    itemName,
  	  productType,
    	productValue,
  	  condition,
    	description
    	}]
  	}
		$.ajax({
			url:'http://localhost:8080/api/products/used', 
			type: 'POST',
			data:JSON.stringify(product),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function(item) {
  			console.log(item);
  		}
  	})	
	})

}

$(function () {
	registerUser();
	loginUser();
	accessProtectedEndpoint();
	logout();
	postingItem();
});