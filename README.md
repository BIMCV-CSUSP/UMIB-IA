# README — Web de presentación del grupo UMIB-IA
### Unidad Mixta de Imagen Biomédica e Inteligencia Artificial · FISABIO-CIPF

> **Qué es este documento.** Es la especificación de contenidos y el brief de diseño de la web del grupo. Incluye TODO el texto, la estructura de navegación, el estilo visual y el listado de imágenes necesarias. Es la **fuente única de verdad de contenido y requisitos** para la implementación.
>
> **Sobre la implementación:** la web se construye en **Claude Code**, usando la skill [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) para las decisiones de UI/UX (estilos, paletas, tipografías, patrones de interacción, animación y gráficos). Claude Code tendrá acceso directo a este README y al repositorio con las imágenes ya organizadas por carpetas (ver Sección 10), así que este documento no necesita traducirse a un "prompt" único de copiar y pegar: la Sección 12 recoge en su lugar las **notas técnicas de implementación** (requisitos funcionales, convenciones de carpetas de imágenes, y cómo aprovechar la skill para la animación y los gráficos).
>
> Fuentes usadas: el PDF de la presentación del grupo (47 diapositivas), el tríptico oficial *"Imagen biomédica e IA"*, la web institucional de FISABIO ([enlace](https://fisabio.san.gva.es/es/apoyo-a-la-investigacion/plataformas-y-servicios-cientifico-tecnicos/servicios-cientifico-tecnologicos/fisabio-cipf/)), y para las publicaciones adicionales, dblp (perfil verificado de la IP, ORCID 0000-0003-4505-8399) como fuente complementaria al perfil de Google Scholar indicado por el usuario (Google Scholar bloquea el acceso automatizado directo — ver nota en la Sección 6.1).

---

## 0. Índice

1. Resumen del proyecto
2. Identidad visual y estilo
3. Arquitectura del sitio (mapa de navegación)
4. Contenido — Inicio
5. Contenido — Líneas de trabajo (las 5 líneas + sus proyectos)
6. Contenido — Resultados
7. Contenido — Infraestructura
8. Contenido — Contacto
9. Footer global
10. Banco de imágenes y multimedia necesarias (checklist)
11. Contenido pendiente de aportar por el equipo (TODOs)
12. **Notas técnicas de implementación (Claude Code + ui-ux-pro-max-skill)**

---

## 1. Resumen del proyecto

| Campo | Valor |
|---|---|
| **Nombre del grupo** | UMIB-IA — Unidad Mixta de Imagen Biomédica e Inteligencia Artificial |
| **Adscripción** | FISABIO-CIPF (Fundació per al Foment de la Investigació Sanitària i Biomèdica de la Comunitat Valenciana — Centro de Investigación Príncipe Felipe) |
| **Líder de la Unidad (IP)** | María de la Iglesia Vayá |
| **Contacto general** | bimcv@fisabio.es |
| **Web institucional de referencia** | https://fisabio.san.gva.es/es/apoyo-a-la-investigacion/plataformas-y-servicios-cientifico-tecnicos/servicios-cientifico-tecnologicos/fisabio-cipf/ |
| **Repositorio de datos abierto** | https://bimcv.cipf.es/ (BIMCV — Banc d'Imatges Mèdiques de la Comunitat Valenciana) |
| **Código abierto (GitHub)** | https://github.com/BIMCV-CSUSP |
| **Nº de personas en el equipo investigador** | 13 (incluida la IP) |

**Elevator pitch (para meta-description / redes sociales):**
> UMIB-IA es la Unidad Mixta de Imagen Biomédica e Inteligencia Artificial de FISABIO-CIPF, experta en anonimización, curación y análisis de imagen médica mediante IA y radiómica. Lidera BIMCV, un Banco de Imágenes Médicas de la Comunitat Valenciana, y desarrolla el estándar MIDS-BIDS para investigación biomédica a gran escala.

**Objetivo de la web:**
Dar visibilidad institucional y científica al grupo: quiénes son, qué líneas de investigación desarrollan, qué herramientas y datasets han creado, qué han publicado, y cómo contactar o colaborar con ellos. Debe transmitir rigor científico y a la vez ser muy visual, ágil de navegar y con la IP y el equipo humano en un lugar destacado.

---

## 2. Identidad visual y estilo

> ⚠️ **Nota importante:** los colores y tipografías exactos y el logotipo vectorial los aportará el usuario/equipo de diseño (las ilustraciones del equipo y de la IP ya están resueltas, ver Sección 4.5). Lo que sigue es la **lectura del estilo visual observado en el PDF corporativo actual**, para que la implementación en Claude Code mantenga coherencia de marca (la skill `ui-ux-pro-max-skill` se encarga de la ejecución técnica de UI/UX, ver Sección 12.1). Debe tratarse como punto de partida, sustituible por el manual de marca real si existe.

### 2.1 Paleta de color (extraída del PDF de presentación)

| Uso | Color aproximado | Hex orientativo |
|---|---|---|
| Fondo oscuro (portadas de sección) | Azul-violeta muy oscuro, casi negro | `#170B33` / `#1B0E3D` |
| Acento principal (puntos, subrayados, cifras clave) | Coral / rosa vivo | `#F2617B` / `#EE4266` |
| Acento secundario (círculos decorativos) | Rosa palo / malva claro | `#E8C4CE` |
| Acento terciario (círculos decorativos) | Azul-gris claro | `#B9D3D9` |
| Fondo claro (páginas de contenido) | Gris muy claro, casi blanco | `#F6F7FA` |
| Tarjetas | Blanco | `#FFFFFF` |
| Texto sobre fondo claro | Azul-violeta muy oscuro (mismo que fondo oscuro) | `#1B0E3D` |
| Texto secundario / descripciones | Gris medio | `#5B5B6B` |
| Bloques destacados (dentro de páginas claras) | Azul-violeta oscuro, igual que portadas | `#1B0E3D` |

### 2.2 Tipografía

- Titulares: sans-serif de trazo grueso ("Bold" / "Black"), estilo *Arial Bold / Franklin Gothic / Libre Franklin Bold* — moderna, geométrica, gran tamaño en portadas.
- Cuerpo de texto: sans-serif regular (*Calibri / Libre Franklin Regular*), buena legibilidad, tamaño medio-alto (evitar cuerpos pequeños).
- Etiquetas de categoría ("ANONIMIZACIÓN", "ÁREAS CLAVE"...): versalitas / mayúsculas, letter-spacing amplio, color coral, tamaño pequeño — actúan de "eyebrow" o antetítulo.
- Cada H1/H2 de sección termina con un **punto de color coral** como remate gráfico de marca (ej. "Imagen biomédica e inteligencia artificial**.**").

### 2.3 Motivos gráficos / lenguaje visual

- **Portadas de sección** (fondo oscuro): grandes círculos difuminados (blur/glow) en rosa palo, coral y azul-gris, superpuestos, como fondo decorativo detrás de titulares en blanco. Minimalista, mucho espacio negativo.
- **Tarjetas** (fondo claro): esquinas redondeadas, fondo blanco, sombra sutil, sin bordes duros. Se agrupan en grids de 2, 3 o 4 columnas.
- **Numeración de bloques** (01, 02, 03…): en color coral, tipografía grande, delante del título del bloque.
- **Iconografía**: line-icons simples (monitor, CPU, memoria, disco...) en la sección de infraestructura; combinables con ilustraciones planas para el equipo (avatares ilustrados, no fotográficos, en la versión actual del PDF — sustituibles por fotos reales).
- **Tarjetas "oscuras" dentro de página clara**: algunos bloques destacados (código abierto, cifras clave, definiciones "¿QUÉ ES?") usan el mismo azul-violeta oscuro de portada como fondo, con texto blanco — para dar jerarquía visual sin salir de la página.
- **Enlaces, no QR**: el PDF original usa códigos QR para enlazar a GitHub y a demos (tiene sentido en un documento impreso/proyectado). En la web, sustituir siempre por **enlaces o botones directos** ("Ver en GitHub ↗", "Ver demo ↗") — no usar QR en ningún punto del sitio.
- **Estilo "tríptico" institucional**: además del lenguaje de las diapositivas, incorporar el aire más editorial e institucional del tríptico impreso de FISABIO: el icono de marca ("i2") en **versión de solo contorno/trazo** (line-art, sin relleno sólido) para usos pequeños o sobre fondos de color — cabecera, footer, favicon — reservando la versión a color/sólida para el logo principal del hero; composición más sobria y con más aire en los bloques informativos (menos densidad de elementos por pantalla que en una diapositiva, más propia de una ficha institucional de servicio).

### 2.4 Principios de diseño para esta web

1. **Minimalista y visual primero**: mucho espacio en blanco, poco texto por pantalla, jerarquía tipográfica clara.
2. **La IP tiene mayor peso visual** que el resto del equipo (ver sección 4.3).
3. **Las páginas de proyectos priorizan imagen/gif sobre texto** (pedido explícito del usuario): cada tarjeta de proyecto = imagen o gif grande + texto breve (2-3 líneas máx.).
4. **Consistencia**: reutilizar el patrón "portada oscura con blur + contenido en tarjetas claras" en cada pestaña principal, igual que en el PDF original.
5. **Responsive**: grids que colapsan a 1 columna en móvil; nav superior colapsa a menú hamburguesa.
6. **La web se siente viva al hacer scroll**: cada bloque (tarjeta, titular, cifra, imagen) aparece de forma animada según entra en el viewport, no todo cargado de golpe. Ver detalle en la Sección 2.5.
7. **Cualquier gráfico generado directamente en la web** (no imagen estática) sigue el mismo lenguaje minimalista del resto del sitio: dinámico, limpio y fácil de leer de un vistazo. Ver detalle en la Sección 2.5.

### 2.5 Animación, scroll y gráficos dinámicos

**Comportamiento general al hacer scroll (toda la web):**
- Los elementos aparecen progresivamente a medida que el usuario baja por la página — no se carga todo de golpe. Usar animación de tipo *fade-in + desplazamiento vertical sutil* (ej. 20-30px hacia arriba mientras aparece), disparada cuando el elemento entra en el viewport (`IntersectionObserver` o equivalente).
- En grids de tarjetas (equipo, líneas de trabajo, proyectos, datasets, publicaciones…), las tarjetas aparecen **en cascada/escalonadas** (stagger de ~80-120ms entre una y la siguiente), no todas a la vez.
- Las cifras clave (Inicio e Infraestructura) cuentan hacia arriba ("count-up") desde 0 hasta el valor final cuando entran en el viewport, en vez de aparecer estáticas.
- La animación debe ser **sutil y rápida** (300-500ms), nunca lenta ni recargada — el objetivo es dar sensación de fluidez, no ralentizar la lectura. Cada elemento se anima **una sola vez**, al entrar por primera vez en pantalla (no se repite al hacer scroll arriba y abajo).
- Respetar `prefers-reduced-motion`: si el usuario tiene desactivadas las animaciones a nivel de sistema, mostrar todo directamente sin animar.

**Gráficos generados directamente (no imágenes estáticas):**
Aplica a cualquier gráfico que se construya con código (por ejemplo, si se recrean las curvas ROC o el gráfico SHAP de la Línea 3 — Radiómica, o cualquier otra visualización de datos) en lugar de insertarlo como imagen fija:
- **Minimalistas**: solo los elementos necesarios para entender el dato — sin rejillas de fondo recargadas, sin sombras ni efectos 3D, sin decoración de más.
- **Paleta reducida**: usar la paleta de marca (coral como color principal de dato, grises neutros de apoyo) en vez de arcoíris de colores.
- **Dinámicos**: se dibujan/animan al entrar en el viewport (ej. una curva ROC que se traza de izquierda a derecha, barras que crecen desde 0), y muestran un tooltip claro al pasar el cursor sobre un punto/barra concreto.
- **Fáciles de entender de un vistazo**: etiquetas y leyenda directas y breves, sin jerga innecesaria; si un gráfico necesita mucha explicación para leerse, simplificarlo o acompañarlo de una frase de apoyo muy corta en vez de sobrecargar el propio gráfico.

---

## 3. Arquitectura del sitio (mapa de navegación)

```
┌───────────────────────────────────────────────────────────────────┐
│  [Logo UMIB-IA]     Inicio   Líneas de trabajo ▾  Resultados       │
│                      Infraestructura   Contacto      [Botón CTA]   │
└───────────────────────────────────────────────────────────────────┘
                              │
                              │ (al pasar el cursor por encima / hover)
                              ▼
                    ┌───────────────────────────────┐
                    │ Anonimización y seudonimización│
                    │ Datalakes y curación del dato  │
                    │ Análisis de datos con IA       │
                    │ Realidad aumentada             │
                    │ Proyectos europeos             │
                    └───────────────────────────────┘

01. INICIO
    ├─ Hero / portada
    ├─ Quiénes somos
    ├─ Qué hacemos (misión + 5 líneas resumidas, con enlace)
    ├─ Cifras clave (BIMCV)
    ├─ Equipo (IP destacada + resto del equipo)
    └─ CTA final (ir a líneas de trabajo / contacto)

02. LÍNEAS DE TRABAJO (vista general)
    ├─ Introducción
    ├─ 5 tarjetas-resumen (enlazan cada una a su propia página/sección)
    │    ├─ 02.1 Anonimización y seudonimización
    │    ├─ 02.2 Datalakes y curación del dato
    │    ├─ 02.3 Análisis de datos con IA
    │    ├─ 02.4 Realidad aumentada
    │    └─ 02.5 Proyectos europeos
    └─ (cada una es una página/sección propia con sus proyectos — ver Sección 5)

03. RESULTADOS
    ├─ Introducción
    ├─ Listado completo de publicaciones, agrupado por año
    ├─ Congresos y comunicaciones (placeholder editable)
    └─ Enlaces a datasets (BIMCV) y código abierto (GitHub)

04. INFRAESTRUCTURA
    ├─ Hardware (cifras, animadas al entrar en viewport)
    └─ Software propio / código abierto (galería de repositorios GitHub)

05. CONTACTO
    ├─ Formulario de contacto
    ├─ Datos de contacto directos (email general + IP)
    ├─ Dirección y teléfono
    └─ Enlace a FISABIO-CIPF

FOOTER (en todas las páginas)
    ├─ Logotipos institucionales
    ├─ Enlace a la web oficial de FISABIO-CIPF
    ├─ Enlace a BIMCV (bimcv.cipf.es)
    ├─ Enlace a GitHub
    └─ Datos de contacto + aviso legal
```

La web tiene **5 pestañas**: Inicio, Líneas de trabajo, Resultados, Infraestructura y Contacto. El enlace a la ficha oficial de FISABIO-CIPF vive en el footer y en Contacto (Secciones 8 y 9).

### 3.1 Comportamiento del ítem de navegación "Líneas de trabajo"

Este ítem del menú superior tiene doble función — botón y desplegable a la vez:

- **Al pasar el cursor por encima (hover) en escritorio**: se despliega un submenú con las 5 líneas de trabajo (Anonimización y seudonimización · Datalakes y curación del dato · Análisis de datos con IA · Realidad aumentada · Proyectos europeos), sin necesidad de hacer clic.
- **Al hacer clic directamente sobre "Líneas de trabajo"** (no sobre una opción del desplegable): navega a la página/sección general "Líneas de trabajo" (Sección 5.0 de este documento), la vista con las 5 tarjetas-resumen.
- **Al hacer clic sobre una de las 5 opciones del desplegable**: navega **directamente** a la página/sección de detalle de esa línea concreta (Secciones 5.1 a 5.5), sin pasar por la vista general.
- **En móvil** (sin hover): el ítem "Líneas de trabajo" se comporta como un acordeón dentro del menú hamburguesa — un toque lo expande mostrando las 5 opciones debajo, y tanto el propio ítem "Líneas de trabajo" como cada una de las 5 opciones son enlaces tocables independientes, con el mismo destino que en escritorio.

---

## 4. Contenido — INICIO

### 4.1 Hero / portada
Fondo oscuro con círculos difuminados (rosa, coral, azul-gris), estilo idéntico a la portada del PDF.

- **Eyebrow** (antetítulo, mayúsculas, coral): `UNIDAD MIXTA · FISABIO · CIPF`
- **H1**: `Imagen biomédica e inteligencia artificial.`
- **Subtítulo** (texto nuevo, breve):
  > Investigamos, anonimizamos y analizamos imagen médica a gran escala aplicando inteligencia artificial, para acelerar el diagnóstico, la investigación clínica y la medicina de precisión.
- **Botones CTA**:
  - Primario: `Conoce nuestras líneas de trabajo` → sección/página "Líneas de trabajo"
  - Secundario (outline): `Contacta con nosotros` → sección/página "Contacto"

### 4.2 ¿Quiénes somos?
Sección sobre fondo claro, texto a 1-2 columnas junto a imagen/ilustración.

> **UMIB-IA — Unidad Mixta de Imagen Biomédica e Inteligencia Artificial (FISABIO-CIPF)**
>
> Somos una unidad mixta experta en anonimización, curación y tratamiento de datos de imagen médica mediante técnicas de inteligencia artificial y radiómica. Lideramos **BIMCV**, un Banco de Imágenes Médicas de la Comunitat Valenciana, y contribuimos activamente a la comunidad internacional **BIDS** (Brain Imaging Data Structure) desarrollando la extensión **MIDS-BIDS** (Medical Population Imaging Data Structure) para estandarizar la imagen médica poblacional.
>
> Contamos con una infraestructura computacional singular, una de las mejores dotaciones de la Comunitat Valenciana para investigación biomédica, y colaboramos en proyectos nacionales e internacionales que aplican la IA a la salud real de los pacientes.

*(Texto adaptado de la descripción oficial de FISABIO — se puede citar/enlazar la fuente en el footer o en "Resultados").*

### 4.3 ¿Qué hacemos? (misión + resumen de líneas)
Bloque corto con las 5 líneas de trabajo en formato mini-tarjetas (icono + nombre + 1 línea), cada una enlazando a su sección en "Líneas de trabajo". Sirve de teaser antes de la pestaña completa.

1. **Anonimización y seudonimización** — Protegemos la privacidad del paciente en imagen, metadatos e informes.
2. **Datalakes y curación del dato** — Repositorios abiertos y estandarizados para investigación a gran escala.
3. **Análisis de datos con IA** — Segmentación, clasificación, radiómica y aprendizaje federado sobre casos reales.
4. **Realidad aumentada** — Visualización 3D de imagen médica en web, móvil y dispositivos de realidad aumentada, con aplicaciones en quirófano.
5. **Proyectos europeos** — Consorcios internacionales que llevan la IA médica a la práctica clínica.

### 4.4 Cifras clave
Franja de estadísticas destacadas (números grandes en coral sobre fondo oscuro o claro, a elegir). Animadas en count-up al entrar en el viewport (ver Sección 2.5):

| Cifra | Descripción |
|---|---|
| **47** | Proyectos activos en XNAT/BIMCV |
| **+94.000** | Sujetos registrados |
| **+180.000** | Sesiones de imagen |
| **13** | Personas en el equipo investigador |
| **+25** | Publicaciones científicas desde 2011 |

### 4.5 Equipo — ¡sección clave, la IP debe tener mayor representación!

> 🖼️ **Imágenes ya extraídas y listas para usar.** Se han recortado del PDF original las ilustraciones circulares de cada persona (incluida la IP) como archivos PNG independientes con fondo transparente, en `/assets/equipo/`. **No hace falta esperar a fotos reales**: estas ilustraciones son el material a usar en el diseño, tal cual. Nombres de archivo (coinciden con el nombre y apellido de cada persona):
> `maria-de-la-iglesia-vaya.png`, `joshua-bernal.png`, `joaquim-montell.png`, `jose-m-saborit.png`, `daniel-arias.png`, `isabel.png`, `marisa-caparros.png`, `elena-oliver.png`, `jesus-alzate.png`, `miriam-lopez.png`, `marina-ramiro.png`, `luis-monsolis.png`, `luis-artieda.png`.

**Bloque IP (destacado, ocupa mucho más espacio que el resto — tarjeta grande, ancho completo o 60% del grid, con la ilustración a mayor tamaño):**

> **María de la Iglesia Vayá**
> *Líder de la Unidad — Investigadora Principal (IP)*
>
> Dirige la Unidad Mixta de Imagen Biomédica e Inteligencia Artificial de FISABIO-CIPF y lidera BIMCV, un Banco de Imágenes Médicas de la Comunitat Valenciana. Su investigación se centra en imagen médica poblacional, anonimización de datos clínicos, estandarización de datos biomédicos (MIDS-BIDS) e inteligencia artificial aplicada al diagnóstico por imagen, con más de una década de trayectoria y numerosas publicaciones internacionales en neuroimagen, radiología computacional y ciencia de datos abierta.
>
> 📧 maria.delaiglesia@fisabio.es
>
> *Ilustración:* `/assets/equipo/maria-de-la-iglesia-vaya.png`
>
> *(Nota: bio redactada a partir de fuentes públicas — el equipo debe revisarla/ampliarla y sustituir por la biografía oficial si procede.)*

**Grid del equipo investigador** (tarjetas homogéneas entre sí: ilustración + nombre y apellido + cargo):

| Nombre y apellido | Nombre y apellido | Nombre y apellido |
|---|---|---|
| Joshua Bernal | Joaquim Montell | Jose M. Saborit |
| Daniel Arias | Isabel | Marisa Caparrós |
| Elena Oliver | Jesús Alzate | Miriam López |
| Marina Ramiro | Luis Monsolis | Luis Artieda |

Formato de cada tarjeta:
```
[Ilustración — /assets/equipo/nombre-apellido.png]
Nombre Apellido
Cargo — [pendiente]
```

> ⚠️ Los nombres, apellidos y las ilustraciones ya están listos (arriba). **Queda pendiente de aportar por el equipo, para cada persona**: cargo/rol (ej. "Investigador postdoctoral", "Ingeniera de datos", "Estudiante de doctorado"...). No lleva descripción adicional, solo nombre + cargo. Mientras tanto, dejar el placeholder `[Cargo — pendiente]` visible en el diseño. Si en el futuro se sustituyen las ilustraciones por fotos reales, basta con reemplazar los archivos en `/assets/equipo/` manteniendo el mismo nombre de fichero.

---

## 5. Contenido — LÍNEAS DE TRABAJO

### 5.0 Página general "Líneas de trabajo"

> 🧭 *Navegación:* esta es la página a la que se llega al hacer **clic** sobre "Líneas de trabajo" en el menú superior. Al pasar el cursor por encima de ese mismo ítem (sin hacer clic), se despliega un submenú con las 5 líneas; seleccionar una de ellas ahí lleva directamente a su página de detalle (5.1–5.5), sin pasar por esta vista general. Ver comportamiento completo en la Sección 3.1.

**Eyebrow:** `ÁREAS CLAVE`
**H1:** `Nuestras líneas de trabajo.`
**Intro:**
> Estructuramos nuestra investigación en cinco grandes líneas de trabajo, que cubren todo el ciclo de vida del dato de imagen médica: desde su anonimización y almacenamiento hasta su análisis con inteligencia artificial y su aplicación clínica en quirófano, pasando por nuestra participación en consorcios europeos.

Grid de **5 tarjetas grandes**, cada una con: icono/ilustración, título, tagline (1 frase), y botón `Ver proyectos →` que lleva a la página/sección de detalle correspondiente (ancla o subruta, ver Sección 8 para la implementación técnica).

| # | Línea de trabajo | Tagline para la tarjeta |
|---|---|---|
| 1 | **Anonimización y seudonimización** | Imágenes médicas, metadatos e informes desidentificados conforme a DICOM y al RGPD europeo. |
| 2 | **Datalakes y curación del dato** | Repositorios abiertos y estructurados, estandarizados con MIDS, para investigación a gran escala. |
| 3 | **Análisis de datos con IA** | Segmentación, clasificación, radiómica, aprendizaje federado y señales EEG sobre casos clínicos reales. |
| 4 | **Realidad aumentada** | Virtualización de imagen médica en web, móvil y con dispositivos de realidad aumentada, con aplicaciones en asistencia quirúrgica. |
| 5 | **Proyectos europeos** | Consorcios internacionales donde la imagen médica y la IA mejoran la atención sanitaria real. |

---

### 5.1 Página de detalle — Línea 1: Anonimización y seudonimización

**Eyebrow:** `ANONIMIZACIÓN`
**H1:** `Anonimización y seudonimización.`
**Intro:**
> Todas las imágenes médicas que procesamos cumplen el estándar DICOM. Aplicamos una regulación común para anonimizar/seudonimizar la imagen, los metadatos y los informes clínicos, utilizando la red ARTERIAS en BIMCV.

**Diagrama de flujo sugerido** (imagen/infografía a recrear): `PACS → CTP (ARTERIAS Net) → XNAT (BIMCV)` con etiqueta "Smart-Upload" sobre la flecha final. *(Imagen de referencia: diagrama "Smart-Upload" del PDF, página de anonimización).*

**Proyectos / herramientas** (tarjetas — priorizar imagen/gif grande sobre texto):

1. **Clinical Trial Processor (CTP)** — `METADATOS`
   Software libre de RSNA que cumple los requisitos del estándar DICOM para anonimizar metadatos.
   *Imagen sugerida:* captura de interfaz de CTP o icono de "carpeta segura".

2. **DiSMed — NER para informes radiológicos** — `INFORME`
   Modelo de Procesamiento de Lenguaje Natural (NLP) desarrollado por UMIB-IA, basado en Reconocimiento de Entidades Nombradas (NER), para anonimizar informes radiológicos de la Comunitat Valenciana. Los datos anonimizados se reemplazan por valores sintéticos.
   *Incluye pipeline en 4 pasos:* creación del corpus → sustitución de entidades por valores aleatorizados → generación de corpus sintético → entrenamiento y selección del modelo NER.
   *Publicación:* Pérez-Díez, I. et al. *"De-identifying Spanish medical texts – named entity recognition applied to radiology reports."* Journal of Biomedical Semantics 12, 6 (2021). DOI: 10.1186/s13326-021-00236-2
   *Código:* [github.com/BIMCV-CSUSP/DiSMed ↗](https://github.com/BIMCV-CSUSP/DiSMed)
   *Imagen sugerida:* diagrama de pipeline (A→B→C→D) + captura del paper.

3. **DiSMed-LLM** — `NLP · LLM`
   Evolución de DiSMed que aprovecha modelos de lenguaje extensos (LLMs) como Llama y Gemma para una desidentificación avanzada de texto médico en español.
   *Publicación:* Alzate-Grisales, J.A. et al. *"DisMed-LLM: De-identifying Spanish Medical Text with Large Language Models."* TechRxiv, 2025 (0121).
   *Código:* repositorio aún no público — añadir enlace cuando se publique.
   *Imagen sugerida:* diagrama del pipeline con "Prompt Engineering", "Tagging with LLMs", "NER Anonymisation" (ver Sección 12.3 sobre creación de diagramas si no se aporta imagen explícita).

4. **Defacer — anonimización de imagen 2D y 3D** — `IMAGEN`
   - *2D — Máscaras personalizadas*: eliminación de anotaciones en texto sobre radiografías y otras imágenes 2D.
   - *3D — Eliminación facial*: eliminación de información facial en resonancias magnéticas cerebrales mediante software libre basado en Deep Learning.
   *Imagen/gif sugerido:* antes/después de una radiografía con máscara aplicada; render 3D "Raw MRI Data" vs "Defaced MRI result" (ya existe en el PDF, replicar estilo).

5. **Smart-Upload** — `DICOM · CARGA`
   Herramienta que gestiona la carga de archivos DICOM en la plataforma XNAT de BIMCV, garantizando que los datos sensibles ya han sido eliminados antes de la carga.
   *Código:* [github.com/BIMCV-CSUSP/Smart-Upload ↗](https://github.com/BIMCV-CSUSP/Smart-Upload)
   *Imagen sugerida:* diagrama de arquitectura PACS–CTP–ARTERIAS Net–XNAT.

---

### 5.2 Página de detalle — Línea 2: Datalakes y curación del dato

**Eyebrow:** `DATALAKES Y CURACIÓN DE DATOS`
**H1:** `Datalakes de imagen poblacional y curación del dato.`
**Intro:**
> Desarrollamos repositorios abiertos y estructurados para investigación a gran escala con imagen médica, y garantizamos su trazabilidad y reproducibilidad mediante visualización, segmentación y estandarización con el estándar MIDS.

**Bloque A — XNAT de BIMCV: repositorio abierto**
Plataforma abierta donde se organiza, procesa y comparte imagen médica de proyectos colaborativos.
- Permite organizar imágenes en proyectos.
- Ejecuta procesos sobre imágenes archivadas.
- Acceso multiusuario con permisos predefinidos.

Cifras: **47** proyectos activos · **+94k** sujetos registrados · **+180k** sesiones de imagen.
*Imagen sugerida:* captura de la interfaz web de XNAT/BIMCV (ya usada en el PDF).

**Bloque B — BIMCV Datalake: conjuntos de datos**
Repositorio para almacenar y proteger datos sin procesar o procesados (estructurados, semiestructurados y no estructurados). Acceso: https://bimcv.cipf.es/

Datasets destacados (tarjetas con imagen representativa de cada modalidad):

| Dataset | Modalidad | Descripción |
|---|---|---|
| **10k MIDAS** | Tórax · RX | Cohorte poblacional de imagen torácica. |
| **PadChest** | Tórax · RX | Conjunto público de radiografías de tórax etiquetadas. |
| **COVID-19** | Tórax · TC/RX | Imagen pulmonar adquirida durante la pandemia. |
| **Prostate cancer** | Próstata · MRI | Resonancia multiparamétrica con diagnóstico asociado. |
| **10k · Alzheimer** | Cerebro · MRI | Cohorte longitudinal para deterioro cognitivo. |
| **Esquizofrenia** | Cerebro · MRI | Estudios de primeras alucinaciones y controles. |
| **Hip fracture** | Cadera · RX | Imágenes radiológicas para clasificación y predicción de fractura. |
| **+ Datasets activos** | — | Conjuntos abiertos y federados, disponibles para la comunidad científica. |

**Bloque C — OHIF: visor integrado en XNAT**
Open Health Imaging Foundation. Visor web compatible con el ecosistema DICOM y MIDS, con conexión a nodos de segmentación asistida por IA (MONAI) y anotaciones reutilizables y trazables por proyecto.
*Imagen sugerida:* captura de la interfaz OHIF con contornos/ROIs (ya disponible en el PDF).

**Bloque D — MIDS: Medical Imaging Data Structure**
Sistema de organización de imágenes médicas derivado del estándar BIDS (Brain Imaging Data Structure):
- **BIDS** se centra en establecer reglas para almacenar datos médicos cerebrales.
- **MIDS** integra otras partes del cuerpo y otras modalidades de imagen bajo el mismo estándar.

*Código (incluye la herramienta XNAT2MIDS):* [github.com/BIMCV-CSUSP/MIDS ↗](https://github.com/BIMCV-CSUSP/MIDS)

Estructura de carpetas (bloque de código, estilo terminal sobre fondo oscuro):
```
/DATASET-BIMCV-PROSTATA/
dataset_description.json
participants.tsv
sub-001/
  ses-01/
    mri/
      sub-001_ses-01_T2w.nii.gz
      sub-001_ses-01_T2w.json
      sub-001_ses-01_dwi.nii.gz
    derivatives/
      sub-001_ses-01_seg.nii.gz
  ses-02/ ...
sub-002/ ...
```

**Bloque E — Modalidades de imagen soportadas por MIDS** (5 tarjetas con icono + foto de ejemplo):

| Modalidad | Nombre | Descripción |
|---|---|---|
| **MRI** | Imagen de Resonancia Magnética | Estructural, funcional, difusión y espectroscopía. |
| **RX** | Radiología convencional | Radiografía digital y proyecciones estándar. |
| **CT** | Tomografía computarizada | Series volumétricas con reconstrucciones 3D. |
| **OCT** | Retinopatías | Retinografía, autofluorescencia y OCT. |
| **AP** | Anatomía patológica | Imagen microscópica de tejidos teñidos. |

**Bloque F — Ejemplo práctico: fotografías retinales**
Caso de uso real que muestra cómo un conjunto no estructurado de imágenes DICOM se transforma, mediante un pipeline en Python, en una estructura MIDS ordenada por sujeto/sesión.
*Imagen sugerida:* diagrama "antes/después" de carpetas (ya existe en el PDF, muy visual, ideal para replicar).

**Bloque G — IMPaC-DATA**
Desarrollo de un entorno de integración y análisis de datos, construido sobre la estructura MIDS, capaz de resolver preguntas de grupos clínicos en el marco de los Programas de Medicina Predictiva y Medicina Genómica. Existe una prueba de concepto pública del work package 4 del proyecto (IMPaCT-Data WP4) que usa precisamente la estructura MIDS como base.
*(Mencionado en la web institucional de FISABIO, no en el PDF de presentación; ampliar con ficha técnica —socios, alcance, fechas— cuando esté disponible.)*
*Imagen sugerida:* si no hay logo oficial disponible, recrear un diagrama simple del flujo de integración de datos clínicos sobre MIDS (ver Sección 12.3 sobre creación de diagramas).

---

### 5.3 Página de detalle — Línea 3: Análisis de datos con IA

**Eyebrow:** `ANÁLISIS CON IA`
**H1:** `Análisis de datos con inteligencia artificial.`
**Intro:**
> Segmentación, clasificación, generación de informes, radiómica, aprendizaje federado y casos clínicos reales: así aplicamos la inteligencia artificial a la imagen médica.

> 💡 *Sugerencia de maquetación:* esta línea es la más extensa de las cinco. Recomiendo organizarla en **sub-bloques con su propio subtítulo** dentro de la misma página (o con un submenú lateral/tabs): **Segmentación · Clasificación · Radiómica · Aprendizaje federado · Señales EEG**. Cada sub-bloque, como el resto, con imagen/gif grande y poco texto.

#### 5.3.1 Segmentación de imagen médica
Utilizamos modelos de Deep Learning para delimitar estructuras y lesiones en imagen médica.

- **SAM-UNETR**: transferencia de aprendizaje desde el encoder de *Segment Anything Model* (SAM, Meta AI) hacia un decoder tipo UNet.
  Publicación: DOI 10.1109/ACCESS.2023.3326882
  *Imagen sugerida:* diagrama de arquitectura del modelo (ya existe en el PDF) + logo "Meta AI".
- **Ejemplos clínicos**: segmentación de próstata (PI-RADS) sobre MRI; segmentación multiorgánica abdomino-pélvica en 3D a partir de TC.
  *Imagen/gif sugerido:* renders 3D de segmentación (ya existen en el PDF, muy vistosos).

#### 5.3.2 Clasificación
- **Generación automática de reportes**: clasificación de hallazgos radiológicos (cardiomegalia, atelectasia, consolidación, nódulo, derrame pleural…) sobre radiografía de tórax, con probabilidad por hallazgo.
  *Imagen sugerida:* mapa de calor sobre radiografía + tabla de "Findings probabilities" (ya existe en el PDF).
- **Niveles de severidad de Alzheimer**: clasificación de MRI cerebral en *Early Mild Cognitive Impairment*, *Mild Cognitive Impairment* y *Alzheimer's Disease*.
  *Imagen sugerida:* mosaicos de cortes de MRI por severidad (ya existen en el PDF).
- **Cáncer de próstata clínicamente significativo**: clasificación combinando secuencias T2w, ADC map, DWI y *guided backpropagation* para explicabilidad del modelo.
  *Imagen sugerida:* grid de secuencias MRI con ROI marcada (ya existe en el PDF).

#### 5.3.3 Radiómica
Extracción de una gran cantidad de características de las imágenes médicas mediante algoritmos de caracterización de datos, para alimentar modelos predictivos.

**Flujo de trabajo:** `Input data → Extracción de características radiómicas (forma, primer orden, segundo orden) → 1080 características/ROI → Selección de características relevantes → Entrenamiento ML/DL → Validación con datos de test.`

- **Clasificación de la degeneración de discos lumbares**: pipeline completo (adquisición y segmentación → extracción y selección de características → análisis de resultados con curvas ROC).
- **Esquizofrenia**: cohorte de 187 sujetos control y 134 con primeras alucinaciones (sin diagnóstico de esquizofrenia). Segmentación cerebral con FreeSurfer (Aparc+ASeg), extracción con Pyradiomics, clasificación con SVM, Regresión Logística y Random Forest.
  *Resultados:* curvas ROC (AUC hasta 0,939) y análisis de importancia de variables (SHAP).
  *Imagen sugerida:* si se recrean como gráficos generados en la web (no imagen estática), seguir la guía de la Sección 2.5 — curva ROC que se traza al entrar en viewport, paleta reducida, tooltip al pasar el cursor. Si se usan como imagen fija, replicar el estilo visual ya existente en el PDF.
- **Cellpainting — imágenes microscópicas**: extracción de características de imágenes microscópicas mediante la técnica *Cell Painting* y el software *CellProfiler*, para estudiar el efecto de tratamientos farmacológicos.
  *Imagen sugerida:* ilustración de célula teñida + captura de CellProfiler + heatmap de resultados (ya existen en el PDF).

#### 5.3.4 Aprendizaje federado
Enfoque descentralizado para entrenar modelos de aprendizaje automático: los datos permanecen en los dispositivos/nodos locales y solo se comparten las actualizaciones del modelo, garantizando privacidad y seguridad.

- **TARTAGLIA — Red federada para acelerar la aplicación de la IA en el Sistema Sanitario Español.** Reconocimiento de entidades en informes (NER) aplicado a extracción de hallazgos PI-RADS/BI-RADS desde informes de radiología en varios hospitales de la Comunitat Valenciana, mediante pipeline de NLP: limpieza → corrección ortográfica → tokenización → Word2Vec → análisis en espacio vectorial → extracción PI-RADS.
  *(Mencionado también en la web institucional de FISABIO como colaboración activa del grupo; ampliar con ficha técnica —socios, fechas, alcance completo— cuando esté disponible.)*
  *Imagen sugerida:* mapa de la Comunitat Valenciana con los nodos hospitalarios conectados (ya existe en el PDF) + logo del proyecto TARTAGLIA.
- **GVA PharmaTrace Hub — espacio de datos federado**: infraestructura que integra y gestiona datos de salud de múltiples fuentes (hospitales y fundaciones de investigación: Fundación Hospital Provincial de Castellón, ISABIAL, IIS La Fe, OmicSpace…) coordinada por la Generalitat Valenciana.
  *Caso de uso: Distrofias Hereditarias de la Retina (RD).* Enfermedades progresivas con alta heterogeneidad clínica y genética. Factores diferenciadores: patrón de herencia, tipo de fotorreceptor afectado, edad de inicio, proceso fisiológico alterado, otras características clínicas.
  *Objetivos del caso de uso:* (1) estudio epidemiológico, clínico y sociodemográfico; (2) pruebas diagnósticas subjetivas y objetivas (agudeza visual, campos visuales, retinografía, OCT, pruebas genéticas…); (3) evaluación del abordaje terapéutico; (4) modelos de IA para correlación fenotipo-genotipo.
  *Imagen sugerida:* diagrama de nodos federados (Generalitat Valenciana / Fundación Hospital Provincial Castellón / ISABIAL / IIS La Fe) + fotos de retinografía (ya existen en el PDF).

#### 5.3.5 Señales EEG
Adquisición y análisis de electroencefalografía multicanal para extender la modelización al dominio neurofisiológico.
- Adquisición con equipo Bitbrain de 32 canales, con distintos protocolos configurables.
- Procesamiento: segmentación de señal + extracción de características según protocolo.
- Entrenamiento de modelos de Machine Learning y Deep Learning, con validación mediante curvas ROC.
*Imagen sugerida:* foto de persona con casco EEG + trazado de señal multicanal (ya existen en el PDF).

---

### 5.4 Página de detalle — Línea 4: Realidad aumentada

**Eyebrow:** `REALIDAD AUMENTADA`
**H1:** `Realidad aumentada.`
**Intro:**
> Virtualización de imagen médica con visualización 3D accesible desde web y smartphone, y con dispositivos de realidad aumentada como HoloLens 2 para asistencia quirúrgica y neuroquirúrgica.

**Proyectos:**

1. **3D-MI-Reports — virtualización de imagen médica**
   Nuevo concepto de visualización de biomarcadores de imagen médica a través de web y smartphone: visualización gráfica rápida de estadísticas cerebrales mediante tres segmentos diferentes.
   Demo pública: https://bimcv-csusp.github.io/3D-MI-Reports/brain-visualization/ (botón "Ver demo ↗", enlace directo, sin QR) · Código fuente: https://github.com/BIMCV-CSUSP/3D-MI-Reports
   *Imagen sugerida:* render 3D de cerebro con zonas coloreadas (ya existe en el PDF).

2. **Reconstrucción 3D de columna vertebral y tejidos abdominales**
   A partir de resonancia magnética: segmentación de estructuras (vértebras, discos, nervios, tejido epidural, músculo) → reconstrucción volumétrica 3D navegable.
   *Imagen/gif sugerido:* secuencia "MRI original → segmentación por colores → reconstrucción 3D" (ya existe en el PDF, perfecta para animar como gif).

3. **Asistencia quirúrgica con HoloLens 2**
   Visualización de la columna vertebral reconstruida mediante gafas de realidad aumentada HoloLens 2, superpuesta sobre el campo quirúrgico real.
   - Control mediante gestos de la mano, sin herramientas ni dispositivos adicionales.
   - Visualización de tejidos y huesos no visibles a simple vista durante la operación.
   - Examen virtual de detalles o elementos individuales (vértebra a vértebra, nervio a nervio…).
   - Próximos pasos: control mediante seguimiento de voz y de mirada (eye-tracking).
   *Imagen/vídeo sugerido:* captura del propio HoloLens mostrando el menú "Visibilidad" con las capas Vértebras/Discos/Nervios/Músculos (ya existe en el PDF) — idealmente como **vídeo/gif corto**, es contenido muy demostrativo.

4. **ARTEMISA — visualización neuroquirúrgica**
   Visor con cortes sagital, axial y coronal superpuestos en AR sobre modelo físico/paciente, con control deslizante por plano.
   *Imagen sugerida:* captura de la interfaz ARTEMISA en HoloLens (ya existe en el PDF) + logo ARTEMISA.

5. **Segmentación tumoral en AR**
   Visualización holográfica de superficie cerebral con habitats tumorales diferenciados (necrosis, edema, tumor) y checklist interactiva de capas.
   *Imagen sugerida:* captura del hologram con panel "Brain Surface / Habitat 1: Necrosis / Habitat 2: Edema / Habitat 3: Tumor" (ya existe en el PDF).

---

### 5.5 Página de detalle — Línea 5: Proyectos europeos

**Eyebrow:** `ACCIONES CONJUNTAS DE IMPACTO REAL`
**H1:** `Proyectos europeos.`
**Intro:**
> Participamos en proyectos europeos donde la imagen médica y la inteligencia artificial se traducen en mejoras tangibles para la atención sanitaria.

**Proyecto:**

**eCAN+ · Enhancing digital Capabilities of cANcer centres in Europe**
Iniciativa conjunta que evalúa y fortalece el uso de la teleconsulta y la telemonitorización para optimizar la calidad de vida de pacientes con cáncer, mediante programas de telerehabilitación y apoyo psicooncológico. Más de **80 socios** en el consorcio.
*Participación de UMIB-IA:*
- **WP3 — Evaluación**: co-coordinación del paquete de trabajo; líderes de la tarea 3.2; implicados en las tareas 3.1, 3.3 y 3.4.
- **WP2 — Comunicación**: tarea 2.3.
- **WP5 — Educación**: tareas 5.1 y 5.2.
- **WP6 — Tumor Tensor Board**: tarea 6.3.
*Imagen sugerida:* logo oficial de eCAN+ (aparece en el PDF) + diagrama de work packages (WP2/WP5/WP6/WP3, ya existe en el PDF).

> ⚠️ **Nota:** eCAN+ es el único proyecto europeo documentado en el PDF de presentación del grupo (sección "Acciones conjuntas de impacto real"), y es el único que debe aparecer en esta línea de trabajo. TARTAGLIA y GVA PharmaTrace Hub no son proyectos europeos: pertenecen a la línea de **Aprendizaje federado**, dentro de "Análisis de datos con IA" (ver Sección 5.3.4). IMPaC-DATA pertenece a **Datalakes y curación del dato** (ver Sección 5.2), por usar la estructura MIDS. Si en el futuro el grupo se incorpora a más consorcios europeos, esta página crecerá con nuevas tarjetas junto a eCAN+.

---

## 6. Contenido — RESULTADOS

**Eyebrow:** `RESULTADOS`
**H1:** `Publicaciones y resultados científicos.`
**Intro:**
> Nuestra investigación se traduce en publicaciones científicas, datasets abiertos y herramientas de código abierto para la comunidad biomédica.

### 6.1 Publicaciones científicas (listado completo)

> 💡 *Sugerencia de maquetación:* con más de 60 referencias, no uses una lista larga de texto plano. Preséntalas como una **lista filtrable/buscable por año y por línea de trabajo**, o agrupadas en acordeones por año (más reciente primero, desplegado por defecto; años anteriores colapsados). Cada entrada: título en negrita, autores, revista/fuente, año, y botón/enlace al DOI cuando exista. Todas las publicaciones incluyen a la IP, María de la Iglesia Vayá, entre los autores (Google Scholar la trunca con "…" en muchas, así que en esos casos se indica igualmente).
>
> ⚠️ **Fuente de este listado:** el usuario aportó el volcado completo de su propio perfil de Google Scholar (https://scholar.google.com/citations?hl=es&user=ebmc4E0AAAAJ&view_op=list_works&sortby=pubdate). He cotejado cada entrada contra el listado previo (FISABIO + dblp) y he: (1) añadido todo lo que faltaba, (2) corregido el año de dos publicaciones cuya fecha de volumen impreso difiere de la fecha del DOI/preprint (marcadas abajo), y (3) fusionado en una sola línea los casos en los que Scholar indexa la misma publicación dos veces (preprint + versión publicada, o fe de erratas), indicando ambas referencias en la misma entrada para no duplicar contenido. Las publicaciones de 2011 a 2019 provienen de la ficha oficial de FISABIO (Google Scholar, tal como se ha volcado, no incluye ese tramo).
> Marcadas con ⭐ las publicaciones que conectan directamente con proyectos ya descritos en este README (Línea 3 — radiómica/EEG/lumbar).

**2026**
- Álvarez Llopis, N.; Ocampo Osorio, F.; Alzate-Grisales, J.A.; Mora-Rubio, A.; García-García, F.; Tabares-Soto, R.; de la Iglesia-Vayá, M. **"From diverse CT scans to generalization: towards robust abdominal organ segmentation."** *BMC Medical Imaging*, 26, 158 (2026). DOI: [10.1186/s12880-026-02206-5](https://doi.org/10.1186/s12880-026-02206-5)
- Soler-Sáez, I.; Gómez-Cabañes, B.; Grillo-Risco, R.; Galiana-Roselló, C.; et al.; de la Iglesia-Vayá, M.; et al. **"Single cell landscape of sex differences in the different courses of multiple sclerosis."** *Biology of Sex Differences* (2026). [1 cita]
- Grillo-Risco, R.; Tiurin, M.K.; Perpiñá-Clérigues, C.; Cordero Felipe, F.J.; et al.; de la Iglesia-Vayá, M.; et al. **"MetaOmixTools: a user-friendly web suite for meta-analysis of ranked features and functional enrichment."** *Computational and Structural Biotechnology Journal*, 35(1), 0157 (2026).
- Alzate-Grisales, J.A.; Ocampo-Osorio, F.; Orozco-Arias, S.; Tabares-Soto, R.; de la Iglesia-Vayá, M.; et al. **"From Data Fusion to Decision Support in Prostate Cancer: Evidence Mapping of Multimodal Artificial Intelligence for Diagnosis, Prognosis, and Treatment Selection."** (2026).
- Alzate-Grisales, J.A.; Mora-Rubio, A.; Perán-Teruel, M.; Navarro Beltrán, A.; Ruiz Torres, C.; Osca García, J.M.; de la Iglesia-Vayá, M. **"Clinically significant prostate cancer detection with deep learning in a multi-center magnetic resonance imaging study."** *Scientific Reports*, 16(1), 10976 (2026). [2 citas] DOI: [10.1038/s41598-026-42214-7](https://doi.org/10.1038/s41598-026-42214-7) — *(fe de erratas asociada: "Correction: ...", Scientific Reports 16, 13645, DOI: [10.1038/s41598-026-50501-6](https://doi.org/10.1038/s41598-026-50501-6))*
- Morell-Ortega, S.; González-Cebrián, Á.; Mansencal, B.; Gadea, M.; Vivó Hernando, R.; Rubio, G.; Aparici-Robles, F.; de la Iglesia-Vayá, M.; Catheline, G.; Coupé, P.; Manjón, J.V. **"CAHAL: Clinically Applicable resolution enHAncement for Low-resolution MRI scans."** arXiv:2604.18781 (2026)
- Manjón, J.V.; Morell-Ortega, S.; Ruiz-Perez, M.; Mansencal, B.; Le Bot, E.; et al.; de la Iglesia-Vayá, M.; et al.; Coupé, P. **"Ultra-high resolution multimodal MRI densely labelled holistic structural brain atlas."** *Scientific Reports*, 16(1), 9457 (2026). [1 cita] — *(versión publicada; preprint previo: arXiv:2501.16879, 2025)*

**2025**
- Rojas-Costa, G.M.; Silva-Pinto, V.; Valenzuela, Y.; de la Iglesia-Vayá, M.; et al. **"Intracranial volume variation in Chinchorro mummies: a comparative study with pre-hispanic farmers and contemporary Chilean populations."** *Scientific Reports*, 15(1), 41301 (2025).
- Morell-Ortega, S.; Ruiz-Perez, M.; Gadea, M.; Vivó Hernando, R.; Rubio, G.; de la Iglesia-Vayá, M.; et al. **"Robust deep MRI contrast synthesis using a prior-based and task-oriented 3D network."** *Imaging Neuroscience*, 3, IMAG.a.116 (2025). [4 citas]
- Gimeno Argente, V.V.; Perán-Teruel, M.M.; Navarro Beltrán, A.; Ruiz Torres, C.; Álvarez, G.S.; Moya, Á.C.; de la Iglesia-Vayá, M.; et al. **"IP22-40 — Clinically significant prostate cancer detection with deep learning in a multi-center magnetic resonance imaging study."** *The Journal of Urology*, 213(5S), e1185 (2025). *(resumen de congreso)*
- Soler-Sáez, I.; Karz, A.; Hidalgo, M.R.; Gómez-Cabañes, B.; López-Cerdán, A.; de la Iglesia-Vayá, M.; et al. **"Unveiling common transcriptomic features between melanoma brain metastases and neurodegenerative diseases."** *Journal of Investigative Dermatology*, 145(5), 1135-1146 (2025). [1 cita]
- Ruiz Torres, C.; Navarro Beltrán, A.; Álvarez, G.J.S.; Moya, A.C.; Perán-Teruel, M.; Gimeno Argente, V.; de la Iglesia-Vayá, M.; et al. **"P486 — Influence of clinical variables on the accuracy of an artificial intelligence model for prostate cancer diagnosis."** *European Urology*, 87, S499 (2025). *(resumen de congreso)*
- Navarro Beltrán, A.; Ruiz Torres, C.; Álvarez, G.S.; Moya, A.C.; Perán-Teruel, M.; de la Iglesia-Vayá, M.; et al. **"A0935 — Clinically significant prostate cancer detection with deep learning in a multi-center magnetic resonance imaging study."** *European Urology*, 87, S1783 (2025). *(resumen de congreso)*
- Hurtado, L.-F.; Marco-Ruiz, L.; Segarra, E.; Castro-Bleda, M.J.; Bustos-Moreno, A.; de la Iglesia-Vayá, M.; Vallalta-Rueda, J.F. **"Leveraging Transformers-based models and linked data for deep phenotyping in radiology."** *Computer Methods and Programs in Biomedicine*, 260, 108567 (2025). [1 cita] DOI: [10.1016/j.cmpb.2024.108567](https://doi.org/10.1016/j.cmpb.2024.108567)
- Morell-Ortega, S.; Ruiz-Perez, M.; Gadea, M.; Vivó Hernando, R.; Rubio, G.; Aparici-Robles, F.; de la Iglesia-Vayá, M.; Catheline, G.; Mansencal, B.; Coupé, P.; Manjón, J.V. **"DeepCERES: A deep learning method for cerebellar lobule segmentation using ultra-high resolution multimodal MRI."** *NeuroImage*, 308, 121063 (2025). [13 citas] DOI: [10.1016/j.neuroimage.2025.121063](https://doi.org/10.1016/j.neuroimage.2025.121063)
- Alzate-Grisales, J.A.; Bernal-Salcedo, J.; Saborit-Torres, J.M.; Mora-Rubio, A.; Montell Serrano, J.Á.; García-García, F.; de la Iglesia-Vayá, M. **"DisMed-LLM: De-identifying Spanish Medical Text with Large Language Models."** *TechRxiv*, 2025 (0121). [2 citas]
- Manjón, J.V.; Morell-Ortega, S.; Ruiz-Perez, M.; Mansencal, B.; Le Bot, E.; de la Iglesia-Vayá, M.; et al. **"Ultra-high resolution multimodal MRI dense labelled holistic brain atlas."** arXiv:2501.16879 (2025). [1 cita] — *(preprint; versión publicada en 2026, arriba)*

**2024**
- Núñez, C.; Stephan-Otto, C.; Roldán, A.; Grasa, E.M.; Escartí, M.J.; de la Iglesia-Vayá, M.; et al. **"Orbitofrontal cortex hypergyrification in hallucinating schizophrenia patients: Surface ratio as a promising brain biomarker."** *European Neuropsychopharmacology*, 89, 47-55 (2024). [6 citas]
- López-Cerdán, A.; Andreu, Z.; Hidalgo, M.R.; Soler-Sáez, I.; de la Iglesia-Vayá, M.; et al. **"An integrated approach to identifying sex-specific genes, transcription factors, and pathways relevant to Alzheimer's disease."** *Neurobiology of Disease*, 199, 106605 (2024). [15 citas]
- Malmierca-Merlo, P.; Sánchez-García, R.; Grillo-Risco, R.; Pérez-Díez, I.; de la Iglesia-Vayá, M.; et al. **"MetaFun: unveiling sex-based differences in multiple transcriptomic studies through comprehensive functional meta-analysis."** *Biology of Sex Differences*, 15(1), 66 (2024). [2 citas]
- Carceller, H.; Hidalgo, M.R.; Escartí, M.J.; Nacher, J.; de la Iglesia-Vayá, M.; et al. **"The impact of sex on gene expression in the brain of schizophrenic patients: a systematic review and meta-analysis of transcriptomic studies."** *Biology of Sex Differences*, 15(1), 59 (2024). [10 citas]
- Soler-Sáez, I.; Gómez-Cabañes, B.; Grillo-Risco, R.; Galiana-Roselló, C.; de la Iglesia-Vayá, M.; et al. **"Single cell landscape of sex differences in the progression of multiple sclerosis."** bioRxiv, 2024.06.15.599139 (2024). [3 citas] — *(preprint; versión publicada en 2026, arriba)*
- Poldrack, R.A.; Markiewicz, C.J.; Appelhoff, S.; Ashar, Y.K.; Auer, T.; Baillet, S.; de la Iglesia-Vayá, M.; et al. **"The past, present, and future of the brain imaging data structure (BIDS)."** *Imaging Neuroscience*, 2, imag-2-00103 (2024). [76 citas]
- Llera-Oyola, J.; Carceller, H.; Andreu, Z.; Hidalgo, M.R.; Soler-Sáez, I.; Gordillo, F.; de la Iglesia-Vayá, M.; et al. **"The role of microRNAs in understanding sex-based differences in Alzheimer's disease."** *Biology of Sex Differences*, 15(1), 13 (2024). [20 citas]
- Ruiz-Perez, M.; Morell-Ortega, S.; Gadea, M.; Vivó Hernando, R.; Rubio, G.; Aparici-Robles, F.; de la Iglesia-Vayá, M.; Tourdias, T.; Coupé, P.; Manjón, J.V. **"DeepThalamus: A novel deep learning method for automatic segmentation of brain thalamic nuclei from multimodal ultra-high resolution MRI."** arXiv:2401.07751 (2024). [7 citas]
- Domenech, J.; Mayor, C.; Mora-Rubio, A.; Llombart, R.; Santos, R.; Alfonso, M.; de la Iglesia-Vayá, M.; et al. **"Classification of Intervertebral Disc Degeneration using radiomics and machine learning."** *Brain and Spine*, 4, 103323 (2024). ⭐

**2023**
- Álvarez-Torres, M.M.; López-Cerdán, A.; Andreu, Z.; de la Iglesia-Vayá, M.; et al. **"Vascular differences between IDH-wildtype glioblastoma and astrocytoma IDH-mutant grade 4 at imaging and transcriptomic levels."** *NMR in Biomedicine*, 36(11), e5004 (2023). [17 citas] — *(preprint previo en medRxiv, 2022, ver abajo)*
- Echeverri-Ocampo, I.; Ardila, K.; Molina-Mateo, J.; Padilla-Buriticá, J.I.; de la Iglesia-Vayá, M.; et al. **"EEG-based functional connectivity analysis for cognitive impairment classification."** *Electronics*, 12(21), 4432 (2023). [11 citas] ⭐
- Alzate-Grisales, J.A.; Mora-Rubio, A.; García-García, F.; Tabares-Soto, R.; de la Iglesia-Vayá, M. **"SAM-UNETR: Clinically Significant Prostate Cancer Segmentation Using Transfer Learning From Large Model."** *IEEE Access*, 11, 118217-118228 (2023). [26 citas] DOI: [10.1109/ACCESS.2023.3326882](https://doi.org/10.1109/ACCESS.2023.3326882)
- Echeverri-Ocampo, I.; Ardila, K.; Molina-Mateo, J.; Padilla-Buriticá, J.I.; de la Iglesia-Vayá, M.; et al. **"Influence of Segmentation Schemes on the Interpretability of Functional Connectivity in Mild Cognitive Impairment."** *Trends in Sustainable Smart Cities and Territories International Conference*, 289-297 (2023). [1 cita] ⭐
- Sáenz-Gamboa, J.J.; Domenech, J.; Alonso-Manjarrés, A.; Gómez, J.A.; de la Iglesia-Vayá, M. **"Automatic semantic segmentation of the lumbar spine: Clinical applicability in a multi-parametric and multi-center study on magnetic resonance images."** *Artificial Intelligence in Medicine*, 140, 102559 (2023). [38 citas] DOI: [10.1016/j.artmed.2023.102559](https://doi.org/10.1016/j.artmed.2023.102559) ⭐
- Català-Senent, J.F.; Andreu, Z.; Hidalgo, M.R.; Soler-Sáez, I.; Roig, F.J.; de la Iglesia-Vayá, M.; et al. **"A deep transcriptome meta-analysis reveals sex differences in multiple sclerosis."** *Neurobiology of Disease*, 181, 106113 (2023). [43 citas]
- Pérez-Díez, I.; Andreu, Z.; Hidalgo, M.R.; Perpiñá-Clérigues, C.; Fantín, L.; de la Iglesia-Vayá, M.; et al. **"A comprehensive transcriptional signature in pancreatic ductal adenocarcinoma reveals new insights into the immune and desmoplastic microenvironments."** *Cancers*, 15(11), 2887 (2023). [13 citas]
- Guaita-Céspedes, M.; Grillo-Risco, R.; Hidalgo, M.R.; Fernández-Veledo, S.; de la Iglesia-Vayá, M.; et al. **"Deciphering the sex bias in housekeeping gene expression in adipose tissue: A comprehensive meta-analysis of transcriptomic studies."** *Biology of Sex Differences*, 14(1), 20 (2023). [10 citas]
- Lakhani, P.; et al.; Galant, J.; de la Iglesia-Vayá, M.; Shih, G. **"The 2021 SIIM-FISABIO-RSNA Machine Learning COVID-19 Challenge: Annotation and Standard Exam Classification of COVID-19 Chest Radiographs."** *Journal of Digital Imaging*, 36(1), 365-372 (2023). [56 citas] DOI: [10.1007/s10278-022-00706-8](https://doi.org/10.1007/s10278-022-00706-8)
- Domenech-Fernández, J.; Sáenz-Gamboa, J.; Montell, J.; Llombart, R.; Sanz, J.; de la Iglesia-Vayá, M.; et al. **"Application of machine learning with convolutional neural networks in the analysis of lumbar MR images for the detection of vertebral pathologies."** *Brain and Spine*, 3, 102504 (2023). ⭐
- Pérez Fernández, E.; de la Iglesia-Vayá, M.; Vera Martínez, D.A.; Andreo Martínez, Z.; et al. **"Actividad espontánea del cerebro: bases de la conectividad funcional."** En: *Neurociencia cognitiva*, 231-252 (2023). *(capítulo de libro, en español)*
- Jiménez-Murillo, D.; Castro-Ospina, A.E.; Duque-Muñoz, L.; Martínez-Vargas, J.D.; Suárez-Revelo, J.X.; Vélez-Arango, J.M.; de la Iglesia-Vayá, M. **"Automatic Detection of Focal Cortical Dysplasia Using MRI: A Systematic Review."** *Sensors*, 23(16), 7072 (2023). [17 citas] DOI: [10.3390/s23167072](https://doi.org/10.3390/s23167072)

**2022**
- Alzate-Grisales, J.A.; Mora-Rubio, A.; Arteaga-Arteaga, H.B.; Bravo-Ortiz, M.A.; de la Iglesia-Vayá, M.; et al. **"Cov-Caldas: A new COVID-19 chest X-Ray dataset from state of Caldas-Colombia."** *Scientific Data*, 9(1), 757 (2022). [6 citas]
- López-Cerdán, A.; Andreu, Z.; Hidalgo, M.R.; Grillo-Risco, R.; Català-Senent, J.F.; de la Iglesia-Vayá, M.; et al. **"Unveiling sex-based differences in Parkinson's disease: a comprehensive meta-analysis of transcriptomic studies."** *Biology of Sex Differences*, 13(1), 68 (2022). [65 citas]
- Trasierras-Fresco, A.M.; Virués-Morales, A.; Gómez-Martínez, H.; de la Iglesia-Vayá, M.; et al. **"DNA Methylation Signatures in Breast Cancer: A Systematic Review and Meta-Analysis."** bioRxiv, 2022.10.15.512358 (2022).
- Albiol, A.; Albiol, F.; Paredes, R.; Plasencia-Martínez, J.M.; Blanco Barrio, A.; de la Iglesia-Vayá, M.; et al. **"A comparison of Covid-19 early detection between convolutional neural networks and radiologists."** *Insights into Imaging*, 13(1), 122 (2022). [10 citas] — *(fe de erratas asociada, DOI: [10.1186/s13244-022-01250-3](https://doi.org/10.1186/s13244-022-01250-3))*
- Álvarez-Torres, M.M.; López-Cerdán, A.; de la Iglesia-Vayá, M.; Fuster-Garcia, E.; et al. **"Vascular differences between glioblastoma IDH-wildtype and astrocytoma IDH-mutant grade 4 at imaging and transcriptomic level."** medRxiv, 2022.06.20.22276639 (2022). [1 cita] — *(preprint; versión publicada en 2023, arriba)*
- Mollá, B.; Muñoz-Lasso, D.C.; Sáenz-Gamboa, J.J.; Insuasty, E.; de la Iglesia-Vayá, M.; Pook, M.A.; et al. **"Frataxin deficit leads to reduced dynamics of growth cones in dorsal root ganglia neurons of Friedreich's ataxia YG8sR model: a multilinear algebra approach."** *Frontiers in Molecular Neuroscience*, 15, 912780 (2022). [4 citas]
- Arteaga-Arteaga, H.B.; delaPava, M.; Mora-Rubio, A.; Bravo-Ortiz, M.A.; Alzate-Grisales, J.A.; Arias-Garzón, D.; López-Murillo, L.H.; Buitrago-Carmona, F.; Villa Pulgarin, J.P.; Mercado Ruiz, E.; Orozco-Arias, S.; Hassaballah, M.; de la Iglesia-Vayá, M.; Cardona-Morales, O.; Tabares-Soto, R. **"Machine learning approaches for COVID-19 detection from chest X-ray imaging: A Systematic Review."** arXiv:2206.05615 (2022). [2 citas]
- Echeverri-Ocampo, I.; Ardila-López, K.; Molina-Mateo, J.; Padilla-Buriticá, J.I.; de la Iglesia-Vayá, M.; et al. **"Graph Theory-based Mild Cognitive Impairment Classification Using Functional Connectivity Analysis on EEG."** (2022). ⭐
- Manjón, J.V.; Romero, J.E.; Vivó Hernando, R.; Rubio, G.; Aparici-Robles, F.; de la Iglesia-Vayá, M.; Coupé, P. **"vol2Brain: A New Online Pipeline for Whole Brain MRI Analysis."** *Frontiers in Neuroinformatics*, 16, 862805 (2022). [94 citas] DOI: [10.3389/fninf.2022.862805](https://doi.org/10.3389/fninf.2022.862805)
- Saborit-Torres, J.M.; Nadal-Almela, S.; Montell-Serrano, J.A.; Oliver-Garcia, E.; Carceller, H.; Gómez-Ádrian, J.A.; Caparrós-Redondo, M.; García-García, F.; Domenech-Fernández, J.; de la Iglesia-Vayá, M. **"Beyond the Brain: MIDS Extends BIDS to Multiple Modalities and Anatomical Regions."** *MIE 2022*, 413-414. [4 citas] DOI: [10.3233/SHTI220488](https://doi.org/10.3233/SHTI220488)
- Milham, M.; Petkov, C.; Belin, P.; Ben Hamed, S.; Evrard, H.; Fair, D.; Fox, A.; et al.; de la Iglesia-Vayá, M.; et al. **"Toward next-generation primate neuroscience: A collaboration-based strategic plan for integrative neuroimaging."** *Neuron*, 110(1), 16-20 (2022). [40 citas] DOI: [10.1016/j.neuron.2021.10.015](https://doi.org/10.1016/j.neuron.2021.10.015)
- Arteaga-Arteaga, H.B.; Mora-Rubio, A.; Bravo-Ortiz, M.A.; Alzate-Grisales, J.A.; de la Iglesia-Vayá, M.; et al. **"Deep learning applied to COVID-19 detection in X-ray images."** En: *AI Applications for Disease Diagnosis and Treatment*, 202-247 (2022). [5 citas] *(capítulo de libro)*

**2021**
- Arias-Garzón, D.; Alzate-Grisales, J.A.; Orozco-Arias, S.; Arteaga-Arteaga, H.B.; Bravo-Ortiz, M.A.; Mora-Rubio, A.; Saborit-Torres, J.M.; Montell Serrano, J.Á.; de la Iglesia Vayá, M.; Cardona-Morales, O.; Tabares-Soto, R. **"COVID-19 detection in X-ray images using convolutional neural networks."** *Machine Learning with Applications*, 6, 100138 (2021). [123 citas] DOI: [10.1016/j.mlwa.2021.100138](https://doi.org/10.1016/j.mlwa.2021.100138)
- Bannier, E.; Barker, G.; Borghesani, V.; Broeckx, N.; Clement, P.; Emblem, K.E.; de la Iglesia Vayá, M.; et al. **"The Open Brain Consent: Informing research participants and obtaining consent to share brain imaging data."** *Human Brain Mapping*, 42(7), 1945-1951 (2021). [66 citas] DOI: [10.1002/hbm.25351](https://doi.org/10.1002/hbm.25351)
- Pérez-Díez, I.; Pérez-Moraga, R.; López-Cerdán, A.; Caparrós Redondo, M.; Salinas-Serrano, J.M.; de la Iglesia-Vayá, M. **"De-identifying Spanish medical texts – named entity recognition applied to radiology reports."** *Journal of Biomedical Semantics*, 12(1), 6 (2021). [39 citas] DOI: [10.1186/s13326-021-00236-2](https://doi.org/10.1186/s13326-021-00236-2)
- Català-Senent, J.F.; Hidalgo, M.R.; Berenguer, M.; Parthasarathy, G.; Malhi, H.; de la Iglesia-Vayá, M.; García-García, F. **"Hepatic steatosis and steatohepatitis: a functional meta-analysis of sex-based differences in transcriptomic studies."** *Biology of Sex Differences*, 12(1), 29 (2021). [23 citas] DOI: [10.1186/s13293-021-00368-1](https://doi.org/10.1186/s13293-021-00368-1)
- Sáenz-Gamboa, J.J.; de la Iglesia-Vayá, M.; Gómez, J.A. **"Automatic semantic segmentation of structural elements related to the spinal cord in the lumbar region by using convolutional neural networks."** 2020 25th International Conference on Pattern Recognition (ICPR), 5214-5221 (2021). [5 citas] ⭐
- Pérez-Díez, I.; Hidalgo, M.R.; Malmierca-Merlo, P.; Andreu, Z.; Romera-Giner, S.; Farràs, R.; de la Iglesia-Vayá, M.; Provencio, M.; Romero, A.; García-García, F. **"Functional Signatures in Non-Small-Cell Lung Cancer: A Systematic Review and Meta-Analysis of Sex-Based Differences in Transcriptomic Studies."** *Cancers*, 13(1), 143 (2021). [26 citas] DOI: [10.3390/cancers13010143](https://doi.org/10.3390/cancers13010143)
- Malmierca-Merlo, P.; Sánchez-García, R.; Grillo-Risco, R.; Pérez-Díez, I.; de la Iglesia-Vayá, M.; et al. **"MetaFun: Unveiling sex differences in multiple omics studies through comprehensive functional meta-analysis."** bioRxiv (2021). — *(preprint; versión publicada en 2024, arriba)*

**2020**
- Bustos, A.; Pertusa, A.; Salinas, J.M.; de la Iglesia-Vayá, M. **"PadChest: A large chest x-ray image dataset with multi-label annotated reports."** *Medical Image Analysis*, 66, 101797 (2020). [1066 citas] DOI: [10.1016/j.media.2020.101797](https://doi.org/10.1016/j.media.2020.101797)
- de la Iglesia-Vayá, M.; Saborit, J.M.; Montell, J.A.; Pertusa, A.; Bustos, A.; Cazorla, M.; et al. **"BIMCV COVID-19+: a large annotated dataset of RX and CT images from COVID-19 patients."** arXiv:2006.01174 (2020). [298 citas] ⭐⭐ *(paper original del dataset; distinto de la entrada IEEE DataPort de 2023 ya recogida)*
- Nuño-Cabanes, C.; García-Molinero, V.; Martín-Expósito, M.; Gas, M.-E.; de la Iglesia-Vayá, M.; Rodríguez-Navarro, S. **"SAGA-CORE subunit Spt7 is required for correct Ubp8 localization, chromatin association and deubiquitinase activity."** *Epigenetics & Chromatin*, 13(1), 46 (2020). [8 citas] DOI: [10.1186/s13072-020-00367-3](https://doi.org/10.1186/s13072-020-00367-3)
- Saborit-Torres, J.M.; Sáenz-Gamboa, J.J.; Montell, J.À.; Salinas, J.M.; Gómez, J.A.; de la Iglesia-Vayá, M.; et al. **"Medical imaging data structure extended to multiple modalities and anatomical regions."** arXiv:2010.00434 (2020). [7 citas]
- Manjón, J.V.; Romero, J.E.; Vivó Hernando, R.; Rubio, G.; Aparici, F.; de la Iglesia-Vayá, M.; Tourdias, T.; Coupé, P. **"Blind MRI brain lesion inpainting using deep learning."** SASHIMI@MICCAI 2020, 41-49 (2020). [33 citas] DOI: [10.1007/978-3-030-59520-3_5](https://doi.org/10.1007/978-3-030-59520-3_5)
- González, G.; Bustos, A.; Salinas, J.M.; de la Iglesia-Vayá, M.; Galant, J.; et al. **"UMLS-ChestNet: A deep convolutional neural network for radiological findings, differential diagnoses and localizations of COVID-19 in chest x-rays."** arXiv:2006.05274 (2020). [7 citas]
- Manjón, J.V.; Romero, J.E.; Vivó Hernando, R.; Rubio-Navarro, G.; de la Iglesia-Vayá, M.; et al. **"Deep ICE: A deep learning approach for MRI intracranial cavity extraction."** arXiv:2001.05720 (2020). [10 citas]
- Sepúlveda, M.M.; Rojas, G.M.; Faure, E.; Pardo, C.R.; las Heras, F.; Okuma, C.; Cordovez, J.; de la Iglesia-Vayá, M.; Molina-Mateo, J.; Gálvez, M. **"Visual Analysis of automated segmentation in the diagnosis of focal cortical dysplasias with magnetic resonance imaging."** *Epilepsy & Behavior*, 102, 106684 (2020). [10 citas] DOI: [10.1016/j.yebeh.2019.106684](https://doi.org/10.1016/j.yebeh.2019.106684)
- Sancho, J.V.; Peyró, C.F.; Montell, J.A.; Escartí Fabra, M.J. **"Aplicación de la inteligencia artificial con procesamiento del lenguaje natural para textos de investigación cualitativa en la relación médico-paciente con enfermedad mental."** *Revista de Comunicación y Salud: RCyS*, 10(1), 19-41 (2020). [43 citas] *(en español)*

**2019 y anteriores** (histórico, procede de la ficha oficial de FISABIO — Google Scholar, tal como se aportó, no llega hasta este tramo)

**2019**
- Mollá, B.; Muñoz-Lasso, D.; Calap, P.; Fernández-Vilata, A.; de la Iglesia-Vayá, M.; Pallardó, F.V.; Moltó, M.D.; Palau, F.; González-Cabo, P. **"Phosphodiesterase inhibitors revert axonal dystrophy in Friedreich's ataxia mouse model."** *Neurotherapeutics*, 16, 432-449 (2019). DOI: [10.1007/s13311-018-00706-z](https://doi.org/10.1007/s13311-018-00706-z)
- **"Review of Prodromal Symptoms in Parkinson's Disease Detected By MRI, EEG And Microbiome."** Frenxiv (2019). DOI: [10.31226/osf.io/yfnmw](https://doi.org/10.31226/osf.io/yfnmw)

**2018**
- Rojas, G.M.; Alvarez, C.; Montoya, C.E.; de la Iglesia-Vayá, M.; Cisternas, J.E.; Gálvez, M. **"Study of Resting-State Functional Connectivity Networks Using EEG Electrodes Position As Seed."** *Frontiers in Neuroscience*, 12, 235 (2018). DOI: [10.3389/fnins.2018.00235](https://doi.org/10.3389/fnins.2018.00235)
- de la Iglesia-Vayá, M.; Salinas, J.M.; Llopis Penadés, R.; Hernández Marín, C.; Rodríguez López, R.; Sánchez Manchón, P.; García Medina, A.; Muñoz Núñez, C.; Caparrós Redondo, M.; Ávila Peñalver, A.M.; Ferrer Ripolles, C. **"Imagen Médica Poblacional como Impulsora de la Transformación Digital en los Sistemas de Información para la Salud de la CSUSP."** *Revista de la Sociedad Española de Informática y Salud (I+S)*, núm. 132 (2018)

**2017**
- Koposov, R.; Frodl, T.; Nytrø, Ø.; Leventhal, B.; Sourander, A.; Quaglini, S.; Molteni, M.; de la Iglesia Vayá, M.; Prokosch, H.U.; Barbarini, N.; Milham, M.P.; Castellanos, F.X.; Skokauskas, N. **"Clinical Decision Support Systems for Child Neuropsychiatric Disorders: The Time Has Come?"** *Annals of Cognitive Science*, 1(1), 12-15 (2017). DOI: [10.36959/447/335](https://doi.org/10.36959/447/335)
- Koposov, R.; Fossum, S.; Frodl, T.; et al.; de la Iglesia Vayá, M.; et al. **"Clinical decision support systems in child and adolescent psychiatry: a systematic review."** *European Child & Adolescent Psychiatry*, 26, 1309-1317 (2017). DOI: [10.1007/s00787-017-0992-0](https://doi.org/10.1007/s00787-017-0992-0)
- Mollá, B.; Muñoz-Lasso, D.C.; Riveiro, F.; Bolinches-Amorós, A.; Pallardó, F.V.; Fernández-Vilata, A.; de la Iglesia-Vayá, M.; Palau, F.; González-Cabo, P. **"Reversible Axonal Dystrophy by Calcium Modulation in Frataxin-Deficient Sensory Neurons of YG8R Mice."** *Frontiers in Molecular Neuroscience*, 10, 264 (2017). DOI: [10.3389/fnmol.2017.00264](https://doi.org/10.3389/fnmol.2017.00264)

**2015**
- de la Iglesia-Vayá, M.; Salinas, J.; Rojas, G.; Pérez-Cortés, J.; Llobet, R.; Cazorla, M.; Martínez, J.; Martí-Bonmatí, L.; Blanquer, I.; Regaña, M.; Puig, J. **"BIMCV: Synergy between Peta Bytes of data in population medical imaging, computer aided diagnosis and AVR."** *Studies in Health Technology and Informatics*, 210, 987-989 (2015)
- Blanquer, I.; Caballer, M.; Martí-Bonmatí, L.; de la Iglesia Vayá, M.; et al. **"A Cloud Infrastructure for Scalable Computing on Population Imaging Databanks."** *International Journal of Image Mining*, 1(2-3) (2015). DOI: [10.1504/IJIM.2015.073015](https://doi.org/10.1504/IJIM.2015.073015)

**2012**
- **"Segmentación automática del cerebro: un nuevo enfoque en imágenes de RM potenciadas en T1."** *Radiología*, 44, 240-241 (2012)

**2011**
- Martí Bonmatí, L.; Valenzuela Juan, R.; de la Iglesia Vayá, M. *Imagen Diagnóstica* (Elsevier), vol. 2, 45-46 (2011). DOI: [10.1016/S2171-3669(11)70029-4](https://doi.org/10.1016/S2171-3669(11)70029-4)

*Fuente y verificación: volcado completo del perfil de Google Scholar de la IP aportado por el usuario (2020-2026), cotejado con la ficha oficial de resultados de FISABIO (2011-2021) y con dblp para completar DOIs. Revisar y actualizar esta lista periódicamente a medida que se publiquen nuevos trabajos.*


### 6.2 Congresos y comunicaciones
> ⚠️ No se ha localizado en el PDF ni en la web un listado explícito de congresos/comunicaciones orales o pósteres. Dejar esta sub-sección como **placeholder estructurado**, lista para rellenar:

Formato sugerido por entrada: `Título de la comunicación — Congreso — Ciudad, año — [Póster/Oral]`

```
- [Título pendiente] — [Nombre del congreso] — [Ciudad, año] — Comunicación oral
- [Título pendiente] — [Nombre del congreso] — [Ciudad, año] — Póster
- [Título pendiente] — [Nombre del congreso] — [Ciudad, año] — Póster
```

### 6.3 Datasets y código abierto (enlace cruzado)
Bloque final con dos botones directos (no duplicar contenido, solo enlazar hacia donde ya vive):
- `Ver nuestros datasets abiertos en BIMCV ↗` → https://bimcv.cipf.es/
- `Ver nuestro código abierto en GitHub ↗` → https://github.com/BIMCV-CSUSP

---

## 7. Contenido — INFRAESTRUCTURA

**Eyebrow:** `INFRAESTRUCTURA`
**H1:** `Hardware y software propio.`
**Intro:**
> La ciencia abierta necesita músculo técnico. Esta es la infraestructura computacional que hace posible procesar imagen médica a gran escala, y el software que desarrollamos y compartimos con la comunidad.

### 7.1 Hardware
Franja de cifras grandes (mismo estilo que "Cifras clave" del Inicio, sobre fondo oscuro; animación count-up según la Sección 2.5). Para que sea visualmente interesante y no una tabla plana:
- Animar los números al entrar en el viewport (contador ascendente, tipo "count-up").
- Acompañar cada cifra de un icono de línea simple (nodo, chip, memoria, GPU, disco).
- La tarjeta de las GPUs (la más "vistosa" técnicamente) puede destacarse con un color/fondo diferenciado, como ya ocurre en el PDF original.

| Cifra | Descripción |
|---|---|
| **13** | Nodos de computación |
| **600** | Unidades de procesamiento (CPUs) |
| **11 TB** | Memoria RAM agregada |
| **4** | GPUs NVIDIA Volta V100 · 81 GB por GPU · servidor de IA dedicado |
| **1 PB** | Almacenamiento general |
| **180 TB** | Gestión DICOM · escalable a 800 TB |

### 7.2 Software de desarrollo propio y código abierto

> 💡 *Idea para que esta sección sea visual e interesante, no solo una tabla:* tratarla como una **galería de repositorios tipo "showcase"**, con tarjetas grandes al estilo GitHub (nombre, lenguaje, icono, badge de licencia) en vez de una tabla plana — por ejemplo con un pequeño contador animado de estrellas/forks si se conecta a la API pública de GitHub, o simplemente con badges estáticos. Cada tarjeta enlaza **directamente** al repositorio (nada de QR).

Grid de tarjetas — cada una enlaza directamente a su repositorio en GitHub:

| Herramienta | Categoría | Descripción | Repositorio |
|---|---|---|---|
| **DiSMed** | NLP · NER | Desidentificación de informes radiológicos basada en Reconocimiento de Entidades Nombradas en español. | [github.com/BIMCV-CSUSP/DiSMed ↗](https://github.com/BIMCV-CSUSP/DiSMed) |
| **DiSMed-LLM** | NLP · LLM | Desidentificación de informes radiológicos mediante modelos de lenguaje extensos (LLMs). | *repositorio aún no público — enlazar cuando se publique* |
| **Smart-Upload** | DICOM | Carga de archivos DICOM en la plataforma XNAT con datos sensibles ya eliminados. | [github.com/BIMCV-CSUSP/Smart-Upload ↗](https://github.com/BIMCV-CSUSP/Smart-Upload) |
| **MIDS / XNAT2MIDS** | Estandarización | Recuperación de información y conversión de formato a la estructura MIDS. | [github.com/BIMCV-CSUSP/MIDS ↗](https://github.com/BIMCV-CSUSP/MIDS) |
| **BIMCV-AIKit** | Toolkit | Métodos útiles para manejar imágenes médicas en Python e implementaciones de modelos de Deep Learning. | [github.com/BIMCV-CSUSP/BIMCV-AIKit ↗](https://github.com/BIMCV-CSUSP/BIMCV-AIKit) |
| **3D-MI-Reports** | Realidad aumentada | Visualización 3D de biomarcadores de imagen médica en web/móvil (ver Línea 4). | [github.com/BIMCV-CSUSP/3D-MI-Reports ↗](https://github.com/BIMCV-CSUSP/3D-MI-Reports) |
| **BIMCV-COVID-19** | Dataset + scripts | Herramientas y metadatos del dataset abierto BIMCV-COVID19+. | [github.com/BIMCV-CSUSP/BIMCV-COVID-19 ↗](https://github.com/BIMCV-CSUSP/BIMCV-COVID-19) |
| **GitHub · BIMCV-CSUSP** | Código abierto — tarjeta destacada | Organización pública con todo nuestro código abierto para la comunidad biomédica y de IA. *(tarjeta destacada, fondo oscuro, botón "Ver todos los repositorios ↗", sin QR)* | [github.com/BIMCV-CSUSP ↗](https://github.com/BIMCV-CSUSP) |

---

## 8. Contenido — CONTACTO

**Eyebrow:** `CONTACTO`
**H1:** `Hablemos.`
**Intro:**
> ¿Quieres colaborar en un proyecto, solicitar acceso a un dataset o necesitas más información sobre nuestros servicios? Escríbenos.

### 8.1 Formulario de contacto (campos sugeridos)
- Nombre y apellidos *
- Institución / organización
- Correo electrónico *
- Asunto (select: Colaboración en investigación / Acceso a datos y datasets / Servicios y tarifas / Prensa y comunicación / Otro)
- Mensaje *
- Casilla de consentimiento RGPD (enlazando a la política de privacidad de FISABIO)
- Botón: `Enviar mensaje`

### 8.2 Datos de contacto directo

| | |
|---|---|
| **Email general del servicio** | bimcv@fisabio.es |
| **Líder de la Unidad (IP)** | María de la Iglesia Vayá — maria.delaiglesia@fisabio.es |
| **Dirección** | Avda. de Catalunya, 21 · 46020 Valencia, España |
| **Teléfono** | +34 961 925 700 |

### 8.3 Enlace a FISABIO
Bloque destacado (tarjeta, fondo oscuro o borde de color):

> **Más información institucional**
> Consulta la ficha completa de la Unidad en la web de FISABIO.
> **Botón:** `Ir a FISABIO-CIPF ↗` → https://fisabio.san.gva.es/es/apoyo-a-la-investigacion/plataformas-y-servicios-cientifico-tecnicos/servicios-cientifico-tecnologicos/fisabio-cipf/

### 8.4 Mapa / ubicación (opcional)
Si se desea, embeber un mapa (Google Maps / OpenStreetMap) centrado en Avda. de Catalunya, 21, Valencia.

---

## 9. Footer global (en todas las páginas)

- **Logotipos institucionales** (fila horizontal, tal como en la última diapositiva del PDF): Generalitat Valenciana | ACI·ARA | Fundació Fisabio | Imagen Biomédica e IA. Añadir también, si procede, los logos que aparecen en la web de FISABIO: FEDER (Fondo Europeo de Desarrollo Regional), Instituto de Salud Carlos III, FECYT, IVACE+i.
- **Tagline**: "Unidad Mixta de Imagen Biomédica e Inteligencia Artificial · FISABIO-CIPF"
- **Columna de enlaces — Sitio**: Inicio · Líneas de trabajo · Resultados · Infraestructura · Contacto
- **Columna de enlaces — Recursos externos**:
  - Web oficial FISABIO-CIPF ↗ (https://fisabio.san.gva.es/es/apoyo-a-la-investigacion/plataformas-y-servicios-cientifico-tecnicos/servicios-cientifico-tecnologicos/fisabio-cipf/)
  - BIMCV — Banco de Imágenes Médicas ↗ (https://bimcv.cipf.es/)
  - GitHub — BIMCV-CSUSP ↗ (https://github.com/BIMCV-CSUSP)
- **Columna de contacto**: bimcv@fisabio.es · +34 961 925 700 · Avda. de Catalunya, 21 · 46020 Valencia
- **Línea legal inferior**: © [Año] UMIB-IA · Fundació Fisabio. Aviso legal · Política de privacidad. *(enlazar a los avisos legales de FISABIO si esta web se aloja bajo su dominio/paraguas legal).*

---

## 10. Banco de imágenes y multimedia necesarias (checklist)

Marcar como pendientes de sustituir por asset real; mientras tanto usar placeholders con el mismo ratio/tamaño.

**Marca**
- [ ] Logotipo UMIB-IA en SVG (versión color + versión blanca para fondo oscuro)
- [ ] Logotipos institucionales: Generalitat Valenciana, ACI·ARA, Fundació Fisabio, CIPF, FEDER, ISCIII, FECYT, IVACE+i

**Inicio**
- [x] Ilustración de María de la Iglesia Vayá (IP) — ya extraída del PDF, en `/assets/equipo/maria-de-la-iglesia-vaya.png`
- [x] Ilustraciones de los 12 miembros del equipo — ya extraídas del PDF, en `/assets/equipo/` (ver Sección 4.5)
- [ ] Imagen/ilustración decorativa para "¿Quiénes somos?"

**Línea 1 — Anonimización**
- [ ] Antes/después de radiografía con máscara de texto aplicada
- [ ] Renders 3D "MRI original vs. defaced" (cara eliminada)
- [ ] Diagrama de arquitectura Smart-Upload (PACS→CTP→XNAT)

**Línea 2 — Datalakes y curación**
- [ ] Captura de interfaz XNAT/BIMCV
- [ ] Imagen representativa de cada dataset (RX tórax, TC, MRI próstata, MRI cerebro, RX cadera)
- [ ] Captura de interfaz OHIF con segmentaciones/contornos
- [ ] Diagrama de carpetas MIDS (antes: DICOMDIR desordenado / después: estructura MIDS)
- [ ] Foto de ejemplo por modalidad (MRI, RX, CT, OCT, AP)
- [ ] Logo IMPaC-DATA (si existe; si no, recrear diagrama simple del flujo de integración sobre MIDS)

**Línea 3 — Análisis con IA**
- [ ] Diagrama de arquitectura SAM-UNETR
- [ ] Renders 3D de segmentación multiorgánica
- [ ] Ejemplo de mapa de calor + tabla de hallazgos (generación de reportes)
- [ ] Mosaicos MRI por severidad de Alzheimer
- [ ] Grid de secuencias MRI de próstata con ROI
- [ ] Gráficos de radiómica: shape/first order/second order, curvas ROC, SHAP
- [ ] Imagen de célula teñida (Cellpainting) + captura CellProfiler + heatmap
- [ ] Logo TARTAGLIA + mapa de nodos federados (Comunitat Valenciana)
- [ ] Fotos de retinografía (distrofias hereditarias de la retina)
- [ ] Foto de casco EEG Bitbrain + trazado de señal

**Línea 4 — Realidad aumentada**
- [ ] Render 3D de cerebro segmentado (3D-MI-Reports)
- [ ] Secuencia MRI → segmentación → reconstrucción 3D de columna (idealmente como **gif**)
- [ ] Vídeo/gif de HoloLens 2 en quirófano con menú "Visibilidad"
- [ ] Captura interfaz ARTEMISA (cortes sagital/axial/coronal)
- [ ] Captura de segmentación tumoral holográfica

**Línea 5 — Proyectos europeos**
- [ ] Logo oficial eCAN+
- [ ] Diagrama de Work Packages de eCAN+

**Infraestructura**
- [ ] Iconos de hardware (nodos, CPU, RAM, GPU, almacenamiento) — pueden ser icon set genérico
- [ ] (Opcional) badges/logos de lenguaje o licencia por repositorio, si se hace la galería tipo GitHub

**Resultados**
- [ ] (Opcional) capturas de las portadas de las 3 revistas/journals citados

---

## 11. Contenido pendiente de aportar por el equipo (TODOs)

1. **Equipo**: nombres, apellidos e ilustraciones ya resueltos (Sección 4.5, archivos en `/assets/equipo/`). Falta aportar, para cada persona, solo el cargo/rol. No lleva descripción adicional ni requiere foto real (se usan las ilustraciones del PDF).
2. **Bio de la IP**: confirmar/ampliar la biografía redactada en la Sección 4.5 (está basada en fuentes públicas, no es oficial).
3. **Identidad de marca real**: logotipo vectorial, paleta de color oficial (si difiere de la estimada en Sección 2) y tipografías con licencia.
4. **Congresos y comunicaciones**: listado real para la Sección 6.2 (no encontrado en las fuentes disponibles).
5. **TARTAGLIA e IMPaC-DATA**: ficha ampliada (rol de UMIB-IA, socios, fechas, alcance) si se quiere el mismo detalle que eCAN+. Recordar que ya no están en "Proyectos europeos": TARTAGLIA vive en Aprendizaje federado (Sección 5.3.4) e IMPaC-DATA en Datalakes y curación del dato (Sección 5.2).
6. **DiSMed-LLM**: publicación confirmada en TechRxiv (2025, 0121); falta solo el repositorio en GitHub, aún no público (el resto de repos ya están enlazados: https://github.com/BIMCV-CSUSP).
7. **Publicaciones**: la Sección 6.1 ya incluye el volcado completo del perfil de Google Scholar de la IP (2020-2026, más de 60 referencias) aportado por el usuario, cotejado y fusionado con la ficha oficial de FISABIO (2011-2019) y con dblp para completar DOIs. Mantenerla actualizada según se publiquen nuevos trabajos.
8. **Formulario de contacto**: decidir a qué backend/email se envían los mensajes (¿bimcv@fisabio.es directamente? ¿un CRM?).
9. **Vídeos**: confirmar si existe grabación real de las demos de HoloLens/ARTEMISA para usar como vídeo en vez de imagen estática — es el contenido con más potencial "wow" de toda la web.

---

## 12. Notas técnicas de implementación (Claude Code + ui-ux-pro-max-skill)

> Esta sección sustituye al antiguo "prompt para Claude Design". Como la web se construye directamente en **Claude Code**, con acceso de lectura a este README y al repositorio de imágenes, no hace falta condensar todo en un bloque de texto para copiar y pegar: basta con que Claude Code lea este documento como contexto del proyecto (por ejemplo, dejándolo como `README.md` o `CONTEXT.md` en la raíz del repo) y aplique lo siguiente.

### 12.1 Sobre la skill `ui-ux-pro-max-skill`
El repositorio usa la skill [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), que aporta su propia inteligencia de diseño (estilos, paletas, tipografías, patrones UX, iconos, presets de animación con GSAP y tipos de gráfico) y detecta automáticamente el stack del proyecto. Reparto de responsabilidades:
- **Este README manda en CONTENIDO y DIRECCIÓN DE MARCA**: todo el texto, la estructura de páginas, la paleta orientativa de UMIB-IA (Sección 2), y los requisitos funcionales concretos (Sección 12.3) son específicos de este proyecto y deben respetarse tal cual.
- **La skill manda en EJECUCIÓN de buenas prácticas UI/UX genéricas**: tipografía funcional, espaciados, accesibilidad, y sobre todo la implementación técnica de los dos requisitos "dinámicos" pedidos por el cliente:
  - Para el **scroll-reveal** de la Sección 2.5 (tarjetas y titulares apareciendo al hacer scroll), usar los **presets de animación GSAP** que trae la skill en vez de reinventar la animación a mano.
  - Para los **gráficos dinámicos** (si se recrean curvas ROC, SHAP u otras visualizaciones en vez de imagen estática), usar el catálogo de **tipos de gráfico** de la skill, aplicando la paleta de marca (coral + grises neutros) en vez de la paleta por defecto de la skill.
- Si hay conflicto entre un patrón por defecto de la skill y algo específico pedido aquí (p. ej. "nunca uses QR", o el comportamiento de hover del menú "Líneas de trabajo"), **gana este README**.

### 12.2 Convención de carpetas de imágenes
El repositorio traerá las imágenes ya organizadas. Se recomienda una estructura que refleje literalmente las secciones de este documento, para que Claude Code pueda mapear cada imagen a su bloque de contenido sin ambigüedad, por ejemplo:

```
/assets
  /marca                  → logotipo (color y solo-contorno), favicon, logos institucionales
  /equipo                 → YA RESUELTO: ilustraciones de la IP y del equipo (ver Sección 4.5)
  /linea-1-anonimizacion
  /linea-2-datalakes
  /linea-3-analisis-ia
  /linea-4-realidad-aumentada
  /linea-5-proyectos-europeos
  /infraestructura
  /resultados              (opcional: portadas de revistas)
```

Si el repositorio real usa otra convención de nombres, ajustar esta sección o el propio código en consecuencia — lo importante es que cada subcarpeta se corresponda 1:1 con una sub-sección de este README (Secciones 5.1-5.5, 7, etc.) para que las imágenes se referencien sin adivinar.

### 12.3 Qué hacer cuando falta una imagen: crear vs. requerir el activo real

No todas las "Imagen sugerida" de este documento se tratan igual si no aparecen en el repositorio. Hay dos categorías:

- **Diagramas y esquemas (SÍ se crean si faltan).** Todo lo que es un esquema informativo — diagramas de flujo/arquitectura (p. ej. Smart-Upload PACS→CTP→XNAT), estructuras de carpetas (antes/después de MIDS), diagramas de nodos federados, diagramas de work packages, flujos de radiómica o de pipelines (DiSMed, DiSMed-LLM, XNAT2MIDS) — **si no está ya en `/assets` como imagen explícita, Claude Code debe crearlo directamente en código** (SVG limpio o el propio componente de diagrama que ofrezca la skill), replicando el contenido/estructura descrito en el texto de este README. No dejar estas tarjetas con un hueco vacío ni con una imagen genérica de stock: el propio README trae la información suficiente (pasos, nodos, jerarquía de carpetas) para reconstruir el diagrama fielmente.
- **Capturas, fotografía clínica y contenido real (NO se inventan).** Todo lo que es una captura real de interfaz (XNAT, OHIF, CellProfiler), una imagen médica/clínica real (radiografías, MRI, TC, retinografías, cortes histológicos), un render 3D específico de un caso, o vídeo/foto de un dispositivo físico (HoloLens, casco EEG) **no se genera ni se simula bajo ningún concepto** — son datos reales o material propio del grupo. Si no está en el repositorio, se deja como placeholder claramente marcado (`[Imagen pendiente: nombre del activo]`) hasta que el equipo lo aporte.
- Los **logotipos de terceros** (eCAN+, TARTAGLIA, ARTEMISA, instituciones) siguen la misma regla que el contenido real: no se inventan; si faltan, placeholder con el nombre del proyecto en texto hasta disponer del logo oficial.

### 12.4 Checklist de requisitos funcionales clave
(Resumen ejecutable de los requisitos ya descritos en detalle en las secciones anteriores — usar como lista de verificación antes de dar por cerrada la implementación)

- [ ] **Navegación de 5 pestañas**: Inicio · Líneas de trabajo · Resultados · Infraestructura · Contacto, con logo a la izquierda y CTA "Contacto" destacado a la derecha (Sección 3).
- [ ] **Menú "Líneas de trabajo"**: hover en escritorio despliega submenú con las 5 líneas; clic en el ítem → vista general (5.0); clic en una opción del submenú → va directo a esa línea de detalle (5.1-5.5), sin pasar por la vista general; en móvil, acordeón dentro del menú hamburguesa (Sección 3.1).
- [ ] **IP con mayor peso visual**: en Inicio, la tarjeta de María de la Iglesia Vayá es más grande y está antes que la cuadrícula del resto del equipo (Sección 4.5).
- [ ] **Páginas de proyecto priorizan imagen/gif sobre texto**: cada proyecto de las 5 líneas de trabajo es una tarjeta con imagen/gif dominante y 2-3 líneas de texto máximo (Sección 5).
- [ ] **Enlaces directos a GitHub** en cada herramienta con repositorio propio (DiSMed, Smart-Upload, MIDS/XNAT2MIDS, BIMCV-AIKit, 3D-MI-Reports…) y en Infraestructura como galería de repos (Secciones 5.1, 5.2, 7.2).
- [ ] **Sin códigos QR en ningún punto**: todo enlace es directo/clicable (Sección 2.3).
- [ ] **Realidad aumentada no se reduce a HoloLens**: incluir también 3D-MI-Reports (web/smartphone) junto a HoloLens 2 y ARTEMISA (Sección 5.4).
- [ ] **Resultados con el listado completo de publicaciones** (2011-2026), agrupado por año, más bloque de congresos (placeholder) (Sección 6).
- [ ] **Scroll-reveal en toda la web**: fade-in + desplazamiento sutil al entrar en viewport, cascada en grids, animación única de 300-500ms, respeta `prefers-reduced-motion`, cifras clave con count-up (Sección 2.5).
- [ ] **Gráficos dinámicos** (si se generan en código): minimalistas, paleta de marca, animados al entrar en viewport, con tooltip (Sección 2.5).
- [ ] **Footer global** con logotipos institucionales, enlace a FISABIO-CIPF, enlace a BIMCV, enlace a GitHub y datos de contacto (Sección 9).
- [ ] **Diagramas recreados cuando falten**: los esquemas/flujos/estructuras de carpetas sin imagen explícita en el repo se crean en código (SVG); las capturas, imágenes clínicas y logos de terceros nunca se inventan (Sección 12.3).
- [ ] **Proyectos europeos = solo eCAN+**: TARTAGLIA vive en Aprendizaje federado (5.3.4) e IMPaC-DATA en Datalakes y curación del dato (5.2), no en la Línea 5 (Sección 5.5).
- [ ] **Equipo con ilustraciones del PDF**: usar los archivos ya extraídos en `/assets/equipo/` para la IP y los 12 miembros del equipo; no se requieren fotos reales (Sección 4.5).
- [ ] **Placeholders explícitos** donde falte contenido real (cargos del equipo, congresos, logo vectorial, colores oficiales) — nunca inventar datos personales o biográficos no aportados (Sección 11).

---

*Documento preparado para revisión del equipo UMIB-IA antes de pasar a implementación. Cualquier cambio de contenido debe hacerse aquí primero, para mantener este README como fuente única de verdad ("single source of truth") del contenido de la web.*
