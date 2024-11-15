// List of authorized users and passwords
const authorizedUsers = {
    "1494646" :  "oxxo01",
"1480774" :  "oxxo02",
"3556594" :  "oxxo03",
"112815" :  "oxxo04",
"1432738" :  "oxxo05",
"115000" :  "oxxo06",
"1351540" :  "oxxo07",
"1744800" :  "oxxo08",
"3062261" :  "oxxo09",
"1412058" :  "admin",
"3448457" :  "admin",
"1308411" :  "admin",
"498269" :  "admin",
"3301687" :  "admin",
"5100787" :  "admin",
"112428" :  "admin",
"11111" :  "admin",
"22222" :  "admin",
"33333" :  "admin",
"44444" :  "admin",
"5179851" :  "admin",
"3014648" :  "admin",
    };
// Variable to store the logged-in username
let loggedInUsername = "";

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve entered username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Hide error message initially
    errorMessage.style.display = 'none';

    // Check if username and password match an authorized user
    if (authorizedUsers[username] === password) {
        loggedInUsername = username;
        // Redirect to new page if credentials are correct
        window.location.href = "/static/chatbot.html"; // Change to the URL of your desired page
    } else {
        // Display error message if credentials are incorrect
        errorMessage.style.display = 'block';
    }
});

