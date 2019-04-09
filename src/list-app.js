import { LitElement, html } from 'lit-element';

export class ListApp extends LitElement {
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>
      <ul>
          <slot></slot>
      </ul>
    `;
  }
}

customElements.define('list-app', ListApp);
