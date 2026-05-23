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

  // 3. Gerenciamento de Abas para Prova Social (Depoimento de Ana Bassôa)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe active de todos os botões e painéis de abas
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Ativa o botão clicado
      button.classList.add('active');

      // Ativa o painel de conteúdo correspondente ao data-tab
      const targetTabId = button.getAttribute('data-tab');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
});
