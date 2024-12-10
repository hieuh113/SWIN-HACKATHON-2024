const API_KEY = 'AIzaSyAnDOY0QfkgyucCZ8r323YiQ1ZULqGGWwc'; // Replace with your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let currentChatId = null;
let chats = {};

// Add message to the chat
function addMessage(message, isUser) {
    if (message.trim() === '') return; // Don't add empty messages
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
    messageElement.textContent = message;
    document.getElementById('chat-container').appendChild(messageElement);
    document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
}

// Send message and get AI response
async function sendMessage() {
    const message = document.getElementById('user-input').value.trim();
    if (message) {
        addMessage(message, true); // Add user message to chat
        document.getElementById('user-input').value = ''; // Clear input field

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: message }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;
            addMessage(aiResponse, false); // Add AI message to chat

            // Save the chat
            if (!chats[currentChatId]) {
                chats[currentChatId] = [];
            }
            chats[currentChatId].push({ user: message, ai: aiResponse });
            saveChats();
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', false);
        }
    }
}

// Save chats to localStorage
function saveChats() {
    localStorage.setItem('geminiChats', JSON.stringify(chats));
    localStorage.setItem('currentChatId', currentChatId);
}

// Load chats and populate dropdown
function loadChats() {
    const savedChats = localStorage.getItem('geminiChats');
    const savedChatId = localStorage.getItem('currentChatId');

    if (savedChats) {
        chats = JSON.parse(savedChats);

        const dropdown = document.getElementById('askAIDropdown');
        dropdown.innerHTML = '<a href="#" onclick="createNewChat()">New Chat</a>';

        Object.keys(chats).forEach(chatId => {
            const chatLink = document.createElement('a');
            chatLink.href = "#";
            chatLink.textContent = `Chat ${chatId}`;
            chatLink.onclick = () => switchChat(chatId);

            const deleteLink = document.createElement('span');
            deleteLink.textContent = ' [Delete]';
            deleteLink.style.color = 'red';
            deleteLink.style.cursor = 'pointer';
            deleteLink.onclick = (e) => {
                e.stopPropagation(); // Prevent triggering the chat switch
                deleteChat(chatId);
            };

            chatLink.appendChild(deleteLink);
            dropdown.appendChild(chatLink);
        });

        currentChatId = savedChatId && chats[savedChatId] ? savedChatId : Object.keys(chats)[0] || Date.now().toString();

        if (chats[currentChatId]) {
            displayChat(currentChatId);
        } else {
            createNewChat(true);
        }
    } else {
        createNewChat(true);
    }
}
function deleteChat(chatId) {
    delete chats[chatId]; // Remove the chat from the chats object
    saveChats(); // Save updated chats to localStorage
    loadChats(); // Refresh the dropdown
    displayChat(Object.keys(chats)[0] || createNewChat(true)); // Switch to the first available chat or create a new one
}
// Display chat messages
function displayChat(chatId) {
    document.getElementById('chat-container').innerHTML = '';
    if (chats[chatId] && chats[chatId].length > 0) {
        chats[chatId].forEach(msg => {
            if (msg.user) addMessage(msg.user, true);
            if (msg.ai) addMessage(msg.ai, false);
        });
    } else {
        addDefaultGreeting();
    }
}

// Add default greeting
function addDefaultGreeting() {
    const aiResponse = "How can I assist you today?";
    addMessage(aiResponse, false);
    chats[currentChatId] = [{ ai: aiResponse }]; // Only add AI message, no user message
    saveChats();
}

// Handle creating a new chat
function createNewChat(isInitial = false) {
    currentChatId = Date.now().toString();
    chats[currentChatId] = [];
    localStorage.setItem('currentChatId', currentChatId);
    document.getElementById('chat-container').innerHTML = '';
    if (isInitial) {
        addDefaultGreeting();
    } else {
        // For manually created new chats, don't add a greeting
        saveChats();
    }
}

// Handle switching between existing chats
function switchChat(chatId) {
    currentChatId = chatId;
    localStorage.setItem('currentChatId', currentChatId);
    displayChat(currentChatId);
}

// Initialize: Load chats on page load and restore the last session
document.addEventListener('DOMContentLoaded', () => {
    loadChats();
});

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Toggle dropdown for Ask AI section
function toggleDropdown() {
    document.getElementById("askAIDropdown").classList.toggle("show");
}

// Ensure that clicking outside of the dropdown closes it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
