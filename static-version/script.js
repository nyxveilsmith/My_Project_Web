// Megahand Website JavaScript

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const articlesContainer = document.getElementById('articles-container');
const locationsContainer = document.getElementById('locations-container');

// Mobile menu toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        // Update active nav link
        updateActiveNavLink(this.getAttribute('href'));
    });
});

// Update active navigation link
function updateActiveNavLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Day Progress Card functionality
function updateDayProgress() {
    const now = new Date();
    const currentTime = document.getElementById('current-time');
    const dayPercentage = document.getElementById('day-percentage');
    const dayProgress = document.getElementById('day-progress');
    const yearPercentage = document.getElementById('year-percentage');
    const yearProgress = document.getElementById('year-progress');
    const dayOfYear = document.getElementById('day-of-year');
    
    // Format time in Azerbaijani locale
    const timeString = now.toLocaleTimeString('az-AZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Calculate day progress (percentage of day completed)
    const secondsInDay = 24 * 60 * 60;
    const secondsElapsed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const dayPercent = Math.round((secondsElapsed / secondsInDay) * 100);
    
    // Calculate year progress
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const yearPercent = Math.round(((now - startOfYear) / (endOfYear - startOfYear)) * 100);
    
    // Calculate day of year
    const dayOfYearNum = Math.ceil((now - startOfYear) / (1000 * 60 * 60 * 24));
    
    // Update DOM elements
    if (currentTime) currentTime.textContent = timeString;
    if (dayPercentage) dayPercentage.textContent = `${dayPercent}%`;
    if (dayProgress) dayProgress.style.width = `${dayPercent}%`;
    if (yearPercentage) yearPercentage.textContent = `${yearPercent}%`;
    if (yearProgress) yearProgress.style.width = `${yearPercent}%`;
    if (dayOfYear) dayOfYear.textContent = dayOfYearNum;
    
    // Update theme based on time of day
    updateDayTheme(now.getHours());
}

// Update theme based on time of day
function updateDayTheme(hour) {
    const dayProgressCard = document.getElementById('day-progress-card');
    if (!dayProgressCard) return;
    
    // Remove existing theme classes
    dayProgressCard.classList.remove('morning-theme', 'afternoon-theme', 'evening-theme', 'night-theme');
    
    // Add appropriate theme class
    if (hour >= 6 && hour < 12) {
        dayProgressCard.classList.add('morning-theme');
    } else if (hour >= 12 && hour < 18) {
        dayProgressCard.classList.add('afternoon-theme');
    } else if (hour >= 18 && hour < 22) {
        dayProgressCard.classList.add('evening-theme');
    } else {
        dayProgressCard.classList.add('night-theme');
    }
}

// Load articles
async function loadArticles() {
    try {
        const response = await fetch('api/articles.php');
        const articles = await response.json();
        
        articlesContainer.innerHTML = articles.map(article => `
            <div class="article-card">
                <img src="${article.image_url || 'https://via.placeholder.com/400x200'}" 
                     alt="${article.title}" 
                     class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
                    <p class="text-gray-600 mb-4">${article.excerpt}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">${formatDate(article.created_at)}</span>
                        <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Oxu</a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-gray-500">Məqalələr yüklənərkən xəta baş verdi.</p>
            </div>
        `;
    }
}

// Load locations
async function loadLocations() {
    try {
        const response = await fetch('api/locations.php');
        const locations = await response.json();
        
        locationsContainer.innerHTML = locations.map(location => `
            <div class="location-card">
                <img src="${location.image_url || 'https://via.placeholder.com/400x200'}" 
                     alt="${location.name}" 
                     class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${location.name}</h3>
                    <p class="text-gray-600 mb-4">${location.description}</p>
                    
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            <span>${location.address}</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-phone mr-2"></i>
                            <span>${location.phone_number}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-3">
                        ${location.whatsapp_number ? `
                            <a href="https://wa.me/${location.whatsapp_number.replace(/[^0-9]/g, '')}" 
                               class="text-green-600 hover:text-green-800">
                                <i class="fab fa-whatsapp text-xl"></i>
                            </a>
                        ` : ''}
                        ${location.instagram_account ? `
                            <a href="https://instagram.com/${location.instagram_account.replace('@', '')}" 
                               class="text-pink-600 hover:text-pink-800">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                        ` : ''}
                        ${location.map_url ? `
                            <a href="${location.map_url}" 
                               class="text-blue-600 hover:text-blue-800">
                                <i class="fas fa-map text-xl"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading locations:', error);
        locationsContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-gray-500">Filiallar yüklənərkən xəta baş verdi.</p>
            </div>
        `;
    }
}

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
        submitButton.textContent = 'Göndərilir...';
        submitButton.disabled = true;
        
        const response = await fetch('api/contact.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Mesajınız uğurla göndərildi!', 'success');
            contactForm.reset();
        } else {
            showAlert(result.message || 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.', 'error');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showAlert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Show alert messages
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert before the contact form
    contactForm.parentNode.insertBefore(alertDiv, contactForm);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fade in animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update day progress immediately and then every second
    updateDayProgress();
    setInterval(updateDayProgress, 1000);
    
    // Load content
    loadArticles();
    loadLocations();
    
    // Add fade-in class to elements
    document.querySelectorAll('.article-card, .location-card, .about-card').forEach(el => {
        el.classList.add('fade-in');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
});