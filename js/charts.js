/* ==========================================================================
   Gráficos dinámicos minimalistas (curva ROC / importancia de variables),
   dibujados en SVG y animados al entrar en el viewport (ver Sección 2.5 del
   README). Paleta y especificación de marcas siguen la skill "dataviz":
   trazo fino, colores categóricos fijos, tooltip al pasar el cursor.
   Estos gráficos son una RECREACIÓN ilustrativa de la métrica publicada
   (AUC citado en la publicación referenciada), no una digitalización exacta
   de la figura original — así se indica en el pie de cada gráfico.
   ========================================================================== */
(function () {
  "use strict";

  var SERIES_COLORS = ["var(--series-1)", "var(--series-2)", "var(--series-3)"];

  // Pictogramas simples (viewBox 24x24, subtrazados separados por "|") para los
  // nodos del diagrama de arquitectura — así los nodos no son solo cajas de
  // texto, sino que llevan una figura reconocible por dentro.
  var ARCH_ICONS = {
    // PACS: icono de imagen (marco + paisaje), representa el archivo de imagen médica
    pacs: "M4 5.2h16a1 1 0 0 1 1 1v11.6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.2a1 1 0 0 1 1-1z|M8 10a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z|M3.4 16.2l5-4.6 3.2 3 4.1-3.9 5.3 4.4",
    // Smart-Upload: flecha subiendo hacia una bandeja/carpeta
    upload: "M12 16.6V6.1|M8.1 10.2l3.9-4 3.9 4|M4.6 18.4h14.8",
    // CTP: escudo con validación, representa la anonimización/seguridad
    shield: "M12 3.3l6.4 2.4v4.9c0 4.4-2.7 7.6-6.4 8.7-3.7-1.1-6.4-4.3-6.4-8.7V5.7L12 3.3z|M9 12.1l2 2 3.9-4",
    // XNAT: base de datos apilada, representa el repositorio de imagen médica
    database: "M12 5c3.4 0 6.1.9 6.1 2s-2.7 2-6.1 2-6.1-.9-6.1-2 2.7-2 6.1-2z|M5.9 7v4.7c0 1.1 2.7 2 6.1 2s6.1-.9 6.1-2V7|M5.9 11.7v4.7c0 1.1 2.7 2 6.1 2s6.1-.9 6.1-2v-4.7"
  };

  // Curva ROC sintética que alcanza el AUC objetivo con una forma cóncava plausible.
  function rocPoints(auc, steps) {
    steps = steps || 40;
    var k = Math.log(1 - 2 * Math.max(0, auc - 0.5)) / Math.log(0.5); // aproximación
    // usa una curva potencia y = x^p con p<1 ajustada para acercarse al AUC pedido
    var p = 0.15;
    var best = p, bestDiff = Infinity;
    for (var t = 0.02; t < 1; t += 0.01) {
      // AUC de y=x^t en [0,1] es 1/(t+1)
      var a = 1 / (t + 1);
      var diff = Math.abs(a - auc);
      if (diff < bestDiff) { bestDiff = diff; best = t; }
    }
    var pts = [];
    for (var i = 0; i <= steps; i++) {
      var x = i / steps;
      var y = Math.pow(x, best);
      pts.push([x, y]);
    }
    return pts;
  }

  function buildROC(container) {
    var seriesDefs = JSON.parse(container.getAttribute("data-series"));
    var W = 520, H = 340, PAD = 42;
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "roc-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Curvas ROC");

    function X(x) { return PAD + x * (W - PAD * 1.4); }
    function Y(y) { return H - PAD - y * (H - PAD * 1.6); }

    // Ejes
    var axisX = document.createElementNS(svgNS, "line");
    axisX.setAttribute("x1", X(0)); axisX.setAttribute("y1", Y(0));
    axisX.setAttribute("x2", X(1)); axisX.setAttribute("y2", Y(0));
    axisX.setAttribute("stroke", "var(--baseline)"); axisX.setAttribute("stroke-width", "1.5");
    svg.appendChild(axisX);
    var axisY = document.createElementNS(svgNS, "line");
    axisY.setAttribute("x1", X(0)); axisY.setAttribute("y1", Y(0));
    axisY.setAttribute("x2", X(0)); axisY.setAttribute("y2", Y(1));
    axisY.setAttribute("stroke", "var(--baseline)"); axisY.setAttribute("stroke-width", "1.5");
    svg.appendChild(axisY);

    ["Especificidad ↓", "Sensibilidad ↑"].forEach(function (label, i) {
      var t = document.createElementNS(svgNS, "text");
      t.setAttribute("fill", "var(--muted)");
      t.setAttribute("font-size", "10.5");
      if (i === 0) { t.setAttribute("x", X(0.5)); t.setAttribute("y", H - 8); t.setAttribute("text-anchor", "middle"); }
      else { t.setAttribute("x", 14); t.setAttribute("y", Y(0.5)); t.setAttribute("transform", "rotate(-90 14," + Y(0.5) + ")"); t.setAttribute("text-anchor", "middle"); }
      t.textContent = label;
      svg.appendChild(t);
    });

    // Diagonal de referencia (azar)
    var diag = document.createElementNS(svgNS, "line");
    diag.setAttribute("x1", X(0)); diag.setAttribute("y1", Y(0));
    diag.setAttribute("x2", X(1)); diag.setAttribute("y2", Y(1));
    diag.setAttribute("class", "roc-diag");
    svg.appendChild(diag);

    var tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    var wrap = document.createElement("div");
    wrap.className = "chart-svg-wrap";
    wrap.appendChild(svg);
    wrap.appendChild(tooltip);
    container.appendChild(wrap);

    var legend = document.createElement("div");
    legend.className = "chart-card__legend";

    seriesDefs.forEach(function (s, idx) {
      var color = SERIES_COLORS[idx % SERIES_COLORS.length];
      var pts = rocPoints(s.auc);
      var d = pts.map(function (pt, i) { return (i === 0 ? "M" : "L") + X(pt[0]).toFixed(1) + " " + Y(pt[1]).toFixed(1); }).join(" ");
      var path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "roc-line");
      path.setAttribute("stroke", color);
      svg.appendChild(path);

      var len = path.getTotalLength ? path.getTotalLength() : 800;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;

      // punto interactivo al final de la curva con tooltip de AUC
      var midPt = pts[Math.round(pts.length * 0.6)];
      var dot = document.createElementNS(svgNS, "circle");
      dot.setAttribute("class", "roc-dot");
      dot.setAttribute("cx", X(midPt[0]));
      dot.setAttribute("cy", Y(midPt[1]));
      dot.setAttribute("stroke", color);
      svg.appendChild(dot);
      dot.addEventListener("mouseenter", function (e) {
        tooltip.textContent = s.name + " · AUC = " + s.auc.toFixed(3);
        tooltip.style.left = dot.getAttribute("cx") / W * 100 + "%";
        tooltip.style.top = dot.getAttribute("cy") / H * 100 + "%";
        tooltip.classList.add("is-visible");
      });
      dot.addEventListener("mouseleave", function () { tooltip.classList.remove("is-visible"); });

      var li = document.createElement("span");
      li.innerHTML = '<i style="background:' + color + '"></i>' + s.name + " (AUC " + s.auc.toFixed(3) + ")";
      legend.appendChild(li);

      container.__anim = container.__anim || [];
      container.__anim.push(function () {
        path.style.transition = "stroke-dashoffset 1100ms cubic-bezier(.22,.61,.36,1)";
        path.style.strokeDashoffset = "0";
      });
    });

    container.appendChild(legend);
  }

  // Barras horizontales simples para métricas 0-100 (p.ej. recall en %),
  // en el azul de marca — usadas para comparar resultados publicados.
  function buildBars(container) {
    var items = JSON.parse(container.getAttribute("data-items")); // [{label, value, suffix, note}]
    var list = document.createElement("div");
    list.className = "bar-list";
    items.forEach(function (it) {
      var row = document.createElement("div");
      row.className = "bar-row";

      var top = document.createElement("div");
      top.className = "bar-row__top";
      var label = document.createElement("span");
      label.className = "bar-row__label";
      label.textContent = it.label;
      var val = document.createElement("span");
      val.className = "bar-row__value";
      val.textContent = it.value.toFixed(2) + (it.suffix || "");
      top.appendChild(label);
      top.appendChild(val);

      var track = document.createElement("div");
      track.className = "bar-row__track";
      var bar = document.createElement("div");
      bar.className = "bar-row__fill";
      track.appendChild(bar);

      row.appendChild(top);
      row.appendChild(track);

      if (it.note) {
        var note = document.createElement("p");
        note.className = "bar-row__note";
        note.textContent = it.note;
        row.appendChild(note);
      }
      list.appendChild(row);

      container.__anim = container.__anim || [];
      container.__anim.push(function () {
        bar.style.width = Math.min(Math.abs(it.value), 100) + "%";
      });
    });
    container.appendChild(list);
  }

  function buildSHAP(container) {
    var items = JSON.parse(container.getAttribute("data-items")); // [{label, value}]
    var max = Math.max.apply(null, items.map(function (i) { return Math.abs(i.value); }));
    var list = document.createElement("div");
    list.className = "shap-list";
    items.forEach(function (it) {
      var row = document.createElement("div");
      row.style.cssText = "display:grid;grid-template-columns:150px 1fr 52px;align-items:center;gap:10px;margin-bottom:10px;";
      var label = document.createElement("span");
      label.style.cssText = "font-size:0.8rem;color:var(--text-secondary-c);";
      label.textContent = it.label;
      var track = document.createElement("div");
      track.style.cssText = "background:var(--grid-line);border-radius:6px;height:12px;overflow:hidden;";
      var bar = document.createElement("div");
      bar.className = "shap-bar";
      bar.style.cssText = "height:100%;width:0;border-radius:6px;background:var(--series-1);";
      track.appendChild(bar);
      var val = document.createElement("span");
      val.style.cssText = "font-size:0.78rem;color:var(--text-secondary-c);text-align:right;";
      val.textContent = it.value.toFixed(2);
      row.appendChild(label); row.appendChild(track); row.appendChild(val);
      list.appendChild(row);

      container.__anim = container.__anim || [];
      container.__anim.push(function () {
        bar.style.width = (Math.abs(it.value) / max * 100) + "%";
      });
    });
    container.appendChild(list);
  }

  /* ------------------------------------------------------------------------
     Diagrama de arquitectura / flujo (p.ej. PACS → CTP → XNAT de Smart-Upload).
     Recreación en SVG con la paleta de marca: nodos en navy, conector en azul
     de marca, etiqueta de una arista destacada en coral. Se dibuja la línea al
     entrar en el viewport y, cuando termina, un pulso recorre el trazo en bucle
     para transmitir sensación de flujo de datos en marcha (se omite si el
     usuario tiene activado prefers-reduced-motion).
     ------------------------------------------------------------------------ */
  function buildArchFlow(container) {
    var nodes = JSON.parse(container.getAttribute("data-nodes")); // [{label, sub}]
    var edgeLabel = container.getAttribute("data-edge-label") || "";
    var edgeIndex = container.hasAttribute("data-edge-index")
      ? parseInt(container.getAttribute("data-edge-index"), 10)
      : nodes.length - 2;
    var branch = container.getAttribute("data-branch")
      ? JSON.parse(container.getAttribute("data-branch")) // {from, label, sub}
      : null;
    var group = container.getAttribute("data-group")
      ? JSON.parse(container.getAttribute("data-group")) // {from, to, label, includeBranch}
      : null;

    var svgNS = "http://www.w3.org/2000/svg";
    var hasIcons = nodes.some(function (nd) { return !!nd.icon; });
    var boxW = 124, boxH = hasIcons ? 84 : 58, gap = 44, margin = 14;
    var n = nodes.length;
    var W = margin * 2 + n * boxW + (n - 1) * gap;

    var topPad = (group && group.label) ? 34 : 16;
    var centerY = topPad + boxH / 2;
    var mainBottom = centerY + boxH / 2;
    var branchGap = 44, branchH = 42, branchY = 0;
    var H;
    if (branch) {
      branchY = mainBottom + branchGap;
      H = branchY + branchH + 16;
    } else {
      H = mainBottom + 16;
    }

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "arch-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", nodes.map(function (nd) { return nd.label; }).join(" → "));

    var uid = "arrow-" + Math.random().toString(36).slice(2, 9);
    var uidWarn = "arrowwarn-" + Math.random().toString(36).slice(2, 9);
    var defs = document.createElementNS(svgNS, "defs");
    var marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", uid);
    marker.setAttribute("markerWidth", "6.5");
    marker.setAttribute("markerHeight", "6.5");
    marker.setAttribute("refX", "5");
    marker.setAttribute("refY", "2.5");
    marker.setAttribute("orient", "auto");
    var arrowPath = document.createElementNS(svgNS, "path");
    arrowPath.setAttribute("d", "M0 0 L5 2.5 L0 5 Z");
    arrowPath.setAttribute("fill", "var(--blue-brand)");
    marker.appendChild(arrowPath);
    defs.appendChild(marker);

    var markerWarn = document.createElementNS(svgNS, "marker");
    markerWarn.setAttribute("id", uidWarn);
    markerWarn.setAttribute("markerWidth", "6.5");
    markerWarn.setAttribute("markerHeight", "6.5");
    markerWarn.setAttribute("refX", "5");
    markerWarn.setAttribute("refY", "2.5");
    markerWarn.setAttribute("orient", "auto");
    var arrowPathWarn = document.createElementNS(svgNS, "path");
    arrowPathWarn.setAttribute("d", "M0 0 L5 2.5 L0 5 Z");
    arrowPathWarn.setAttribute("fill", "var(--coral)");
    markerWarn.appendChild(arrowPathWarn);
    defs.appendChild(markerWarn);

    svg.appendChild(defs);
    container.appendChild(svg);

    var centers = [];
    for (var i0 = 0; i0 < n; i0++) {
      var nx0 = margin + i0 * (boxW + gap);
      centers.push({ x0: nx0, cx: nx0 + boxW / 2 });
    }

    // Recuadro de agrupación (p.ej. "ARTERIAS Net" envolviendo la red interna
    // PACS → Smart-Upload → CTP, incluida la rama de cuarentena). Se dibuja
    // primero para quedar detrás de los nodos.
    if (group && centers[group.from] && centers[group.to]) {
      var gpad = 14;
      var gx0 = centers[group.from].x0 - gpad;
      var gx1 = centers[group.to].x0 + boxW + gpad;
      var gy0 = centerY - boxH / 2 - gpad;
      var gy1 = (group.includeBranch && branch) ? (branchY + branchH + gpad) : (mainBottom + gpad);

      var grect = document.createElementNS(svgNS, "rect");
      grect.setAttribute("x", gx0);
      grect.setAttribute("y", gy0);
      grect.setAttribute("width", gx1 - gx0);
      grect.setAttribute("height", gy1 - gy0);
      grect.setAttribute("rx", 14);
      grect.setAttribute("class", "arch-group-box");
      svg.appendChild(grect);

      if (group.label) {
        var glW = Math.max(78, group.label.length * 6.3 + 22);
        var gpill = document.createElementNS(svgNS, "rect");
        gpill.setAttribute("x", gx0 + 14);
        gpill.setAttribute("y", gy0 - 9);
        gpill.setAttribute("width", glW);
        gpill.setAttribute("height", 18);
        gpill.setAttribute("rx", 9);
        gpill.setAttribute("class", "arch-group-pill");
        svg.appendChild(gpill);

        var gtext = document.createElementNS(svgNS, "text");
        gtext.setAttribute("x", gx0 + 14 + glW / 2);
        gtext.setAttribute("y", gy0 - 9 + 12.5);
        gtext.setAttribute("text-anchor", "middle");
        gtext.setAttribute("class", "arch-group-label");
        gtext.textContent = group.label;
        svg.appendChild(gtext);
      }
    }

    var boxTop = centerY - boxH / 2;

    for (var i = 0; i < n; i++) {
      var x0 = centers[i].x0;
      var cx = centers[i].cx;

      var rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x0);
      rect.setAttribute("y", boxTop);
      rect.setAttribute("width", boxW);
      rect.setAttribute("height", boxH);
      rect.setAttribute("rx", 12);
      rect.setAttribute("class", "arch-node-box");
      svg.appendChild(rect);

      var labelY, subY;
      if (hasIcons) {
        var badgeCy = boxTop + 19;
        if (nodes[i].icon) {
          var isImg = isImageIcon(nodes[i].icon);
          var badge = document.createElementNS(svgNS, "circle");
          badge.setAttribute("cx", cx);
          badge.setAttribute("cy", badgeCy);
          badge.setAttribute("r", isImg ? 16 : 13);
          badge.setAttribute("class", "arch-node-badge");
          svg.appendChild(badge);
          drawArchIcon(svg, svgNS, nodes[i].icon, cx, badgeCy, isImg ? 24 : 15);
        }
        labelY = boxTop + (nodes[i].sub ? 46 : 52);
        subY = boxTop + 60;
      } else {
        labelY = centerY - (nodes[i].sub ? 4 : -4);
        subY = centerY + 13;
      }

      var label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", cx);
      label.setAttribute("y", labelY);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "arch-node-label");
      label.textContent = nodes[i].label;
      svg.appendChild(label);

      if (nodes[i].sub) {
        var sub = document.createElementNS(svgNS, "text");
        sub.setAttribute("x", cx);
        sub.setAttribute("y", subY);
        sub.setAttribute("text-anchor", "middle");
        sub.setAttribute("class", "arch-node-sub");
        sub.textContent = nodes[i].sub;
        svg.appendChild(sub);
      }
    }

    for (var e = 0; e < n - 1; e++) {
      var startX = centers[e].x0 + boxW;
      var endX = centers[e + 1].x0;
      var d = "M" + startX + " " + centerY + " L" + (endX - 6) + " " + centerY;
      var path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "arch-path");
      path.setAttribute("marker-end", "url(#" + uid + ")");
      svg.appendChild(path);

      var len = path.getTotalLength ? path.getTotalLength() : (endX - startX);
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;

      if (e === edgeIndex && edgeLabel) {
        var midX = (startX + endX) / 2;
        var pillW = Math.max(62, edgeLabel.length * 6.2 + 20);
        var pill = document.createElementNS(svgNS, "rect");
        pill.setAttribute("x", midX - pillW / 2);
        pill.setAttribute("y", centerY - boxH / 2 - 28);
        pill.setAttribute("width", pillW);
        pill.setAttribute("height", 20);
        pill.setAttribute("rx", 10);
        pill.setAttribute("class", "arch-edge-pill");
        svg.appendChild(pill);
        var pillText = document.createElementNS(svgNS, "text");
        pillText.setAttribute("x", midX);
        pillText.setAttribute("y", centerY - boxH / 2 - 28 + 14);
        pillText.setAttribute("text-anchor", "middle");
        pillText.setAttribute("class", "arch-edge-label");
        pillText.textContent = edgeLabel;
        svg.appendChild(pillText);
      }

      if (!reduceMotionGlobal()) {
        var pulse = document.createElementNS(svgNS, "circle");
        pulse.setAttribute("r", 3);
        pulse.setAttribute("class", "arch-pulse");
        pulse.style.opacity = "0";
        var anim = document.createElementNS(svgNS, "animateMotion");
        anim.setAttribute("dur", "2.4s");
        anim.setAttribute("repeatCount", "indefinite");
        anim.setAttribute("path", d);
        anim.setAttribute("begin", "indefinite");
        pulse.appendChild(anim);
        svg.appendChild(pulse);
        container.__pulses = container.__pulses || [];
        container.__pulses.push({ el: pulse, anim: anim });
      }

      (function (p) {
        container.__anim = container.__anim || [];
        container.__anim.push(function () {
          p.style.transition = "stroke-dashoffset 1000ms cubic-bezier(.22,.61,.36,1)";
          p.style.strokeDashoffset = "0";
          setTimeout(function () {
            (container.__pulses || []).forEach(function (pu) {
              pu.el.style.opacity = "1";
              try { pu.anim.beginElement(); } catch (e) {}
            });
          }, 950);
        });
      })(path);
    }

    if (branch && centers[branch.from]) {
      var fromC = centers[branch.from];
      var bw = 118, bh = branchH;
      var bx = fromC.cx - bw / 2;
      var by = branchY;
      var bd = "M" + fromC.cx + " " + (centerY + boxH / 2) + " L" + fromC.cx + " " + (by - 6);

      var bpath = document.createElementNS(svgNS, "path");
      bpath.setAttribute("d", bd);
      bpath.setAttribute("class", "arch-branch-path");
      bpath.setAttribute("marker-end", "url(#" + uidWarn + ")");
      svg.appendChild(bpath);

      var blen = bpath.getTotalLength ? bpath.getTotalLength() : (by - centerY);
      bpath.style.strokeDasharray = blen;
      bpath.style.strokeDashoffset = blen;

      var brect = document.createElementNS(svgNS, "rect");
      brect.setAttribute("x", bx);
      brect.setAttribute("y", by);
      brect.setAttribute("width", bw);
      brect.setAttribute("height", bh);
      brect.setAttribute("rx", 10);
      brect.setAttribute("class", "arch-branch-box");
      svg.appendChild(brect);

      var blabel = document.createElementNS(svgNS, "text");
      blabel.setAttribute("x", fromC.cx);
      blabel.setAttribute("y", by + (branch.sub ? 18 : 25));
      blabel.setAttribute("text-anchor", "middle");
      blabel.setAttribute("class", "arch-branch-label");
      blabel.textContent = branch.label;
      svg.appendChild(blabel);

      if (branch.sub) {
        var bsub = document.createElementNS(svgNS, "text");
        bsub.setAttribute("x", fromC.cx);
        bsub.setAttribute("y", by + 32);
        bsub.setAttribute("text-anchor", "middle");
        bsub.setAttribute("class", "arch-branch-sub");
        bsub.textContent = branch.sub;
        svg.appendChild(bsub);
      }

      container.__anim = container.__anim || [];
      container.__anim.push(function () {
        bpath.style.transition = "stroke-dashoffset 700ms cubic-bezier(.22,.61,.36,1) 900ms";
        bpath.style.strokeDashoffset = "0";
      });
    }
  }

  function reduceMotionGlobal() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function buildMaskCompare(container) {
    var svgNS = "http://www.w3.org/2000/svg";
    var panelW = 190, panelH = 150, gap = 56, margin = 14;
    var W = margin * 2 + panelW * 2 + gap;
    var H = 190;
    var panelY = 14;
    var p1x = margin, p2x = margin + panelW + gap;

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "mask-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Antes y después de aplicar una máscara personalizada sobre una anotación de texto en una imagen 2D");

    var uid = "maskarrow-" + Math.random().toString(36).slice(2, 9);
    var defs = document.createElementNS(svgNS, "defs");
    var marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", uid);
    marker.setAttribute("markerWidth", "7");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("refX", "5");
    marker.setAttribute("refY", "2.5");
    marker.setAttribute("orient", "auto");
    var arrowPath = document.createElementNS(svgNS, "path");
    arrowPath.setAttribute("d", "M0 0 L5 2.5 L0 5 Z");
    arrowPath.setAttribute("fill", "var(--blue-brand)");
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);
    container.appendChild(svg);

    [p1x, p2x].forEach(function (px, idx) {
      var panel = document.createElementNS(svgNS, "rect");
      panel.setAttribute("x", px);
      panel.setAttribute("y", panelY);
      panel.setAttribute("width", panelW);
      panel.setAttribute("height", panelH);
      panel.setAttribute("rx", 12);
      panel.setAttribute("class", "mask-panel");
      svg.appendChild(panel);

      // Silueta abstracta (dos elipses solapadas) — sustituye a una imagen clínica real
      var cx = px + panelW / 2, cy = panelY + panelH / 2 + 10;
      var figure = document.createElementNS(svgNS, "g");
      figure.setAttribute("class", "mask-figure");
      [-16, 16].forEach(function (dx) {
        var el = document.createElementNS(svgNS, "ellipse");
        el.setAttribute("cx", cx + dx);
        el.setAttribute("cy", cy);
        el.setAttribute("rx", 20);
        el.setAttribute("ry", 34);
        figure.appendChild(el);
      });
      svg.appendChild(figure);

      var az = { x: px + 14, y: panelY + 14, w: 74, h: 22 };
      if (idx === 0) {
        var outline = document.createElementNS(svgNS, "rect");
        outline.setAttribute("x", az.x);
        outline.setAttribute("y", az.y);
        outline.setAttribute("width", az.w);
        outline.setAttribute("height", az.h);
        outline.setAttribute("rx", 4);
        outline.setAttribute("class", "mask-annot-outline");
        svg.appendChild(outline);
        [0, 1, 2].forEach(function (li) {
          var line = document.createElementNS(svgNS, "line");
          var ly = az.y + 6 + li * 6;
          line.setAttribute("x1", az.x + 6);
          line.setAttribute("y1", ly);
          line.setAttribute("x2", az.x + az.w - 8);
          line.setAttribute("y2", ly);
          line.setAttribute("class", "mask-annot-line");
          svg.appendChild(line);
        });
      } else {
        var block = document.createElementNS(svgNS, "rect");
        block.setAttribute("x", az.x);
        block.setAttribute("y", az.y);
        block.setAttribute("height", az.h);
        block.setAttribute("rx", 4);
        block.setAttribute("class", "mask-block");
        block.style.width = "0px";
        svg.appendChild(block);
        container.__anim = container.__anim || [];
        container.__anim.push(function () {
          block.style.transition = "width 550ms cubic-bezier(.22,.61,.36,1) 450ms";
          block.style.width = az.w + "px";
        });
      }

      var caption = document.createElementNS(svgNS, "text");
      caption.setAttribute("x", px + panelW / 2);
      caption.setAttribute("y", panelY + panelH + 22);
      caption.setAttribute("text-anchor", "middle");
      caption.setAttribute("class", "mask-caption");
      caption.textContent = idx === 0 ? "Antes" : "Después";
      svg.appendChild(caption);
    });

    var ay = panelY + panelH / 2;
    var ax1 = p1x + panelW + 8, ax2 = p2x - 8;
    var apath = document.createElementNS(svgNS, "path");
    apath.setAttribute("d", "M" + ax1 + " " + ay + " L" + ax2 + " " + ay);
    apath.setAttribute("class", "mask-arrow");
    apath.setAttribute("marker-end", "url(#" + uid + ")");
    svg.appendChild(apath);
    var alen = apath.getTotalLength ? apath.getTotalLength() : (ax2 - ax1);
    apath.style.strokeDasharray = alen;
    apath.style.strokeDashoffset = alen;
    container.__anim = container.__anim || [];
    container.__anim.push(function () {
      apath.style.transition = "stroke-dashoffset 450ms cubic-bezier(.22,.61,.36,1)";
      apath.style.strokeDashoffset = "0";
    });

    var alabel = document.createElementNS(svgNS, "text");
    alabel.setAttribute("x", (ax1 + ax2) / 2);
    alabel.setAttribute("y", ay - 10);
    alabel.setAttribute("text-anchor", "middle");
    alabel.setAttribute("class", "mask-arrow-label");
    alabel.textContent = "Máscara";
    svg.appendChild(alabel);
  }

  // Un icono es "de imagen" si es una ruta a un archivo real (logo/captura
  // recortada) en vez de una clave de ARCH_ICONS (pictograma vectorial).
  function isImageIcon(key) {
    return /\.(png|jpe?g|svg|webp)$/i.test(key);
  }

  // Dibuja un pictograma de ARCH_ICONS centrado en (cx, cy) con el tamaño
  // visual "size" (el path original está en un viewBox de 24x24). Si "key"
  // es la ruta a una imagen real (logo/icono recortado de un asset propio),
  // se incrusta tal cual mediante <image> en vez de trazar un path.
  function drawArchIcon(svg, svgNS, key, cx, cy, size) {
    if (isImageIcon(key)) {
      var img = document.createElementNS(svgNS, "image");
      img.setAttributeNS("http://www.w3.org/1999/xlink", "href", key);
      img.setAttribute("href", key);
      img.setAttribute("x", cx - size / 2);
      img.setAttribute("y", cy - size / 2);
      img.setAttribute("width", size);
      img.setAttribute("height", size);
      img.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.appendChild(img);
      return;
    }
    var def = ARCH_ICONS[key];
    if (!def) return;
    var scale = size / 24;
    var g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "arch-node-icon");
    g.setAttribute("transform", "translate(" + (cx - size / 2) + " " + (cy - size / 2) + ") scale(" + scale + ")");
    def.split("|").forEach(function (dStr) {
      var p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", dStr);
      g.appendChild(p);
    });
    svg.appendChild(g);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-chart='roc']").forEach(buildROC);
  document.querySelectorAll("[data-chart='shap']").forEach(buildSHAP);
  document.querySelectorAll("[data-chart='bars']").forEach(buildBars);
  document.querySelectorAll("[data-chart='arch-flow']").forEach(buildArchFlow);

  var chartNodes = document.querySelectorAll("[data-chart]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    chartNodes.forEach(function (el) { (el.__anim || []).forEach(function (fn) { fn(); }); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          (entry.target.__anim || []).forEach(function (fn) { fn(); });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    chartNodes.forEach(function (el) { io.observe(el); });
  }
})();
