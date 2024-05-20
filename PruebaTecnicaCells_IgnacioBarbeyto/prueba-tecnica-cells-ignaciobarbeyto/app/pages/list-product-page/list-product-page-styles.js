/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  --bbva-web-progress-bar-bg-color: var(--colorsSecondary300, ${unsafeCSS(foundations.colors.secondary300)});
  display: block;
  box-sizing: border-box;
  font-size: var(--typographyTypeSmall, ${unsafeCSS(foundations.typography.typeSmall)});
  line-height: var(--lineHeightTypeSmall, ${unsafeCSS(foundations.lineHeight.typeSmall)});
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
}

.hidden {
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1px;
  text-decoration: none;
}

.top {
  padding: 0.5rem 0;
}

.select-account {
  box-sizing: initial;
  max-width: 50%;
}

.definitions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.definitions .definition {
  margin-bottom: auto;
}
.definitions .definition + .definition {
  margin-left: 1rem;
}

.progress {
  margin: 1rem 0;
}
.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}
.progress-info div {
  display: flex;
  align-items: baseline;
}
.progress-info bbva-web-amount {
  margin-left: 0.5rem;
}

.content-detail {
  margin: 1rem 0;
}
.content-detail bbva-web-expandable-accordion {
  border: none;
  margin-left: -1rem;
}
.content-detail .account-detail {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}
.content-detail .account-detail li {
  box-sizing: border-box;
  width: 33%;
}
.content-detail .account-detail li bbva-web-list-item-simple {
  align-items: flex-end;
  padding: 0.5rem 2rem 1rem 0;
}

.main {
  padding: 1rem 0;
}
.main h3 {
  font-size: var(--typographyTypeLarge, ${unsafeCSS(foundations.typography.typeLarge)});
  line-height: var(--lineHeightTypeLarge, ${unsafeCSS(foundations.lineHeight.typeLarge)});
  font-weight: var(--fontFacePrimaryBookFontWeight, ${unsafeCSS(foundations.fontFacePrimary.book.fontWeight)});
  margin-bottom: 1.5rem;
}

.app-main-container {
  margin: 2px;
}
`;
