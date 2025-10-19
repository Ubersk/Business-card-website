// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Обработчик для кнопки призыва к действию
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Интерактивность для фоновых фигур
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX * speed * 20) - 10;
        const y = (mouseY * speed * 20) - 10;
        
        shape.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Добавляем случайные фигуры при загрузке
function createRandomShape() {
    const background = document.querySelector('.background-animation');
    const shape = document.createElement('div');
    shape.classList.add('shape');
    
    const shapes = ['circle', 'triangle', 'square', 'diamond'];
    const colors = [
        'linear-gradient(45deg, #3498db, #9b59b6)',
        'linear-gradient(45deg, #e74c3c, #e67e22)',
        'linear-gradient(45deg, #2ecc71, #3498db)',
        'linear-gradient(45deg, #f1c40f, #e67e22)',
        'linear-gradient(45deg, #9b59b6, #3498db)'
    ];
    
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    shape.style.width = Math.random() * 100 + 50 + 'px';
    shape.style.height = shape.style.width;
    shape.style.background = randomColor;
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDuration = (Math.random() * 20 + 10) + 's';
    shape.style.animationDelay = (Math.random() * 5) + 's';
    
    // Применяем форму в зависимости от случайного выбора
    switch(randomShape) {
        case 'circle':
            shape.style.borderRadius = '50%';
            break;
        case 'triangle':
            shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            break;
        case 'square':
            shape.style.borderRadius = '0';
            break;
        case 'diamond':
            shape.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
            break;
    }
    
    background.appendChild(shape);
}

// Создаем несколько случайных фигур
for(let i = 0; i < 3; i++) {
    createRandomShape();
}