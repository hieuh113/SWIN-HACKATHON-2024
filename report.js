document.addEventListener('DOMContentLoaded', function() {
    // Elements from HTML
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiDisplay = document.getElementById('bmi');
    const bodyImage = document.getElementById('body-silhouette');
    const healthStatusText = document.getElementById('status-label');
    const suggestionsGrid = document.getElementById('suggestions-grid');
    const newWeightInput = document.getElementById('newWeight');
    const updateWeightBtn = document.getElementById('updateWeightBtn');
    const bloodPressureInput = document.getElementById('bloodPressure');
    const heartRateInput = document.getElementById('heartRate');
    const stressLevelInput = document.getElementById('stressLevel');
    const waterIntakeInput = document.getElementById('waterIntake');
    const sleepQualityInput = document.getElementById('sleepQuality');

    // Initial data for weight
    let weightHistory = [65, 64, 66, 67, 66, 65, 66];

    // Function to update BMI and health status
    function updateHealthInfo() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // cm to meters

        if (weight && height) {
            const bmi = (weight / (height * height)).toFixed(2);
            bmiDisplay.textContent = bmi;
            updateHealthStatus(bmi);
        } else {
            bmiDisplay.textContent = 'N/A';
            healthStatusText.textContent = 'Unknown';
            bodyImage.src = 'styles/green_body_silhouette.png'; // Default image
            updateSuggestions('Unknown');
        }
    }

    // Function to update health status
    function updateHealthStatus(bmi) {
        if (bmi < 18.5) {
            healthStatusText.textContent = 'Underweight';
            bodyImage.src = 'styles/yellow_body_silhouette.png';
            updateSuggestions('Underweight');
        } else if (bmi >= 18.5 && bmi < 24.9) {
            healthStatusText.textContent = 'Normal';
            bodyImage.src = 'styles/green_body_silhouette.png';
            updateSuggestions('Normal');
        } else {
            healthStatusText.textContent = 'Overweight';
            bodyImage.src = 'styles/red_body_silhouette.png';
            updateSuggestions('Overweight');
        }
    }

    // Function to update suggestions
    function updateSuggestions(status) {
        suggestionsGrid.innerHTML = ''; // Clear previous suggestions
        let suggestions = [];
        
        const bloodPressure = bloodPressureInput.value;
        const heartRate = parseInt(heartRateInput.value);
        const stressLevel = parseInt(stressLevelInput.value);
        const waterIntake = parseFloat(waterIntakeInput.value);
        const sleepQuality = parseInt(sleepQualityInput.value);

        if (status === 'Underweight') {
            suggestions.push(createSuggestionBox("BMI is low", "Consider gaining weight with a balanced diet."));
        } else if (status === 'Normal') {
            suggestions.push(createSuggestionBox("Maintain BMI", "Keep a balanced diet and regular exercise."));
        } else if (status === 'Overweight') {
            suggestions.push(createSuggestionBox("BMI is high", "Consider losing weight through a calorie deficit."));
        }

        // Additional dynamic suggestions based on other inputs
        if (bloodPressure) {
            const [systolic, diastolic] = bloodPressure.split('/').map(Number);
            if (systolic > 120 || diastolic > 80) {
                suggestions.push(createSuggestionBox("Blood Pressure", "Your blood pressure is elevated. Consider reducing salt intake and increasing exercise."));
            }
        }

        if (heartRate > 100) {
            suggestions.push(createSuggestionBox("Heart Rate", "Your resting heart rate is high. Consider more cardiovascular exercise."));
        }

        if (stressLevel > 7) {
            suggestions.push(createSuggestionBox("Stress Management", "Your stress level is high. Consider meditation or relaxation techniques."));
        }

        if (waterIntake < 2) {
            suggestions.push(createSuggestionBox("Hydration", "Increase your daily water intake to at least 2 liters."));
        }

        if (sleepQuality < 7) {
            suggestions.push(createSuggestionBox("Sleep Quality", "Aim for 7-9 hours of quality sleep per night."));
        }

        suggestions.forEach(suggestion => suggestionsGrid.appendChild(suggestion));
    }

    function createSuggestionBox(title, message) {
        const suggestionBox = document.createElement('div');
        suggestionBox.classList.add('suggestion-box');
        suggestionBox.innerHTML = `<h4>${title}</h4><p>${message}</p>`;
        return suggestionBox;
    }

    // Event listeners for form inputs to update in real-time
    [weightInput, heightInput, bloodPressureInput, heartRateInput, stressLevelInput, waterIntakeInput, sleepQualityInput].forEach(input => {
        input.addEventListener('input', updateHealthInfo);
    });

    // Event listener for updating weight
    updateWeightBtn.addEventListener('click', () => {
        const newWeight = parseFloat(newWeightInput.value);
        if (newWeight) {
            weightHistory.shift();
            weightHistory.push(newWeight);
            weightChart.data.datasets[0].data = weightHistory;
            weightChart.update();
            weightInput.value = newWeight; // Update the main weight input
            updateHealthInfo(); // Recalculate health info with new weight
        }
    });

    // Create Weekly Exercise Progress Chart
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Exercise Progress',
                data: [20, 25, 30, 40, 35, 45, 50],
                backgroundColor: '#4caf50'
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Create Daily Weight Tracker Chart
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const weightChart = new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Weight',
                data: weightHistory,
                borderColor: '#007bff',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: false } }
        }
    });

    // Initial update of health info
    updateHealthInfo();
});