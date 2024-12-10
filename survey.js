document.getElementById('fitness-survey').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const fitnessGoal = document.getElementById('fitness-goal').value;
    const exerciseTime = document.getElementById('exercise-time').value;
    const fitnessLevel = document.querySelector('input[name="fitness-level"]:checked');

    if (!weight || !height || !fitnessGoal || !exerciseTime || !fitnessLevel) {
        alert('Please fill out all fields');
        return;
    }

    // Here you can add code to submit the form data to your server or process it further
    console.log('Survey submitted:', {
        weight,
        height,
        fitnessGoal,
        exerciseTime,
        fitnessLevel: fitnessLevel.value
    });

    alert('Thank you for submitting the survey!');
});