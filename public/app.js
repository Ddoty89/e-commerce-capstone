const state = {
	productType: '',
	condition: '',
	currentImageValue: '',
	filterSystem: [
		{
			Television: {
				checked: false
			}
		},
		{
			Phone: {
				checked: false
			}
		},
		{
			"Wired Head Phones": {
				checked: false
			}
		},
		{
			"Wireless Head Phones": {
				checked: false
			}
		},
		{
			Speakers: {
				checked: false
			}
		},
		{
			"Desktop Computer": {
				checked: false
			}
		},
		{
			"Laptop Computer": {
				checked: false
			}
		},
		{
			Drone: {
				checked: false
			}
		},
		{
			Other: {
				checked: false
			}
		},
		{
			"1500+": {
				checked: false
			}
		},
		{
			"500-1500": {
				checked: false
			}
		},
		{
			"200-500": {
				checked: false
			}
		},
		{
			"100-200": {
				checked: false
			}
		},
		{
			"50-100": {
				checked: false
			}
		},
		{
			"Less than 50": {
				checked: false
			}
		},
	]
}

function registerUser() {
	$('.register').on('submit', () => {
		event.preventDefault();
		let firstName = $('#firstName').val();
		let lastName = $('#lastName').val();
		let email = $('#userEmail').val();
		let username = $('#regName').val();
		let password = $('#regPassword').val();
		const credentials = {
			username,
			password,
			email,
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
				$('#firstName').val("");
				$('#lastName').val("");
				$('#userEmail').val("");
				$('#regName').val("");
				$('#regPassword').val("");
  		}
  	})	
  })
};

function loginUser() {
	$('.login').on('submit', () => {
		event.preventDefault();
		let username = $('#loginUser').val();
		let password = $('#loginPassword').val();
		$('.currentUser').text(username);
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
  			$('#loginUser').val("");
				$('#loginPassword').val("");
				window.location.replace('http://localhost:8080/newItem.html');
				$('.loginPage').addClass('hidden');
				$('.registerPage').addClass('hidden');
  		},
  		error: function(XMLHttpRequest, textStatus, errorThrown) { 
      	alert('Please use valid credentials to login or register as a user'); 
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
		localStorage.removeItem('email');
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
  			console.log(response);
			}
  	})	
	})
}

function navToNewItemPage() {
	$('.newItemPage').on('submit', () => {
		event.preventDefault();
	})
}

function getNewProductApiData(callback) {
	$.ajax({
		url:'http://localhost:8080/api/products/new',
		type:'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response) {
			getNewProductData(response);
		}
	})
}

function getNewProductData(data) {
	const result = data.newproducts.map(item => renderNewProductResults(item));
	$('.addNewItem').append(result);
}

function renderNewProductResults(results) {
	return(
		`<li>
	    <img class='productImage' src='${results.newImage}'/>
      <p class='productName'>${results.newName}</p>
      <p class='productType'>${results.newType}</p>
      <p class='productPrice'>${results.newPrice}</p>
      <button class='linkToPurchase'><a href='${results.newURL}' target='blank'>Purchase Item</a></button>
      <button class='saveItem'>Save</button>
    </li>`
   )
}

function postUsedItem() {
	const username = localStorage.getItem('username');
	$('.currentUser').text(username);
	$('.uploadProduct').on('submit', () => {
		event.preventDefault();
		const itemName = $('#itemName').val();
    const productValue = $('#productValue').val();
    const description = $('#description').val();
    const productType = state.productType;
    const condition = state.condition;
    const image = state.currentImageValue;
    const email = localStorage.getItem('email');
		const product = {
			username,
  	  itemName,
			productType,
  		productValue,
		  condition,
		  description,
		  image,
		  email
  	}
		$.ajax({
			url:'http://localhost:8080/api/products/used', 
			type: 'POST',
			data:JSON.stringify(product),
			headers: {
    		'Content-Type': 'application/json'
  		},
  		success: function(response) {
				$('#itemName').val("");
				$('#productValue').val("");
				$('#description').val("");
		    $('.productTypeMenu').val("");
		    $('.conditionMenu').val("");
     	}
  	})	
	})
}

function dropDownProductType() {
	$('.productTypeMenu').change(function() {
  	state.productType = $('.productTypeMenu option:selected').val();
  })
}

function dropDownCondition() {
	$('.conditionMenu').change(function() {
  	state.condition = $('.conditionMenu option:selected').val();
  })
}


function getUsedItemImage() {
	$('.usedImg').click(function() {
		state.currentImageValue = $(this).attr("src");
	})
}

function navToUsedItemPage() {
	$('.usedItemPage').on('submit', () => {
		event.preventDefault();
	})
}

function getUsedProductApiData(callback) {
	$.ajax({
		url:'http://localhost:8080/api/products/used',
		type:'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response) {
			getUsedProductData(response);
			userAccountData(response)
		}
	})
}

function getUserData() {
	$.ajax({
		url:'http://localhost:8080/api/users/',
		type:'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response) {
			sortUserData(response)
		}
	})
}

function sortUserData(data) {
	//need to check if user is being used to post a used item and then I can include their email on that one
	for(let i = 0; i < data.length; i++) {
		if(localStorage.getItem('username') === data[i].username) {
			localStorage.setItem('email', data[i].email);
		}
	}
}

function getUsedProductData(data) {
	const result = data.usedproduct.map(item => renderUsedProductResults(item));
	$('.addUsedItem').append(result);
}

function userAccountData(data) {
	const username = localStorage.getItem('username');
	for(let i = 0; i < data.usedproduct.length; i++){
		if(data.usedproduct[i].username === username) {
			$('.userUsedItem').append(renderUsedProductResults(data.usedproduct[i]));
		}
	}
}

function renderUsedProductResults(results) {
	return(
		`<li>
			<img class='usedImg' src='${results.image}'/>
	    <p class='usedProductUsername'>${results.username}</p>
      <p class='usedProductName'>${results.itemName}</p>
      <p class='usedProductType'>${results.productType}</p>
      <p class='usedProductValue'>${results.productValue}</p>
			<p class='usedProductCondition'>${results.condition}</p>
			<p class='usedProductDescription'>${results.description}</p>
      <button class='saveItem'>Save</button>
      <button class='contactUser'><a href="mailto:${results.email}">Contact User</a></button>
    </li>`
  )
}

function navBar() {
	if(localStorage.getItem('username').length !== null) {
		$('.loginPage').addClass('hidden');
		$('.registerPage').addClass('hidden');
		$('.currentUser').removeClass('hidden');
		$('.logout').removeClass('hidden');
	}
}

// console.log(typeof Object.keys(state.filterSystem[0])[0])

function newSideFilters() {
	$('.newInitiatefilters').click(function() {
		const searchFilters =[];
			if(state.filterSystem[0].Television.checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[0])[0])
			}
			if(state.filterSystem[1].Phone.checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[1])[0])
			}
			if(state.filterSystem[2]["Wired Head Phones"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[2])[0])
			}
			if(state.filterSystem[3]["Wireless Head Phones"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[3])[0])
			}
			if(state.filterSystem[4].Speakers.checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[4])[0])
			}
			if(state.filterSystem[5]["Desktop Computer"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[5])[0])
			}
			if(state.filterSystem[6]["Laptop Computer"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[6])[0])
			}
			if(state.filterSystem[7].Drone.checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[7])[0])
			}
			if(state.filterSystem[8].Other.checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[8])[0])
			}
			if(state.filterSystem[9]["1500+"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[9])[0])
			}
			if(state.filterSystem[10]["500-1500"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[10])[0])
			}
			if(state.filterSystem[11]["200-500"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[11])[0])
			}
			if(state.filterSystem[12]["100-200"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[12])[0])
			}
			if(state.filterSystem[13]["50-100"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[13])[0])
			}
			if(state.filterSystem[14]["Less than 50"].checked === 1) {
				searchFilters.push(Object.keys(state.filterSystem[14])[0])
			}
			console.log(searchFilters)
	})
}

function filterCategories() {
	$('.newTv').html(`
		<input class='newTvCheck' id='tv' type='checkbox' name='select'/>
		<label id='newTv' for='tv'>${Object.keys(state.filterSystem[0])}</label>`
	)
	$('.newTv').change(function() {
		state.filterSystem[0].Television.checked ^= true;
	})
	$('.newPhone').html(`
		<input class='newPhoneCheck' id='phone' type='checkbox' name='select'/>
		<label id='newPhone' for='phone'>${Object.keys(state.filterSystem[1])}</label>`
	)
	$('.newPhone').change(function() {
		state.filterSystem[1].Phone.checked ^= true;
	})
	$('.newWHeadPhones').html(`
		<input class='newWHeadPhonesCheck' id='wHeadPhones' type='checkbox' name='select'/>
		<label id='newWHeadPhones' for='wHeadPhones'>${Object.keys(state.filterSystem[2])}</label>`
	)
	$('.newWHeadPhones').change(function() {
		state.filterSystem[2]['Wired Head Phones'].checked ^= true;
	})
	$('.newWLHeadPhones').html(`
		<input class='newWLHeadPhonesCheck' id='wLHeadPhones' type='checkbox' name='select'/>
		<label id='newWLHeadPhones' for='wLHeadPhones'>${Object.keys(state.filterSystem[3])}</label>`
	)
	$('.newWLHeadPhones').change(function() {
		state.filterSystem[3]['Wireless Head Phones'].checked ^= true;
	})
	$('.newSpeakers').html(`
		<input class='newSpeakersCheck' id='speakers' type='checkbox' name='select'/>
		<label id='newSpeakers' for='speakers'>${Object.keys(state.filterSystem[4])}</label>`
	)
	$('.newSpeakers').change(function() {
		state.filterSystem[4].Speakers.checked ^= true;
	})
	$('.newDComputer').html(`
		<input class='newDComputerCheck' id='dComputer' type='checkbox' name='select'/>
		<label id='newDComputer' for='dComputer'>${Object.keys(state.filterSystem[5])}</label>`
	)
	$('.newDComputer').change(function() {
		state.filterSystem[5]['Desktop Computer'].checked ^= true;
	})
	$('.newLComputer').html(`
		<input class='newLComputerCheck' id='lComputer' type='checkbox' name='select'/>
		<label id='newLComputer' for='lComputer'>${Object.keys(state.filterSystem[6])}</label>`
	)
	$('.newLComputer').change(function() {
		state.filterSystem[6]['Laptop Computer'].checked ^= true;
	})
	$('.newDrone').html(`
		<input class='newDroneCheck' id='drone' type='checkbox' name='select'/>
		<label id='newDrone' for='drone'>${Object.keys(state.filterSystem[7])}</label>`
	)
	$('.newDrone').change(function() {
		state.filterSystem[7].Drone.checked ^= true;
	})
	$('.newOther').html(`
		<input class='newOtherCheck' id='other' type='checkbox' name='select'/>
		<label id='newOther' for='other'>${Object.keys(state.filterSystem[8])}</label>`
	)
	$('.newOther').change(function() {
		state.filterSystem[8].Other.checked ^= true;
	})
	$('.1500+').html(`
		<input class='newFiftenHundred+' id='1500' type='checkbox' name='select'/>
		<label id='1500+' for='1500'>${Object.keys(state.filterSystem[9])}</label>`
	)
	$('.1500+').change(function() {
		state.filterSystem[9]['1500+'].checked ^= true;
	})
	$('.500-1500').html(`
		<input class='newFiveHundred-fifteenHundred' id='500' type='checkbox' name='select'/>
		<label id='500-1500' for='500'>${Object.keys(state.filterSystem[10])}</label>`
	)
	$('.500-1500').change(function() {
		state.filterSystem[10]['500-1500'].checked ^= true;
	})
	$('.200-500').html(`
		<input class='newTwoHundred-fiveHundred' id='200' type='checkbox' name='select'/>
		<label id='newPriceFilter' for='200'>${Object.keys(state.filterSystem[11])}</label>`
	)
	$('.200-500').change(function() {
		state.filterSystem[11]['200-500'].checked ^= true;
	})
	$('.100-200').html(`
		<input class='newOneHundred-twoHundred' id='100' type='checkbox' name='select'/>
		<label id='100-200' for='100'>${Object.keys(state.filterSystem[12])}</label>`
	)
	$('.100-200').change(function() {
		state.filterSystem[12]['100-200'].checked ^= true;
	})
	$('.50-100').html(`
		<input class='newFifty-oneHundred' id='50' type='checkbox' name='select'/>
		<label id='50-100' for='50'>${Object.keys(state.filterSystem[13])}</label>`
	)
	$('.50-100').change(function() {
		state.filterSystem[13]['50-100'].checked ^= true;
	})
	$('.Less than 50').html(`
		<input class='newFifty-orLess' id='49.99' type='checkbox' name='select'/>
		<label id='Less than 50' for='49.99'>${Object.keys(state.filterSystem[14])}</label>`
	)
	$('.Less than 50').change(function() {
		state.filterSystem[14]['Less than 50'].checked ^= true;
	})
}


$(function () {
	registerUser();
	loginUser();
	accessProtectedEndpoint();
	logout();
	postUsedItem();
	dropDownProductType();
	dropDownCondition();
	getUsedItemImage();
	postNewItem();
	navToNewItemPage();
	getNewProductApiData();
	getUserData();
	navToUsedItemPage();
	getUsedProductApiData();
	navBar();
	newSideFilters();
	filterCategories();
});