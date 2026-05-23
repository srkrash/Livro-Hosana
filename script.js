document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito Scroll Reveal (Revelar seções ao rolar)
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85; // Dispara quando o elemento atinge 85% da tela

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.classList.add('active');
        
        // Ativar animação de anotações internas se existirem
        const internalAnnotations = el.querySelectorAll('.annotation');
        internalAnnotations.forEach((anno, index) => {
          setTimeout(() => {
            anno.style.opacity = '1';
            anno.style.transform += ' scale(1.05)';
            setTimeout(() => {
              anno.style.transform = anno.style.transform.replace(' scale(1.05)', '');
            }, 200);
          }, 400 + (index * 200)); // Delay sutil
        });
      }
    });
  };

  // Inicializa as anotações do Hero que já começam visíveis
  const heroAnnotations = document.querySelectorAll('.hero .annotation');
  heroAnnotations.forEach(anno => {
    anno.style.opacity = '0';
    anno.style.transition = 'opacity 0.8s ease-out, transform 0.3s ease-out';
    setTimeout(() => {
      anno.style.opacity = '1';
    }, 800);
  });

  // Outras anotações começam ocultas e revelam com JS
  const nonHeroAnnotations = document.querySelectorAll('section:not(.hero) .annotation');
  nonHeroAnnotations.forEach(anno => {
    anno.style.opacity = '0';
    anno.style.transition = 'opacity 0.8s ease-out, transform 0.3s ease-out';
  });

  // Adiciona o escutador de scroll e roda uma vez no carregamento
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // 2. Ajuste fino de clique suave no menu para navegadores antigos
  const navLinks = document.querySelectorAll('nav a, .logo-container');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset para compensar o cabeçalho fixo
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Carrossel de Depoimentos (Prova Social)
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const btnPrev = document.querySelector('.carousel-control.prev');
  const btnNext = document.querySelector('.carousel-control.next');
  const carouselContainer = document.querySelector('.testimonial-carousel-container');

  let currentSlide = 0;
  let autoplayTimer = null;
  const autoplayInterval = 8000; // Tempo em ms (8 segundos)

  const showSlide = (index) => {
    // Tratamento de limites (Loop)
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // Ocultar todos os slides e remover classe ativa dos pontos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Exibir slide atual e ativar ponto correspondente
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  // Clique no botão "Próximo"
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoplay(); // Reinicia o timer para evitar transição rápida logo após clique manual
    });
  }

  // Clique no botão "Anterior"
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoplay();
    });
  }

  // Clique nos indicadores (Pontos)
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      startAutoplay();
    });
  });

  // Pausar autoplay ao passar o mouse por cima
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }

  // Inicializa o Carrossel
  if (slides.length > 0) {
    showSlide(0);
    startAutoplay();
  }
});
