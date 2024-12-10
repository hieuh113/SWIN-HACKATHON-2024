<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AKTIVATE. Fitness Dashboard - Ask AI</title>
    <link rel="stylesheet" href="styles/home2.css"/>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
        }

        .container {
            display: flex;
            flex-direction: column;
            height: 100vh; /* Full height */
        }

        .dashboard {
            display: flex;
            flex: 1; /* Allow the dashboard to fill available space */
        }

        .sidebar {
            width: 250px; /* Set a fixed width for the sidebar */
            background-color: #f4f4f4; /* Example background color */
            overflow-y: auto; /* Add scrolling if content exceeds height */
            transition: height 0.3s; /* Smooth transition for height change */
        }

        .main-content {
            flex: 1; /* Take up remaining space */
            padding: 20px;
            overflow-y: auto; /* Add scrolling if content exceeds height */
        }

        .chat-container {
            max-height: calc(100vh - 200px); /* Adjust max height based on header and input area */
            overflow-y: auto; /* Enable scrolling */
        }

        /* Additional styles for messages and other elements */
        .message {
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
        }

        .user-message {
            background-color: #d1e7dd; /* User message background */
            text-align: right; /* Align user messages to the right */
        }

        .ai-message {
            background-color: #f8d7da; /* AI message background */
            text-align: left; /* Align AI messages to the left */
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">HaminG.</div>
            <div class="header-right">
                <span id="current-date-time"></span>
                <span id="weather-temp"></span>
                <button class="new-program-btn">+ New Program</button>
                <span>🔔</span>
            </div>
        </header>

        <div class="dashboard">
            <aside class="sidebar" id="sidebar">
                <div class="profile">
                    <img src="https://via.placeholder.com/80" alt="Profile" class="profile-img">
                    <h2>Cecillia Funi</h2>
                    <p>Pro Membership</p>
                </div>
                <nav>
                    <ul class="menu">
                        <a href="./home2.php" class="menu-item"><span class="menu-icon">🏠</span> Dashboard</a>
                        <a href="./workout.php" class="menu-item"><span class="menu-icon">💪</span> Workout</a>
                        <a href="./schedule.php" class="menu-item"><span class="menu-icon">📅</span> Schedule</a>
                        <a href="./analysis.php" class="menu-item"><span class="menu-icon">📊</span> Analysis</a>
                        <div class="dropdown">
                            <button onclick="toggleDropdown()" class="dropbtn"><span class="menu-icon">📋</span> Ask AI</button>
                            <div id="askAIDropdown" class="dropdown-content">
                                <a href="#" onclick="createNewChat()">New Chat</a>
                                <!-- Existing chats will be dynamically added here -->
                            </div>
                        </div>
                    </ul>
                </nav>
                <div class="membership-info" style="margin-top: 20px; text-align: center;">
                    <p>2 days left</p>
                    <p>Extend your membership</p>
                    <button style="background-color: black; color: white; padding: 8px 16px; border: none; border-radius: 20px; margin-top: 10px;">Check Now</button>
                </div>
            </aside>
            
            <main class="main-content">
                <h1>Ask AI</h1>
                <div class="chat-container" id="chat-container">
                    <div class="message ai-message">How can I assist you today? 😊</div>
                </div>
                <div class="input-area">
                    <input type="text" id="user-input" placeholder="Type your message here...">
                    <button id="send-button">Send</button>
                </div>
            </main>
        </div>
    </div>
    
    <script src="java/weather_and_time.js"></script>
    <script src="java/AI_chat.js"></script>
    <script>
        function adjustSidebarHeight() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.querySelector('.main-content');
            sidebar.style.height = `${mainContent.clientHeight}px`; // Match sidebar height to main content
        }

        // Adjust sidebar height on page load
        window.addEventListener('load', adjustSidebarHeight);
        // Adjust sidebar height on window resize
        window.addEventListener('resize', adjustSidebarHeight);
    </script>
</body>
</html>
