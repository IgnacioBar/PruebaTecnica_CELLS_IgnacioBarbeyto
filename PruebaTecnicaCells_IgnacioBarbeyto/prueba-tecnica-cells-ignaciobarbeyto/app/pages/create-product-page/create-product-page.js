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

// Nombres más descriptivos como create-product-image-input
// Evitemos mezclar guiones con puntos, normalmente nombres separados con guiones
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
      },
      productList: {
        type: Array,
      }
    };
  }

  constructor() {
    super();
    this.product = {
      nameP: '',
      amountP: '',
      imageP: '',
    };

    this.productList = [];

    this.i18nKeys = {};
  }

  static get styles() {
    return [ styles ];
  }

  // Podemos eliminar código que no utilizamos
  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    const queryScope = this.shadowRoot || this;

    //this._dm = queryScope.querySelector('demo-data-dm');
    //this._form = queryScope.querySelector('form');
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
      </demo-web-template>
    `;
  }


  // Recuerda poner siempre el attribute name para cada input
  // 😔 nos falta el imput para añadir imagen
  // para tener reactividad en los valores de los inputs, utilizamos la propiedad this.product
  get _formProductTpl() {
    return html`
        <form enctype="multipart/form-data">

          <h2>${this.t(this._i18nKeys.formHeading)}</h2>
          <bbva-web-form-text value="${this.product.nameP}"  required name="name" label="${this.t(this._i18nKeys.labelInput1)}"></bbva-web-form-text>
          <bbva-web-form-amount value="${this.product.amountP}" required name="amount" label="${this.t(this._i18nKeys.labelInput2)}"></bbva-web-form-amount> 
          <bbva-web-form-text value="${this.product.imageP}"  required name="image" label="${this.t(this._i18nKeys.labelInput3)}"></bbva-web-form-text> 
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

  // 💪 Muy bien, no vas mal encaminado, si añadimos el campo name en los inputs podemos utilizar New Formdata de Js nativo
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
  _addProduct(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    //const form = document.querySelector('#cells-template-create-product').shadowRoot.querySelector('form');
    // De esta manera guardamos el form padre del boton
    const form = ev.target.closest('form');

    // Asegúrate de que el formulario existe
    //  💪 Muy bien
    if (!form) {
      console.error('Formulario no encontrado');
      return;
    }

    const formData = new FormData(form);

    // Valor del campo de entrada con name
    //const inputName = form.querySelector('#name');
    //const productName = inputName ? inputName.value : '';

    // Valor del campo de entrada con amount
    //const inputAmount = form.querySelector('#amount');
    //const productAmount = inputAmount ? inputAmount.value : '';

    // Valor del campo de entrada con image
    //const inputImage = form.querySelector('#image');
    //const productImage = inputImage ? inputImage.value : '';

    // Asegúrate de que todos los valores necesarios están presentes
    // Si pones los campos requeridos no hace falta comprobar que existen...

    /*
    if (!productName || !productAmount) {
      console.error('Todos los campos son obligatorios');
      return;
    }
    */

    // 😔 nos falta la imagen
    this.product = {
      nameP: formData.get('name'),
      amountP: formData.get('amount'),
      imageP: formData.get('image'),
    };

    this.productList = [
      ...this.productList,
      this.product
    ];

    localStorage.setItem('productos', JSON.stringify(this.productList));

    // Publica el evento
    // Recuerda que el nombre del canal siempre debería empezar por "channel-tu-canal"
    this.publish('add_product', this.product);


    // tenemos que borrar los inputs al navegar, de esta manera al volver a la pagina tengo los inputs borrados.
    // para esto utilizamos this.product para guardar los valores de los inputs

    this.product = {
      nameP: '',
      amountP: '',
      imageP: '',
    };
    this.requestUpdate();


    // Navega a la página del listado
    this.navigate('list-product');


  }

}
window.customElements.define(CreateProductPage.is, CreateProductPage);
