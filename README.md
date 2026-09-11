# Bunny — sitio web estático

Sitio listo para subir a cualquier hosting (cPanel, Hostinger, Netlify, Vercel,
GitHub Pages, un VPS con Nginx/Apache…). No requiere base de datos ni backend.

## Cómo subirlo

1. Sube **todo el contenido de esta carpeta** (no la carpeta en sí) a la raíz
   pública del hosting: `public_html/`, `www/` o `htdocs/`.
2. Abre tu dominio. `index.html` se carga solo.

## Estructura

```
index.html            Página de inicio
testimonios.html      Listado de testimonios
testimonio.html       Detalle con reproductor (recibe el testimonio por #slug)
css/
  style.css           Todos los estilos (variables de color arriba del archivo)
js/
  data-testimonios.js Datos de los testimonios + plantilla de tarjeta
  main.js             Menú móvil, header al hacer scroll, volver arriba
  home.js             Carrusel, lightbox de galería y formulario
  testimonios.js      Grilla y filtros del listado
  testimonio.js       Reproductor, capítulos, like y compartir
assets/img/           Imágenes (logo, portada, quiénes somos, galería)
```

## Cambios frecuentes

**Colores** — `css/style.css`, bloque `:root` (líneas iniciales):

```
--accent:#FD4A65;       /* primario   */
--accent-deep:#D62A45;  /* superficies con texto blanco */
--btn:#FFBBD4;          /* botones    */
--btn-hover:#FFA3C4;
```

**Testimonios** — `js/data-testimonios.js`. Añade un objeto al arreglo con
`slug`, `name`, `cap`, `sede`, `years`, `dur`, `secs`, `parrafos` y `capitulos`.
Aparece automáticamente en el home, el listado y el detalle.

**Imágenes** — reemplaza los archivos en `assets/img/` conservando los nombres,
o cambia las rutas en el HTML.

## Pendientes para producción

- **Videos reales**: `testimonio.html` trae un reproductor de demostración.
  Para usar video real, sustituye el bloque `.player` por un `<video controls>`
  o un `<iframe>` de YouTube/Vimeo, y añade el campo `video` en
  `js/data-testimonios.js`.
- **Formulario**: hoy solo valida y muestra el mensaje de éxito. Para recibir
  las postulaciones conecta el `click` de `#f-submit` (en `js/home.js`, marcado
  con un comentario) a tu correo, CRM, Formspree o a la API de WhatsApp.
- **Redes sociales**: los enlaces del pie apuntan a `#top`; reemplázalos por las
  URLs reales.
- **SEO**: ajusta `<title>` y `<meta name="description">` de cada página, y
  añade una imagen Open Graph si vas a compartir el enlace.
