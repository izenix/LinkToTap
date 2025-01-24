
/*<script type="text/javascript">*/
    "use strict";
    // Variables for buttons and sections
    var showNFCButton = document.getElementById("showNFCButton");
    var showUsersButton = document.getElementById("showUsersButton");
    var showMonthButton = document.getElementById("showMonthWiseDataButton");

    var nfcTrackingSection = document.getElementById("nfcTrackingSection");
    var usersSection = document.getElementById("usersSection");
    var monthSection = document.getElementById("monthSection");

    // Add event listeners to toggle between sections
    showNFCButton.addEventListener("click", function () {
        toggleVisibility('nfc');
        });

    showUsersButton.addEventListener("click", function () {
        toggleVisibility('users');
        });

    showMonthButton.addEventListener("click", function () {
        toggleVisibility('month');
        });

    // Function to toggle visibility between NFC Tracking and Users section
    function toggleVisibility(section) {
            if (section === 'nfc') {
        nfcTrackingSection.classList.remove('hidden');
    usersSection.classList.add('hidden');
    monthSection.classList.add('hidden');
            } else if (section === 'users') {
        usersSection.classList.remove('hidden');
    nfcTrackingSection.classList.add('hidden');
    monthSection.classList.add('hidden');
            } else if (section === 'month') {
        monthSection.classList.remove('hidden');
    nfcTrackingSection.classList.add('hidden');
    usersSection.classList.add('hidden');
            }
        }

    document.getElementById('login').addEventListener('click', function () {
        document.getElementById('login').classList.add('hidden');
    document.getElementById('logout').classList.remove('hidden');
        });

    document.getElementById('logout').addEventListener('click', function () {
        document.getElementById('logout').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
        });


    // Your existing NFC Tracking Data and Get Users code goes here
    var organizationURI = "https://izenixlearn.api.crm.dynamics.com";      // CRM URL
    var tenant = "izenixlearn.onmicrosoft.com";                            // Azure AD tenant
    var clientId = "78d9abf2-52c4-4f68-a69d-dfab8a564eab";                 // Client ID from Azure app registration
    var pageUrl = "https://izenix.com/NFC/nfctracking.html";                // Redirect URL

    var authContext, user, loginButton, logoutButton, getMonthButton, monthTable, monthTableBody, contactSelectDropdown, userLoginButton, userLogoutButton, getUsersButton, usersTable, getNFCTrackingDataButton, searchBar, searchBarMonth, nfctrackingsTable, nfctrackingsTableBody, usersTableBody, message, errorMessage;

    // ADAL configuration
    var endpoints = {
        orgUri: organizationURI
        };

    window.config = {
        tenant: tenant,
    clientId: clientId,
    postLogoutRedirectUri: pageUrl,
    endpoints: endpoints,
    cacheLocation: 'localStorage' // Store tokens in localStorage
        };

    document.onreadystatechange = function () {
            if (document.readyState === "complete") {
        // Get references to the necessary DOM elements
        message = document.getElementById("message");
    errorMessage = document.getElementById("errorMessage");

    // Login and Logout buttons
    loginButton = document.getElementById("login");
    logoutButton = document.getElementById("logout");

    // NFC Tracking Data elements
    getNFCTrackingDataButton = document.getElementById("getNFCTrackingData");
    searchBar = document.getElementById("searchBar");
    nfctrackingsTable = document.getElementById("nfctrackingsTable");
    nfctrackingsTableBody = document.getElementById("nfctrackingsTableBody");

    // Users-related elements
    getUsersButton = document.getElementById("getUsers");
    usersTable = document.getElementById("usersTable");
    usersTableBody = document.getElementById("usersTableBody");

    //Month Related elements
    getMonthButton = document.getElementById("getMonthData");
    monthTable = document.getElementById("monthWiseTable");
    monthTableBody = document.getElementById("monthWiseTableBody");
    contactSelectDropdown = document.getElementById("contactSelectDropdown");
    /*searchBarMonth = document.getElementById("searchBarMonth")*/


    // Add event listeners for NFC login/logout
    loginButton.addEventListener("click", login);
    logoutButton.addEventListener("click", logout);

    // Add event listeners for data retrieval and search
    getNFCTrackingDataButton.addEventListener("click", getNFCTrackingData);
    getUsersButton.addEventListener("click", getUsers);
    getMonthButton.addEventListener("click", getMonthData);
    contactSelectDropdown.addEventListener("click", contactSelectDropdown);

    // Add event listener for search functionality
    searchBar.addEventListener("input", searchByTagID);
    /*searchBarMonth.addEventListener("input", searchByTagIDMonth);*/


    authenticate();

    if (user) {
        // Hide login button and show logout button when the user is logged in
        loginButton.style.display = "none";
    logoutButton.style.display = "block";

    // Show the Get Users button
    getUsersButton.style.display = "block";

    // Show the NFC tracking data button and search bar by removing "none" class
    getNFCTrackingDataButton.style.display = "block";
    searchBar.style.display = "block";
    //searchBarMonth.style.display = "block";

    getMonthButton.style.display = "block";
    contactSelectDropdown.style.disabled = "block";

    // Display greeting message to the logged-in user
    var greetingContainer = document.getElementById("greetingMessage");
    var helloMessage = document.createElement("span");
    helloMessage.textContent = "Hello " + user.profile.name;
    greetingContainer.appendChild(helloMessage);

    // Optionally, style the message if needed
    helloMessage.style.marginLeft = "10px";
    helloMessage.style.fontWeight = "bold";

    userdownloadExcelButton.style.display = "block";
    nfcdownloadExcelButton.style.display = "block";
    monthdownloadExcelButton.style.display = "block";

    dropDownSelect.style.display = "block";
    /* monthYearInput.style.display = "block";*/
    monthYearDataSection.style.display = "block";

                } else {
        // Show login button and hide logout button when the user is logged out
        loginButton.style.display = "block";
    logoutButton.style.display = "none";

    // Hide the Get Users button
    getUsersButton.style.display = "none";

    // Hide the NFC tracking data button, search bar, and table by adding "none" class
    getNFCTrackingDataButton.style.display = "none";
    searchBar.style.display = "none";
    /* searchBarMonth.style.display = "none";*/
    getMonthButton.style.display = "none";
    contactSelectDropdown.style.disabled = "none";

    userdownloadExcelButton.style.display = "none";
    nfcdownloadExcelButton.style.display = "none";
    monthdownloadExcelButton.style.display = "none";

    dropDownSelect.style.display = "none";
    /*monthYearInput.style.display = "none";*/
    monthYearDataSection.style.display = "none";
                }
            }
        };

    // Function to authenticate the user
    function authenticate() {
            try {
        authContext = new AuthenticationContext(config);
    var isCallback = authContext.isCallback(window.location.hash);
    if (isCallback) {
        authContext.handleWindowCallback();
                }
    var loginError = authContext.getLoginError();
    if (isCallback && !loginError) {
        window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
                } else if (loginError) {
        errorMessage.textContent = loginError;
                }

    user = authContext.getCachedUser();
            } catch (e) {
        console.error("Authentication error:", e);
    errorMessage.textContent = "Authentication initialization failed.";
            }
        }

    // Login function
    function login() {
            try {
        authContext.login();
            } catch (e) {
        console.error("Login error:", e);
    errorMessage.textContent = "Login failed.";
            }
        }


    // Logout function
    function logout() {
        authContext.logOut();

    // Hide NFC Tracking Data section
    nfctrackingsTableBody.innerHTML = "";
    nfctrackingsTable.style.display = "none";

    // Hide Month Wise Data section
    monthWiseTableBody.innerHTML = "";
    monthTable.style.display = "none";

    // Hide Users section
    usersTable.style.display = "none";
    usersTableBody.innerHTML = "";

    // Call function to handle other logout tasks like hiding buttons or UI elements
    toggleLoggedInState(false);
        }


    // Function to get users
    function getUsers() {
        getUsersButton.disabled = true;
    message.textContent = "Retrieving users...";
    authContext.acquireToken(organizationURI, retrieveUsers);
        }

    function getTokenFromPowerAutomate() {

            const url = "https://prod-75.westus.logic.azure.com/workflows/e836ee072bf44696ae8b1d1bff733f2e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bqy3dANGhz_PGKGcdB6Edr6acWE6KFMLGhoI-qzl7bM";
    let responseData;
    var token;
    return fetch(url, {
        method: "GET",
    headers: {
        "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
    return response.json(); // Parse the response as JSON
                })
                .then(data => {
                    const token = data.token;
    /*console.log("Token retrieved:", token);*/
    return token;
                })
                .catch(error => {
        console.error("Error fetching data:", error);
    return null;
                    /*document.getElementById("responseContainer").innerHTML = `<p>Error fetching data: ${error.message}</p>`;*/
                });

        }

    /* 1 - Function to retrieve users after obtaining the token*/
    async function retrieveUsers() {
            try {
                const token1 = await getTokenFromPowerAutomate();  // Wait for the token asynchronously

    if (!token1) {
        console.error("Token error: null");
    errorMessage.textContent = "Token retrieval failed!";
    return;
                }

    var req = new XMLHttpRequest();
    req.open("GET", encodeURI(organizationURI + "/api/data/v9.2/contacts?$select=fullname,emailaddress1,mobilephone,izx_tagid,izx_nfccounter&$filter=izx_tagid ne null"), true);
    req.setRequestHeader("Authorization", "Bearer " + token1);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
                    if (this.readyState === 4) {
        req.onreadystatechange = null;
    if (this.status === 200) {
                            var users = JSON.parse(this.response).value;
    renderUsers(users);
                        } else {
                            var error = JSON.parse(this.response).error;
    console.error("Error retrieving users:", error.message);
    errorMessage.textContent = error.message;
                        }
                    }
                };
    req.send();
            } catch (error) {
        console.error("Error in retrieveUsers:", error);
    errorMessage.textContent = "An unexpected error occurred!";
            }
        }


    // Function to render users into the table
    function renderUsers(users) {
        usersTableBody.innerHTML = ''; // Clear previous results
    users.forEach(function (user) {
                var row = document.createElement("tr");

    var tagId = document.createElement("td");
    tagId.textContent = user.izx_tagid;

    var nameCell = document.createElement("td");
    nameCell.textContent = user.fullname;

    var emailCell = document.createElement("td");
    emailCell.textContent = user.emailaddress1;

    var mobilePhone = document.createElement("td");
    mobilePhone.textContent = user.mobilephone;

    var nfcCounterCell = document.createElement("tb");
    nfcCounterCell.textContent = user.izx_nfccounter;

    var tagIdCell = document.createElement("td");
    var tagIdButton = document.createElement("button");
    tagIdButton.textContent = "Show";

    // Add inline styles directly
    tagIdButton.style.fontSize = "12px";
    tagIdButton.style.padding = "5px 10px";
    tagIdButton.style.borderRadius = "4px";
    tagIdButton.style.backgroundColor = "#C8A165";
    tagIdButton.style.color = "white";
    tagIdButton.style.border = "none";
    tagIdButton.style.cursor = "pointer";


    tagIdButton.addEventListener("click", function () {
        showTagIdData(user.izx_tagid); // Call function to show data user.izx_tagid
                });
    tagIdCell.appendChild(tagIdButton);

    row.appendChild(tagId);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(mobilePhone);
    row.appendChild(nfcCounterCell);
    row.appendChild(tagIdCell);
    usersTableBody.appendChild(row);
            });
    usersTable.style.display = 'table';
    getUsersButton.disabled = false;
    message.textContent = '';
        }
    // Excel download functionality using SheetJS User Tracking Data
    document.getElementById('userdownloadExcelButton').addEventListener('click', function () {
            var tableBody = document.getElementById('usersTableBody');
    var rows = tableBody.getElementsByTagName('tr');
    var data = [];

    // Add header row
    data.push(["Tag ID", "Name", "Email", "Mobile", "NFC Counter"]);

    // Loop through the rows and collect data
    for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].getElementsByTagName('td');
    var rowArray = [];
    for (var j = 0; j < cells.length; j++) {
        rowArray.push(cells[j].textContent);
                }
    data.push(rowArray);
            }

    // Create new workbook and worksheet using SheetJS
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Users Details");

    // Export workbook as Excel file
    XLSX.writeFile(wb, "user_data.xlsx");
        });


    async function showTagIdData(tagId) {
            try {
                // Retrieve the token from Power Automate
                const token1 = await getTokenFromPowerAutomate();

    if (!token1) {
        console.error("Token error: null or undefined");
    errorMessage.textContent = 'Token retrieval failed!';
    return;
                }

    var req = new XMLHttpRequest();
    // Ensure proper concatenation of $select and $filter
    var filterQuery = `$filter=izx_tagid eq '${tagId}'`;
    var selectQuery = `$select=izx_tagid,izx_timein,izx_timeout,izx_duration,izx_in_out,izx_timestamp`;
    var apiUrl = encodeURI(organizationURI + "/api/data/v9.2/izx_nfctrackings?" + selectQuery + "&" + filterQuery);
    req.open("GET", apiUrl, true);
    req.setRequestHeader("Authorization", "Bearer " + token1);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
                    if (this.readyState === 4) {
        req.onreadystatechange = null;
    if (this.status === 200) {
                            var tagDetails = JSON.parse(this.response).value;

                            // Check if records were returned for the tagId
                            if (tagDetails.length > 0) {
                                // Clear any existing rows in the modal table
                                var modalTableBody = document.getElementById("modalTagDetailsTableBody");
    modalTableBody.innerHTML = "";

    // Loop through each record and append it to the modal table
    tagDetails.forEach(function (record) {
                                    var row = document.createElement("tr");

    // Helper function to format date (YYYY-MM-DD)
    function formatDate(dateString) {
                                        // Check if dateString is valid
                                        if (!dateString) {
                                            return 'N/A';
                                        }

    var date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
                                            return 'Invalid Date';
                                        }
    return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
                                    }

    // Helper function to format time (HH:MM:SS)
    function formatTime(dateString) {
                                        // Check if dateString is valid
                                        if (!dateString) {
                                            return 'N/A';
                                        }

    var date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
                                            return 'Invalid Time';
                                        }
    return date.toISOString().split('T')[1].split('Z')[0]; // Returns 'HH:MM:SS'
                                    }

    // Create and append table cells for each field
    var tagIdCell = document.createElement("td");
    tagIdCell.textContent = record.izx_tagid || 'N/A';
    row.appendChild(tagIdCell);

    var timestampCell = document.createElement("td");
    timestampCell.textContent = formatDate(record.izx_timestamp) || 'N/A';
    row.appendChild(timestampCell);

    var timeInCell = document.createElement("td");
    timeInCell.textContent = formatTime(record.izx_timein) || 'N/A';
    row.appendChild(timeInCell);

    var timeOut = document.createElement("td");
    timeOut.textContent = formatTime(record.izx_timeout) || 'N/A';
    row.appendChild(timeOut);

    var durationCell = document.createElement("td");
    durationCell.textContent = record.izx_duration || 'N/A';
    row.appendChild(durationCell);

    var inOutCell = document.createElement("td");
    inOutCell.textContent = (record.izx_in_out === 1) ? "In" : (record.izx_in_out === 2 ? "Out" : "Unknown");
    row.appendChild(inOutCell);

    // Append the row to the modal table body
    modalTableBody.appendChild(row);
                                });

    // Open the modal to display the data
    var modal = document.getElementById("tagDetailsModal");
    modal.style.display = "block";

                            } else {
        alert("No records found for the provided tag ID.");
                            }
                        } else {
                            var error = JSON.parse(this.response).error;
    console.error("Error retrieving tag details:", error.message);
    errorMessage.textContent = error.message;
                        }
                    }
                };
    req.send();
            } catch (error) {
        console.error("Error fetching tag data:", error);
    errorMessage.textContent = "An unexpected error occurred!";
            }
        }

    // Excel download functionality using SheetJS
    document.getElementById('downloadExcelButton').addEventListener('click', function () {
            var tableBody = document.getElementById('modalTagDetailsTableBody');
    var rows = tableBody.getElementsByTagName('tr');
    var data = [];

    // Add header row
    data.push(["Tag ID", "Timestamp", "Time IN", "Time Out", "Duration", "In/Out"]);

    // Loop through the rows and collect data
    for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].getElementsByTagName('td');
    var rowArray = [];
    for (var j = 0; j < cells.length; j++) {
        rowArray.push(cells[j].textContent);
                }
    data.push(rowArray);
            }

    // Create new workbook and worksheet using SheetJS
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "User Tracking Details");

    // Export workbook as Excel file
    XLSX.writeFile(wb, "user_nfc_tracking_data.xlsx");
        });

    // When the user clicks on the close button, close the modal
    var closeModal = document.querySelector(".close");
    closeModal.onclick = function () {
            var modal = document.getElementById("tagDetailsModal");
    modal.style.display = "none";
        };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
            var modal = document.getElementById("tagDetailsModal");
    if (event.target === modal) {
        modal.style.display = "none";
            }
        };



    // 2 - Existing NFC Tracking Data code goes here


    var authContext, user, loginButton, logoutButton, getMonthButton, monthTable, monthTableBody, contactSelectDropdown, userLoginButton, userLogoutButton, getUsersButton, usersTable, getNFCTrackingDataButton, searchBar, nfctrackingsTable, nfctrackingsTableBody, usersTableBody, message, errorMessage;

    var endpoints = {orgUri: organizationURI };

    window.config = {
        tenant: tenant,
    clientId: clientId,
    postLogoutRedirectUri: pageUrl,
    endpoints: endpoints,
    cacheLocation: 'localStorage',
        };


    function toggleLoggedInState(isLoggedIn) {
            if (isLoggedIn) {
        loginButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
    getNFCTrackingDataButton.style.display = "block";
    searchBar.style.display = "block";

            } else {
        loginButton.classList.remove("hidden");
    logoutButton.classList.add("hidden");
    getNFCTrackingDataButton.style.display = "none";
    searchBar.style.display = "none";
    nfctrackingsTable.classList.add("hidden");
            }
        }

    function login() {
        authContext.login();
        }

    function logout() {
        authContext.logOut();

    // Hide NFC Tracking Data section
    nfctrackingsTableBody.innerHTML = "";
    nfctrackingsTable.style.display = "none";

    // Hide Month Wise Data section
    monthWiseTableBody.innerHTML = "";
    monthTable.style.display = "none";

    // Hide Users section
    usersTable.style.display = "none";
    usersTableBody.innerHTML = "";

    // Call function to handle other logout tasks like hiding buttons or UI elements
    toggleLoggedInState(false);
        }


    function logout() {
        authContext.logOut();
    nfctrackingsTableBody.innerHTML = "";
    nfctrackingsTable.style.display = "none";
    monthWiseTableBody.innerHTML = "";
    monthTable.style.display = "none";
    toggleLoggedInState(false); // Hide elements after logout
        }

    function getNFCTrackingData() {
        getNFCTrackingDataButton.disabled = false;
    message.textContent = "Retrieving NFC tracking data...";
    authContext.acquireToken(organizationURI, retrieveNFCTrackingData);
        }


    async function retrieveNFCTrackingData() {
            try {
                // Retrieve the token from Power Automate
                const token1 = await getTokenFromPowerAutomate();

    var errorMessage = document.getElementById("errorMessage");

    if (!token1) {
        console.error("Token error: null or undefined");
    errorMessage.textContent = 'Token retrieval failed!';
    return;
                }

    debugger;
    // Get the current user's name
    var currentUser = user.profile.name; // Assuming you get the user name from this variable
    var currentUserEmail = user.profile.unique_name;


    // Log user's email and phone number to the console
    console.log("User Name: " + user.profile.name);
    console.log("User Email: " + user.profile.unique_name);


    var req = new XMLHttpRequest();
    req.open("GET", encodeURI(organizationURI + "/api/data/v9.2/izx_nfctrackings?$select=izx_name,izx_tagid,izx_status,izx_timestamp,izx_timein,izx_timeout,izx_duration,izx_in_out"), true);
    req.setRequestHeader("Authorization", "Bearer " + token1);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            // Parse the NFC tracking data
                            var nfctrackings = JSON.parse(this.response).value;
    renderNFCTrackingData(nfctrackings);
                        } else if (this.status >= 400) {
                            // Handle error response from the server
                            var errorResponse = JSON.parse(this.response);
    errorMessage.textContent = errorResponse.error.message;
    console.error("Error fetching NFC tracking data:", errorResponse);
                        }
                    }
                };
    req.send();
            } catch (error) {
        console.error("Error in retrieveNFCTrackingData:", error);
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = 'An unexpected error occurred while retrieving NFC tracking data.';
            }
        }


    // Helper function to format date (YYYY-MM-DD)
    function formatDate(dateString) {
            var date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
        }

    // Helper function to format time (HH:MM:SS)
    function formatTime(dateString) {
            var date = new Date(dateString);
    return date.toISOString().split('T')[1].split('Z')[0]; // Returns 'HH:MM:SS'
        }

    function renderNFCTrackingData(nfctrackings) {
        nfctrackingsTableBody.innerHTML = "";
    nfctrackings.forEach(function (tracking) {
                var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = tracking.izx_name;

    var tagIdCell = document.createElement("td");
    tagIdCell.textContent = tracking.izx_tagid;
    tagIdCell.classList.add("tag-id");

    var timestampCell = document.createElement("td");
    timestampCell.textContent = formatDate(tracking.izx_timestamp);

    var timeInCell = document.createElement("td");
    timeInCell.textContent = formatTime(tracking.izx_timein);

    var timeOutCell = document.createElement("td");
    timeOutCell.textContent = formatTime(tracking.izx_timeout);

    var durationCell = document.createElement("td");
    durationCell.textContent = tracking.izx_duration;

    var inoutCell = document.createElement("td");
    inoutCell.textContent = (tracking.izx_in_out === 1) ? "In" : (tracking.izx_in_out === 2 ? "Out" : "Unknown");

    row.appendChild(nameCell);
    row.appendChild(tagIdCell);
    row.appendChild(timestampCell);
    row.appendChild(timeInCell);
    row.appendChild(timeOutCell);
    row.appendChild(durationCell);
    row.appendChild(inoutCell);

    nfctrackingsTableBody.appendChild(row);
            });

    message.textContent = "NFC tracking data loaded successfully.";
    nfctrackingsTable.classList.remove("hidden");
        }

    function searchByTagID() {
            var filterValue = searchBar.value.toUpperCase();
    var rows = nfctrackingsTableBody.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
                var tagIdCell = rows[i].getElementsByClassName("tag-id")[0];
    if (tagIdCell) {
                    var tagId = tagIdCell.textContent.toUpperCase();
                    rows[i].style.display = tagId.indexOf(filterValue) > -1 ? "" : "none";
                }
            }
        }

    // Excel download functionality using SheetJS NFC Tracking
    document.getElementById('nfcdownloadExcelButton').addEventListener('click', function () {
            var tableBody = document.getElementById('nfctrackingsTableBody');
    var rows = tableBody.getElementsByTagName('tr');
    var data = [];

    // Add header row
    data.push(["Name", "Tag ID", "Timestamp", "Time IN", "Time Out", "Duration", "In/Out"]);

    // Loop through the rows and collect data
    for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].getElementsByTagName('td');
    var rowArray = [];
    for (var j = 0; j < cells.length; j++) {
        rowArray.push(cells[j].textContent);
                }
    data.push(rowArray);
            }

    // Create new workbook and worksheet using SheetJS
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "NFC Tracking Details");

    // Export workbook as Excel file
    XLSX.writeFile(wb, "nfc_tracking_data.xlsx");
        });




    // 3 - Existing Month Wise Data code goes here


    var authContext, user, loginButton, logoutButton, getMonthButton, contactSelectDropdown, monthTable, monthTableBody, userLoginButton, userLogoutButton, getUsersButton, usersTable, getNFCTrackingDataButton, searchBar, nfctrackingsTable, nfctrackingsTableBody, usersTableBody, message, errorMessage;

    var endpoints = {orgUri: organizationURI };

    window.config = {
        tenant: tenant,
    clientId: clientId,
    postLogoutRedirectUri: pageUrl,
    endpoints: endpoints,
    cacheLocation: 'localStorage',
        };

    // Function to toggle visibility of elements based on login state
    function toggleLoggedInState(isLoggedIn) {
            if (isLoggedIn) {
        loginButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
    getNFCTrackingDataButton.style.display = "block";
    getMonthButton.style.display = "block"; // Show "Get Month Data" button
    searchBar.style.display = "block";
    contactSelect.style.display = "block";
                /*searchBarMonth.style.display = "block";*/
            } else {
        loginButton.classList.remove("hidden");
    logoutButton.classList.add("hidden");
    getNFCTrackingDataButton.style.display = "none";
    getMonthButton.style.display = "none"; // Hide "Get Month Data" button
    searchBar.style.display = "none";
    /*searchBarMonth.style.display = "none";*/
    nfctrackingsTable.classList.add("hidden");
    monthTable.classList.add("hidden");
    contactSelect.classList.add("hidden");
            }
        }


    function login() {
        authContext.login();
        }

    function logout() {
        authContext.logOut();

    // Hide NFC Tracking Data section
    nfctrackingsTableBody.innerHTML = "";
    nfctrackingsTable.style.display = "none";

    // Hide Month Wise Data section
    monthWiseTableBody.innerHTML = "";
    monthTable.style.display = "none";

    // Hide Users section
    usersTable.style.display = "none";
    usersTableBody.innerHTML = "";

    // Call function to handle other logout tasks like hiding buttons or UI elements
    toggleLoggedInState(false);
        }


    // Add the contact's tag ID when selecting a contact
    function handleContactSelect() {
            var selectedTagID = document.getElementById("contactSelectDropdown").value;
    if (selectedTagID) {
        // Update monthYearInput or store the selected Tag ID
        document.getElementById("monthYearInput").value = selectedTagID;
            }
        }

    // Automatically populate the contact dropdown on page load
    window.onload = function () {
        populateContactDropdown();
        };

    async function populateContactDropdown() {
            try {
                // Retrieve the token from Power Automate
                const token1 = await getTokenFromPowerAutomate();

    var errorMessage = document.getElementById("errorMessage");

    if (!token1) {
        console.error("Token error: null or undefined");
    errorMessage.textContent = 'Token retrieval failed!';
    return;
                }
    debugger;

    var currentUserEmail = user.profile.unique_name;

    var req = new XMLHttpRequest();
    req.open("GET", encodeURI(organizationURI + "/api/data/v9.2/contacts?$select=izx_tagid&$filter=izx_tagid ne null"), true);
    req.setRequestHeader("Authorization", "Bearer " + token1);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            var contacts = JSON.parse(this.response).value;
    var contactSelect = document.getElementById("contactSelectDropdown");

    if (contactSelect) {  // Check if the dropdown exists
        // Clear existing options in the dropdown
        contactSelect.innerHTML = '<option value="">Select TagID</option>';

                                // Populate the dropdown with TagIDs
                                if (contacts.length > 0) {
                                    for (var i = 0; i < contacts.length; i++) {
                                        var contact = contacts[i];
    if (contact.izx_tagid) {
                                            var option = document.createElement("option");
    option.value = contact.izx_tagid;
    option.text = contact.izx_tagid;
    contactSelect.appendChild(option);
                                        }
                                    }
                                } else {
                                    var option = document.createElement("option");
    option.value = "";
    option.text = "No TagIDs found";
    contactSelect.appendChild(option);
                                }
                            } else {
        console.error("Contact dropdown with ID 'contactSelectDropdown' not found.");
                            }
                        } else {
        errorMessage.textContent = `Error retrieving TagIDs: ${this.statusText}`;
    console.error("Error:", this.status, this.statusText);
                        }
                    }
                };
    req.send();
            } catch (error) {
        console.error("Error in populateContactDropdown:", error);
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = 'An error occurred while fetching contacts.';
            }
        }

    function getMonthData() {
            var message = document.getElementById("message");
    var errorMessage = document.getElementById("errorMessage");

    message.textContent = "Retrieving NFC tracking data...";
    errorMessage.textContent = "";

    authContext.acquireToken(organizationURI, retrieveMonthData);
        }

    async function retrieveMonthData() {
            try {
                // Retrieve the token from Power Automate
                const token1 = await getTokenFromPowerAutomate();

    var errorMessage = document.getElementById("errorMessage");
    var message = document.getElementById("message");

    if (!token1) {
        console.error("Token error: null or undefined");
    errorMessage.textContent = 'Token retrieval failed!';
    return;
                }

    var monthYear = document.getElementById("monthYearInput").value;
    var selectedTagID = document.getElementById("contactSelectDropdown").value;

    if (monthYear && selectedTagID) {
                    debugger;
    // Split the value into year and month
    var [year, month] = monthYear.split('-');

    // Calculate the start and end of the selected month
    var startDate = new Date(Date.UTC(year, month - 1, 1)); // First day of the month
    var endDate = new Date(Date.UTC(year, month, 0)); // last day of the month

    // Set the endDate time to 23:59:59 to ensure we capture data up until the end of the day
    endDate.setHours(23, 59, 59, 999);  //(hour, minute, second, millisecond)

    // Example function to format the date (you might have a custom implementation)
    function formatDate(date) {
                        var day = date.getDate();
    var month = date.getMonth() + 1; // Months are 0-based, so we add 1
    var year = date.getFullYear();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
                    }

    // Get the formatted date without time
    var formattedStartDate = formatDate(startDate);
    var formattedEndDate = formatDate(endDate);

    console.log("Start Date: ", formattedStartDate); // First day of the month
    console.log("End Date: ", formattedEndDate); // Last day of the month

    var req = new XMLHttpRequest();

    req.open("GET", encodeURI(organizationURI + `/api/data/v9.2/izx_nfcdailyattendances?$select=izx_name,izx_contact,izx_tagid,izx_date,izx_duration&$filter=izx_tagid eq '${selectedTagID}' and izx_date ge ${formattedStartDate} and izx_date le ${formattedEndDate}`), true);
    req.setRequestHeader("Authorization", "Bearer " + token1);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200 && this.responseText && this.responseText.trim() !== "") {
                                try {
                                    var monthdata = JSON.parse(this.response).value;
    renderMonthData(monthdata);
                                } catch (parseError) {
        console.error("Error parsing the response:", parseError);
    errorMessage.textContent = "Error parsing response data!";
                                }
                            } else if (this.responseText && this.responseText.trim() !== "") {
                                try {
                                    var errorResponse = JSON.parse(this.response);
    errorMessage.textContent = errorResponse.error.message;
                                } catch (parseError) {
        console.error("Error parsing error response:", parseError);
    errorMessage.textContent = "Error retrieving data!";
                                }
                            } else {
        errorMessage.textContent = "No response received from the server.";
                            }
                        }
                    };
    req.send();
                } else {
        errorMessage.textContent = "Please select a contact and month.";
                }
            } catch (error) {
        console.error("Error retrieving month data:", error);
    errorMessage.textContent = "An unexpected error occurred!";
            }
        }

    // Helper function to format date (YYYY-MM-DD)
    function formatDate(dateString) {
            var date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
        }

    // Helper function to format time (HH:MM:SS)
    function formatTime(dateString) {
            var date = new Date(dateString);
    return date.toISOString().split('T')[1].split('Z')[0]; // Returns 'HH:MM:SS'
        }

    function renderMonthData(monthdata) {
            var monthWiseTableBody = document.getElementById("monthWiseTableBody");
    var message = document.getElementById("message");
    var monthTable = document.getElementById("monthWiseTable");

    monthWiseTableBody.innerHTML = "";                 // Clear old data

    monthdata.forEach(function (tracking) {
                var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = tracking.izx_name;

    //var contactCell = document.createElement("td");
    //contactCell.textContent = tracking.izx_contact;

    var tagIdCell = document.createElement("td");
    tagIdCell.textContent = tracking.izx_tagid;

    var dateCell = document.createElement("td");
    dateCell.textContent = formatDate(tracking.izx_date);

    var durationCell = document.createElement("td");
    durationCell.textContent = tracking.izx_duration;

    row.appendChild(nameCell);
    /*row.appendChild(contactCell);*/
    row.appendChild(tagIdCell);
    row.appendChild(dateCell);
    row.appendChild(durationCell);

    monthWiseTableBody.appendChild(row);
            });

    message.textContent = "Month Wise data loaded successfully.";
    monthTable.classList.remove("hidden");
        }

    // Excel download functionality using SheetJS Month Wise Tracking Data
    document.getElementById('monthdownloadExcelButton').addEventListener('click', function () {
            var tableBody = document.getElementById('monthWiseTableBody');
    var rows = tableBody.getElementsByTagName('tr');
    var data = [];

    // Add header row
    data.push(["Name", "Tag ID", "Date", "Duration"]);

    // Loop through the rows and collect data
    for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].getElementsByTagName('td');
    var rowArray = [];
    for (var j = 0; j < cells.length; j++) {
        rowArray.push(cells[j].textContent);
                }
    data.push(rowArray);
            }

    // Create new workbook and worksheet using SheetJS
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Month Wise Tracking Details");

    // Export workbook as Excel file
    XLSX.writeFile(wb, "month_wise_nfc_tracking_data.xlsx");
        });



