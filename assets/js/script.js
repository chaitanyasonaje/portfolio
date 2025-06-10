$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Close navbar when a navigation link is clicked
    $('.navbar ul li a').on('click', function() {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

    // <!-- scroll reveal anim starts -->
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL HOME */
    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });

    srtop.reveal('.home .image', { delay: 300 });
    srtop.reveal('.home .linkedin', { delay: 600 });
    srtop.reveal('.home .github', { delay: 700 });
    srtop.reveal('.home .twitter', { delay: 800 });
    srtop.reveal('.home .googlescholar', { delay: 900 });
    srtop.reveal('.home .facebook', { delay: 1000 });
    // srtop.reveal('.home .instagram', { delay: 1100 });
    srtop.reveal('.home .socials', { delay: 600 });
    srtop.reveal('.home .social-icons', { delay: 600 });

    /* SCROLL ABOUT */
    srtop.reveal('.about .image', { delay: 500 });
    srtop.reveal('.about .content h3', { delay: 500 });
    srtop.reveal('.about .content .tag', { delay: 600 });
    srtop.reveal('.about .content p', { delay: 700 });
    srtop.reveal('.about .content .box-container', { delay: 700 });
    srtop.reveal('.about .content .resumebtn', { delay: 900 });


    /* SCROLL EDUCATION */
    srtop.reveal('.education .box', { interval: 200 });

    /* SCROLL SKILLS */
    srtop.reveal('.skills .container', { interval: 200 });

    /* SCROLL WORK */
    srtop.reveal('.work .box', { interval: 200 });

    /* SCROLL EXPERIENCE */
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });

    /* SCROLL CONTACT */
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });

    /**chnages made**/

    // Typing animation
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

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Chaitanya Sonaje";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

window.onload = function() {
// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["AI & ML Engineer", "Full Stack Developer", "Data Scientist", "Programmer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 1000,
    cursorChar: '|',
    autoInsertCss: true,
    smartBackspace: true
});
// <!-- typed js effect ends -->
};

// <!-- vanilla tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400
});
// <!-- vanilla tilt js effect ends -->

/* ===== SCROLL top button===== */
$(window).scroll(function(){
  if($(window).scrollTop() > 600){
    $('#scroll-top').addClass('active');
  }else{
    $('#scroll-top').removeClass('active');
  }
});

// smooth scrolling
$('a[href*="#"]').on('click',function(e){
  e.preventDefault();
  $('html, body').animate({
    scrollTop : $('' + this.hash + '').offset().top,
  },
    500,
    'linear'
  );
});


// <!-- emailjs to mail contact form -->
// $("#contact-form").submit(function() {
//     emailjs.sendForm("service_portfolio", "template_jv7a83i", this);
// });

// <!-- === FONT AWESOME ALIAS === -->
// The alias for the icon is `fas fa-code`. This is already correct. No change needed.
// The alias for the icon is `fas fa-brain`. This is already correct. No change needed.
// The alias for the icon is `fas fa-microchip`. This is already correct. No change needed.


// <!-- SCROLL CARDS -->
// <!-- TILT.JS FOR PROJECTS -->

// function scrollCard(elementId) {
//     const element = document.getElementById(elementId);
//     element.scrollIntoView({
//         behavior: 'smooth'
//     });
// }


// <!-- Isotope js-->
// $(document).ready(function(){
//     $('.button-group').each( function( i, buttonGroup ) {
//       var $buttonGroup = $( buttonGroup );
//       $buttonGroup.on( 'click', 'button', function() {
//         $buttonGroup.find('.is-checked').removeClass('is-checked');
//         $( this ).addClass('is-checked');
//       });
//     });
//   });

// Function to filter projects
// $(document).ready(function() {
//     var $grid = $('.box-container').isotope({
//         itemSelector: '.box',
//         layoutMode: 'fitRows'
//     });

//     $('.button-group').on('click', 'button', function() {
//         var filterValue = $(this).attr('data-filter');
//         $grid.isotope({ filter: filterValue });
//     });
// });

const fetchProjects = () => {
    fetch('projects/projects.json')
        .then(response => response.json())
        .then(data => {
            const mlProjectsList = document.getElementById('ml-projects-list');
            const webProjectsList = document.getElementById('web-projects-list');
            const mobileProjectsList = document.getElementById('mobile-projects-list');
            const blockchainProjectsList = document.getElementById('blockchain-projects-list');

            data.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.classList.add('project-item');

                let formattedDate = '';
                if (project.updated_at) {
                    const date = new Date(project.updated_at);
                    const options = { year: 'numeric', month: 'long' };
                    formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
                }

                projectItem.innerHTML = `
                    <div class="content">
                        <h4>${project.name}</h4>
                        <p>${project.desc}</p>
                        ${formattedDate ? `<p class="project-update-time">${formattedDate}</p>` : ''}
                        <div class="project-links">
                            ${project.links.code ? `<a href="${project.links.code}" class="btn" target="_blank">View on GitHub <i class="fas fa-code"></i></a>` : ''}
                            ${project.links.view ? `<a href="${project.links.view}" class="btn" target="_blank">Live <i class="fas fa-eye"></i></a>` : ''}
                        </div>
                    </div>
                `;

                // Append project to the correct category list
                switch (project.category) {
                    case 'ml':
                        mlProjectsList.appendChild(projectItem);
                        break;
                    case 'web':
                        webProjectsList.appendChild(projectItem);
                        break;
                    case 'mobile':
                        mobileProjectsList.appendChild(projectItem);
                        break;
                    case 'blockchain':
                        blockchainProjectsList.appendChild(projectItem);
                        break;
                    // Add cases for other categories if needed
                }
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
};

fetchProjects();

const fetchCompStats = () => {
    fetch('comp_stats.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('#competitive .container');
            data.forEach(platform => {
                const card = document.createElement('div');
                card.classList.add('competitive-card');

                let statsHtml = '';
                platform.stats.forEach(stat => {
                    statsHtml += `<p><i class="${stat.icon}"></i> ${stat.label}: ${stat.value}</p>`;
                });

                card.innerHTML = `
                    <div class="competitive-logo">
                        <i class="${platform.logo_icon}"></i>
                    </div>
                    <div class="competitive-content">
                        <h4>${platform.platform}</h4>
                        ${statsHtml}
                        <a href="${platform.link}" target="_blank" class="btn">Visit Profile <i class="fas fa-external-link-alt"></i></a>
                    </div>
                `;

                container.appendChild(card);
            });
             // Reinitialize ScrollReveal to include the new cards
            ScrollReveal().sync();
        })
        .catch(error => console.error('Error fetching competitive stats:', error));
};

fetchCompStats();

// <!-- Chatbot JavaScript starts -->
const chatbotIcon = document.querySelector('.chatbot-icon');
const chatWindow = document.querySelector('.chat-window');
const closeChat = document.querySelector('.close-chat');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-window input[type="text"]');
const sendBtn = document.querySelector('.chat-window .send-btn');

chatbotIcon.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // Add user message to chat body
    appendMessage(userMessage, 'user-message');

    // Get bot response
    const botResponse = getBotResponse(userMessage);
    // Add bot response to chat body
    setTimeout(() => {
        appendMessage(botResponse, 'bot-message');
    }, 500); // Simulate typing delay

    // Clear input
    chatInput.value = '';
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

function appendMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Responses for greetings
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
        return "Hello! I'm here to help you navigate Chaitanya's portfolio. What would you like to know about him?";
    } else if (lowerCaseMessage.includes('how are you')) {
        return "I'm a bot, so I don't have feelings, but I'm ready to assist you! How can I help?";
    } else if (lowerCaseMessage.includes('your name')) {
        return "I am a chatbot designed to answer questions about Chaitanya Sonaje's portfolio. You can ask me about his skills, education, projects, or how to contact him.";
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
        return "You're most welcome! Is there anything else I can assist you with?";
    }

    // Responses for specific sections/information
    if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('expertise') || lowerCaseMessage.includes('proficient')) {
        return "Chaitanya possesses a diverse skill set! His expertise includes: <ul><li><b>Languages:</b> Python, Java, JavaScript, TypeScript, HTML, CSS, SQL, PL/SQL</li><li><b>Web & App Development:</b> Next.js, React.js, Node.js, Flask, MongoDB, REST APIs</li><li><b>AI/Machine Learning/Data Science:</b> Scikit-learn, Pandas, NumPy, Matplotlib, OpenCV, Tesseract OCR</li><li><b>Cybersecurity & Cryptography:</b> AES, DES, RC4, Blowfish, SHA-256, Web3 Concepts</li><li><b>Computer Vision/OCR/Smart Systems:</b> OpenCV, AR.js, Tesseract OCR, ANPR, Image Preprocessing, Real-time Processing</li><li><b>Tools & Platforms:</b> Git, GitHub, VS Code</li></ul> He's always keen to learn new technologies!";
    } else if (lowerCaseMessage.includes('education') || lowerCaseMessage.includes('study') || lowerCaseMessage.includes('college') || lowerCaseMessage.includes('school')) {
        return "Chaitanya is currently pursuing a Bachelor of Technology in Artificial Intelligence and Machine Learning at R. C. Patel Institute of Technology, Shirpur. He also completed his HSC and SSC from R. C. Patel institutions, laying a strong foundation for his technical journey.";
    } else if (lowerCaseMessage.includes('project') || lowerCaseMessage.includes('work') || lowerCaseMessage.includes('portfolio') || lowerCaseMessage.includes('developed')) {
        return "Chaitanya has undertaken a variety of exciting projects across different domains. His portfolio showcases work in: <ul><li><b>Machine Learning:</b> Building intelligent models and systems.</li><li><b>Web Development:</b> Creating dynamic and responsive web applications.</li><li><b>Mobile Development:</b> Developing user-friendly mobile apps.</li><li><b>Blockchain:</b> Exploring decentralized applications.</li></ul> You can delve into the details of each project in the 'Work' or 'Projects' section of his portfolio.";
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach out') || lowerCaseMessage.includes('email') || lowerCaseMessage.includes('phone') || lowerCaseMessage.includes('social media')) {
        return "You can easily connect with Chaitanya! Here are a few ways: <ul><li><b>Email:</b> chaitanyasonaje0205@gmail.com</li><li><b>Phone:</b> +91 80100 83340</li><li><b>Social Media:</b> Find him on LinkedIn, GitHub, Instagram, and Kaggle.</li></ul> Don't hesitate to use the dedicated contact form on the website for direct inquiries!";
    } else if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('who is chaitanya') || lowerCaseMessage.includes('background')) {
        return "Chaitanya Sonaje is an aspiring AI & ML Engineer based in Maharashtra, India. He's passionate about leveraging his coding skills to develop innovative solutions in AI, Machine Learning, and web development. He's constantly learning and working on projects to enhance his capabilities and explore new horizons in technology.";
    } else if (lowerCaseMessage.includes('experience')) {
        return "Chaitanya's experience spans across various projects and learning endeavors in AI, ML, and web development. While he is currently an undergraduate, he has hands-on experience building web apps, machine learning models, and full-stack applications.";
    } else if (lowerCaseMessage.includes('resume') || lowerCaseMessage.includes('cv')) {
        return "You can view or download Chaitanya's resume directly from the 'About Me' section of the portfolio. It provides a comprehensive overview of his academic background, skills, and projects.";
    } else if (lowerCaseMessage.includes('hobbies') || lowerCaseMessage.includes('interests')) {
        return "Beyond coding, Chaitanya enjoys exploring new technologies, contributing to open-source projects, and continuously expanding his knowledge base in AI and web development.";
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
        return "You're most welcome! Feel free to ask if you have any more questions.";
    }

    // Fallback response
    return "I'm sorry, I don't quite understand that. I can provide information about Chaitanya's skills, education, projects, about him, how to contact him, or his experience. Could you please rephrase your question?";
}
// <!-- Chatbot JavaScript ends -->