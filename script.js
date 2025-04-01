const weightInput = document.getElementById('weightInput');
const rotatingImage = document.getElementById('rotatingImage');
const infoText = document.getElementById('infoText');
const rotationAudio = document.getElementById('rotationAudio');
const checkWeightButton = document.getElementById('checkWeightButton');

// Ocultar la imagen al inicio
rotatingImage.style.display = 'none';

// Function to start or update rotation
function updateRotation() {
    // Get the weight value
    const weight = parseFloat(weightInput.value);
    
    // Validate input
    if (isNaN(weight) || weight <= 0) {
        rotatingImage.style.animation = 'none';
        rotatingImage.style.display = 'none'; // Asegúrate de ocultar la imagen
        infoText.textContent = 'Por favor, ingresa un peso válido mayor que 0.';
        return;
    }

    // Check if weight is greater than 100 kg
    if (weight > 100) {
        // Set duration to 15 seconds for the animation
        const duration = 5; // seconds
        
        // Apply the animation
        rotatingImage.style.animation = `rotate ${duration}s linear infinite`;
        
        // Mostrar la imagen
        rotatingImage.style.display = 'block';
        
        // Play audio
        rotationAudio.currentTime = 0; // Reset audio to start
        rotationAudio.play().catch(error => {
            console.error('Error reproduciendo el audio:', error);
        });
        
        // Update info text
        infoText.textContent = `Peso: ${weight} kg - ¡Escucha esto!`;
    } else {
        // Stop rotation and audio if weight is 100 kg or less
        rotatingImage.style.animation = 'none';
        rotatingImage.style.display = 'none'; // Ocultar la imagen
        rotationAudio.pause();
        rotationAudio.currentTime = 0; // Reset audio to start
        infoText.textContent = 'El peso debe ser mayor a 100 kg para comenzar la rotación.';
    }
}

// Listen for button click to check weight
checkWeightButton.addEventListener('click', updateRotation);

// Audio event listeners
rotationAudio.addEventListener('play', () => {
    console.log('Audio comenzó a reproducirse');
});

rotationAudio.addEventListener('ended', () => {
    console.log('La reproducción de audio ha terminado');
});
