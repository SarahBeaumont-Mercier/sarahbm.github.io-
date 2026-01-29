/**
 * =================================================================
 * SCRIPTS DU PORTFOLIO | PORTFOLIO SCRIPTS
 * =================================================================
 * 
 * Auteure | Author: Sarah Beaumont-Mercier
 * 
 * Architecture:
 *   - Modules ES6+ | ES6+ Modules
 *   - Principes Clean Code | Clean Code Principles
 *   - Délégation d'événements | Event Delegation
 * 
 * Modules:
 *   1. Basculement de langue | Language Toggle
 *   2. Navigation mobile | Mobile Navigation
 *   3. Défilement fluide | Smooth Scroll
 *   4. Animations au scroll | Scroll Animations
 * 
 * =================================================================
 */
 
/* =================================================================
   INITIALISATION | INITIALIZATION
   
   Point d'entrée principal | Main entry point
   ================================================================= */
 
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser tous les modules | Initialize all modules
    initLanguageToggle();
    initMobileNavigation();
    initSmoothScroll();
    initScrollAnimations();
    
    console.log('Portfolio initialisé | Portfolio initialized');
});
 
/* =================================================================
   1. BASCULEMENT DE LANGUE | LANGUAGE TOGGLE
   
   Gère le changement entre français et anglais
   Handles switching between French and English
   ================================================================= */
 
function initLanguageToggle() {
    // Sélectionner les boutons de langue | Select language buttons
    const langButtons = document.querySelectorAll('.lang-toggle__btn');
    
    // Vérifier si les boutons existent | Check if buttons exist
    if (langButtons.length === 0) return;
    
    // Charger la langue sauvegardée | Load saved language
    const savedLang = localStorage.getItem('portfolio-lang') || 'fr';
    setLanguage(savedLang);
    
    // Ajouter les écouteurs d'événements | Add event listeners
    langButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}
 
/**
 * Définir la langue active | Set active language
 * @param {string} lang - Code de langue ('fr' ou 'en') | Language code ('fr' or 'en')
 */
function setLanguage(lang) {
    // Mettre à jour le body | Update body class
    if (lang === 'fr') {
        document.body.classList.add('lang-fr');
        document.body.classList.remove('lang-en');
    } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-fr');
    }
    
    // Mettre à jour les boutons actifs | Update active buttons
    const langButtons = document.querySelectorAll('.lang-toggle__btn');
    langButtons.forEach(function(button) {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('lang-toggle__btn--active');
        } else {
            button.classList.remove('lang-toggle__btn--active');
        }
    });
    
    // Mettre à jour le contenu textuel | Update text content
    updateTextContent(lang);
    
    // Sauvegarder la préférence | Save preference
    localStorage.setItem('portfolio-lang', lang);
    
    // Mettre à jour l'attribut lang du HTML | Update HTML lang attribute
    document.documentElement.lang = lang;
}
 
/**
 * Mettre à jour le contenu textuel | Update text content
 * @param {string} lang - Code de langue | Language code
 */
function updateTextContent(lang) {
    // Sélectionner tous les éléments avec data-fr et data-en
    // Select all elements with data-fr and data-en
    const elements = document.querySelectorAll('[data-fr][data-en]');
    
    elements.forEach(function(element) {
        const text = element.getAttribute('data-' + lang);
        if (text) {
            element.textContent = text;
        }
    });
}
 
/* =================================================================
   2. NAVIGATION MOBILE | MOBILE NAVIGATION
   
   Gère le menu hamburger sur mobile
   Handles hamburger menu on mobile
   ================================================================= */
 
function initMobileNavigation() {
    // Sélectionner les éléments | Select elements
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    
    // Vérifier si les éléments existent | Check if elements exist
    if (!toggle || !menu) return;
    
    // Ajouter l'écouteur au bouton | Add listener to button
    toggle.addEventListener('click', function() {
        // Basculer la classe d'ouverture | Toggle open class
        menu.classList.toggle('navbar__menu--open');
        
        // Mettre à jour l'accessibilité | Update accessibility
        const isOpen = menu.classList.contains('navbar__menu--open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Fermer le menu au clic sur un lien | Close menu on link click
    const menuLinks = menu.querySelectorAll('.navbar__link');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('navbar__menu--open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}
 
/* =================================================================
   3. DÉFILEMENT FLUIDE | SMOOTH SCROLL
   
   Gère le défilement fluide vers les ancres
   Handles smooth scrolling to anchors
   ================================================================= */
 
function initSmoothScroll() {
    // Sélectionner tous les liens d'ancre | Select all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Obtenir l'ID cible | Get target ID
            const targetId = this.getAttribute('href');
            
            // Ignorer si c'est juste "#" | Ignore if just "#"
            if (targetId === '#') return;
            
            // Trouver l'élément cible | Find target element
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Empêcher le comportement par défaut | Prevent default
                event.preventDefault();
                
                // Calculer la position avec offset pour la navbar
                // Calculate position with offset for navbar
                const navbarHeight = 70;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Défiler vers la cible | Scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
 
/* =================================================================
   4. ANIMATIONS AU SCROLL | SCROLL ANIMATIONS
   
   Anime les éléments quand ils apparaissent à l'écran
   Animates elements when they appear on screen
   ================================================================= */
 
function initScrollAnimations() {
    // Sélectionner les éléments à animer | Select elements to animate
    const animatedElements = document.querySelectorAll('.skill-card, .cert-card, .project-card');
    
    // Vérifier si l'API IntersectionObserver est supportée
    // Check if IntersectionObserver API is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: afficher tous les éléments | Fallback: show all elements
        animatedElements.forEach(function(el) {
            el.style.opacity = '1';
        });
        return;
    }
    
    // Options de l'observateur | Observer options
    const observerOptions = {
        root: null, // Viewport
        rootMargin: '0px',
        threshold: 0.1 // Déclencher quand 10% visible | Trigger when 10% visible
    };
    
    // Créer l'observateur | Create observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Ajouter la classe d'animation | Add animation class
                entry.target.classList.add('animate-fade-in');
                // Arrêter d'observer cet élément | Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer chaque élément | Observe each element
    animatedElements.forEach(function(element) {
        // Cacher initialement | Initially hide
        element.style.opacity = '0';
        // Commencer à observer | Start observing
        observer.observe(element);
    });
}
 
/* =================================================================
   UTILITAIRES | UTILITIES
   
   Fonctions utilitaires réutilisables
   Reusable utility functions
   ================================================================= */
 
/**
 * Débounce une fonction | Debounce a function
 * Empêche l'exécution trop fréquente | Prevents too frequent execution
 * 
 * @param {Function} func - Fonction à débouncer | Function to debounce
 * @param {number} wait - Délai en ms | Delay in ms
 * @returns {Function} Fonction débouncée | Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}
 
/**
 * Vérifier si un élément est visible dans le viewport
 * Check if an element is visible in the viewport
 * 
 * @param {Element} element - Élément à vérifier | Element to check
 * @returns {boolean} Vrai si visible | True if visible
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
