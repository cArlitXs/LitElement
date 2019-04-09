/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


// Import LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
//import { LazyElement } from './lazy-element.js';

export class StartLitElement extends LitElement {
  /**
   * Define properties. Properties defined here will be automatically 
   * observed.
   */
  static get properties() {
    return {
      message: { type: String },
      pie: { type: Boolean },
      array: { type: Array },
      class: { type: String }
    };
  }

  /**  
   * In the element constructor, assign default property values.
   */
  constructor() {
    // Must call superconstructor first.
    super();

    // Initialize properties
    this.loadComplete = false;
    this.message = 'Hello World from LitElement';
    this.pie = false;
    this.array = ['Hola', 'Buenas', 'Adiós'];
    this.class = '';
  }

  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */

  /*
    Text content: <p>${...}</p>
    Attribute: <p id="${...}"></p>
    Boolean attribute: ?checked="${...}"
    Property: .value="${...}"
    Event handler: @event="${...}"
    ${...} sirve para bindear con el contructor
    @click="${this.clickHandler}" bindea evento click
    <slot> aqui se envia el hijo del componente
  */
  render() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>

      <h1>Start LitElement!</h1>
      <p>${this.message}</p>

      ${this.pie ? html`
        <button class="btn btn-danger" @click="${this.togglePie}">&times; Close</button>
      ` : html`
        <button class="btn btn-success" @click="${this.togglePie}">+ Open</button>
      `}

      <hr>
      
      <input name="myinput" id="myinput" 
      type="checkbox"
      ?checked="${this.pie}"
      @change="${this.togglePie}">

      <label for="myinput">I like pie.</label>

      <hr>

      ${this.pie ? html`
        <lazy-element class="border border-success rounded-lg p-3">
          <p>You like pie.</p>
          <ul>
            ${this.array.map(i => html`<li>${i}</li>`)}
          </ul>
        </lazy-element>
      ` : html``}
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  firstUpdated() {
    this.loadLazy();

    const myInput = this.shadowRoot.getElementById('myinput');
    myInput.focus();
  }

  /**
   * Event handler. Gets called whenever the checkbox fires a `change` event.
   * - Toggle whether to display <lazy-element>
   * - Call a method to load the lazy element if necessary
   */
  togglePie(e) {
    this.pie = !this.pie;
    this.loadLazy();
  }

  /**
   * If we need the lazy element && it hasn't already been loaded, 
   * load it and remember that we loaded it.
   */
  async loadLazy() {
    console.log('loadLazy');
    if(this.pie && !this.loadComplete) {
      return import('./lazy-element.js').then((LazyElement) => {
        this.loadComplete = true;
        console.log("LazyElement loaded");
      }).catch((reason) => {
        this.loadComplete = false;
        console.log("LazyElement failed to load", reason);
      });
    }
  }
}

// Register the element with the browser
customElements.define('start-lit-element', StartLitElement);
