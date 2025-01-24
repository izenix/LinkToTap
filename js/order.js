	document.addEventListener('DOMContentLoaded', function () {
			// Select all remove icons in the shopping cart
			const removeIcons = document.querySelectorAll('.product-remove a');

	// Loop through each remove icon and add a click event listener
	removeIcons.forEach(function (removeIcon) {
		removeIcon.addEventListener('click', function (event) {
			event.preventDefault(); // Prevent default link behavior

			// Find the closest <tr> element that contains the clicked remove icon
			const row = removeIcon.closest('tr');

			// Remove the entire row from the table
			row.remove();
		});
			});
		});


	// Function to get query parameters from the URL dynamically
	function getDynamicQueryParams() {
			// Get the entire URL
			debugger;
	const fullUrl = window.location.href;
	const queryString = fullUrl.split('?')[1]; // Get everything after '?'

	// Create a URLSearchParams object to parse the query string
	const params = new URLSearchParams(queryString);

	// Extract individual query parameters
	const orderNumber = params.get('ordernumber');
	const orderDate = params.get('date');
	const orderTotal = params.get('total');
	const paymentMethod = params.get('payment');

	// Display the values in the HTML elements if they exist
	if (orderNumber) document.getElementById('orderNumber').textContent = orderNumber;
	else document.getElementById('orderNumber').textContent = "Not Available"; // Fallback

	if (orderDate) document.getElementById('orderDate').textContent = orderDate;
	else document.getElementById('orderDate').textContent = "Not Available"; // Fallback

	if (orderTotal) document.getElementById('orderTotal').textContent = orderTotal;
	else document.getElementById('orderTotal').textContent = "Not Available"; // Fallback

	if (paymentMethod) document.getElementById('paymentMethod').textContent = paymentMethod;
	else document.getElementById('paymentMethod').textContent = "Not Available"; // Fallback
		}

	// Call the function to get and display query parameters dynamically
	window.onload = function () {
		getDynamicQueryParams();
		};


