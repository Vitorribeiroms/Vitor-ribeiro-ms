// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event for header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    // Add fade-in class to elements that should animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
});

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');

const highlightMenu = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightMenu);

// Criar partículas dinâmicas
function createParticles() {
    const container = document.querySelector('.profile-container');
    if (!container) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    container.appendChild(particlesContainer);
    
    // Criar 15 partículas
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamanho aleatório entre 2px e 12px
        const size = Math.random() * 10 + 2;
        
        // Posição inicial aleatória na parte inferior
        const left = Math.random() * 100;
        
        // Duração da animação entre 10s e 20s
        const duration = Math.random() * 10 + 10;
        
        // Atraso aleatório até 15s
        const delay = Math.random() * 15;
        
        // Aplicar estilos inline
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = '100%';
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Adicionar partícula ao container
        particlesContainer.appendChild(particle);
    }
}

// Efeito de digitação dinâmica
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Índice da palavra atual
        const current = this.wordIndex % this.words.length;
        // Texto completo da palavra atual
        const fullTxt = this.words[current];

        // Verifica se está apagando
        if (this.isDeleting) {
            // Remove caractere
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Adiciona caractere
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insere o texto no elemento
        this.txtElement.textContent = this.txt;

        // Velocidade da digitação
        let typeSpeed = 150;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // Se a palavra estiver completa
        if (!this.isDeleting && this.txt === fullTxt) {
            // Pausa no final
            typeSpeed = this.wait;
            // Marca para deletar
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Muda para a próxima palavra
            this.wordIndex++;
            // Pausa antes de começar a digitar novamente
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Inicializar efeitos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Efeito de digitação para o nome
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        const text = element.getAttribute('data-text');
        element.setAttribute('data-words', `["${text}"]`);
        
        // Inicializa o efeito de digitação com um pequeno atraso entre as palavras
        setTimeout(() => {
            new TypeWriter(element, [text], 3000);
        }, index * 1000);
    });
});
