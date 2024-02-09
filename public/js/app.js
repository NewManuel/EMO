// app.js (Client-side JavaScript)
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for emotion selector
    const emotionSelector = document.getElementById('emotionSelector');

    // Enable carousel to show all items at once
    $(emotionSelector).carousel({
        interval: false
    });

    // Enable carousel navigation on click
    $('.carousel-control-prev').on('click', function () {
        $(emotionSelector).carousel('prev');
    });

    $('.carousel-control-next').on('click', function () {
        $(emotionSelector).carousel('next');
    });

    // Add event listener for emotion selection
    emotionSelector.addEventListener('click', (event) => {
        // Handle the selected emotion based on the clicked element
        const selectedEmotion = event.target.dataset.emotion;
        if (selectedEmotion) {
            // Perform actions based on the selected emotion
            console.log(`Selected Emotion: ${selectedEmotion}`);
        }
    });
});
