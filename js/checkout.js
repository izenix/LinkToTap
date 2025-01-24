<<<<<<< HEAD
=======
function showLoading() {
	// Show the loading indicator
	document.getElementById('iloadingIndicator').style.display = 'block';
}

function hideLoading() {
	// Hide the loading indicator
	document.getElementById('iloadingIndicator').style.display = 'none';
}

//document.getElementById("customizeCardForm").addEventListener("submit", function (event) {
//	debugger;
//	event.preventDefault(); // Prevents traditional form submission
//	showLoading(); // Show the loading indicator when form is submitted

//	// Fetch form values
//	var name = document.getElementById("name").value;
//	var email = document.getElementById("email").value;
//	var phone = document.getElementById("phone").value;
//	var companyName = document.getElementById("companyName").value;
//	var address = document.getElementById("address").value;

//	//Gift Card Order Information
//	var nameGift = document.getElementById("nameGift").value;
//	var emailGift = document.getElementById("emailGift").value;
//	var phoneGift = document.getElementById("phoneGift").value;
//	var companyNameGift = document.getElementById("companyNameGift").value;
//	var addressGift = document.getElementById("addressGift").value;

//	var totalAmount = document.getElementById("totalAmount").textContent.trim().replace('Rs. ', '');

//	// Create a FormData object
//	var formData = new FormData();

//	// Append text data
//	var formData = {
//		name: name,
//		email: email,
//		phone: phone,
//		companyName: companyName,
//		slogan: slogan,
//		address: address,

//		nameGift: nameGift,
//		emailGift: emailGift,
//		phoneGift: phoneGift,
//		companyNameGift: companyNameGift,
//		sloganGift: sloganGift,
//		addressGift: addressGift,

//		totalAmount: totalAmount
//	};


//	// Validate required fields (example: name, email, phone)
//	if (!name || !email || !phone) {
//		alert("Please fill in all the required form details");
//		return;
//	} // Send the data

//	console.log("Form Data (Minimal):", JSON.stringify(formData));

//	submitTrigger(JSON.stringify(formData));
//});



//function submitTrigger(inputData) {
//	debugger;
//	var flowUrl = "https://prod-04.centralindia.logic.azure.com:443/workflows/27caaa6ed33046bd9381661e652e38a1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TQEqre6e0ki3S-NISzmvytxmOz24yU53fJu-C14_-qg";
//	const parsedData = JSON.parse(inputData);

//	const name = parsedData.name;
//	const email = parsedData.email;
//	const phone = parsedData.phone;

//	var req = new XMLHttpRequest();
//	req.open("POST", flowUrl, true);
//	req.setRequestHeader('Content-Type', 'application/json');

//	req.onreadystatechange = function () {
//		if (req.readyState == 4) {
//			if (req.status == 200) {

//				if (req.responseText) {
//					try {
//						// Parse the JSON response
//						const response = JSON.parse(req.responseText);

//						// Check if 'orderNumber' exists in the response
//						if (response.orderNumber) {
//							// Display the order number in an alert
//							/*alert("Order Number: " + response.orderNumber);*/

//							// Use new Date() to get the current date in ISO format (YYYY-MM-DD)
//							const currentDate = new Date().toISOString().split('T')[0];

//							// Example usage
//							const key = 'HeuOWr';
//							const txnid = response.orderNumber;
//							const amount = '999.00';
//							const productinfo = 'Digital Card 1000';
//							const firstname = name;
//							const lastname = '';
//							//const email = email;
//							//const phone = phone;
//							const salt = 'iPR07DaK0Z1tZ9vyQVtOBjO7Prl0BDLV';

//							const hash = generateHash(key, txnid, amount, productinfo, firstname, email, salt);
//							console.log("Generated Hash:", hash);

//							document.querySelector('input[name="key"]').value = key;
//							document.querySelector('input[name="txnid"]').value = txnid;
//							document.querySelector('input[name="productinfo"]').value = productinfo;
//							document.querySelector('input[name="amount"]').value = amount; // Updated amount
//							document.querySelector('input[name="email"]').value = email;
//							document.querySelector('input[name="firstname"]').value = firstname;
//							document.querySelector('input[name="lastname"]').value = lastname;
//							document.querySelector('input[name="surl"]').value = "https://linktotap.com/" + "order.html?ordernumber=" + txnid + "&date=" + currentDate + "&total=" + "999.00" + "&payment=OnlinePayment";
//							document.querySelector('input[name="furl"]').value = "https://linktotap.com/cart.html";
//							document.querySelector('input[name="phone"]').value = phone;
//							document.querySelector('input[name="hash"]').value = hash;

//							const form = document.getElementById('payusubmit');
//							form.submit();

//							//window.location.href = "order.html?ordernumber=" + response.orderNumber + "&date=" + currentDate + "&total=" + "999.00" + "&payment=OnlinePayment"
//						} else {
//							alert("Order number not found in the response.");
//						}
//					} catch (e) {
//						// Handle any parsing errors
//						console.error("Error parsing JSON response:", e);
//						alert("Failed to parse response.");
//					}
//				}


//				/*alert("Your information has been submitted successfully.");*/
//				document.getElementById("customizeCardForm").reset();  // Reset form after success
//			} else {
//				console.log("Error Response Body:", req.responseText);  // Log the error response for debugging
//				/*alert("Error: " + req.status + " - " + req.statusText);*/
//			}
//		}
//	};

//	req.send(inputData);
//	/*alert("Your information has been submitted successfully.");*/

//	// Clear the form fields
//	document.getElementById("customizeCardForm").reset();
//}


>>>>>>> f5c09b36ddc231d294c53b0cc1cea20c68db76e5
document.getElementById("customizeCardForm").addEventListener("submit", function (event) {
    debugger;
    event.preventDefault(); // Prevents traditional form submission
    showLoading(); // Show the loading indicator when form is submitted

    // Fetch form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var companyName = document.getElementById("companyName").value;
    var address = document.getElementById("address").value;

    // Gift Card Order Information
    var nameGift = document.getElementById("nameGift").value;
    var emailGift = document.getElementById("emailGift").value;
    var phoneGift = document.getElementById("phoneGift").value;
    var companyNameGift = document.getElementById("companyNameGift").value;
    var addressGift = document.getElementById("addressGift").value;

    //var totalAmount = document.getElementById("totalAmount").textContent.trim().replace('Rs. ', '');

    // Create an object to send as JSON
    var formData = {
        name: name,
        email: email,
        phone: phone,
        companyName: companyName,
        address: address, // Ensure this is included if expected by the schema
        nameGift: nameGift,
        emailGift: emailGift,
        phoneGift: phoneGift,
        companyNameGift: companyNameGift,
        addressGift: addressGift
        //totalAmount: totalAmount // If required by the API schema
    };

    // Validate required fields (example: name, email, phone)
    if (!name || !email || !phone) {
        alert("Please fill in all the required form details");
        return;
    }

    console.log("Form Data (Minimal):", JSON.stringify(formData));

    submitTrigger(JSON.stringify(formData));
});

function submitTrigger(inputData) {
    debugger;
    var flowUrl = "https://prod-05.centralindia.logic.azure.com:443/workflows/abc288d5ed7f41cca6dcaf98b695d3a0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m8vXQ0NEiBMGhe6sOv4EQ4SNisnkNPva4klKK-lM3mA";
    const parsedData = JSON.parse(inputData);

	const name = parsedData.name;
	const email = parsedData.email;
	const phone = parsedData.phone;

	var req = new XMLHttpRequest();
	req.open("POST", flowUrl, true);
	req.setRequestHeader('Content-Type', 'application/json');

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {

				if (req.responseText) {
					try {
						// Check if the response is valid JSON before parsing
						const response = isValidJSON(req.responseText) ? JSON.parse(req.responseText) : null;


						// Parse the JSON response
						//const response = JSON.parse(req.responseText);

						// Check if 'orderNumber' exists in the response
						if (response.orderNumber) {
							// Display the order number in an alert
							/*alert("Order Number: " + response.orderNumber);*/

							// Use new Date() to get the current date in ISO format (YYYY-MM-DD)
							const currentDate = new Date().toISOString().split('T')[0];

							// Example usage
							const key = 'HeuOWr';
							const txnid = response.orderNumber;
							const amount = '999.00';
							const productinfo = 'Digital Card 1000';
							const firstname = name;
							const lastname = '';
							//const email = email;
							//const phone = phone;
							const salt = 'iPR07DaK0Z1tZ9vyQVtOBjO7Prl0BDLV';

							const hash = generateHash(key, txnid, amount, productinfo, firstname, email, salt);
							console.log("Generated Hash:", hash);

							document.querySelector('input[name="key"]').value = key;
							document.querySelector('input[name="txnid"]').value = txnid;
							document.querySelector('input[name="productinfo"]').value = productinfo;
							document.querySelector('input[name="amount"]').value = amount; // Updated amount
							document.querySelector('input[name="email"]').value = email;
							document.querySelector('input[name="firstname"]').value = firstname;
							document.querySelector('input[name="lastname"]').value = lastname;
							document.querySelector('input[name="surl"]').value = "https://linktotap.com/" + "order.html?ordernumber=" + txnid + "&date=" + currentDate + "&total=" + "999.00" + "&payment=OnlinePayment";
							document.querySelector('input[name="furl"]').value = "https://linktotap.com/cart.html";
							document.querySelector('input[name="phone"]').value = phone;
							document.querySelector('input[name="hash"]').value = hash;

							const form = document.getElementById('payusubmit');
							form.submit();

							//window.location.href = "order.html?ordernumber=" + response.orderNumber + "&date=" + currentDate + "&total=" + "999.00" + "&payment=OnlinePayment"
						} else {
							alert("Order number not found in the response.");
						}
					} catch (e) {
						// Handle any parsing errors
						console.error("Error parsing JSON response:", e);
						console.error("Response Text:", req.responseText); // Log the response text for debugging
						alert("Failed to parse response.");
					}
				}


				/*alert("Your information has been submitted successfully.");*/
				document.getElementById("customizeCardForm").reset();  // Reset form after success
			} else {
				console.log("Error Response Body:", req.responseText);  // Log the error response for debugging
				/*alert("Error: " + req.status + " - " + req.statusText);*/
			}
		}
	};

	req.send(inputData);
	/*alert("Your information has been submitted successfully.");*/

	// Clear the form fields
	document.getElementById("customizeCardForm").reset();
}


function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {
	const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
	return CryptoJS.SHA512(input).toString();
}




//google map
function initAutocomplete() {
	// Create the autocomplete object
	var autocomplete = new google.maps.places.Autocomplete(
		document.getElementById('autocomplete'),
		{ types: ['geocode'] } // Restrict to geographical location types
	);

	// Set up a listener on the autocomplete field to update the textarea
	autocomplete.addListener('place_changed', function () {
		var place = autocomplete.getPlace();

		// If a place is selected, update the textarea with the formatted address
		if (place && place.formatted_address) {
			document.getElementById('address').value = place.formatted_address;
		}
	});

	// Focus on the hidden input to trigger the address search
	document.getElementById('address').addEventListener('focus', function () {
		document.getElementById('autocomplete').style.display = 'block';
		document.getElementById('autocomplete').focus();
	});

	// Hide autocomplete when the address is selected
	document.getElementById('autocomplete').addEventListener('blur', function () {
		document.getElementById('autocomplete').style.display = 'none';
	});
}

// Initialize Google Places Autocomplete
google.maps.event.addDomListener(window, 'load', initAutocomplete);



function toggleFields() {
	debugger;
	var checkbox = document.getElementById('enableFieldsCheckbox');
	var giftFieldsContainer = document.getElementById('giftFieldsContainer');

	// Show or hide the container with all the fields based on checkbox state
	if (checkbox.checked) {
		giftFieldsContainer.style.display = 'block'; // Show fields
	} else {
		giftFieldsContainer.style.display = 'none'; // Hide fields

		// Clear the fields when hiding them
		var fields = document.querySelectorAll('#giftFieldsContainer input, #giftFieldsContainer textarea');
		fields.forEach(function (field) {
			field.value = ''; // Clear the value
		});
	}
}
