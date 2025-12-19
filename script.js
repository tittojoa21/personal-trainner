// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENÚ HAMBURGUESA ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // ========== CARRUSEL DE FRASES MOTIVACIONALES ==========
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // Función para mostrar un slide específico
    function showSlide(n) {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover clase active de todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Ajustar índice si es necesario
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Mostrar slide actual y activar dot correspondiente
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Función para avanzar al siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Función para retroceder al slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners para botones de navegación
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Función para iniciar el carrusel automático
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }
    
    // Función para reiniciar el intervalo
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Iniciar el carrusel automático
    startSlideInterval();
    
    // Pausar el carrusel al pasar el mouse
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            startSlideInterval();
        });
    }
    
    // ========== MODAL PARA EL TÍTULO ==========
    const certificadoImg = document.querySelector('.certificado-img');
    const modal = document.getElementById('certificado-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (certificadoImg && modal) {
        // Abrir modal al hacer clic en la imagen
        certificadoImg.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Cerrar modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Cerrar modal al hacer clic fuera de la imagen
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ========== ANIMACIÓN DE SCROLL SUAVE ==========
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
    
    // ========== ANIMACIÓN AL SCROLL ==========
    // Observador de intersección para animar elementos al entrar en vista
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de about
    document.querySelectorAll('.about-card').forEach(card => {
        observer.observe(card);
    });
    
    // ========== EFECTO DE SCROLL EN EL HEADER ==========
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.padding = '1rem 0';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.padding = '1.5rem 0';
        }
    });
    
    // ========== INICIALIZACIÓN ==========
    console.log("Página de Luciana Gala - Personal Trainer cargada correctamente");
    console.log("Matrícula profesional: 00004439");
    
    // Mostrar mensaje de bienvenida
    setTimeout(function() {
        console.log("¡Bienvenido a la página de Luciana Gala! Personal Trainer Certificada - Matrícula N° 00004439");
    }, 1000);
    
    // Prevenir errores si la imagen no existe
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.src.includes('titulo-mama.jpg')) {
            console.warn('La imagen del título no se pudo cargar. Verifica que el archivo "titulo-mama.jpg" esté en la misma carpeta.');
            const certificadoContainer = document.querySelector('.certificado-container');
            if (certificadoContainer) {
                certificadoContainer.innerHTML = `
                    <div class="image-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>La imagen del título no se pudo cargar</p>
                        <p>Matrícula: <strong>00004439</strong></p>
                    </div>
                `;
            }
        }
    }, true);
});