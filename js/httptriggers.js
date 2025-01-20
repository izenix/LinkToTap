
function subscribeEmailTrigger(event) {
    // Pause execution to debug (optional)
    debugger;

    // Prevent default form submission behavior if used with a form
    event.preventDefault();

    // URL of the Power Automate Flow
    var flowUrl = "https://prod-20.centralindia.logic.azure.com:443/workflows/f3ac08eba26c44369fc6e199ccf773fc/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UJYZlhWJBDaYjHMcqrOilsAiyMwePwv6aIbbGcJmLcs";

    // Get email input value
    var emailInput = document.getElementById("emailInput").value.trim();

    // Get the response element
    var responseElement = document.getElementById("emailresponseid");

    // Validate email using regular expression
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailInput) {
        responseElement.innerText = "Please enter your email address.";
        responseElement.style.color = "red"; // Set text color to red
        return;
    }

    if (!emailRegex.test(emailInput)) {
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
