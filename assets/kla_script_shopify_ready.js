/**
 * KLA Watches - Script Modular para Shopify
 *
 * Descripción:
 * Este script maneja la interactividad de las secciones personalizadas
 * de KLA Watches. Se inicializa después de que el DOM esté cargado
 * y aplica la lógica solo a los elementos que existen en la página.
 *
 * NOTA: Este script ya no contiene datos. Los datos de productos,
 * colecciones, etc., se gestionan directamente en las secciones
 * de Liquid (.liquid) y en el panel de Shopify.
 */
document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DEL HEADER ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-shrink', window.scrollY > 50);
    });
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };
  const closeMobileMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileLinks) mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // --- LÓGICA DEL CARRUSEL DE ESCUDOS (TEAM TICKER) ---
  function initializeTicker(container, track, reverse = false) {
      if (!container || !track || track.children.length === 0) return;

      // Clonar los elementos para un bucle infinito y suave
      const trackWidth = track.scrollWidth;
      track.innerHTML += track.innerHTML;
      
      let isPaused = false;
      container.addEventListener('mouseenter', () => isPaused = true);
      container.addEventListener('mouseleave', () => isPaused = false);

      let position = 0;
      const speed = reverse ? 0.5 : -0.5;

      function animate() {
          if (!isPaused) {
              position += speed;
              if (Math.abs(position) >= trackWidth) {
                  position = 0;
              }
              track.style.transform = `translateX(${position}px)`;
          }
          requestAnimationFrame(animate);
      }
      animate();
  }
  
  // Inicializar ambos tickers si existen en la página
  const teamTickerContainer1 = document.getElementById('teams-ticker');
  const teamTickerTrack1 = document.getElementById('team-ticker-track');
  initializeTicker(teamTickerContainer1, teamTickerTrack1, false);

  const teamTickerContainer2 = document.getElementById('teams-ticker-2');
  const teamTickerTrack2 = document.getElementById('team-ticker-track-2');
  initializeTicker(teamTickerContainer2, teamTickerTrack2, true);


  // --- LÓGICA DE ANIMACIONES POR SCROLL (ScrollReveal) ---
  // Se asegura de que la librería ScrollReveal esté cargada
  if (typeof ScrollReveal === 'function') {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 800,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false // Se recomienda 'false' para una mejor experiencia de usuario
    });
    // Aplica las animaciones a las clases que uses en tus secciones
    sr.reveal('.reveal-up', { origin: 'bottom', interval: 100 });
    sr.reveal('.reveal-fade', { opacity: 0, interval: 100 });
    sr.reveal('.reveal-feature', { origin: 'bottom', interval: 150, viewFactor: 0.3 });
    // Puedes añadir más selectores según las secciones que construyas
    sr.reveal('.president-card', { origin: 'bottom', interval: 100, viewFactor: 0.2 });
  }

  // --- LÓGICA DEL PRELOADER ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Escondemos el preloader después de un breve tiempo.
    // En un sitio real, se podría esperar a que se carguen las imágenes principales.
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');
    }, 500);
  }

  console.log('KLA Script para Shopify inicializado correctamente.');
});
