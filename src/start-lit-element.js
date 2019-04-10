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
import './list-app.js';

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
      class: { type: String },
      controlButton: { type: Boolean },
      valorInput: { type: String },
      contadorList: { type: Number },
      lista: { type: Array },
      added:{
        type: Boolean,
        value: false,
        observer: 'addedChanged'
      },
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
    
    this.controlButton = false;
    this.valorInput;

    this.contadorList = 0;
    this.lista = new Array();
  }

  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <style>
        :host { display: block; font-family: 'Arial', sans-serif; }
        :host([hidden]) { display: none; }
      </style>

      <h1>Start LitElement!</h1>
      <p>${this.message}</p>

      ${this.pie ? html`
        <button class="btn btn-danger" @click="${this.togglePie}">&times; Close</button>
      ` : html`
        <button class="btn btn-primary" @click="${this.togglePie}">+ Open</button>
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
        <hr>
      ` : html``}

      <form class="form-inline">
        <input class="form-control m-1" name="nombre" id="nombre" type="text" placeholder="Add text...">
        <button class="btn btn-success m-1" @click="${this.addValor}">+ Add #${this.lista ? this.lista.length : '0'}</button>
      </form>
      
      ${this.lista ? html`
        <list-app class="p-1">
          ${this.lista.map(i => html`<li>${i}</li>`)}
        </list-app>
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
  addValor(e) {
    e.preventDefault();
    let item = this.shadowRoot.getElementById('nombre').value;
    if(item != ''){
      this.lista.push(item.charAt(0).toUpperCase() + item.slice(1));
      this.added = true;
      console.table(this.lista);
      console.log('%cItem added!', 'color: green');
      this.shadowRoot.getElementById('nombre').value = '';
      this.added = false;
    }
    else{
      console.log('%cAdd some item!', 'color: red');
    }
  }

  addedChanged(added){
    if(added){
      console.log('%cObserver working!', 'color: green');
    }
    else{
      console.log('%cObserver not working!', 'color: red');
    }
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
        console.log("%cLazyElement loaded", 'color: green');
      }).catch((reason) => {
        this.loadComplete = false;
        console.log("%cLazyElement failed to load", 'color: red', reason);
      });
    }
  }
}

// Register the element with the browser
customElements.define('start-lit-element', StartLitElement);


//Apuntes
/*
  Text content: <p>${...}</p>
  Attribute: <p id="${...}"></p>
  Boolean attribute: ?checked="${...}"
  Property: .value="${...}"
  Event handler: @event="${...}"
  ${...} sirve para bindear con el contructor
  @click="${this.clickHandler}" bindea evento click
  <slot> aqui se envia el hijo del componente
  
  //
  Bind to text content
  Bind prop1 to text content:
  html`<div>${this.prop1}</div>`

  //
  Bind to an attribute
  Bind prop2 to an attribute:
  html`<div id="${this.prop2}"></div>`
  Attribute values are always strings, so an attribute binding should return a value that can be converted into a string.

  //
  Bind to a boolean attribute
  Bind prop3 to a boolean attribute:
  html`<input type="checkbox" ?checked="${this.prop3}">i like pie</input>`
  Boolean attributes are added if the expression evaluates to a truthy value, and removed if it evaluates to a falsy value.

  //
  Bind to a property
  Bind prop4 to a property:
  html`<input type="checkbox" .value="${this.prop4}"/>`

  //
  Bind to an event handler
  Bind clickHandler to a click event:
  html`<button @click="${this.clickHandler}">pie?</button>`

  //
  <p slot="one">Content</p>   -----Go to---->   <slot name="one"></slot>

  //
  Example template
  class MyPage extends LitElement {
    render() {
      return html`
        ${this.headerTemplate}
        ${this.articleTemplate}
        ${this.footerTemplate}
      `;
    }
    get headerTemplate() {
      return html`<header>header</header>`;
    }
    get articleTemplate() {
      return html`<article>article</article>`;
    }
    get footerTemplate() {
      return html`<footer>footer</footer>`;
    }
  }

  This template is better
  import './my-header.js';
  import './my-article.js';
  import './my-footer.js';

  class MyPage extends LitElement {
    render() {
      return html`
        <my-header></my-header>
        <my-article></my-article>
        <my-footer></my-footer>
      `;
    }
  }

  //
  Template syntax cheat sheet
    Render
      render() { return html`<p>template</p>`; }
    
    Properties, loops, conditionals
      // Property
      html`<p>${this.myProp}</p>`;

      // Loop 
        html`${this.myArray.map(i => html`<li>${i}</li>`;)}`;

      // Conditional
        html`${this.myBool?html`<p>foo</p>`:html`<p>bar</p>`}`;
    
    Data bindings
      // Attribute
      html`<p id="${...}">`;

      // Boolean attribute
      html`<input type="checkbox" ?checked="${...}">`;

      // Property
      html`<input .value="${...}">`;

      // Event handler 
      html`<button @click="${this.doStuff}"></button>`;
    
    Composition
      // From multiple templates on same class
      render() {
        return html`
          ${this.headerTemplate}
          <article>article</article>
        `;
      }
      get headerTemplate() {
        return html`<header>header</header>`;
      }

      // By importing elements
      import './my-header.js';

      class MyPage extends LitElement{
        render() {
          return html`
            <my-header></my-header>
            <article>article</article>
          `;
        }
      }

    Slots
      render() { return html`<slot name="thing"></slot>`; }
      <my-element>
        <p slot="thing">stuff</p>
      </my-element>
*/