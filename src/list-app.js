import { LitElement, html } from 'lit-element';

export class ListApp extends LitElement {
  render() {
    return html`
      <style>
        :host { display: block; }
      </style>
      <ul>
          <slot></slot>
      </ul>
    `;
  }
}

customElements.define('list-app', ListApp);
