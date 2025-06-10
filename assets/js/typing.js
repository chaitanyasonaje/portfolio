document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const words = ['AI & ML Engineer', 'Full Stack Developer', 'Data Scientist', 'Programmer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500; // Pause before typing next word
        }

        setTimeout(type, typingDelay);
    }

    // Start typing animation
    setTimeout(type, 1000);
}); 