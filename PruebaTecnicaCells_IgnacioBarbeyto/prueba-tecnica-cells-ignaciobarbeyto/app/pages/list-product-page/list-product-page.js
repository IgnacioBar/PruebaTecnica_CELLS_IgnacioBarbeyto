/* eslint-disable no-unused-expressions */
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { bbvaCopy, bbvaEdit, bbvaHelp, bbvaTasks, bbvaEmail, bbvaBuilding, bbvaFeedback } from '@bbva-web-components/bbva-foundations-icons';
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
    };
  }

  constructor() {
    super();
    this.i18nKeys = {};
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    const queryScope = this.shadowRoot || this;
    this._dm = queryScope.querySelector('demo-data-dm');
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  onPageEnter() {
    this.subscribe('add_product', (ev) => {
      this._product = ev;
    });
    this._handleAddProduct(this._product);
  }

  static get styles() {
    return [ styles ];
  }

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

  _renderCardProduct() {
    this._products = JSON.parse(localStorage.getItem('productos')) || [];
    return html`
    ${this._products.map((product, index) => html`
      <bbva-web-card-product
      badge-text="Producto ${(index + 1)}"
      launch-text="Nombre: ${(product.nameP)}"
      preheading="Precio: ${(product.amountP)} €"> 
      </bbva-web-card-product>
    `)}
  `;
  }

  _handleAddProduct() {
    const { nameP, amountP/*, imageP*/} = this._product;

    if (this._product) {
      const existingProducts = JSON.parse(localStorage.getItem('productos')) || [];
      const newProduct = { nameP, amountP/*, imageP*/};

      existingProducts.push(newProduct);
      localStorage.setItem('productos', JSON.stringify(existingProducts));
    }
  }

}

window.customElements.define(ListProductPage.is, ListProductPage);
