/* =========================================================
   VOVÔ GIL — script.js
   Apenas interações essenciais: menu mobile, header com scroll,
   fade-in progressivo, link do WhatsApp e ano do rodapé.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------
     CONFIGURAÇÃO — edite aqui os dados de contato
     ----------------------------------------------------- */
  const CONFIG = {
    // TODO: confirmar e inserir o número de WhatsApp oficial do Vovô Gil,
    // no formato internacional sem espaços ou símbolos. Exemplo: '5543999999999'.
    // Durante a pesquisa de referência encontramos um número associado ao
    // restaurante em um diretório público (+55 43 99997-1000), mas ele NÃO
    // foi confirmado pelo cliente e por isso não foi usado como padrão.
    WHATSAPP_NUMBER: '',
    WHATSAPP_MESSAGE: 'Olá! Vim pelo site do Vovô Gil e gostaria de fazer um pedido.'
  };

  /* -----------------------------------------------------
     Links de WhatsApp
     ----------------------------------------------------- */
  const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
  const whatsappHref = CONFIG.WHATSAPP_NUMBER
    ? `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`
    : null;

  whatsappLinks.forEach((link) => {
    if (whatsappHref) {
      link.setAttribute('href', whatsappHref);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    } else {
      // Sem número configurado ainda: evita link quebrado e sinaliza no console.
      link.setAttribute('href', '#contato');
      link.setAttribute('title', 'Número de WhatsApp ainda não configurado');
    }
  });

  if (!CONFIG.WHATSAPP_NUMBER) {
    console.warn('[Vovô Gil] Número de WhatsApp não configurado. Edite CONFIG.WHATSAPP_NUMBER em js/script.js.');
  }

  /* -----------------------------------------------------
     Header: sombra/opacidade ao rolar
     ----------------------------------------------------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* -----------------------------------------------------
     Menu mobile
     ----------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
  };
  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  };

  hamburger.addEventListener('click', toggleMenu);
  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* -----------------------------------------------------
     Fade-in progressivo ao rolar a página
     ----------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Sem suporte a IntersectionObserver: mostra tudo direto.
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* -----------------------------------------------------
     Ano do rodapé
     ----------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
