# Archivo de la Ciudadela

Explorador interactivo de personajes de Rick and Morty, construido con HTML, CSS y JavaScript y datos reales de una API pública.

**Autora:** Lirio Berenice Chuc Yam · [@LirioYam](https://github.com/LirioYam). 

- [Aplicación en GitHub Pages](https://lirioyam.github.io/proyecto-web-ia/)
- [Repositorio](https://github.com/LirioYam/proyecto-web-ia)
- [Historial de commits](https://github.com/LirioYam/proyecto-web-ia/commits/main/)
- [Issue #1: versión base](https://github.com/LirioYam/proyecto-web-ia/issues/1)
- [Issue #2: reto posterior](https://github.com/LirioYam/proyecto-web-ia/issues/2)
- [Pull Request #3: ordenación](https://github.com/LirioYam/proyecto-web-ia/pull/3)

## Cómo utilizar la aplicación

1. Abre la aplicación publicada. La primera consulta muestra hasta 20 personajes con retrato, nombre, estado, especie, género y última ubicación.
2. Escribe un nombre y pulsa **Buscar** o Enter. Por ejemplo: Summer.
3. Selecciona estado y especie; los filtros se aplican al cambiar su selección. Se pueden combinar con el nombre.
4. Utiliza **Anterior** y **Siguiente** para recorrer las páginas sin perder los filtros. **Limpiar filtros** vuelve a la primera página.
5. Pulsa el corazón de una tarjeta y abre **Mis favoritos**. El corazón también permite quitar personajes de la colección.
6. Los favoritos se conservan al recargar mediante localStorage en ese navegador y origen. Borrar los datos del sitio también borra la colección. En otro dispositivo o navegador habrá una colección diferente.
7. El selector **Orden de esta página / favoritos** permite elegir orden original, A–Z o Z–A. En la API ordena solo la página actual; en favoritos ordena toda la colección filtrada. No promete ordenar el catálogo completo de la API.

Los nombres y ubicaciones se conservan como los entrega la API. La interfaz, los estados y varias especies se traducen al español.

## Archivos y funcionamiento

| Archivo | Responsabilidad |
| --- | --- |
| index.html | Estructura semántica, formulario, vistas, contenedores de resultados y mensajes. |
| style.css | Paleta compartida, portal decorativo hecho con CSS, tarjetas, foco visible y adaptación a pantallas pequeñas. |
| script.js | Consultas con fetch, filtros, páginas, renderizado, favoritos y ordenación. |
| README.md | Instrucciones, decisiones, evidencias y explicación para la presentación. |

No se necesitan dependencias, claves de API ni proceso de compilación. No se escribieron datos de personajes manualmente.

### Consulta y búsqueda

`loadCharacters()` crea parámetros con `URLSearchParams`: page, name, status y species. `fetch()` solicita la URL de personajes y `response.json()` convierte la respuesta en objetos de JavaScript. La API entrega hasta 20 personajes por página, además de info.count e info.pages. El buscador consulta el catálogo del servidor, no solamente las tarjetas que ya están en pantalla.

`applyFilters()` lee los controles, reinicia la página a 1 y lanza la consulta. En favoritos aplica los mismos controles a los personajes guardados sin consultar de nuevo sus datos.

### Estados y errores

- Antes de consultar se muestra carga y se oculta la paginación.
- Una respuesta 404 de la consulta de personajes se trata como cero coincidencias.
- Otros errores HTTP o de conexión muestran un mensaje y el botón Reintentar consulta.
- A los 15 segundos se cancela una consulta que no termina.
- AbortController y un identificador de petición impiden que una respuesta antigua sobrescriba una búsqueda reciente.
- Si localStorage está bloqueado, lleno o contiene datos inválidos, aparece un aviso y los favoritos pueden usarse en memoria durante la sesión.
- Los datos se insertan con textContent y creación de elementos, sin interpolarlos en innerHTML.

### Favoritos persistentes

Un Map relaciona el ID único de cada personaje con sus datos. `readFavorites()` lee la clave `ciudadela-favoritos-v1`, analiza JSON y valida la estructura. `saveFavorites()` serializa los personajes mediante JSON.stringify. Se almacena una copia de los datos para consultar la colección aunque falle una consulta nueva; las imágenes siguen dependiendo de que su servidor esté disponible.

## Desarrollo directamente en GitHub web

Los cuatro archivos se crearon o modificaron con el editor web de GitHub. Los commits, los dos Issues, la rama y el Pull Request también se gestionaron desde esa interfaz. No se usaron una copia local, terminal, Git, APIs de GitHub ni plataformas generadoras para modificar el proyecto. La lectura del PDF de la tarea se realizó por separado.

Etapas reales del historial: documentación del alcance, estructura HTML, diseño CSS, consulta a la API, persistencia de favoritos y mejora de ordenación. Los commits están atribuidos a LirioYam; no se simulan otros colaboradores.

### Publicación en GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch → main → / (root) → Save**. GitHub ejecuta pages build and deployment. La primera publicación se comprobó abriendo el enlace de Pages y usando la aplicación desde el navegador. Los cambios incorporados a main vuelven a publicarse automáticamente.

## Reto: modificación posterior a la primera versión

La primera versión se publicó y se probó antes de añadir esta función. Su evidencia está en el Issue #1. Después se creó la rama `codex/orden-alfabetico` y el Pull Request #3 para resolver el Issue #2.

La modificación integra `orderedCharacters(visibleCharacters())` en render(). La función devuelve el arreglo original si no se pide ordenación. Para A–Z o Z–A crea una copia con `[...items]`, usa sort y compara los nombres con localeCompare en español. El factor 1 o -1 invierte el orden. Copiar el arreglo evita que sort destruya el orden recibido de la API y permite restaurarlo con el selector.

El selector está fuera del formulario de búsqueda: limpiar filtros no cambia la preferencia de orden. Cambiarlo durante una carga o un error conserva el mensaje existente. La preferencia de orden no se guarda al recargar.

## Uso de IA: instrucciones, correcciones y aprendizaje

La IA asistió con el diseño, el código, las explicaciones y la revisión. La autora decidió trabajar de forma individual y exigió operar exclusivamente en GitHub web. No se atribuyen a la autora cambios manuales que no haya declarado. La modalidad de suscripción ChatGPT Plus o Claude Pro exigida por la tarea debe ser acreditada por la autora; el repositorio no la verifica.

### Respuesta de IA que se corrigió

El primer avance de JavaScript generado con ayuda de IA mantenía los favoritos únicamente en un Map. Esa versión no cubría todavía la persistencia requerida: una recarga reconstruía el Map vacío. En el siguiente commit se amplió el código con lectura, validación y escritura de localStorage. Se comprobó guardando Rick y Morty y recargando: ambos siguieron en la colección. No bastaba con que el corazón cambiara de color.

### Error encontrado y solución

Al abrir el enlace inmediatamente después de activar Pages apareció “There isn’t a GitHub Pages site here” (404). Se revisó Actions: la construcción había terminado, pero el despliegue seguía en curso. Al completarse y recargar, apareció la aplicación con datos de la API. La solución fue comprobar el estado del despliegue antes de concluir que había un error de código.

### Reflexión técnica para explicar en clase

La IA acelera un primer borrador, pero un resultado visible no demuestra que todos los requisitos estén cumplidos. El ejemplo de favoritos muestra la diferencia entre estado temporal y persistencia. Revisar la documentación de la API evita confundir paginación con un catálogo completo. Los commits por etapas y un PR permiten explicar qué cambió y por qué. La autora debe revisar esta explicación y practicarla con el código abierto antes de presentar.

## Pruebas de la primera versión

Realizadas desde la aplicación en GitHub Pages el 20 de octubre de 2026:

| Prueba | Resultado observado |
| --- | --- |
| Carga inicial | 20 tarjetas; 826 coincidencias y 42 páginas en ese momento. |
| Buscar Summer | 12 resultados con el nombre solicitado. |
| Estado Muerto + especie Alien | 85 coincidencias; las tarjetas mostraron ambos criterios. |
| Siguiente con esos filtros | Página 2 de 5 y personajes diferentes, conservando los filtros. |
| Nombre inexistente | Cero resultados y mensaje explicativo, sin tarjetas anteriores. |
| Guardar Rick y Morty y recargar | Contador 2 y ambos presentes en favoritos. |
| Buscar un nombre inexistente en favoritos | Cero favoritos coincidentes, sin perder los dos guardados. |
| Ancho de 390 px | Interfaz adaptable sin desbordamiento horizontal. |

Los conteos dependen de los datos de la API y pueden cambiar. El manejo de desconexión, timeout y almacenamiento no disponible se revisó en el código; no se simuló una desconexión durante estas pruebas. Las pruebas de la mejora publicada se documentan en la sección final de este README.

## Guía para la demostración

1. Mostrar la carga de personajes, buscar Summer y combinar filtros.
2. Pasar de página y explicar que la API entrega datos paginados.
3. Guardar favoritos, recargar y abrir la colección.
4. Buscar un nombre inexistente para mostrar el mensaje de cero resultados.
5. Cambiar el orden y explicar spread, sort y localeCompare.
6. Abrir el historial, los dos Issues, el PR y la configuración de Pages.

Preguntas clave: HTML organiza el contenido; CSS define su presentación; JavaScript controla la interacción. fetch obtiene datos del servidor, no dibuja tarjetas por sí solo. El buscador envía el nombre a la API; en favoritos filtra datos locales. Si la API no responde, la aplicación muestra un error y permite reintentar.

## Referencias

- [Rick and Morty API: documentación oficial](https://rickandmortyapi.com/documentation)
- [MDN: fetch](https://developer.mozilla.org/es/docs/Web/API/Window/fetch)
- [MDN: localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

Proyecto académico sin afiliación oficial con Rick and Morty. Los personajes y sus imágenes corresponden a sus respectivos titulares.

## Prompts de desarrollo

Los siguientes textos organizan los objetivos de cada etapa. Se incorporan en esta actualización documental; no se presentan como una transcripción literal de instrucciones ejecutadas previamente.

**Aclaración sobre esta actualización:**

> Incluye los siguientes prompts. No vuelvas a ejecutar sus instrucciones ni reconstruyas la aplicación: en este mensaje solo estoy pidiendo actualizar la documentación.

### PROMPT 1: Estructura, diseño y consulta de personajes

> Quiero crear una aplicación llamada Archivo de la Ciudadela para explorar personajes de toda la serie Rick and Morty. Usa HTML, CSS y JavaScript sin frameworks y consulta los datos reales de Rick and Morty API mediante fetch. Revisa primero la documentación oficial para usar correctamente sus parámetros y respuestas.
>
> Organiza el proyecto en index.html, style.css, script.js y README.md. Al abrir la página deben aparecer al menos 10 personajes, cada uno con imagen, nombre y datos como estado, especie, género y ubicación. No escribas personajes manualmente: la información debe venir de la API.
>
> Quiero un diseño relacionado con la serie, con tarjetas organizadas, colores que permitan leer bien y una interfaz en español. Debe adaptarse al celular y la computadora sin que los controles o las tarjetas se salgan de la pantalla. Usa etiquetas claras en los campos y botones que también puedan utilizarse con el teclado.
>
> Agrega búsqueda por nombre y filtros por estado y especie. Deben funcionar juntos y consultar el catálogo de la API, no solamente los personajes que ya aparecen en pantalla. Incluye botones para avanzar y retroceder entre páginas. Cuando cambie la búsqueda o los filtros, vuelve a la primera página; al cambiar de página conserva los criterios seleccionados.
>
> Haz los cambios directamente desde GitHub web y guarda avances reales con mensajes de commit claros. Explícame brevemente cómo se conectan el HTML, el CSS y el JavaScript y cómo llegan los datos de la API a las tarjetas.

**Propósito:** Definir la primera versión: estructura de archivos, diseño accesible y adaptable, consulta de datos reales y búsqueda con filtros y paginación sobre el catálogo de la API. También busca comprender cómo colaboran HTML, CSS y JavaScript y cómo se transforman las respuestas en tarjetas.

### PROMPT 2: Favoritos, validaciones y errores

> Ahora quiero agregar una sección de favoritos. Cada tarjeta debe permitir guardar o quitar al personaje y mostrar claramente si ya está guardado. Evita duplicados usando su identificador. La sección debe mostrar los personajes guardados y un mensaje cuando esté vacía.
>
> Usa localStorage para conservar los favoritos al recargar o cerrar y volver a abrir la página en el mismo navegador. Guarda los datos como JSON y recupéralos al iniciar. Revisa que un dato inválido o un problema de almacenamiento no provoque que toda la aplicación deje de funcionar. Si no se pueden conservar los cambios, avisa al usuario.
>
> Revisa también las consultas a la API. Mientras cargan, muestra un mensaje de carga. Si no hay coincidencias, muestra un mensaje específico y retira los resultados anteriores. Comprueba los códigos HTTP, porque una respuesta sin coincidencias no debe tratarse igual que un fallo del servidor o de conexión.
>
> Si una consulta falla o tarda demasiado, muestra una explicación y permite reintentar. Evita que una respuesta antigua reemplace los resultados de una búsqueda más reciente. Inserta los datos recibidos de forma segura, sin interpretarlos como HTML.
>
> Comprueba la búsqueda, los filtros combinados, la paginación y los favoritos después de recargar. Registra los errores reales y sus soluciones, y distingue las pruebas realizadas de las pendientes. Explícame la diferencia entre guardar datos temporalmente en JavaScript y conservarlos con localStorage.

**Propósito:** Añadir favoritos persistentes y fortalecer la fiabilidad de la aplicación. Esta etapa se centra en validar el almacenamiento y las respuestas, distinguir carga, ausencia de coincidencias y errores, evitar respuestas desactualizadas y registrar únicamente pruebas y problemas reales.

### PROMPT 3: Mejora posterior, publicación y documentación

> Cuando la primera versión esté terminada y comprobada, quiero agregar como mejora un selector para ordenar los personajes de A-Z y Z-A y para recuperar el orden original.
>
> En los resultados de la API, el selector debe ordenar únicamente los personajes de la página actual. En favoritos debe ordenar la colección que se esté mostrando después de aplicar los filtros. Aclara este alcance en la interfaz para que no parezca que se ordena todo el catálogo de la API.
>
> Ordena una copia del arreglo para conservar el orden original. La mejora debe funcionar junto con la búsqueda, los filtros, la paginación y los favoritos, sin borrar datos ni ocultar los mensajes de carga o error.
>
> Haz esta mejora en una rama y crea un Pull Request con una explicación de los cambios y las comprobaciones. Revísalo antes de fusionarlo. Documenta al menos dos problemas o mejoras reales mediante Issues y comprueba que el proyecto tenga al menos seis commits con avances útiles.
>
> Publica la aplicación mediante GitHub Pages y comprueba la dirección publicada. Completa el README con mi nombre, descripción, tecnologías, instrucciones de uso, enlaces, uso de IA, una respuesta que haya necesitado correcciones, un error real con su solución y una modificación explicada.
>
> Prepara una propuesta de reflexión para que yo la revise y respuestas sencillas para explicar fetch, HTML, CSS, JavaScript, el buscador, los errores, los favoritos y la publicación. No inventes experiencias personales ni pruebas. Explica cómo funciona el código que realmente quedó en el proyecto.

**Propósito:** Incorporar la ordenación como una mejora posterior que preserve el funcionamiento existente y su alcance por página o colección filtrada. Además, busca dejar evidencias del cambio mediante rama, Pull Request, Issues y commits, verificar la publicación y preparar documentación y explicaciones para la presentación sin inventar experiencias ni comprobaciones.

## Verificación final de la mejora publicada

Comprobaciones realizadas en GitHub Pages el 20 de octubre de 2026, después de fusionar el PR #3:

| Prueba | Resultado observado |
| --- | --- |
| A–Z en la primera página de la API | Comienza con Abadango Cluster Princess, Abradolf Lincler y Adjudicator Rick; conserva 20 tarjetas. |
| Z–A en esa página | Comienza con Summer Smith, Rick Sanchez y Morty Smith. |
| Volver al orden original | Restaura Rick Sanchez, Morty Smith, Summer Smith y Beth Smith al principio. |
| A–Z en favoritos Rick/Morty | Morty Smith antes de Rick Sanchez. |
| Z–A en esos favoritos | Rick Sanchez antes de Morty Smith. |
| Quitar ambos favoritos | Contador 0 y mensaje de colección vacía. Se retiraron los datos de prueba. |
| Interfaz final a 390 px | Selector visible y contenido de 375 px, sin desbordamiento horizontal. |

### Corrección de actualización de recursos

Tras el primer despliegue de la mejora, Actions indicó éxito y main contenía orderedCharacters, pero la página aún mostraba la versión anterior del JavaScript. Se modificó index.html desde GitHub web para cargar `script.js?v=2` y se publicó de nuevo. Se verificó que la página cargaba esa referencia y mostraba el selector. Esta corrección quedó registrada en el historial; en futuras actualizaciones de JavaScript puede incrementarse esa versión cuando corresponda.

### Estado de entrega

Aplicación publicada y probada; cuatro archivos requeridos; más de seis commits con avances reales; Issues #1 y #2 cerrados con seguimiento; rama codex/orden-alfabetico y PR #3 fusionado. Desarrollo individual atribuido a LirioYam. La demostración en clase corresponde a la autora.
