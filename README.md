# Proyecto de Gestión de Productos

Este proyecto consiste en la creación de dos páginas web: `create-product-page` y `list-product-page`. El objetivo de estas páginas es permitir a los usuarios agregar nuevos productos mediante un formulario en la primera página y luego visualizar y almacenar la lista de productos en la segunda página.

## Páginas del Proyecto

### Página `create-product-page`

#### Descripción
La página `create-product-page` permite a los usuarios agregar un nuevo producto a través de un formulario. 

#### Funcionalidad
1. **Formulario de Producto**: 
    - Utiliza `@bbva-web-components/bbva-web-form-text` para el nombre del producto.
    - Utiliza `@bbva-web-components/bbva-web-form-amount` para el precio del producto.
    - Utiliza `@bbva-web-components/bbva-web-button-default` para el botón de confirmación.
2. **Eventos**:
    - Configura el botón de confirmación para disparar los eventos `publish` y `navigate`.
    - El evento `publish` se utilizará para enviar la información del producto a otras partes de la aplicación.
    - El evento `navigate` se utilizará para redirigir a la página `list-product-page` después de agregar el producto.

### Página `list-product-page`

#### Descripción
La página `list-product-page` muestra una lista de productos que han sido agregados y almacenados en `localStorage`.

#### Funcionalidad
1. **Suscripción a Eventos**:
    - En el ciclo de vida `onPageEnter`, la página se suscribe al evento publicado en `create-product-page` para recibir la información del producto.
2. **Almacenamiento**:
    - La información del producto se almacena en `localStorage` para su persistencia.
3. **Listado de Productos**:
    - Utiliza `bbva-web-card-product` para listar todos los productos almacenados en `localStorage`, proporcionando una representación visual de cada producto.
