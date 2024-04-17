import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";

export class DemoComponent extends BaseCustomWebComponentConstructorAppend {
    static style = css `
            :host {
                display: block;
                background: lightgray;
            }
			
			div > input {
				width: 100%;
				height: 100%;
			}

            `;
			
    static template = html `
            <div style="display: flex; flex-direction: column; height: 100%; width: 100%;">
                <input>
            </div>
        `;

    static is = 'demo-component';
	
    constructor() {
        super();
        this._restoreCachedInititalValues();  
    }
	
	testProp = '';
	
	/**
	 * @param {Connection} connection
	 */
	initializeIobroker(connection) {
		
	}
	
    connectedCallback() {
    }
	
    disconnectedCallback() {
    }
}
customElements.define(TabWebcomponent.is, TabWebcomponent);
