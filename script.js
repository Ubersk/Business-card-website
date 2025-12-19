// DOM готов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    initNavigation();
    initSkillBars();
    initContactForm();
    initScrollToTop();
    initScrollSpy();
    initAnimations();
});

// Навигация
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Переключение меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Анимация навыков
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Активация анимации при прокрутке
    function animateSkillBars() {
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            const rect = skill.getBoundingClientRect();
            
            // Если элемент виден на экране
            if (rect.top < window.innerHeight - 100) {
                skill.style.width = level + '%';
            }
        });
    }
    
    // Запуск при загрузке и при прокрутке
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

// Форма обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получение данных формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // В реальном приложении здесь был бы AJAX-запрос
            // Имитация отправки
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Спасибо, ${name}! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Кнопка "Наверх"
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Показать/скрыть кнопку при прокрутке
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Прокрутка наверх
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Подсветка активного раздела в навигации
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Дополнительные анимации
function initAnimations() {
    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category, .contact-container');
    
    function checkAnimation() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Установка начального состояния
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Проверка при загрузке и прокрутке
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);
    
    // Анимация плавающих элементов
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Установка случайной задержки для каждого элемента
        element.style.animationDelay = `${index * 0.5}s`;
    });
}
