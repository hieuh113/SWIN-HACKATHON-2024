<?php
session_start();  // Start the session
// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.html");  // Redirect to login page if not logged in
    exit;
}
?>
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
                <a href="survey.html"><button class="new-program-btn"><i class="fa-solid fa-power-off"></i> New Program</button></a>
                <span>🔔</span>
            </div>
        </header>

        <div class="dashboard">
            <aside class="sidebar">
                <div class="profile">
                    <img src="https://via.placeholder.com/80" alt="Profile" class="profile-img">
                    <h2><?php echo $_SESSION['username']; ?></h2>
                    <p>Pro Membership</p>
                </div>
                <nav>
                    <ul class="menu">
                        <a href="./home2.php" class="menu-item active"><span class="menu-icon">🏠</span> Dashboard</a>
                        <a href="./workout.php" class="menu-item"><span class="menu-icon">💪</span> Workout</a>
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

            <main class="main-content">
                <h1 class="greeting">Good Morning 👋</h1>

                <div class="metrics">
                    <div class="metric-card">
                        <div>
                            <h3>Active steps</h3>
                            <p style="font-size: 24px; font-weight: bold;">5902</p>
                        </div>
                        <span class="metric-icon" style="background-color: #FFE5E5;">👟</span>
                    </div>
                    <div class="metric-card">
                        <div>
                            <h3>Weight</h3>
                            <p style="font-size: 24px; font-weight: bold;">80.2 kg</p>
                        </div>
                        <span class="metric-icon" style="background-color: #FFF5E5;">⚖️</span>
                    </div>
                    <div class="metric-card">
                        <div>
                            <h3>Water intake</h3>
                            <p style="font-size: 24px; font-weight: bold;">5 L</p>
                        </div>
                        <span class="metric-icon" style="background-color: #E5F5FF;">💧</span>
                    </div>
                    <div class="metric-card">
                        <div>
                            <h3>Calories</h3>
                            <p style="font-size: 24px; font-weight: bold;">4901 kcal</p>
                        </div>
                        <span class="metric-icon" style="background-color: #FFE5FF;">🔥</span>
                    </div>
                </div>

                <div class="timeline">
                    <div class="timeline-hours">
                        <span>9 am</span>
                        <span>10 am</span>
                        <span>11 am</span>
                        <span>12 pm</span>
                        <span>1 pm</span>
                        <span>2 pm</span>
                        <span>3 pm</span>
                    </div>
                    <div class="timeline-event" style="left: 5%; top: 30px; background-color: #FFE5E5;">🍱 Meal prep</div>
                    <div class="timeline-event" style="left: 25%; top: 60px; background-color: #E5F4E7;">🦊 Quality time</div>
                    <div class="timeline-event" style="left: 45%; top: 40px; background-color: #FFE5F1;">🔥 Pre-workout</div>
                    <div class="timeline-event" style="left: 65%; top: 70px; background-color: #E5F0FF;">💪 Chest day buddy!</div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="schedule">
                        <div class="schedule-header">
                            <h2>In schedule</h2>
                            <label class="toggle">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div style="background-color: #E6F7FF; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-size: 24px; margin-bottom: 10px;">🏊</div>
                        <h3>Swimming practice</h3>
                        <p style="margin: 10px 0;">You have a swimming class with mr. Johnson, don't forget to check on the syllabus that he shared!</p>
                        <p>10 Mar, 7:30 am 👩‍🦰👨‍🦰</p>
                    </div>
                    <div class="body-analysis">
                        <div class="body-analysis-header">
                            <h2>Body Analysis</h2>
                            <a href="#" style="color: #3490dc; text-decoration: none;">View Details</a>
                        </div>
                        <div class="chart">
                            <!-- Placeholder for the chart -->
                        </div>
                        <div style="background-color: #E6F3FF; padding: 15px; border-radius: 10px; display: flex; align-items: center;">
                            <span style="font-size: 24px; margin-right: 15px;">🔥</span>
                            <div>
                                <p>Calories burnt</p>
                                <p style="font-size: 24px; font-weight: bold;">2901 kcal</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 style="margin-bottom: 15px;">Next Meal</h2>
                    <div class="meal-options">
                        <div class="meal-option">
                            <span class="meal-icon">🌯</span>
                            <h3>Vege Wrap</h3>
                            <p><span style="color: #f6993f;">🔥 50 cal</span> <span style="margin-left: 10px;">⚡ 18 protein</span></p>
                        </div>
                        <div class="meal-option">
                            <span class="meal-icon">🥗</span>
                            <h3>Chicken Salad</h3>
                            <p><span style="color: #f6993f;">🔥 44 cal</span> <span style="margin-left: 10px;">⚡ 12 protein</span></p>
                        </div>
                        <div class="meal-option">
                            <span class="meal-icon">🥩</span>
                            <h3>Steak</h3>
                            <p><span style="color: #f6993f;">🔥 120 cal</span> <span style="margin-left: 10px;">⚡ 56 protein</span></p>
                        </div>
                        <div class="meal-option">
                            <span class="meal-icon">🍳</span>
                            <h3>Fried Egg</h3>
                            <p><span style="color: #f6993f;">🔥 12 cal</span> <span style="margin-left: 10px;">⚡ 5 protein</span></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <script src="java/weather_and_time.js"></script> 

</body>
</html>