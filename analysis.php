

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AKTIVATE. Fitness Dashboard</title>
    <link rel="stylesheet" href="styles/home2.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
                        <a href="./workout.php" class="menu-item"><span class="menu-icon">💪</span> Workout</a>
                        <a href="./schedule.php" class="menu-item"><span class="menu-icon">📅</span> Schedule</a>
                        <a href="./analysis.php" class="menu-item active"><span class="menu-icon">📊</span> Analysis</a>
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
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    padding: 20px;
                }

                .form-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                #healthForm {
                    width: 80%;
                    background-color: #FFE4C4;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-bottom: 30px;
                }

                #healthForm label {
                    display: block;
                    margin-top: 10px;
                    font-weight: bold;
                }

                #healthForm input {
                    width: 90%;
                    padding: 10px;
                    margin-top: 5px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }

                #evaluate-btn, #download-btn {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                }

                #evaluate-btn:hover, #download-btn:hover {
                    background-color: #45a049;
                }

                .main-status-suggestions {
                    display: flex;
                    justify-content: space-between;
                    width: 82%;
                }

                .box {
                    width: 45%;
                    background-color: #FFE4C4;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                #body-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                }

                #body-silhouette {
                    max-width: 200px;
                    height: auto;
                }

                .progress-sections {
                    display: flex;
                    justify-content: space-between;
                    width: 82%;
                    margin-top: 30px;
                }

                #daily-weight-tracker, #weekly-exercise-progress {
                    width: 45%;
                    background-color: #FFE4C4;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                #bmi {
                    font-weight: bold;
                }

                #weightChart, #progressChart {
                    width: 100%;
                    height: 200px;
                }

                #suggestions-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: 15px;
                }

                .suggestion-box {
                    background-color: #ffffff;
                    padding: 10px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .good-status {
                    background-color: #d4edda;
                }

                .bad-status {
                    background-color: #f8d7da;
                }

                .medium-status {
                    background-color: #fff3cd;
                }

                h3 {
                    color: #333;
                }

                h4 {
                    margin: 0;
                    font-weight: bold;
                }

                p {
                    margin: 5px 0 0;
                }
            </style>
                <div class="form-container">
                    <div id="healthForm">
                        <h2>Input Your Health Information</h2>

                        <!-- User Inputs -->
                        <label for="weight">Weight (kg)</label>
                        <input class="inputData" type="number" id="weight" name="weight" placeholder="Enter your weight" required>

                        <label for="height">Height (cm)</label>
                        <input class="inputData" type="number" id="height" name="height" placeholder="Enter your height" required>

                        <label for="bloodPressure">Blood Pressure (mmHg)</label>
                        <input class="inputData" type="text" id="bloodPressure" name="bloodPressure" placeholder="e.g., 120/80" required>

                        <label for="heartRate">Heart Rate (bpm)</label>
                        <input class="inputData" type="number" id="heartRate" name="heartRate" placeholder="Enter your heart rate" required>

                        <label for="stressLevel">Stress Level (scale 1-10)</label>
                        <input type="range" id="stressLevel" min="1" max="10" step="1" value="5" oninput="updateStressLevel(this.value)">
                        <span id="stress-value">5</span>

                        <label for="waterIntake">Water Intake (liters/day)</label>
                        <input class="inputData" type="number" step="0.1" id="waterIntake" name="waterIntake" placeholder="Enter water intake" required>

                        <label for="sleepQuality">Sleep Quality (hours)</label>
                        <input class="inputData" type="number" id="sleepQuality" name="sleepQuality" placeholder="Enter sleep hours" required>

                        <!-- Action Buttons -->
                       
                    </div>

                    <!-- Main Container with Body Status and Suggestions side by side -->
                    <div class="main-status-suggestions">
                        <!-- Health Status and Body Image Section -->
                        <div id="health-status-box" class="box">
                            <h3>Health Status: <span id="status-label">Unknown</span></h3>
                            <div id="body-container">
                                <img id="body-silhouette" src="styles/green_body_silhouette.png" alt="Body Silhouette">
                            </div>
                        </div>

                        <!-- Improvement Suggestions Section -->
                        <div id="suggestions-box" class="box">
                            <h3>Improvement Suggestions</h3>
                            <div id="suggestions-grid"></div>
                        </div>
                    </div>

                    <!-- New Section: Daily Weight Tracker and Weekly Exercise Progress -->
                    <div class="progress-sections">
                        <!-- Daily Weight Tracker -->
                        <div id="daily-weight-tracker" class="box">
                            <h3>Daily Weight Tracker</h3>
                            <p>BMI: <span id="bmi">N/A</span></p>
                            <input type="number" id="newWeight" placeholder="Enter new weight" />
                            <button id="updateWeightBtn">Update Weight</button>
                            <canvas id="weightChart"></canvas>
                        </div>

                        <!-- Weekly Exercise Progress -->
                        <div id="weekly-exercise-progress" class="box">
                            <h3>Weekly Exercise Progress</h3>
                            <canvas id="progressChart"></canvas>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <script src="java/weather_and_time.js"></script> 
    <script src="java/report.js"></script>
</body>
</html>