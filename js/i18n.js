/* ==========================================================================
   Selector de idioma (ES / VA / EN)

   El sitio está escrito en español en el propio HTML: ese es el texto de
   referencia y el que se sirve sin JavaScript. Al elegir valenciano o inglés
   se recorre el DOM una sola vez, se memoriza el texto original de cada nodo
   y se sustituye por su traducción del diccionario (js/i18n-data.js).
   Volver a "ES" restaura los originales memorizados.

   Se traducen los nodos de texto visibles y los atributos title/alt/aria-label
   /placeholder. Los textos sin entrada en el diccionario se dejan intactos,
   de modo que una traducción incompleta degrada de forma legible.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "umibia-lang";
  var DEFAULT_LANG = "es";
  var LANGS = ["es", "va", "en"];
  var ATTRS = ["title", "alt", "aria-label", "placeholder"];

  var dict = window.UMIB_I18N || {};
  var nodes = null; // [{node, es}]
  var attrNodes = null; // [{el, attr, es}]

  function norm(s) {
    return s.replace(/\s+/g, " ").trim();
  }

  /* Recorre el documento una única vez y memoriza los textos originales. */
  function collect() {
    if (nodes) return;
    nodes = [];
    attrNodes = [];

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE") {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.closest && p.closest(".code-block, .lang-switch, [data-no-i18n]")) {
          return NodeFilter.FILTER_REJECT;
        }
        return norm(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    var n;
    while ((n = walker.nextNode())) {
      nodes.push({ node: n, es: n.nodeValue });
    }

    ATTRS.forEach(function (attr) {
      document.querySelectorAll("[" + attr + "]").forEach(function (el) {
        var v = el.getAttribute(attr);
        if (norm(v)) attrNodes.push({ el: el, attr: attr, es: v });
      });
    });
  }

  function apply(lang) {
    collect();
    var table = lang === "es" ? null : (dict[lang] || {});

    nodes.forEach(function (item) {
      if (!table) {
        item.node.nodeValue = item.es;
        return;
      }
      var key = norm(item.es);
      var tr = table[key];
      if (tr) {
        // conserva los espacios/saltos que rodeaban al texto original
        item.node.nodeValue = item.es.replace(key, tr);
      } else {
        item.node.nodeValue = item.es;
      }
    });

    attrNodes.forEach(function (item) {
      if (!table) {
        item.el.setAttribute(item.attr, item.es);
        return;
      }
      var tr = table[norm(item.es)];
      item.el.setAttribute(item.attr, tr || item.es);
    });

    // título del documento y atributo lang
    var titleKey = norm(document.title);
    if (table && table[titleKey]) {
      if (!document.body.dataset.esTitle) document.body.dataset.esTitle = document.title;
      document.title = table[titleKey];
    } else if (!table && document.body.dataset.esTitle) {
      document.title = document.body.dataset.esTitle;
    }
    document.documentElement.lang = lang === "va" ? "ca-valencia" : lang;

    document.querySelectorAll(".lang-switch__btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".lang-switch__btn");
    if (!btn) return;
    e.preventDefault();
    setLang(btn.getAttribute("data-lang"));
  });

  var initial = stored();
  if (initial && initial !== DEFAULT_LANG) {
    apply(initial);
  } else {
    // marca ES como activo sin recorrer el DOM innecesariamente
    document.querySelectorAll(".lang-switch__btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === DEFAULT_LANG;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
})();
