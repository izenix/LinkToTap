
function subscribeEmailTrigger(event) {
    // Pause execution to debug (optional)
    debugger;

    // Prevent default form submission behavior if used with a form
    event.preventDefault();
	showLoading(); // Show the loading indicator when form is submitted

    // URL of the Power Automate Flow
    var flowUrl = "https://prod-27.centralindia.logic.azure.com:443/workflows/838d81112d0e4ec4aa17c18a4b3ad6f3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kQ_CL3sbnIx_H0v_-Gj0jKxC6me615D0TcXFkIuUYL4";

    // Get email input value
    var emailInput = document.getElementById("emailInput").value.trim();

    // Get the response element
    var responseElement = document.getElementById("emailresponseid");

    // Validate email using regular expression
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailInput) {
        hideLoading();
        responseElement.innerText = "Please enter your email address.";
        responseElement.style.color = "red"; // Set text color to red
        return;
    }

    if (!emailRegex.test(emailInput)) {
        hideLoading();
        responseElement.innerText = "Invalid email address.";
        responseElement.style.color = "red"; // Set text color to red
        return;
    }

    // Prepare the input payload
    var input = JSON.stringify({
        "email": emailInput
    });

    // Create an XMLHttpRequest object
    var req = new XMLHttpRequest();

    // Configure the request
    req.open("POST", flowUrl, true);
    req.setRequestHeader("Content-Type", "application/json");

    // Handle the response
    req.onreadystatechange = function () {
        if (req.readyState === 4) { // Ensure the request is complete
            if (req.status === 200) { // HTTP 200 means success
                try {
                    // Parse and handle the JSON response
                    var response = JSON.parse(req.responseText);
                    hideLoading(); // Hide the loading indicator when response is received
                    if (response.status === "success") {
                        // Display the success message
                        responseElement.innerText = response.message;
                        responseElement.style.color = "green"; // Set text color to green
                    } else {
                        // Handle unexpected statuses
                        responseElement.innerText = "Unexpected response status: " + response.status;
                        responseElement.style.color = "red"; // Set text color to red
                    }
                } catch (error) {
                    console.error("Error parsing response:", error);
                    responseElement.innerText = "Invalid response format.";
                    responseElement.style.color = "red"; // Set text color to red
                }
            } else {
                // Handle errors (e.g., 400, 500)
                responseElement.innerText = "Error occurred. Status: " + req.status + " - " + req.statusText;
                responseElement.style.color = "red"; // Set text color to red
            }
        }
    };

    // Send the request with the input payload
    req.send(input);
}


function sendMessageTrigger(event) {
    // Pause execution to debug (optional)
    debugger;

    // Prevent default form submission behavior
    event.preventDefault();
	showLoading(); // Show the loading indicator when form is submitted

    // URL of the Power Automate Flow
    var flowUrl = "https://prod-19.centralindia.logic.azure.com:443/workflows/85fd7ad383f44dfc9163ff747c34b61d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=J2LS3xeYUDfuSC_Az3L1khzMD6gsTcjOMrPP_-Cf6_Y";

    // Get input values
    var nameInput = document.getElementById("nameinput").value.trim();
    var emailInput = document.getElementById("emailinput").value.trim();
    var messageInput = document.getElementById("messageinput").value.trim();

    // Get the response message element
    var responseElement = document.getElementById("responsemessage");

    // Validate inputs
    if (!nameInput) {
        responseElement.innerText = "Please enter your name.";
        responseElement.style.color = "red";
        return;
    }

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailInput) {
        hideLoading();
        responseElement.innerText = "Please enter your email address.";
        responseElement.style.color = "red";
        return;
    }
    if (!emailRegex.test(emailInput)) {
        hideLoading();
        responseElement.innerText = "Invalid email address.";
        responseElement.style.color = "red";
        return;
    }

    if (!messageInput) {
        hideLoading();
        responseElement.innerText = "Please enter a message.";
        responseElement.style.color = "red";
        return;
    }

    // Prepare the input payload
    var input = JSON.stringify({
        "name": nameInput,
        "email": emailInput,
        "message": messageInput
    });

    // Create an XMLHttpRequest object
    var req = new XMLHttpRequest();

    // Configure the request
    req.open("POST", flowUrl, true);
    req.setRequestHeader("Content-Type", "application/json");

    // Handle the response
    req.onreadystatechange = function () {
        if (req.readyState === 4) { // Ensure the request is complete
            if (req.status === 200) { // HTTP 200 means success
                try {
                    // Parse and handle the JSON response
                    var response = JSON.parse(req.responseText);
                    hideLoading(); // Hide the loading indicator when response is received

                    if (response && response.message) {
                        // Display the success message from the response
                        responseElement.innerText = response.message;
                        responseElement.style.color = "green";
                    } else {
                        // Handle cases where no `message` property exists
                        responseElement.innerText = "Message sent successfully, but no response message was provided.";
                        responseElement.style.color = "green";
                    }
                } catch (error) {
                    console.error("Error parsing response:", error);
                    responseElement.innerText = "Message sent successfully, but the response could not be processed.";
                    responseElement.style.color = "green";
                }
            } else {
                // Handle errors (e.g., 400, 500)
                responseElement.innerText = "Error occurred. Status: " + req.status + " - " + req.statusText;
                responseElement.style.color = "red";
            }
        }
    };

    // Send the request with the input payload
    req.send(input);
}

function showLoading() {
	// Show the loading indicator
	document.getElementById('loadingIndicator').style.display = 'block';
}

function hideLoading() {
	// Hide the loading indicator
	document.getElementById('loadingIndicator').style.display = 'none';
}