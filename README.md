# Archivo de la Ciudadela

Explorador interactivo de personajes de Rick and Morty, construido con HTML, CSS y JavaScript y datos reales de una API pública.

**Autora:** Lirio Berenice Chuc Yam · [@LirioYam](https://github.com/LirioYam). Modalidad individual, por decisión de la autora.

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

### Tres instrucciones importantes del prompt inicial

Estos fragmentos se enviaron juntos en la solicitud inicial. Se registran como tres instrucciones importantes, sin inventar tres mensajes separados:

1. **Comprender la tarea:** “Ayúdame a realizar la tarea del PDF adjunto. Léelo completo antes de actuar.” Permitió identificar funciones, entregables y restricciones antes de programar.
2. **Respetar el método:** “Si puedes, realiza las operaciones del proyecto desde esa interfaz: edición de archivos, commits, Issues, ramas, Pull Requests y configuración de GitHub Pages.” Determinó la edición y el seguimiento desde GitHub web.
3. **Aprender con cada avance:** “Quiero trabajar con eficiencia y aprender. Explica brevemente cada avance funcional y continúa sin pedir confirmación por cada clic rutinario.” Dio lugar al desarrollo por etapas y a explicaciones sobre fetch, favoritos y ordenación.

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

Los conteos dependen de los datos de la API y pueden cambiar. El manejo de desconexión, timeout y almacenamiento no disponible se revisó en el código; no se simuló una desconexión durante estas pruebas. Las pruebas de la mejora se añadirán después de desplegarla.

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

## Registro de tres prompts reales utilizados

Este registro reúne el encargo inicial y las dos preguntas posteriores enviadas por la autora durante el desarrollo. Los fragmentos de contexto anteriores pertenecen al primer encargo.

### Prompt 1: realizar la tarea respetando GitHub web

> Ayúdame a realizar la tarea del PDF adjunto. Léelo completo antes de actuar.

El mismo encargo incluyó la restricción de crear y modificar el código únicamente en GitHub web, inspeccionar los avances y explicar cada avance funcional. Resultado: lectura previa, revisión del repositorio y desarrollo por etapas con commits, Issues, rama, PR y Pages.

### Prompt 2: consultas, buscador y errores

> Explícame cómo utiliza fetch() nuestra aplicación para consultar la API de Rick and Morty, cómo se combina la búsqueda con los filtros y qué ocurre cuando no hay resultados o falla la consulta. Usa ejemplos del código del proyecto.

Respuesta aplicada al proyecto: `applyFilters()` lee nombre, estado y especie y reinicia la página. `loadCharacters()` usa URLSearchParams y fetch; por ejemplo `?page=1&name=Rick&status=alive`. Tras response.json(), render dibuja los datos. Un 404 produce cero resultados; otros errores y el timeout muestran una explicación y el botón de reintento.

### Prompt 3: persistencia y mejora alfabética

> Explícame cómo guardamos y recuperamos los favoritos con localStorage y cómo funciona la mejora de orden alfabético A-Z y Z-A. Señala qué funciones intervienen y qué debo entender para explicarlo en clase.

Respuesta aplicada al proyecto: `saveFavorites()` convierte los valores del Map a JSON y los guarda; `readFavorites()` los lee, valida y reconstruye el Map. `visibleCharacters()` elige la página de la API o los favoritos filtrados. `orderedCharacters()` copia el arreglo antes de sort, compara con localeCompare y utiliza 1 o -1 para invertir el orden. Lo esencial para clase: memoria y almacenamiento son distintos; JSON permite almacenar objetos como texto; sort modifica el arreglo y por eso se copia; el orden del catálogo se limita a la página cargada.
