// ===== Pricing Data =====
const pricing = {
    'flatbed': {
        'clean-dirt': 240,
        'mixed-dirt': 240,
        'asphalt-concrete': 240,
        'crushed-base': '$8/ton'
    },
    'bobtail': {
        'clean-dirt': 250,
        'mixed-dirt': 300,
        'asphalt-concrete': 300,
        'crushed-base': '$100 min'
    },
    '10wheeler': {
        'clean-dirt': 300,
        'mixed-dirt': 480,
        'asphalt-concrete': 350,
        'crushed-base': null
    },
    'modified10': {
        'clean-dirt': 300,
        'mixed-dirt': 480,
        'asphalt-concrete': 350,
        'crushed-base': null
    },
    'semi': {
        'clean-dirt': 350,
        'mixed-dirt': 530,
        'asphalt-concrete': 400,
        'crushed-base': null
    },
    'trucknpup': {
        'clean-dirt': 350,
        'mixed-dirt': 530,
        'asphalt-concrete': 400,
        'crushed-base': null
    }
};

// ===== Mobile Navigation =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking a link
nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// ===== Open/Closed Status =====
function updateStatus() {
    const statusBadge = document.getElementById('status-badge');
    const statusText = statusBadge.querySelector('.status-text');

    // Get current time in Pacific Time (Corona, CA)
    const now = new Date();
    const options = { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: 'numeric', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const timeStr = formatter.format(now);
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Get day of week (0 = Sunday, 6 = Saturday)
    const dayOptions = { timeZone: 'America/Los_Angeles', weekday: 'long' };
    const dayFormatter = new Intl.DateTimeFormat('en-US', dayOptions);
    const dayOfWeek = dayFormatter.format(now);

    const currentMinutes = hours * 60 + minutes;
    const openTime = 6 * 60;  // 6:00 AM
    const closeTime = 16 * 60; // 4:00 PM

    let isOpen = false;
    let statusMessage = '';

    // Check if it's a weekday (Mon-Fri)
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const isWeekday = weekdays.includes(dayOfWeek);

    if (dayOfWeek === 'Sunday') {
        isOpen = false;
        statusMessage = 'Closed \u2022 Opens Monday 6AM';
    } else if (dayOfWeek === 'Saturday') {
        isOpen = false;
        statusMessage = 'Saturday \u2022 By Request Only';
    } else if (isWeekday) {
        if (currentMinutes >= openTime && currentMinutes < closeTime) {
            isOpen = true;
            statusMessage = 'Open Now \u2022 Last Load 3:30PM';
        } else if (currentMinutes < openTime) {
            isOpen = false;
            statusMessage = 'Closed \u2022 Opens Today 6AM';
        } else {
            isOpen = false;
            // Determine next open day
            if (dayOfWeek === 'Friday') {
                statusMessage = 'Closed \u2022 Opens Monday 6AM';
            } else {
                statusMessage = 'Closed \u2022 Opens Tomorrow 6AM';
            }
        }
    }

    // Update the badge
    statusBadge.classList.remove('open', 'closed');
    statusBadge.classList.add(isOpen ? 'open' : 'closed');
    statusText.textContent = statusMessage;
}

// Update status on load and every minute
updateStatus();
setInterval(updateStatus, 60000);

// ===== Price Calculator =====
const truckSelect = document.getElementById('truck-size');
const materialSelect = document.getElementById('material-type');
const calculatorResult = document.getElementById('calculator-result');

function updateCalculator() {
    const truck = truckSelect.value;
    const material = materialSelect.value;

    if (!truck || !material) {
        calculatorResult.innerHTML = `
            <div class="result-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                <p>Select options above to see your estimate</p>
            </div>
        `;
        return;
    }

    const price = pricing[truck][material];

    if (price === null) {
        calculatorResult.innerHTML = `
            <div class="result-price">
                <div class="price-label">Estimated Price</div>
                <div class="price-value">N/A</div>
                <div class="price-note">This combination is not available. Please call for options.</div>
            </div>
        `;
    } else if (typeof price === 'string') {
        // Handle special pricing like "$8/ton" or "$100 min"
        calculatorResult.innerHTML = `
            <div class="result-price">
                <div class="price-label">Estimated Price</div>
                <div class="price-value">${price}</div>
                <div class="price-note">Final price based on weight at yard.</div>
            </div>
        `;
    } else {
        calculatorResult.innerHTML = `
            <div class="result-price">
                <div class="price-label">Estimated Price</div>
                <div class="price-value">$${price}</div>
                <div class="price-note">Final price determined by visual inspection at yard.</div>
            </div>
        `;
    }
}

truckSelect.addEventListener('change', updateCalculator);
materialSelect.addEventListener('change', updateCalculator);

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current FAQ
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== Email Signup Form (Mailerlite Integration) =====
const signupForm = document.getElementById('signup-form');
const formMessage = document.getElementById('form-message');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();

    // Basic validation
    if (!email) {
        showMessage('Please enter your email address.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    try {
        // Submit to Mailerlite
        const formData = new FormData();
        formData.append('fields[email]', email);
        if (name) {
            formData.append('fields[name]', name);
        }
        formData.append('ml-submit', '1');
        formData.append('anticsrf', 'true');

        const response = await fetch('https://assets.mailerlite.com/jsonp/2104197/forms/179030791540442786/subscribe', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Mailerlite doesn't support CORS, but submission still works
        });

        // Since mode is no-cors, we can't read the response, but the submission goes through
        // Show success message
        showMessage('Thank you for subscribing! We\'ll keep you updated.', 'success');
        signupForm.reset();

    } catch (error) {
        showMessage('Something went wrong. Please try again.', 'error');
    }

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== Current Year in Footer =====
// Update copyright year automatically
const currentYear = new Date().getFullYear();
const copyrightText = document.querySelector('.footer-bottom p');
if (copyrightText && currentYear > 2026) {
    copyrightText.textContent = `\u00A9 ${currentYear} 71-91, LLC. All rights reserved.`;
}
