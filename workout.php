
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AKTIVATE. Fitness Dashboard</title>
    <link rel="stylesheet" href="styles/home2.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">HaminG.</div>
            <div class="header-right">
                <span id="current-date-time"></span>
                <span id="weather-temp" ></span>
                <button class="new-program-btn">+ New Program</button>
                <span>🔔</span>
            </div>
        </header>

        <div class="dashboard">
            <aside class="sidebar">
                <div class="profile">
                    <img src="https://via.placeholder.com/80" alt="Profile" class="profile-img">
                    <h2>Cecillia Funi</h2>
                    <p>Pro Membership</p>
                </div>
                <nav>
                    <ul class="menu">
                        <a href="./home2.php" class="menu-item "><span class="menu-icon">🏠</span> Dashboard</a>
                        <a href="./workout.php" class="menu-item active"><span class="menu-icon">💪</span> Workout</a>
                        <a href="./schedule.php" class="menu-item"><span class="menu-icon">📅</span> Schedule</a>
                        <a href="./analysis.php" class="menu-item"><span class="menu-icon">📊</span> Analysis</a>
                        <a href="./AI.php" class="menu-item"><span class="menu-icon">📋</span> Ask AI</a>
                    </ul>
                </nav>
                <div class="membership-info" style="margin-top: 20px; text-align: center;">
                    <p>2 days left</p>
                    <p>Extend your membership</p>
                    <button style="background-color: black; color: white; padding: 8px 16px; border: none; border-radius: 20px; margin-top: 10px;">Check Now</button>
                </div>
            </aside>
        </div>
    </div>
    <script src="java/weather_and_time.js"></script> 
</body>
</html>