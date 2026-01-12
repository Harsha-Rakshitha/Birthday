// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initializeAnimations();
    shuffleGallery(); // Call the new shuffle function
    setupScrollAnimations();

    const celebrateButton = document.getElementById('celebrateButton');
    if (celebrateButton) {
        celebrateButton.addEventListener('click', () => {
            scrollToSection('cake-cutting');
        });
    }

    document.querySelectorAll(".photo-container").forEach(container => {
        const video = container.querySelector("video");
        if (!video) return;

        container.addEventListener("mouseenter", () => {
            video.muted = true;
            video.play().catch(() => {});
        });

        container.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Intersection Observer for special video loading
    const specialVideo = document.getElementById('specialVideo');
    if (specialVideo) {

        const specialVideoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    // Set the src to trigger loading
                    const sourceElement = specialVideo.querySelector('source');
                    if (sourceElement) {
                        const videoSrc = sourceElement.getAttribute('data-src');
                        if (videoSrc) {
                            specialVideo.src = videoSrc;
                            specialVideo.load();

                        } else {
                            console.error('Special video source element has no data-src attribute.');
                        }
                    } else {
                        console.error('Special video source element not found.');
                    }
                    observer.disconnect(); // Stop observing once loaded
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the video is visible

        specialVideoObserver.observe(specialVideo);

    }
});

// Happy Birthday Message Typewriter Effect
const birthdayMessageElement = document.getElementById('birthdayMessage');
const birthdayMessage = "My Dearest Rakshitha,\n\nOn this special day, I want to wish you the happiest of birthdays! You bring so much joy, love, and laughter into my life. Every moment with you is a cherished memory, and I'm incredibly grateful for your presence. May your day be filled with all the happiness you deserve, and may the year ahead be even more wonderful. I love you more than words can say! ❤️";


// Modify setupScrollAnimations to observe the message section and trigger typewriter
// (This part will be handled by modifying the existing setupScrollAnimations function)

// Function to shuffle gallery items
function shuffleGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    const photoCards = Array.from(galleryGrid.children);
    for (let i = photoCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        galleryGrid.insertBefore(photoCards[j], photoCards[i]);
    }
}

// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    const particleEmojis = ['❤️', '💕', '💖', '💗', '🌸', '🌺', '✨', '💫', '🦋'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration and delay
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particles.appendChild(particle);
    }
}

// Initialize typewriter and other animations
function initializeAnimations() {
    // Typewriter effect is handled by CSS

    // Add staggered animation delays to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });
}

function startHeroTypewriter() {
    const text = "Happy Birthday, Rakshitha! 💕";
    const element = document.getElementById("typewriter");
    let index = 0;

    element.innerHTML = "";
    element.style.width = "auto";

    const interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            element.style.borderRight = "none"; // remove cursor after finish

            // Trigger animations for other hero elements after typewriter effect
            const subtitle = document.querySelector(".hero-content .subtitle");
            const floatingHearts = document.querySelector(".hero-content .floating-hearts");
            const ctaButton = document.querySelector(".hero-content .cta-button");
            const scrollIndicator = document.querySelector(".hero-content .scroll-indicator");

            if (subtitle) {
                setTimeout(() => {
                    subtitle.classList.add("fade-in");
                }, 500); // Delay after typewriter finishes
            }
            if (floatingHearts) {
                setTimeout(() => {
                    floatingHearts.classList.add("fade-in");
                }, 1000); // Delay after subtitle
            }
            if (ctaButton) {
                setTimeout(() => {
                    ctaButton.classList.add("fade-in");
                }, 1500); // Delay after floating hearts
            }
            if (scrollIndicator) {
                setTimeout(() => {
                    scrollIndicator.classList.add("fade-in");
                }, 2000); // Delay after CTA button
            }

        }
    }, 150);
}

function animateMessageText() {
    const texts = document.querySelectorAll(".message-text");

    texts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add("fade-in-animate");
        }, index * 500);
    });
}

// Scroll animations (AOS - Animate On Scroll)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Special handling for message text
                if (entry.target.classList.contains('message-section')) {
                    animateMessageText();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('[data-aos], .section-title, .message-card, .message-section');
    elementsToObserve.forEach(element => {
        observer.observe(element);

        // Add delay based on data-delay attribute
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
    });
}



// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle like functionality for photos
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        heartIcon.textContent = '❤️';
        // Create floating heart effect
        createFloatingHeart(button);
    } else {
        heartIcon.textContent = '🤍';
    }
}

// Create floating heart animation when photo is liked
function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';

    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';

    document.body.appendChild(heart);

    // Animate the heart
    heart.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-60px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;

    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Update particles position based on scroll
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index % 3) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add mouse movement effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Subtle movement effect
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;

    const floatingHearts = document.querySelector('.floating-hearts');
    if (floatingHearts) {
        floatingHearts.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add entrance animations for photos when they come into view
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) {
                img.style.animation = 'photoEnter 0.8s ease-out forwards';
            }
        }
    });
}, { threshold: 0.2 });

// Observe all photo cards
document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});

// Add photo enter animation
const photoStyle = document.createElement('style');
photoStyle.textContent = `
    @keyframes photoEnter {
        from {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(photoStyle);

function cutCake() {
    const cake = document.querySelector(".cake-wrapper");

    if (!cake.classList.contains("cut")) {
        cake.classList.add("cut");

        startCelebration();   // emojis falling
        cakeSparkles();      // ✨ sparkles burst
        setTimeout(showPopup, 800); // popup
    }
}

function showPopup() {
    document.getElementById("birthdayPopup").classList.add("show");
}

function closePopup() {
    document.getElementById("birthdayPopup").classList.remove("show");
}

function startCelebration() {
    const emojis = ["🎉", "🎊", "💖", "💗", "🥳", "✨", "😍", "💞", "🎂", "🧁"];

    for (let i = 0; i < 40; i++) {
        const emoji = document.createElement("span");
        emoji.className = "celebration-emoji";
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDuration = (Math.random() * 2 + 2) + "s";

        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 3500);
    }
}

function cakeSparkles() {
    const sparkles = ["✨", "💖", "💫", "🌟", "💗", "🎉"];

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "sparkle";
        sparkle.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];

        sparkle.style.left = Math.random() * window.innerWidth + "px";
        sparkle.style.top = (window.innerHeight / 2) + "px";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

function unlockSite() {
    const pinInput = document.getElementById("pinInput");
    const lockScreen = document.getElementById("lockScreen");
    const hero = document.getElementById("hero");
    const lockError = document.getElementById("lockError");
    const bgMusic = document.getElementById("bgMusic");

    if (pinInput.value === "2605") {
        lockScreen.style.display = "none";
        hero.style.display = "flex";   // 🔥 show hero
        startHeroTypewriter();         // 🔥 start typewriter
        bgMusic.play().catch(() => {});
    } else {
        lockError.classList.add("show");

        const card = document.querySelector(".lock-card");
        card.classList.add("shake");

        setTimeout(() => {
            card.classList.remove("shake");
            lockError.classList.remove("show");
        }, 800);
    }
}
const specialVideo = document.getElementById("specialVideo");
const customPlayBtn = document.getElementById("customPlayBtn");
const bgMusic = document.getElementById("bgMusic");

if (specialVideo && customPlayBtn) {

    customPlayBtn.addEventListener("click", () => {
        specialVideo.play();
    });

    specialVideo.addEventListener("play", () => {
        customPlayBtn.classList.add("hide");
        if (!bgMusic.paused) {
            bgMusic.pause(); // 🎵 pause music when video plays
        }
    });

    specialVideo.addEventListener("pause", () => {
        customPlayBtn.classList.remove("hide");
        bgMusic.play().catch(()=>{}); // 🎵 resume music when paused
    });

    specialVideo.addEventListener("ended", () => {
        customPlayBtn.classList.remove("hide");
        bgMusic.play().catch(()=>{}); // 🎵 resume music when ended
    });
}


