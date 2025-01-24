document.getElementById('customizeCardForm').addEventListener('input', function () {
	debugger;
	const name = document.getElementById('name').value;
	const designation = document.getElementById('designation').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	const companyName = document.getElementById('companyName').value;
	const slogan = document.getElementById('slogan').value;
	const logo = document.getElementById('logo').files[0];
	const background = document.getElementById('background').files[0];
	const textColor = document.getElementById('textColor').value;
	const cardColor = document.getElementById('cardColor').value;
	const cardMaterial = document.getElementById("cardMaterial").value;

	document.getElementById('nameFrontPreview').textContent = name || '[Name]';
	document.getElementById('designationFrontPreview').textContent = designation || '[Designation]';
	document.getElementById('emailFrontPreview').textContent = email || '[Email]';
	document.getElementById('phoneFrontPreview').textContent = phone || '[Phone]';

	document.getElementById('companyNameBackPreview').textContent = companyName || '[Company Name]';
	document.getElementById('sloganBackPreview').textContent = slogan || '[Slogan]';

	document.getElementById('cardFront').style.color = textColor || 'inherit';
	document.getElementById('cardBack').style.color = textColor || 'inherit';

	if (cardColor === "Custom") {
		document.getElementById('customCardColorPicker').style.display = 'block';
		const customCardColor = document.getElementById('customCardColorPicker').value;
		document.getElementById('cardFront').style.backgroundColor = customCardColor;
		document.getElementById('cardBack').style.backgroundColor = customCardColor;
	} else {
		document.getElementById('customCardColorPicker').style.display = 'none';
		document.getElementById('cardFront').style.backgroundColor = cardColor || 'transparent';
		document.getElementById('cardBack').style.backgroundColor = cardColor || 'transparent';
	}

	if (logo) {
		const logoFrontPreview = document.getElementById('logoFrontPreview');
		const reader = new FileReader();
		reader.onload = function (e) {
			logoFrontPreview.src = e.target.result;
			logoFrontPreview.style.display = 'block';
		};
		reader.readAsDataURL(logo);
	} else {
		document.getElementById('logoFrontPreview').style.display = 'none';
	}

	if (background) {
		debugger;
		const backgroundFrontPreview = document.getElementById('backgroundFrontPreview');
		const backgroundBackPreview = document.getElementById('backgroundBackPreview');
		const reader = new FileReader();
		reader.onload = function (e) {
			backgroundFrontPreview.src = e.target.result;
			backgroundBackPreview.src = e.target.result;
			backgroundFrontPreview.style.display = 'block';
			backgroundBackPreview.style.display = 'block';
		};
		reader.readAsDataURL(background);
	} else {
		document.getElementById('backgroundFrontPreview').style.display = 'none';
		document.getElementById('backgroundBackPreview').style.display = 'none';
	}
});



function showLoading() {
	// Show the loading indicator
	document.getElementById('loadingIndicator').style.display = 'block';
}

function hideLoading() {
	// Hide the loading indicator
	document.getElementById('loadingIndicator').style.display = 'none';
}




document.getElementById("customizeCardForm").addEventListener("submit", function (event) {
	debugger;
	event.preventDefault(); // Prevents traditional form submission
	showLoading(); // Show the loading indicator when form is submitted


	var cardMaterialMap = {
		"PVC": 0,
		"Metal": 1,
		"Wood": 2
	};

	var textColorMap = {
		"White": 0,
		"Grey": 1,
		"Gold": 2,
		"Silver": 3,
		"Black": 4,
		"Blue": 5,
		"Bronze": 6,
		"Red": 7,
		"Green": 8,
		"Purple": 9
	};

	var cardColorMap = {
		"Black": 0,
		"white": 1,
		"Custom": 2
	};

	// Fetch form values
	var cardName = "Digital Card 1000"
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var customCardColorPicker = document.getElementById("customCardColorPicker").value;
	var designation = document.getElementById("designation").value;
	var companyName = document.getElementById("companyName").value;
	var slogan = document.getElementById("slogan").value;
	var address = document.getElementById("address").value;

	// Get the selected value from the dropdowns and map them to integers
	var cardMaterialString = document.getElementById("cardMaterial").value;
	var cardMaterial = cardMaterialMap[cardMaterialString]; // Map the selected value to its integer

	var textColorString = document.getElementById("textColor").value;
	var textColor = textColorMap[textColorString];

	var cardColorString = document.getElementById("cardColor").value;
	var cardColor = cardColorMap[cardColorString];

	// Fetch files (background and logo)
	//var background = document.getElementById("background").files[0];
	//var logo = document.getElementById("logo").files[0];

	var totalAmount = document.getElementById("totalAmount").textContent.trim().replace('Rs. ', '');

	//Gift Card Order Information
	var nameGift = document.getElementById("nameGift").value;
	var emailGift = document.getElementById("emailGift").value;
	var phoneGift = document.getElementById("phoneGift").value;
	var designationGift = document.getElementById("designationGift").value;
	var companyNameGift = document.getElementById("companyNameGift").value;
	var sloganGift = document.getElementById("sloganGift").value;
	var addressGift = document.getElementById("addressGift").value;



	// Create a FormData object
	var formData = new FormData();

	// Append text data
	var formData = {
		cardName: cardName,
		name: name,
		email: email,
		phone: phone,
		cardMaterial: cardMaterial,
		cardColor: cardColor,
		customCardColorPicker: customCardColorPicker,
		textColor: textColor,
		designation: designation,
		companyName: companyName,
		slogan: slogan,
		totalAmount: totalAmount,

		nameGift: nameGift,
		emailGift: emailGift,
		phoneGift: phoneGift,
		designationGift: designationGift,
		companyNameGift: companyNameGift,
		sloganGift: sloganGift,
		addressGift: addressGift
	};


	// Append files (only if they exist)
	//if (background) {
	//	formData.append("background", background); // Append the actual file
	//}
	//if (logo) {
	//	formData.append("logo", logo); // Append the actual file
	//}

	// Validate required fields (example: name, email, phone)
	if (!name || !email || !phone) {
		alert("Please fill in all the required form details");
		return;
	} // Send the data

	console.log("Form Data (Minimal):", JSON.stringify(formData));

	submitTrigger(JSON.stringify(formData));
});



function getCartDetails() {
	// Retrieve the cart data from localStorage
	var cart = JSON.parse(localStorage.getItem("cart")) || [];

	if (cart.length === 0) {
		console.log("Cart is empty.");
		return;
	}

	// Loop through the cart and extract values into variables
	for (var i = 0; i < cart.length; i++) {
		var item = cart[i];
		var id = item.id;
		var name = item.name;
		var price = item.price;
		var image = item.image;
		var quantity = item.quantity;

		// You can use these variables as needed
		console.log("ID:", id);
		console.log("Name:", name);
		console.log("Price:", price);
		console.log("Image:", image);
		console.log("Quantity:", quantity);

		// Example: calculate subtotal for each item
		var subtotal = price * quantity;
		console.log("Subtotal:", subtotal);

		// Perform other actions with these variables
	}
}

// Call the function to execute
getCartDetails();



function submitTrigger(inputData) {
	debugger;
	var flowUrl = "https://prod-04.centralindia.logic.azure.com:443/workflows/27caaa6ed33046bd9381661e652e38a1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TQEqre6e0ki3S-NISzmvytxmOz24yU53fJu-C14_-qg";
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
						// Parse the JSON response
						const response = JSON.parse(req.responseText);

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


function toggleFields() {
	var checkbox = document.getElementById('enableFieldsCheckbox');
	var giftFieldsContainer = document.getElementById('giftFieldsContainer');
	var fields = document.querySelectorAll('#giftFieldsContainer input, #giftFieldsContainer textarea');

	if (checkbox.checked) {
		// Show the container with all the fields
		giftFieldsContainer.style.display = 'block';

		// Enable all the fields
		fields.forEach(function (field) {
			field.disabled = false;
		});
	} else {
		// Hide the container with all the fields
		giftFieldsContainer.style.display = 'none';

		// Disable and clear the fields
		fields.forEach(function (field) {
			field.disabled = true;
			field.value = ''; // Clear the value
		});
	}
}