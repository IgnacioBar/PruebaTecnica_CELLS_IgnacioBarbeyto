/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-core-image/bbva-core-image.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-form-fieldset/bbva-web-form-fieldset.js';
import '@bbva-web-components/bbva-web-form-radio-button/bbva-web-form-radio-button.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';
import styles from './create-product-page-styles.js';

const DEFAULT_I18N_KEYS = {
  formHeading: 'create-product-page.form-heading',
  labelInput1: 'create-product-page.form-input-1-label',
  labelInput2: 'create-product-page.form-input-2-label',
  labelInput3: 'create-product-page.form-input-3-label',
  labelButton: 'create-product-page.form-button',
};

/* eslint-disable new-cap */
class CreateProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'create-product-page';
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

      product: {
        type: Object,
        attribute: false,
      }
    };
  }

  constructor() {
    super();
    this.product = {};
    this.i18nKeys = {};
  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    const queryScope = this.shadowRoot || this;
    this._dm = queryScope.querySelector('demo-data-dm');
    this._form = queryScope.querySelector('form');
    window.IntlMsg.lang = localStorage.getItem('language') || 'en-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  render() {
    return html` 
      <demo-web-template
        page-title="Create Product"
      >
        <div slot="app-top-content">

        </div>

        <div slot="app-main-content">
          ${this._formProductTpl}
          
        </div>

        <div slot="app-main-content" data-grid="full-width">

        </div>

        <demo-data-dm></demo-data-dm>
      </demo-web-template>
    `;
  }


  get _formProductTpl() {
    return html`
        <form enctype="multipart/form-data">

          <h2>${this.t(this._i18nKeys.formHeading)}</h2>
          <bbva-web-form-text id="name" label="${this.t(this._i18nKeys.labelInput1)}"></bbva-web-form-text>
          <bbva-web-form-amount id="amount" label="${this.t(this._i18nKeys.labelInput2)}"></bbva-web-form-amount>
          <!--<bbva-core-image id="image" label="${this.t(this._i18nKeys.labelInput3)}"></bbva-core-image>-->
          
          <bbva-web-button-default
            id="send"
            type="button" 
            @click="${this._addProduct}"
          >
            ${this.t(this._i18nKeys.labelButton)}
          </bbva-web-button-default>
        </form>
    `;
  }

  _addProduct(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const form = document.querySelector('#cells-template-create-product').shadowRoot.querySelector('form');

    // Asegúrate de que el formulario existe
    if (!form) {
      console.error('Formulario no encontrado');
      return;
    }

    // Valor del campo de entrada con name
    const inputName = form.querySelector('#name');
    const productName = inputName ? inputName.value : '';

    // Valor del campo de entrada con amount
    const inputAmount = form.querySelector('#amount');
    const productAmount = inputAmount ? inputAmount.value : '';

    // Valor del campo de entrada con image
    //const inputImage = form.querySelector('#image');
    //const productImage = inputImage ? inputImage.value : '';

    // Asegúrate de que todos los valores necesarios están presentes
    if (!productName || !productAmount /*|| !productImage*/) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const details = {
      nameP: productName,
      amountP: productAmount,

      //imageP: productImage
    };

    // Publica el evento
    this.publish('add_product', details);

    // Navega a la página del listado
    this.navigate('list-product');
  }

}
window.customElements.define(CreateProductPage.is, CreateProductPage);
