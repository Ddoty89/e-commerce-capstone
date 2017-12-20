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

function postUsedItem() {
	const username = localStorage.getItem('username');
	$('.user').text(username);
	$('.uploadProduct').on('submit', () => {
		event.preventDefault();
		const itemName = $('#itemName').val();
    const productType = $('#productType').val();
    const productValue = $('#productValue').val();
    const condition = $('#condition').val();
		const product = {
			username,
  	  itemName,
		  productType,
  		productValue,
		  condition
  	}
		$.ajax({
			url:'http://localhost:8080/api/products/used', 
			type: 'POST',
			data:JSON.stringify(product),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function(response) {
  			console.log(response);
     	}
  	})	
	})
}

function postNewItem() {
	$('.newItemInput').on('submit', () => {
		event.preventDefault();
		const newImage = $('#newImage').val();
		const newName = $('#newName').val();
    const newType = $('#newType').val();
    const newPrice = $('#newPrice').val();
    const newURL = $('#newURL').val();
		const newProduct = {
			newImage,
  	  newName,
		  newType,
			newPrice,
  		newURL
  	}
		$.ajax({
			url:'http://localhost:8080/api/products/new', 
			type: 'POST',
			data:JSON.stringify(newProduct),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function(response) {
  			$(addNewItem)
     	}
  	})	
	})
}

$(function () {
	registerUser();
	loginUser();
	accessProtectedEndpoint();
	logout();
	postUsedItem();
	postNewItem();
});