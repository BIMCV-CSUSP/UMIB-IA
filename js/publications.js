/* ==========================================================================
   Resultados — renderiza el listado de publicaciones (window.UMIB_PUBLICATIONS,
   ver publications-data.js) agrupado por año en acordeones, con filtro por
   texto libre y por año. El año más reciente aparece desplegado por defecto.
   ========================================================================== */
(function () {
  "use strict";
  var mount = document.getElementById("pub-list-mount");
  if (!mount || !window.UMIB_PUBLICATIONS) return;

  var data = window.UMIB_PUBLICATIONS;
  var years = [];
  data.forEach(function (p) { if (years.indexOf(p.year) === -1) years.push(p.year); });
  years.sort(function (a, b) { return b.localeCompare(a); });

  // Selector de año (filtro)
  var yearSelect = document.getElementById("pub-year-filter");
  years.forEach(function (y) {
    var opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  });

  function render() {
    mount.innerHTML = "";
    var query = (document.getElementById("pub-search").value || "").toLowerCase();
    var yearFilter = yearSelect.value;

    years.forEach(function (year, yIndex) {
      if (yearFilter !== "all" && yearFilter !== year) return;
      var items = data.filter(function (p) { return p.year === year; });
      var visibleItems = items.filter(function (p) {
        return !query || p.title.toLowerCase().indexOf(query) !== -1 || p.html.toLowerCase().indexOf(query) !== -1;
      });
      if (query && visibleItems.length === 0) return;

      var block = document.createElement("div");
      block.className = "pub-year reveal" + (yIndex === 0 && !query ? " is-open" : "");
      if (query) block.classList.add("is-open");

      var head = document.createElement("div");
      head.className = "pub-year__head";
      head.setAttribute("data-accordion-head", "");
      head.innerHTML =
        "<h3>" + year + "</h3>" +
        '<span class="pub-year__count">' + visibleItems.length + (visibleItems.length === 1 ? " publicación" : " publicaciones") + "</span>" +
        '<svg class="pub-year__chev" width="14" height="9" viewBox="0 0 14 9" fill="none"><path d="M1 1l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

      var list = document.createElement("div");
      list.className = "pub-year__body";
      var listInner = document.createElement("div");
      listInner.className = "pub-list";
      visibleItems.forEach(function (p) {
        var item = document.createElement("div");
        item.className = "pub-item";
        var stars = p.star > 0 ? ' <span class="pub-item__star" title="Conecta con proyectos descritos en Líneas de trabajo">' + "⭐".repeat(p.star) + "</span>" : "";
        item.innerHTML = p.html + stars;
        listInner.appendChild(item);
      });
      list.appendChild(listInner);

      block.setAttribute("data-accordion-item", "");
      block.appendChild(head);
      block.appendChild(list);
      mount.appendChild(block);
    });

    mount.querySelectorAll("[data-accordion-head]").forEach(function (head) {
      head.addEventListener("click", function () {
        head.closest("[data-accordion-item]").classList.toggle("is-open");
      });
    });

    if (!("IntersectionObserver" in window)) {
      mount.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.05 });
      mount.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    }
  }

  document.getElementById("pub-search").addEventListener("input", render);
  yearSelect.addEventListener("change", render);
  render();
})();
