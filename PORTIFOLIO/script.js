// script.js

// ===== FUNÇÕES GERAIS =====
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Inicializar funcionalidades
    initMenu();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    initContactForm();
    initThemeToggle();
});

// ===== MENU RESPONSIVO =====
function initMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ===== HEADER DINÂMICO =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// ===== ANIMAÇÕES AO SCROLL =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('form-contato');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        
        let isValid = true;
        
        if (!name.value.trim()) {
            showError(name, 'Por favor, insira seu nome');
            isValid = false;
        }
        
        if (!isValidEmail(email.value)) {
            showError(email, 'Por favor, insira um email válido');
            isValid = false;
        }
        
        if (!message.value.trim() || message.value.trim().length < 10) {
            showError(message, 'A mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        if (isValid) {
            // Simular envio
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular atraso de rede
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                
                // Reset após 2 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                    
                    // Feedback visual
                    showSuccessMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                }, 2000);
            }, 1500);
        }
    });
    
    // Remover mensagens de erro ao digitar
    contactForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, message) {
    clearError(input);
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    
    input.parentNode.appendChild(error);
    input.style.borderColor = '#e74c3c';
}

function clearError(input) {
    const error = input.parentNode.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.style.borderColor = '';
}

function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    successMsg.style.backgroundColor = '#2ecc71';
    successMsg.style.color = 'white';
    successMsg.style.padding = '15px';
    successMsg.style.borderRadius = '5px';
    successMsg.style.textAlign = 'center';
    successMsg.style.marginTop = '20px';
    successMsg.style.opacity = '0';
    successMsg.style.transform = 'translateY(10px)';
    successMsg.style.transition = 'all 0.3s ease';
    
    const form = document.getElementById('form-contato');
    form.parentNode.insertBefore(successMsg, form.nextSibling);
    
    // Animar entrada
    setTimeout(() => {
        successMsg.style.opacity = '1';
        successMsg.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover após 5 segundos
    setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            successMsg.remove();
        }, 300);
    }, 5000);
}

// ===== TOGGLE DE TEMA CLARO/ESCURO =====
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Alternar tema';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.backgroundColor = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    themeToggle.style.display = 'flex';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.fontSize = '1.2rem';
    
    document.body.appendChild(themeToggle);
    
    // Verificar preferência do sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ===== ATUALIZAR LINK DO LINKEDIN =====
function updateSocialLinks() {
    // Atualizar links com seu perfil real
    const githubLink = 'https://github.com/V-Magave';
    const instagramLink = 'https://instagram.com/seuuser';
    const linkedinLink = 'https://linkedin.com/in/seuuser';
    
    document.querySelectorAll('[href="#"]').forEach(link => {
        if (link.querySelector('.fa-github')) {
            link.href = githubLink;
        }
        else if (link.querySelector('.fa-linkedin')) {
            link.href = linkedinLink;
        }
        else if (link.querySelector('.fa-instagram')) {
            link.href = instagramLink;
        }
    });
}

// Chame esta função quando quiser atualizar os links
updateSocialLinks();
