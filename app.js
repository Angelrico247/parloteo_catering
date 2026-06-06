// ==========================================================================
// CENTRAL DE INTELIGENCIA DE PARLOTEO GDL (PRODUCCIÓN CENTRALIZADA)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------------------------------------
    // 1. CONTROLADORES DEL MENÚ MÓVIL (ANIMACIÓN PREMIUM + BLINDADO)
    // ------------------------------------------------------------------------
    const btnMenu = document.getElementById("btn-menu");
    const menuMovil = document.getElementById("menu-movil");
  
    if (btnMenu && menuMovil) {
      // Evento de apertura/cierre con transiciones fluidas de Tailwind
      btnMenu.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita bucles extraños en el documento
        const isOpen = menuMovil.classList.contains("opacity-100");
  
        if (!isOpen) {
          menuMovil.classList.remove("opacity-0", "pointer-events-none", "-translate-y-4");
          menuMovil.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
          btnMenu.setAttribute("aria-expanded", "true");
        } else {
          menuMovil.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
          menuMovil.classList.add("opacity-0", "pointer-events-none", "-translate-y-4");
          btnMenu.setAttribute("aria-expanded", "false");
        }
      });
  
      // Gestión inteligente de clicks en enlaces dentro del menú móvil
      const linksMoviles = menuMovil.querySelectorAll("a");
      linksMoviles.forEach(link => {
        link.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
  
          // Caso A: Si es cambio de página (.html física) dejamos actuar al navegador de forma natural
          if (href.includes(".html") && !href.includes("#")) {
            menuMovil.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
            menuMovil.classList.add("opacity-0", "pointer-events-none", "-translate-y-4");
            return;
          }
  
          // Caso B: Si es anclaje de sección interna (#sobre-nosotros, #gallery, etc.)
          if (href.startsWith("#")) {
            e.preventDefault();
            menuMovil.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
            menuMovil.classList.add("opacity-0", "pointer-events-none", "-translate-y-4");
            btnMenu.setAttribute("aria-expanded", "false");
  
            const targetElement = document.getElementById(href.substring(1));
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
              });
            }
          }
        });
      });
  
      // Cerrar el menú automáticamente si el usuario da un click afuera de la caja activa
      document.addEventListener("click", (e) => {
        if (menuMovil.classList.contains("opacity-100") && !menuMovil.contains(e.target) && e.target !== btnMenu) {
          menuMovil.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
          menuMovil.classList.add("opacity-0", "pointer-events-none", "-translate-y-4");
          btnMenu.setAttribute("aria-expanded", "false");
        }
      });
    }
  
    // ------------------------------------------------------------------------
    // 2. FILTRADO ESTILIZADO DE PLATILLOS (Efecto de línea inferior y texto)
    // ------------------------------------------------------------------------
    const botonesFiltro = document.querySelectorAll(".filter-btn");
    const itemsPlatillo = document.querySelectorAll(".item-platillo");
  
    if (botonesFiltro.length > 0 && itemsPlatillo.length > 0) {
      botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
          // Actualización sutil de clases activas segun diseño de referencia
          botonesFiltro.forEach(btn => {
            btn.classList.remove("text-amber-400", "border-b", "border-amber-400", "font-medium");
            btn.classList.add("text-stone-500");
          });
          boton.classList.add("text-amber-400", "border-b", "border-amber-400", "font-medium");
          boton.classList.remove("text-stone-500");
  
          const filtroSeleccionado = boton.getAttribute("data-filter");
  
          itemsPlatillo.forEach(item => {
            const categoria = item.getAttribute("data-category");
  
            if (filtroSeleccionado === "all" || categoria === filtroSeleccionado) {
              item.style.display = "flex";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 50);
            } else {
              item.style.opacity = "0";
              item.style.transform = "translateY(15px)";
              setTimeout(() => {
                item.style.display = "none";
              }, 350);
            }
          });
        });
      });
    }
  
    // Enceder de forma forzada animaciones base / evitar parpadeos negros iniciales
    setTimeout(() => {
      const elementosReveal = document.querySelectorAll(".reveal");
      elementosReveal.forEach(el => el.classList.add("active"));
    }, 50);
  
    // ------------------------------------------------------------------------
    // 3. OPTIMIZACIÓN DE EVENTOS DE SCROLL (HEADER + FADES DINÁMICOS)
    // ------------------------------------------------------------------------
    const header = document.querySelector("header");
    const HTMLreveals = document.querySelectorAll(".reveal");
  
    function ejecutarEventosScroll() {
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
  
      const triggerBottom = window.innerHeight * 0.85;
      HTMLreveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < triggerBottom) {
          reveal.classList.add("active");
        }
      });
    }
  
    window.addEventListener("scroll", ejecutarEventosScroll);
    ejecutarEventosScroll(); // Disparo de validación inicial
  
    // ------------------------------------------------------------------------
    // 4. SLIDER AUTOPLAY (TRANSICIONES DE FONDO EN HERO DE INDEX)
    // ------------------------------------------------------------------------
    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
  
    function nextSlide() {
      if (slides.length > 0) {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
      }
    }
    setInterval(nextSlide, 5000);
  
    // ------------------------------------------------------------------------
    // 5. CONTROLADOR DEL CARRUSEL PREMIUM (CENTER MODE OPINIONES)
    // ------------------------------------------------------------------------
    const sliderRiel = document.getElementById("carrusel-slider");
    const cardsColeccion = document.querySelectorAll(".opinion-card");
    const nextFlecha = document.getElementById("btn-next-opinion");
    const prevFlecha = document.getElementById("btn-prev-opinion");
  
    let currentActiveIdx = 1;
  
    function renderizarCarrusel() {
      if (!sliderRiel || cardsColeccion.length === 0) return;
  
      const isCelular = window.innerWidth < 768;
  
      cardsColeccion.forEach((card, idx) => {
        card.classList.remove("is-center");
        if (idx === currentActiveIdx && !isCelular) {
          card.classList.add("is-center");
        }
      });
  
      if (isCelular) {
        sliderRiel.style.transform = `translateX(-${currentActiveIdx * 100}%)`;
      } else {
        const widthTarjeta = cardsColeccion[0].offsetWidth;
        const widthContenedor = sliderRiel.parentElement.offsetWidth;
        const posicionEje = (widthContenedor / 2) - (widthTarjeta / 2) - (currentActiveIdx * widthTarjeta);
        sliderRiel.style.transform = `translateX(${posicionEje}px)`;
      }
    }
  
    if (nextFlecha && prevFlecha) {
      nextFlecha.addEventListener("click", () => {
        currentActiveIdx = (currentActiveIdx < cardsColeccion.length - 1) ? currentActiveIdx + 1 : 0;
        renderizarCarrusel();
      });
  
      prevFlecha.addEventListener("click", () => {
        currentActiveIdx = (currentActiveIdx > 0) ? currentActiveIdx - 1 : cardsColeccion.length - 1;
        renderizarCarrusel();
      });
    }
  
    window.addEventListener("resize", renderizarCarrusel);
    setTimeout(renderizarCarrusel, 150);
  
    // ------------------------------------------------------------------------
    // 6. MOTOR MAESTRO DEL MODAL GLOBAL REUTILIZABLE
    // ------------------------------------------------------------------------
    const modalGlobal = document.getElementById("modal-global");
    const modalContentArea = document.getElementById("modal-content-area");
    const modalCerrarBtn = document.getElementById("modal-cerrar");
  
    function abrirModal(htmlInyectable) {
      if (!modalGlobal || !modalContentArea) return;
  
      const tarjetaModal = modalGlobal.querySelector(".bg-neutral-900");
  
      if (tarjetaModal) {
        if (htmlInyectable.includes("<img")) {
          tarjetaModal.classList.remove("max-w-lg", "p-8", "md:p-10");
          tarjetaModal.classList.add("max-w-5xl", "p-2", "md:p-4");
        } else {
          tarjetaModal.classList.remove("max-w-5xl", "p-2", "md:p-4");
          tarjetaModal.classList.add("max-w-lg", "p-8", "md:p-10");
        }
      }
  
      modalContentArea.innerHTML = htmlInyectable;
      modalGlobal.classList.remove("hidden");
  
      setTimeout(() => {
        modalGlobal.classList.add("is-visible");
      }, 10);
    }
  
    function cerrarModal() {
      if (!modalGlobal) return;
      modalGlobal.classList.remove("is-visible");
      setTimeout(() => {
        modalGlobal.classList.add("hidden");
        if (modalContentArea) modalContentArea.innerHTML = "";
      }, 300);
    }
  
    // --- ESCUCHAS DE CIERRE DENTRO DEL SCOPE DEL DOM ---
    if (modalCerrarBtn) {
      modalCerrarBtn.addEventListener("click", cerrarModal);
    }
  
    if (modalGlobal) {
      modalGlobal.addEventListener("click", (e) => {
        if (e.target === modalGlobal) cerrarModal();
      });
    }
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalGlobal && !modalGlobal.classList.contains("hidden")) {
        cerrarModal();
      }
    });
  
    // Plantillas inyectables para el modal
    function generarPlantillaImagen(src, alt) {
      return `
        <div class="flex flex-col items-center w-full">
          <img src="${src}" alt="${alt}" class="w-full max-h-[82vh] md:max-h-[88vh] object-contain shadow-2xl">
        </div>
      `;
    }
  
    function generarPlantillaPaquete(titulo, precio, detallesArray) {
      const listaItems = detallesArray.map(item => `
        <li class="flex items-start space-x-3 text-stone-300 text-xs font-light leading-relaxed">
          <span class="text-amber-500 mt-0.5">•</span>
          <span>${item}</span>
        </li>
      `).join("");
  
      return `
        <div class="mb-6">
          <span class="text-[10px] tracking-widest text-amber-400 uppercase block mb-1">Experiencia Gastronómica</span>
          <h3 class="text-2xl font-light tracking-wide text-white uppercase font-serif-elegant">${titulo}</h3>
          <p class="text-amber-500 text-sm font-medium tracking-wider mt-1">${precio}</p>
          <div class="h-[1px] w-12 bg-amber-500/30 mt-4"></div>
        </div>
        <div class="mt-6 space-y-4">
          <p class="text-xs uppercase tracking-widest text-white/50 font-medium">El Menú Incluye:</p>
          <ul class="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            ${listaItems}
          </ul>
        </div>
        <div class="mt-8 pt-4 border-t border-white/5">
          <a href="contacto.html" class="block w-full text-center bg-amber-500 hover:bg-amber-600 text-neutral-950 font-medium py-3.5 text-xs tracking-widest uppercase transition-colors duration-300">
            Reservar esta Experiencia
          </a>
        </div>
      `;
    }
  
    // Escucha delegada global para disparar los modales
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-lightbox")) {
        const srcImg = e.target.getAttribute("src");
        const altImg = e.target.getAttribute("alt") || "Experiencia Parloteo";
        abrirModal(generarPlantillaImagen(srcImg, altImg));
      }
  
      const botonPaquete = e.target.closest(".btn-paquete");
      if (botonPaquete) {
        e.preventDefault();
        const titulo = botonPaquete.getAttribute("data-titulo");
        const precio = botonPaquete.getAttribute("data-precio");
        const detallesRaw = botonPaquete.getAttribute("data-detalles") || "";
        const detallesArray = detallesRaw.split("|").map(item => item.trim());
        abrirModal(generarPlantillaPaquete(titulo, precio, detallesArray));
      }
    });
  
  });