// Cập nhật chỉ số Stress Level hiển thị khi kéo thanh trượt
function updateStressLevel(value) {
    document.getElementById('stress-value').textContent = value;
}

// Cập nhật chỉ số Blood Pressure hiển thị khi kéo thanh trượt
function updateBloodPressure(value) {
    document.getElementById('blood-pressure-value').textContent = value;
}

// Tính toán BMI và hiển thị giá trị
function evaluateHealth() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // cm -> m
    const bmi = (weight / (height * height)).toFixed(2);

    const heartRate = parseFloat(document.getElementById('heart-rate').value);
    const sleepQuality = parseFloat(document.getElementById('sleep-quality').value);
    const stressLevel = parseFloat(document.getElementById('stress-level').value);

    const bloodPressure = parseFloat(document.getElementById('blood-pressure').value);
    const waterIntake = parseFloat(document.getElementById('water-intake').value);

    document.getElementById('bmi-value-box').textContent = bmi;

    // Xử lý gợi ý
    let suggestions = [];
    let healthStatus = "Unknown";
    let bodyImageSrc = "styles/red_body_silhouette.png"; // Mặc định là trạng thái xấu

    if (bmi >= 18.5 && bmi <= 24.9) {
        suggestions.push(createSuggestionBox("BMI is good!", "Maintain a balanced diet.", "good"));
    } else {
        suggestions.push(createSuggestionBox("BMI is not in a healthy range.", "Consult a dietitian.", "bad"));
    }

    if (heartRate >= 60 && heartRate <= 100) {
        suggestions.push(createSuggestionBox("Heart Rate is normal.", "Maintain regular exercise.", "good"));
    } else {
        suggestions.push(createSuggestionBox("Heart Rate is abnormal.", "Consider seeing a doctor.", "bad"));
    }

    if (sleepQuality >= 7) {
        suggestions.push(createSuggestionBox("You have a good sleep schedule.", "Keep up with this routine.", "good"));
    } else {
        suggestions.push(createSuggestionBox("Consider improving your sleep quality.", "Aim for 7-9 hours of sleep.", "bad"));
    }

    if (stressLevel <= 5) {
        suggestions.push(createSuggestionBox("Stress level is manageable.", "Keep practicing relaxation techniques.", "good"));
    } else {
        suggestions.push(createSuggestionBox("Stress level is high.", "Consider relaxation or stress management techniques.", "bad"));
    }

    if (bloodPressure >= 90 && bloodPressure <= 120) {
        suggestions.push(createSuggestionBox("Blood Pressure is good.", "Keep it steady.", "good"));
    } else {
        suggestions.push(createSuggestionBox("Blood Pressure needs attention.", "Consult a doctor.", "bad"));
    }

    if (waterIntake >= 2) {
        suggestions.push(createSuggestionBox("Water intake is sufficient.", "Keep drinking enough water.", "good"));
    } else {
        suggestions.push(createSuggestionBox("Increase your water intake.", "Drink at least 2 liters a day.", "bad"));
    }

    // Cập nhật trạng thái sức khỏe tổng quan
    if (suggestions.filter(s => s.includes("good")).length >= 4) {
        healthStatus = "Good";
        bodyImageSrc = "styles/green_body_silhouette.png";
    } else if (suggestions.filter(s => s.includes("good")).length === 3) {
        healthStatus = "Medium";
        bodyImageSrc = "styles/yellow_body_silhouette.png";
    }

    document.getElementById('health-status').textContent = `Health Status: ${healthStatus}`;
    document.getElementById('body-image').src = bodyImageSrc; // Đổi hình ảnh body theo trạng thái

    document.getElementById('suggestions-box').innerHTML = suggestions.join('');
}

// Tạo ô gợi ý
function createSuggestionBox(title, message, status) {
    const statusClass = status === 'good' ? 'good-status' : 'bad-status';
    return `
        <div class="suggestion-box ${statusClass}">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
}

// Tải file báo cáo sức khỏe
function downloadHealthReport() {
    const bmi = document.getElementById('bmi-value-box').textContent;
    const heartRate = document.getElementById('heart-rate').value;
    const sleepQuality = document.getElementById('sleep-quality').value;
    const stressLevel = document.getElementById('stress-value').textContent;
    const bloodPressure = document.getElementById('blood-pressure-value').textContent;
    const waterIntake = document.getElementById('water-intake').value;
    const today = new Date().toLocaleDateString();

    const reportContent = `
        Health Report for ${today}\n
        BMI: ${bmi}\n
        Heart Rate: ${heartRate} bpm\n
        Sleep Quality: ${sleepQuality} hours\n
        Stress Level: ${stressLevel} (1-10)\n
        Blood Pressure: ${bloodPressure} mmHg\n
        Water Intake: ${waterIntake} liters\n
        Suggestions: \n
        ${document.getElementById('suggestions-box').innerText}
    `;

    const blob = new Blob([reportContent], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Health_Report_${today}.doc`;
    link.click();
}
