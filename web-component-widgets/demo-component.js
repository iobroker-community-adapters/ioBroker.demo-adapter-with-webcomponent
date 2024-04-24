import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";

export class DemoComponent extends BaseCustomWebComponentConstructorAppend {
    static style = css`
                *,
                ::before,
                ::after {
                box-sizing: border-box;
                border-style: solid;
                border-width: 0;
                }
                
                input {
                appearance: none;
                vertical-align: middle;
                color: inherit;
                font: inherit;
                background: transparent;
                padding: 0;
                margin: 0;
                border-radius: 0;
                text-align: inherit;
                text-transform: inherit;
                }
                
                .toggle-container.a {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                border-radius: 50px;
                padding: 0 6px;
                width: 62px;
                height: 28px;
                background-color: #bb5555;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5), 0 1px rgba(255, 255, 255, 0.5);
                transition-property: background-color;
                transition-duration: 0.4s;
                transition-timing-function: linear;
                }
                .toggle-container.a:has(:checked) {
                background-color: #5698bb;
                }
                .toggle-container.a .toggle-input {
                position: absolute;
                z-index: 2;
                inset: 0;
                cursor: pointer;
                }
                .toggle-container.a .toggle-handle {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                background-image: url('https://assets.codepen.io/4175254/wood-pattern.png');
                background-size: 328px 110px;
                background-position: center;
                box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.75), inset 0 -1px 4px #b75301, 0 1px 4px rgba(0, 0, 0, 0.75);
                transition-property: transform;
                transition-duration: 0.4s;
                }
                .a .toggle-input:checked + .toggle-handle {
                transform: translateX(34px);
                }
                .toggle-container.a .toggle-handle::before {
                content: '';
                position: absolute;
                inset: 6.5px;
                border-radius: 50%;
                background-image: linear-gradient(rgba(174, 34, 1, 0.125), transparent);
                box-shadow: inset 0 1px 2px #ad2201, 0 1px 1px rgba(255, 255, 255, 0.75);
                }
                .toggle-container.a .toggle-icon {
                width: 24px;
                height: 24px;
                fill: #fff;
                filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.25));
                }
            `;

    static template = html`
           
                <div class="toggle-container a">
                    <input id="ip" class="toggle-input" type="checkbox">
                    <div class="toggle-handle"></div>
                    <svg class="toggle-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7072 5.70718L7.00008 11.4143L3.29297 7.70718L4.70718 6.29297L7.00008 8.58586L11.293 4.29297L12.7072 5.70718Z"></path>
                    </svg>
                    <svg class="toggle-icon cross" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.58594 8.00015L4.29297 5.70718L5.70718 4.29297L8.00015 6.58594L10.2931 4.29297L11.7073 5.70718L9.41436 8.00015L11.7072 10.293L10.293 11.7072L8.00015 9.41436L5.70733 11.7072L4.29312 10.293L6.58594 8.00015Z"></path>
                    </svg>
                </div>
        `;

    static get observedAttributes() {
        return ["checked"];
    }

    static is = 'demo-component';

    /**
     * @type {HTMLInputElment}
     */
    #ip

    constructor() {
        super();
        this._restoreCachedInititalValues();
        this.#ip = this._getDomElement('ip');
        this.#ip.addEventListener("click", (e) => {
            this.checked = this.#ip.checked;
        });
    }

    get checked() {
        return this.hasAttribute('checked');
    }
    set checked(value) {
        if (value)
            this.setAttribute('checked', "");
        else
            this.removeAttribute('checked');
    }

    /**
     * @param {import("@iobroker/socket-client").Connection} connection
     */
    initializeIobroker(connection) {
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") {
            this.#ip.checked = newValue !== null;
            this.dispatchEvent(new CustomEvent('checked-changed', { detail: { oldValue: oldValue !== null, newValue: newValue !== null } }));
        }
    }
}
customElements.define(DemoComponent.is, DemoComponent);
