document.addEventListener('DOMContentLoaded', () => {
  const isHomePage = document.querySelector('.hero-title') !== null;

  // 1. Preparación de letras solo en Home
  if (isHomePage) {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent.trim();
    heroTitle.innerHTML = text.split('').map(char => 
      char === ' ' ? `<span class="letter">&nbsp;</span>` : `<span class="letter">${char}</span>`
    ).join('');
  }

  // 2. Animación de entrada
  const tl = anime.timeline({ easing: 'easeOutExpo' });

  tl.add({ targets: 'header, .breadcrumbs, main', opacity: [0, 1], translateY: [20, 0], duration: 800 });

  if (isHomePage) {
    tl.add({ targets: '.hero-title .letter', translateY: [60, 0], opacity: [0, 1], rotateZ: [15, 0], delay: anime.stagger(25) }, '-=600');
    tl.add({ targets: ['.hero-subtitle', '.cta-group', '.image-frame', '.content-card'], translateY: [30, 0], opacity: [0, 1], delay: anime.stagger(100) }, '-=700');
  }

  // 3. Interacciones y Parallax
  const cards = document.querySelectorAll('.content-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => anime({ targets: card, translateY: -8, scale: 1.01, borderColor: '#ff4d00', duration: 300 }));
    card.addEventListener('mouseleave', () => anime({ targets: card, translateY: 0, scale: 1, borderColor: 'rgba(255, 255, 255, 0.08)', duration: 300 }));
  });

  const imageFrame = document.querySelector('.image-frame');
  if (isHomePage && imageFrame) {
    document.addEventListener('mousemove', (e) => {
      const xVal = (window.innerWidth / 2 - e.pageX) / 40;
      const yVal = (window.innerHeight / 2 - e.pageY) / 40;
      anime({ targets: imageFrame, rotateY: xVal, rotateX: yVal, duration: 150, easing: 'linear' });
    });
  }
});