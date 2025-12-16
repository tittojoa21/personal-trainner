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
    
    // Observar las tarjetas de frases
    document.querySelectorAll('.quote-card').forEach(card => {
        observer.observe(card);
    });
    
    // ========== FUNCIONALIDAD PARA CARGAR TÍTULO Y MATRÍCULA ==========
    // Esta función simula la carga de datos desde una fuente externa
    // En un caso real, estos datos vendrían de una base de datos o API
    
    function cargarInformacionProfesional() {
        // Simulamos una demora de carga (2 segundos)
        setTimeout(function() {
            // En un caso real, aquí harías una petición a un servidor
            // Por ahora, usamos datos de ejemplo
            
            const tituloPlaceholder = document.getElementById('titulo-placeholder');
            const matriculaPlaceholder = document.getElementById('matricula-placeholder');
            
            // Datos de ejemplo - puedes reemplazarlos con los reales
            const tituloEjemplo = "Personal Trainer Certificada";
            const matriculaEjemplo = "MAT-2023-7890";
            
            // Actualizar los placeholders con la información
            if (tituloPlaceholder) {
                tituloPlaceholder.innerHTML = `
                    <p><i class="fas fa-graduation-cap"></i> ${tituloEjemplo}</p>
                    <p class="info-note">(Esta información se cargará automáticamente cuando esté disponible)</p>
                `;
            }
            
            if (matriculaPlaceholder) {
                matriculaPlaceholder.innerHTML = `
                    <p><i class="fas fa-id-badge"></i> ${matriculaEjemplo}</p>
                    <p class="info-note">(Esta información se cargará automáticamente cuando esté disponible)</p>
                `;
            }
            
            console.log("Información profesional cargada (datos de ejemplo)");
            
        }, 2000); // Simula 2 segundos de carga
    }
    
    // Llamar a la función para cargar la información
    cargarInformacionProfesional();
    
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
    
    // ========== CONTADOR DE FRASES VISITADAS ==========
    // Contar cuántas frases se han mostrado en el carrusel
    let frasesMostradas = 0;
    
    // Incrementar contador cada vez que cambia el slide
    const originalShowSlide = showSlide;
    showSlide = function(n) {
        originalShowSlide(n);
        frasesMostradas++;
        
        // Mostrar mensaje después de ver 5 frases
        if (frasesMostradas === 5) {
            console.log("¡Has visto 5 frases motivacionales! Esperamos que te inspiren.");
        }
    };
    
    // ========== INICIALIZACIÓN ==========
    console.log("Página de Luciana Gala - Personal Trainer cargada correctamente");
    
    // Mostrar mensaje de bienvenida
    setTimeout(function() {
        console.log("¡Bienvenido a la página de Luciana Gala! Esperamos que encuentres inspiración para tu transformación física.");
    }, 1000);
});