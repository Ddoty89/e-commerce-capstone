const API_URL_BASE = 'http://mysterious-beyond-62346.herokuapp.com'

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
		}
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
			url:`${API_URL_BASE}/api/users`, 
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
			url:`${API_URL_BASE}/api/auth/login`, 
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
				window.location.replace(`${API_URL_BASE}/newItem.html`);
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
			url:`${API_URL_BASE}/api/protected`, 
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
	$('.logout').click(() => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		$('.loginPage').removeClass('hidden');
		$('.registerPage').removeClass('hidden');
		location.reload();
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
			url:`${API_URL_BASE}/api/products/new`, 
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
		url:`${API_URL_BASE}/api/products/new`,
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
			url:`${API_URL_BASE}/api/products/used`, 
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
		url:`${API_URL_BASE}/api/products/used`,
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
		url:`${API_URL_BASE}/api/users/`,
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
	if(localStorage.getItem('username') !== null) {
		$('.loginPage').addClass('hidden');
		$('.registerPage').addClass('hidden');
		$('.currentUser').removeClass('hidden');
		$('.logout').removeClass('hidden');
	}
}

function filterCategories() {
	$('.tv').html(`
		<input class='newTvCheck' id='tv' type='checkbox' name='select'/>
		<label id='newTv' for='tv'>${Object.keys(state.filterSystem[0])}</label>`
	)
	$('.tv').change(function() {
		state.filterSystem[0].Television.checked ^= true;
	})
	$('.phone').html(`
		<input class='newPhoneCheck' id='phone' type='checkbox' name='select'/>
		<label id='newPhone' for='phone'>${Object.keys(state.filterSystem[1])}</label>`
	)
	$('.phone').change(function() {
		state.filterSystem[1].Phone.checked ^= true;
	})
	$('.wHeadPhones').html(`
		<input class='newWHeadPhonesCheck' id='wHeadPhones' type='checkbox' name='select'/>
		<label id='newWHeadPhones' for='wHeadPhones'>${Object.keys(state.filterSystem[2])}</label>`
	)
	$('.wHeadPhones').change(function() {
		state.filterSystem[2]['Wired Head Phones'].checked ^= true;
	})
	$('.wLHeadPhones').html(`
		<input class='newWLHeadPhonesCheck' id='wLHeadPhones' type='checkbox' name='select'/>
		<label id='newWLHeadPhones' for='wLHeadPhones'>${Object.keys(state.filterSystem[3])}</label>`
	)
	$('.wLHeadPhones').change(function() {
		state.filterSystem[3]['Wireless Head Phones'].checked ^= true;
	})
	$('.speakers').html(`
		<input class='newSpeakersCheck' id='speakers' type='checkbox' name='select'/>
		<label id='newSpeakers' for='speakers'>${Object.keys(state.filterSystem[4])}</label>`
	)
	$('.speakers').change(function() {
		state.filterSystem[4].Speakers.checked ^= true;
	})
	$('.dComputer').html(`
		<input class='newDComputerCheck' id='dComputer' type='checkbox' name='select'/>
		<label id='newDComputer' for='dComputer'>${Object.keys(state.filterSystem[5])}</label>`
	)
	$('.dComputer').change(function() {
		state.filterSystem[5]['Desktop Computer'].checked ^= true;
	})
	$('.lComputer').html(`
		<input class='newLComputerCheck' id='lComputer' type='checkbox' name='select'/>
		<label id='newLComputer' for='lComputer'>${Object.keys(state.filterSystem[6])}</label>`
	)
	$('.lComputer').change(function() {
		state.filterSystem[6]['Laptop Computer'].checked ^= true;
	})
	$('.drone').html(`
		<input class='newDroneCheck' id='drone' type='checkbox' name='select'/>
		<label id='newDrone' for='drone'>${Object.keys(state.filterSystem[7])}</label>`
	)
	$('.drone').change(function() {
		state.filterSystem[7].Drone.checked ^= true;
	})
	$('.other').html(`
		<input class='newOtherCheck' id='other' type='checkbox' name='select'/>
		<label id='newOther' for='other'>${Object.keys(state.filterSystem[8])}</label>`
	)
	$('.other').change(function() {
		state.filterSystem[8].Other.checked ^= true;
	})
}

function newSideFilters() {
	$('.newInitiateFilters').click(function() {
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
			sortFilterForNewProducts(searchFilters)
	})
}

function sortFilterForNewProducts(searchParams) {
	$.ajax({
		url:`${API_URL_BASE}/api/products/new`,
		type:'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response) {
			$('.addNewItem').html('');
			const items = response.newproducts.map(item => item.newType);
			const indexOfSearched = searchParams.map(searched => items.indexOf(searched));
			const filtered = indexOfSearched.filter(num => num > -1);
			const itemToDisplay = filtered.map(num => items[num]);
			if(itemToDisplay.length > 0) {
				for(let i = 0; i < response.newproducts.length; i++) {
					for(let j = 0; j < itemToDisplay.length; j++) {
						if(response.newproducts[i].newType === itemToDisplay[j]) {
							$('.addNewItem').append(renderNewProductResults(response.newproducts[i]))
						}
					}
				}
			} else {
				$('.addNewItem').html(`<h2>Sorry there no products with your selected filters</h2`)
			}
		}
	})
}

function usedSideFilters() {
	$('.usedInitiateFilters').click(function() {
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
			sortFilterForUsedProducts(searchFilters)
	})
}

function sortFilterForUsedProducts(searchParams) {
	$.ajax({
		url:`${API_URL_BASE}/api/products/used`,
		type:'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response) {
			$('.addUsedItem').html('');
			const items = response.usedproduct.map(item => item.productType);
			const indexOfSearched = searchParams.map(searched => items.indexOf(searched));
			const filtered = indexOfSearched.filter(num => num > -1);
			const itemToDisplay = filtered.map(num => items[num]);
			if(itemToDisplay.length > 0) {
				for(let i = 0; i < response.usedproduct.length; i++) {
					for(let j = 0; j < itemToDisplay.length; j++) {
						if(response.usedproduct[i].productType === itemToDisplay[j]) {
							$('.addUsedItem').append(renderUsedProductResults(response.usedproduct[i]))
						}
					}
				}
			} else {
				$('.addUsedItem').html(`<h2>Sorry there no products with your selected filters</h2`)
			}
		}
	})
}

function startNewSearchButton() {
  	$('.startNewSearch').click(function(event) {
   		location.reload();
  	})
}

function changeUrl() {
	window.onload=function(){
  		$(function(){
    		if(window.location.protocol==="https:")
        	window.location.protocol="http";
    	});
 	}
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
	filterCategories();
	newSideFilters();
	usedSideFilters();
	startNewSearchButton();
	changeUrl();
});