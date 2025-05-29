$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

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


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["AI & ML Engineer", "Full Stack Developer", "Data Scientist", "Programmer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// <!-- vanilla tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400
});
// <!-- vanilla tilt js effect ends -->

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
srtop.reveal('.home .linkedin', { delay: 600 });
srtop.reveal('.home .github', { delay: 700 });
srtop.reveal('.home .twitter', { delay: 800 });
srtop.reveal('.home .googlescholar', { delay: 900 });
srtop.reveal('.home .facebook', { delay: 1000 });
// srtop.reveal('.home .instagram', { delay: 1100 });

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

// <!-- scroll reveal anim ends -->

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 25,
    speed: 400
});
// <!-- tilt js effect ends -->

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop_ = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop_.reveal('.home .content h3', { delay: 200 });
srtop_.reveal('.home .content p', { delay: 200 });
srtop_.reveal('.home .content .btn', { delay: 200 });

srtop_.reveal('.home .image', { delay: 300 });
srtop_.reveal('.home .socials', { delay: 600 });
srtop_.reveal('.home .social-icons', { delay: 600 });

/* SCROLL ABOUT */
srtop_.reveal('.about .image', { delay: 500 });
srtop_.reveal('.about .content h3', { delay: 500 });
srtop_.reveal('.about .content .tag', { delay: 600 });
srtop_.reveal('.about .content p', { delay: 700 });
srtop_.reveal('.about .content .box-container', { delay: 700 });
srtop_.reveal('.about .content .resumebtn', { delay: 900 });


/* SCROLL EDUCATION */
srtop_.reveal('.education .box', { interval: 200 });

/* SCROLL SKILLS */
srtop_.reveal('.skills .container', { interval: 200 });

/* SCROLL WORK */
srtop_.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop_.reveal('.experience .timeline', { delay: 400 });
srtop_.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop_.reveal('.contact .container', { delay: 400 });
srtop_.reveal('.contact .container .form-group', { delay: 400 });

/**chnages made**/


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
$("#contact-form").submit(function() {
    emailjs.sendForm("service_portfolio", "template_jv7a83i", this);
});

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

    // Keyword-based responses
    if (lowerCaseMessage.includes('skill')) {
        return "Chaitanya's skills include Languages (Python, Java, JavaScript), Web & App Development (Next.js, React, Node.js, MongoDB), AI/ML/Data Science (Scikit-learn, Pandas, NumPy), Cybersecurity, Computer Vision, and various Tools & Platforms (Git, GitHub, VS Code, etc.).";
    } else if (lowerCaseMessage.includes('education')) {
        return "Chaitanya is pursuing a Bachelor of Technology in Artificial Intelligence and Machine Learning at R. C. Patel Institute of Technology, Shirpur. He also completed his HSC and SSC from R. C. Patel institutions.";
    } else if (lowerCaseMessage.includes('project')) {
        return "Chaitanya has projects in Machine Learning, Web Development, Mobile Development, and Blockchain. You can find more details in the Projects section of the portfolio.";
    } else if (lowerCaseMessage.includes('contact')) {
        return "You can get in touch with Chaitanya via email at chaitanyasonaje0205@gmail.com, phone at +91 80100 83340, or connect with him on social media like LinkedIn, GitHub, Instagram, and Kaggle. You can also use the contact form on the website.";
    } else if (lowerCaseMessage.includes('about')) {
        return "Chaitanya is an AI & ML undergraduate based in Maharashtra, India. He is passionate about coding and developing innovative projects in AI, ML, and web development.";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return "Hello! How can I help you today?";
    } else if (lowerCaseMessage.includes('name')) {
        return "I am a chatbot here to assist you with questions about Chaitanya's portfolio.";
    } else if (lowerCaseMessage.includes('thank')) {
        return "You're welcome!";
    } else {
        return "I'm sorry, I don't understand that. I can tell you about Chaitanya's skills, education, projects, about him, or how to contact him.";
    }
}
// <!-- Chatbot JavaScript ends -->