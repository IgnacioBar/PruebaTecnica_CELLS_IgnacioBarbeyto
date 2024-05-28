/* eslint-disable no-unused-expressions */
// Borramos imports y componentes que no utilizamos
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-amount/bbva-web-amount.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import '@bbva-web-components/bbva-web-badge-default/bbva-web-badge-default.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-expandable-accordion/bbva-web-expandable-accordion.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-clip-entities/bbva-web-clip-entities.js';
import '@bbva-web-components/bbva-web-form-select-filter/bbva-web-form-select-filter.js';
import '@bbva-web-components/bbva-web-list-item-definition-amount/bbva-web-list-item-definition-amount.js';
import '@bbva-web-components/bbva-web-notification-message/bbva-web-notification-message.js';
import '@bbva-web-components/bbva-web-progress-bar/bbva-web-progress-bar.js';
import '@bbva-web-components/bbva-web-table-filter/bbva-web-table-filter.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import '@cells-demo/demo-table-movements/demo-table-movements.js';
import styles from './list-product-page-styles.js';

const DEFAULT_I18N_KEYS = {
};

/* eslint-disable new-cap */
// Borramos funciones que no utilizamos
class ListProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-product-page';
  }

  static get properties() {
    return {
      /**
       * Custom keys for default texts
       */
      i18nKeys: {
        type: Object,
        attribute: false,
      },

      _products: {
        type: Array,
      }
    };
  }

  constructor() {
    super();
    this.i18nKeys = {};
    this._products = [];
    this._product = {};
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  // Recuerda declarar la prop en constructor mínimo, si necesitamos que sea reactiva en properties
  // Si utulizamos sessionStorage no haría falta pasar el producto por canal, pero es una buena practica
  onPageEnter() {
    this._products = JSON.parse(localStorage.getItem('productos')) || [];

    this.subscribe('add_product', (ev) => {
      this._product = ev;
    });

    //this._handleAddProduct(this._product);
  }

  static get styles() {
    return [ styles ];
  }


  // 😔 nos falta boto para ir hacia atrás
  render() {
    return html`
      <demo-web-template
        page-title="List Products"
      >
        <div class="main" slot="app-top-content">
        <h1> Listado de productos </h1>
        </div>
        
        <div class="main" slot="app-main-content">
          ${this._renderCardProduct()}
        </div>

        <demo-data-dm
        ></demo-data-dm>

      </demo-web-template>
    `;
  }

  // solo deberíamos recorrer la prop this.products
  _renderCardProduct() {
    //this._products = JSON.parse(localStorage.getItem('productos')) || [];
    return html`
    ${this._products.map((product, index) => html`
      <bbva-web-card-product
        badge-text="Producto ${(index + 1)}"
        launch-text="Nombre: ${product.nameP}"
        preheading="Precio: ${product.amountP} €"
        button-text="Borrar Producto"
        @button-click="${() => this._deleteProduct(index)}">
      </bbva-web-card-product>
    `)}
  `;
  }


  // 💪 Muy bien, una función que se encarga de gestionar los productos
  _handleAddProduct() {
    const { amountP, imageP, nameP } = this._product;

    //  Comprobamos mejor la desestructuración
    if (nameP && amountP && imageP) {

      this._products = [
        ...this._products,
        {
          nameP,
          amountP,
          imageP
        }
      ];

      // Esto tendría sentido tenerlo en la pantalla de creación y no en el del listado, aquí solo deberíamos leer los items
      //localStorage.setItem('productos', JSON.stringify(existingProducts));
    }
  }

  // 💪 Muy bien, tienes el eliminado del producto
  _deleteProduct(indexDeleted) {
    //const products = JSON.parse(localStorage.getItem('productos')) || [];

    // Eliminamos el producto en el índice dado
    // Para que lit se entere de la reactividad tenemos que cambiar de puntero la variable para esto necesitamos generar un nuevo array, podemos utilizar filter y nos ayudamos del operador spread
    this._products = [ ...this._products.filter((product, index) => index !== indexDeleted) ];

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem('productos', JSON.stringify(this._products));

    // Recargar la página o actualizar la vista para reflejar los cambios
    this.requestUpdate();
  }

}

window.customElements.define(ListProductPage.is, ListProductPage);
