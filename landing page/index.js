document.addEventListener('DOMContentLoaded', () => {
  const menuBar = document.getElementById('menu-bar');
  const nav = document.getElementById('nav');
  const menuBg = document.getElementById('menu-bg');

  menuBar.addEventListener('click', () => {
      menuBar.classList.toggle('change'); // Animação do ícone do menu
      nav.classList.toggle('change'); // Mostrar/esconder o menu de navegação
      menuBg.classList.toggle('change-bg'); // Animação do fundo
  });

  // Fechar o menu se clicar fora do menu
  document.addEventListener('click', (e) => {
      if (!menuBar.contains(e.target) && !nav.contains(e.target)) {
          menuBar.classList.remove('change');
          nav.classList.remove('change');
          menuBg.classList.remove('change-bg');
      }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  let currentFocus = null; // Variável para armazenar o link atualmente em foco

  // Manter foco no primeiro link de navegação ao clicar em qualquer lugar
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault(); // Impede o comportamento padrão do link

          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth' // Rolar suavemente até o elemento
              });
              // Foca no elemento de destino
              targetElement.focus({ preventScroll: true });
          }
          currentFocus = link; // Atualiza o foco atual
          link.focus(); // Foca no link clicado
      });
  });

  // Manter foco até que o usuário clique fora do link de navegação
  document.body.addEventListener('click', (event) => {
      if (!event.target.closest('nav')) {
          if (currentFocus) {
              currentFocus.focus(); // Mantém o foco no último link clicado
          }
      }
  });

  // Permitir que o foco mude quando um novo link for clicado
  navLinks.forEach(link => {
      link.addEventListener('focus', () => {
          currentFocus = link; // Atualiza o foco atual
      });
  });
});