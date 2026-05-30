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
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling (optional - can be enhanced later)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // The form will submit to PHP handler
        // You can add additional validation here if needed
        console.log('Form submitted');
    });
}
const topBtn = document.getElementById("scrollToTop");

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Wir weisen die Klasse allen Karten und Texten zu
document.querySelectorAll('.section-card, .text-left-tertiary, .text-right-tertiary').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
});
const textElement = document.getElementById("typewriter");
const words = ["Schlotter du Hund", "Hurensohn", "lech ma ayy", "Jo elias, smoke jetzt einen","du missgeburt", 
    "steckdosenbefruchter", "eliya der arbeitslose", "461 4 live", "das homo shit", "n word"];
let wordIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < words[wordIndex].length) {
        textElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        textElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

type(); // Startet den Effekt

// Effekt: Subtiler Parallax im Header
const header = document.querySelector('header');
const headerContent = document.querySelector('header div');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Bewege den Hintergrund leicht nach unten
    header.style.backgroundPositionY = `${scrolled * 0.5}px`;
    
    // Bewege den Inhalt leicht nach oben und blende ihn aus
    headerContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    headerContent.style.opacity = 1 - (scrolled / 500); // Optional: Text wird transparenter
});

// Effekt: Scroll-Progress Bar
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Gesamthöhe der Seite minus Fensterhöhe
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Wie weit wurde gescrollt
    const progress = (window.scrollY / totalHeight) * 100;
    
    // Breite des Balkens anpassen
    progressBar.style.width = `${progress}%`;
});

/*const btn = document.getElementById('theme-toggle');
let isDark = true;

btn.addEventListener('click', () => {
    if (isDark) {
        document.documentElement.style.setProperty('--primary-color', '#f5deb3');
        document.documentElement.style.setProperty('--secondary-color', '#ffa07a');
        document.documentElement.style.setProperty('--tertiaery-color', '#ff6b6b');
        document.documentElement.style.setProperty('--text-color', '#f5deb3');
        document.documentElement.style.setProperty('--light-bg', '#1a6b8a');
        document.documentElement.style.setProperty('--white', '#0a3d5c');
    } else {
        document.documentElement.style.setProperty('--primary-color', '#0a3d5c');
        document.documentElement.style.setProperty('--secondary-color', '#1a6b8a');
        document.documentElement.style.setProperty('--tertiaery-color', '#ff6b6b');
        document.documentElement.style.setProperty('--text-color', '#0a3d5c');
        document.documentElement.style.setProperty('--light-bg', '#ffa07a');
        document.documentElement.style.setProperty('--white', '#f5deb3');
    }
    isDark = !isDark;
});*/

const sections = document.querySelectorAll('main div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const images = document.querySelectorAll('.bildplatzhalter');

images.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        
        // Position der Maus innerhalb des Bildes
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        // Berechnung: Wir nehmen die Mitte des Bildes als Nullpunkt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Der Teiler (100) bestimmt die Stärke. Höher = Schwächer.
        const rotateX = (y - centerY) / 20; 
        const rotateY = (x - centerX) / 20;

        img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener('mouseleave', () => {
        // Sanft zurücksetzen
        img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

const observerOptions = {
    threshold: 0.3 // 30% der Sektion müssen sichtbar sein
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target.querySelector('.parallax-element');
        
        if (entry.isIntersecting) {
            // Wenn die Sektion ins Bild kommt -> Einblenden
            element.classList.add('show');
        } else {
            // Wenn die Sektion das Bild verlässt -> Ausblenden
            element.classList.remove('show');
        }
    });
}, observerOptions);

// Alle Trigger-Sektionen beobachten
document.querySelectorAll('.scroll-trigger-section').forEach(section => {
    scrollObserver.observe(section);
});

window.addEventListener('scroll', () => {
    const ascii = document.querySelector('.ascii-art');
    const parent = ascii.parentElement;
    const rect = parent.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Das Bild bewegt sich innerhalb seines Rahmens leicht mit (Parallax)
        const shift = (rect.top / window.innerHeight) * 100;
        ascii.style.transform = `translateY(${shift}px) scale(1.2)`;
    }
});

const btn = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-name');

// 1. Alle verfügbaren Themes in einer Liste speichern
const themes = ['light', 'dark'];
let currentIndex = 0;

btn.addEventListener('click', () => {
  // 2. Index erhöhen (und zurück auf 0, wenn am Ende angekommen)
  currentIndex = (currentIndex + 1) % themes.length;
  
  // 3. Das neue Theme auswählen
  const newTheme = themes[currentIndex];
  
  // 4. Auf den Body anwenden
  document.body.setAttribute('data-theme', newTheme);
  
  // 5. Text im Button aktualisieren (erster Buchstabe groß)
  themeText.textContent = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
});