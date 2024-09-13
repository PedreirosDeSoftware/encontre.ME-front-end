import { useEffect, useRef, useState } from 'react';
import './css/desktop.css';
import './css/mobile.css';
import './css/tablet.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const menuBarRef = useRef(null);
  const navRef = useRef(null);
  const menuBgRef = useRef(null);
  const [currentFocus, setCurrentFocus] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const menu = menuBarRef.current
    const nav = navRef.current
    const menuBg = menuBgRef.current
    const handleMenuClick = () => {
      menu.classList.toggle('change');
      nav.classList.toggle('change');
      menuBg.classList.toggle('change-bg');
    };

    const handleClickOutsideMenu = (e) => {
      if (!menu.contains(e.target) && !nav.contains(e.target)) {
        menu.classList.remove('change');
        nav.classList.remove('change');
        menuBg.classList.remove('change-bg');
      }
    };

    menu.addEventListener('click', handleMenuClick);
    document.addEventListener('click', handleClickOutsideMenu);

    return () => {
      menu.removeEventListener('click', handleMenuClick);
      document.removeEventListener('click', handleClickOutsideMenu);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current
    const navLinks = nav.querySelectorAll('a');

    const handleLinkClick = (e, link) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        targetElement.focus({ preventScroll: true });
      }

      setCurrentFocus(link);
      link.focus();
    };

    const handleBodyClick = (event) => {
      if (!event.target.closest('nav') && currentFocus) {
        currentFocus.focus();
      }
    };

    const handleLinkFocus = (link) => {
      setCurrentFocus(link);
    };

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => handleLinkClick(e, link));
      link.addEventListener('focus', () => handleLinkFocus(link));
    });

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', (e) => handleLinkClick(e, link));
        link.removeEventListener('focus', () => handleLinkFocus(link));
      });
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [currentFocus]);

  return (
    <div>
      <header>
        <div className="container flex">
          <img src="Logo.svg" alt="logo encontre-me" />
          <div id="menu">
            <div id="menu-bar" ref={menuBarRef}>
              <div id="bar1" className="bar"></div>
              <div id="bar2" className="bar"></div>
              <div id="bar3" className="bar"></div>
            </div>
            <nav className="nav" id="nav" ref={navRef}>
              <ul className="bolinha">
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#recursos">Recursos</a></li>
                <li><a href="#crises">Crise</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
              <ul>
                <li><button className="buttons button-entrar" onClick={()=> navigate('/login')}>ENTRAR</button></li>
                <li><button className="buttons button-junte-se" onClick={()=> navigate('/register')}>JUNTE-SE A NÓS</button></li>
              </ul>
            </nav>
          </div>
          <div className="menu-bg" id="menu-bg" ref={menuBgRef}></div>
        </div>
      </header>

      <main>
        <div className="img-initial">
          <div>
            <h1>Trazendo Esperança, Um Passo Mais Perto.</h1>
            <button className="buttons buttons-blue" onClick={()=> navigate('/register')}>
              JUNTE-SE A NÓS
            </button>
          </div>
          <div className="bg">
            <img src="assets/pexels-tima-miroshnichenko-5725589.png" alt="mapa mundi" />
          </div>
        </div>

        <section id="sobre" className="first-section">
          <h1 className="title-about">Sobre Nós</h1>
          <p>
            No Encontre Me, estamos dedicados a reunir famílias e entes queridos,
            fornecendo uma plataforma centralizada para compartilhar informações
            sobre pessoas desaparecidas. Nossa missão é criar um espaço orientado
            pela comunidade, onde as pessoas possam colaborar, compartilhar e ajudar
            na busca por indivíduos desaparecidos, garantindo que ninguém tenha que passar por isso sozinho.
            <br /><br />
            Baseado em valores de empatia, segurança e transparência,
            nossa plataforma foi projetada para ser segura, acessível e eficaz.
            Acreditamos no poder da colaboração e nos esforçamos para tornar cada
            esforço de busca mais impactante, trazendo esperança e apoio para aqueles que precisam.
          </p>
        </section>

        <div className="pegadas1">
          <img src="assets/pegadasazuis.png" alt="pegadas" />
          <img src="assets/pegadas2.png" alt="pegadas" />
          <img src="assets/pegadasazuis.png" alt="pegadas" />
          <img src="assets/pegadasazuis.png" alt="pegadas" />
        </div>

        <section id="recursos" className="container-section">
          <h1>Por que nos escolher?</h1>

          <div className="second-section style-section">
            <div>
              <img src="assets/intituicao.svg" alt="prédio" />
              <h1>Para Instituições</h1>
            </div>
            <p>
              Oferecemos uma solução confiável e organizada para gerenciar 
              e divulgar múltiplos casos simultaneamente. Nossa plataforma garante 
              um tratamento seguro de dados e uma gestão de casos simplificada, 
              facilitando para as instituições focarem no que realmente importa—encontrar os desaparecidos.
            </p>
            <button className="buttons-white buttons" onClick={()=> navigate('/register')}>JUNTE-SE A NÓS</button>
          </div>

          <div className="third-section style-section">
            <div>
              <img src="assets/User.svg" alt="usuário" />
              <h1>Para Pessoas</h1>
            </div>
            <p>
              Nossa interface amigável permite que famílias compartilhem 
              rapidamente e facilmente informações sobre seus entes queridos desaparecidos. 
              Priorizamos a privacidade e a segurança dos seus dados, garantindo 
              que você possa se concentrar no que é mais importante—trazer seus 
              entes queridos de volta para casa.
            </p>
            <button className="buttons-white buttons"  onClick={()=> navigate('/register')}>JUNTE-SE A NÓS</button>
          </div>
        </section>

        <section id="crises" className="sec-news">
          <div className="title-news">
            <h1>E as Crises?</h1>
            <div></div>
          </div>

          <div className="news">
            <div className="cont-news">
              <h1>São Paulo 62 Mortes no Voo</h1>
              <div></div>
              <p>
                Após o Desastre do Voo São Paulo G2, um evento devastador que abalou toda a nação, o poder da comunidade e da tecnologia veio à tona. Famílias foram dilaceradas e a urgência de encontrar e identificar indivíduos desaparecidos foi primordial. Em meio ao caos, nossa plataforma desempenhou um papel crucial nos esforços de busca e resgate.
                Através do nosso sistema centralizado, famílias, voluntários e equipes de resgate puderam compartilhar rapidamente informações cruciais, incluindo descrições, últimas localizações conhecidas e detalhes identificativos. Essa abordagem colaborativa permitiu uma resposta mais rápida e organizada, essencial nas horas e dias críticos após o desastre.
                A capacidade da nossa plataforma de facilitar atualizações em tempo real e agilizar a comunicação entre as diferentes partes foi fundamental para reunir famílias com seus entes queridos. Esse trágico evento destacou o verdadeiro potencial da nossa plataforma em fazer a diferença quando mais importa.
                Se você quiser saber mais sobre como nossa plataforma contribuiu para os esforços de resgate durante o Desastre do Voo São Paulo G2 e como ela pode ajudar em situações semelhantes, clique abaixo.
              </p>
              <button className="buttons buttons-white"  onClick={()=> navigate('/')}>SAIBA MAIS</button>
            </div>
            <div className="news-image-cont">
              <img className="news-image" src="assets/Pexels Photo by Mohammed Soufy.png" alt="imagens de notícias" />
            </div>
          </div>
        </section>

        <section id="contato" className="contact">
            <div className="cont-contact">
                <div className="title">
                    <h2>Junte-se à Causa!</h2>
                    <div className="line"></div>
                    <h1>Entre em Contato</h1>
                </div>
                <p>
                    Descubra como você pode contribuir para os esforços de busca, 
                    seja compartilhando casos, voluntariando-se ou doando. 
                    Juntos, podemos fazer a diferença.
                </p>
                <a className="buttons buttons-blue" href='mailto:contacto@encontreme.org'>DIGA OLÁ!</a>
            </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
