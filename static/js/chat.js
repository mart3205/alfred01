// Variable to store the addendum and full_prompt
let addendum = "";
let full_prompt = "";

// Function to load the user's role from user_role.json
async function loadUserRole() {
    try {
        const response = await fetch('user_role.json');
        const data = await response.json();
        const userRole = data.user_role.find(user => user.username === loggedInUsername);

        // Determine the addendum based on the user's role
        if (userRole && userRole.role === "operador") {
            addendum = ` y filtra los datos solo para el nomina_user = ${loggedInUsername}`;
        } else {
            addendum = "";
        }
    } catch (error) {
        console.error("Error loading user role:", error);
    }
}

// Call loadUserRole on page load
window.onload = async function() {
    await loadUserRole();
};

// Function to display messages in the chat area
function displayMessage(content, isUserMessage = true) {
    const chatArea = document.getElementById('chatArea');
    const message = document.createElement('div');
    message.className = 'message ' + (isUserMessage ? 'user-message' : 'bot-message');
    
    if (!isUserMessage) {
        message.innerHTML = marked.parse(content);
    } else {
        message.textContent = content;
    }
    
    chatArea.appendChild(message);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Function to send a message
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message) {
        full_prompt = message + addendum;  // Concatenate user message with addendum
        displayMessage(full_prompt);       // Display full prompt in chat
        userInput.value = "";

        try {
            const response = await fetch('http://127.0.0.1:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: full_prompt,
                    sessionId: "defaultSession",
                    endSession: false
                })
            });

            const data = await response.json();
            const botResponse = data.response || "No response from agent.";
            displayMessage(botResponse, false);

        } catch (error) {
            console.error("Error fetching response:", error);
            displayMessage("Error: Unable to reach the chatbot service.", false);
        }
    }
}

// Function to select a prompt from the dropdown and set it to the input box
function selectPrompt() {
    const promptSelect = document.getElementById('promptSelect');
    const selectedPrompt = promptSelect.value;
    if (selectedPrompt) {
        document.getElementById('userInput').value = selectedPrompt;
    }
}

// Function to end the session and redirect to the login page
function endSession() {
    window.location.href = "index.html";
}
