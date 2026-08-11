/* ==========================================================================
   UMIB-IA — comportamiento global compartido por todas las páginas
   - Menú móvil (acordeón para "Líneas de trabajo")
   - Scroll-reveal (fade-in + desplazamiento) con stagger en grids
   - Cifras "count-up" al entrar en viewport
   - Acordeón de publicaciones por año
   Respeta prefers-reduced-motion (ver css: --dur pasa a 1ms y añadimos
   la clase is-visible de inmediato).
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Menú móvil ---------------- */
  var burger = document.querySelector(".nav__burger");
  var mobile = document.querySelector(".nav__mobile");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobile.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });

    var accToggle = mobile.querySelector(".nav__accordion-toggle");
    var accPanel = mobile.querySelector(".nav__accordion-panel");
    if (accToggle && accPanel) {
      accToggle.addEventListener("click", function () {
        var open = accPanel.classList.toggle("is-open");
        accToggle.setAttribute("aria-expanded", String(open));
      });
    }
  }

  /* ---------------- Scroll-reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    // asigna --i dentro de cada contenedor .stagger para el efecto cascada
    document.querySelectorAll(".stagger").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Count-up de cifras clave ---------------- */
  var counters = document.querySelectorAll("[data-count-to]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var suffix = el.getAttribute("data-count-suffix") || "";
    var prefix = el.getAttribute("data-count-prefix") || "";
    var decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
    if (reduceMotion) {
      el.textContent = prefix + target.toLocaleString("es-ES", { minimumFractionDigits: decimals }) + suffix;
      return;
    }
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = prefix + value.toLocaleString("es-ES", { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var ioCount = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              ioCount.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (el) { ioCount.observe(el); });
    }
  }

  /* ---------------- Acordeón genérico (publicaciones, FAQ...) ---------------- */
  document.querySelectorAll("[data-accordion-head]").forEach(function (head) {
    head.addEventListener("click", function () {
      head.closest("[data-accordion-item]").classList.toggle("is-open");
    });
  });

  /* ---------------- Año dinámico en el footer ---------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------- Mapa de contacto (Leaflet + CARTO Voyager, estilo minimalista) ---------------- */
  var mapEl = document.getElementById("contact-map");
  if (mapEl && window.L) {
    var coords = [39.4523348, -0.3443940]; // C/ Eduardo Primo Yúfera, 3, Quatre Carreres, 46024 València
    var map = L.map(mapEl, { scrollWheelZoom: false }).setView(coords, 16);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    L.circleMarker(coords, {
      radius: 10,
      color: "#fff",
      weight: 3,
      fillColor: "#EE4266",
      fillOpacity: 1
    }).addTo(map)
      .bindPopup("<strong>UMIB-IA · FISABIO-CIPF</strong><br>C/ Eduardo Primo Yúfera, 3<br>46024 València")
      .openPopup();
  }
})();
