# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.4.0
**Template Source:** https://github.com/DrozmotiX/ioBroker-Copilot-Instructions

This file contains instructions and best practices for GitHub Copilot when working on ioBroker adapter development.

## Project Context

You are working on an ioBroker adapter. ioBroker is an integration platform for the Internet of Things, focused on building smart home and industrial IoT solutions. Adapters are plugins that connect ioBroker to external systems, devices, or services.

## Adapter-Specific Context

This is a **demonstration adapter with webcomponent functionality** that showcases modern web component integration with ioBroker.

- **Adapter Name**: `demo-adapter-with-webcomponent`
- **Primary Function**: Demonstrates webcomponent integration patterns for ioBroker adapters
- **Key Technologies**: Custom Web Components, BaseCustomWebComponentConstructorAppend, ES modules
- **Target Use Case**: Educational/template for developers building visualization adapters with web components
- **Web Component Features**: 
  - Custom toggle components with visual state management
  - Event-driven architecture with `checked-changed` events
  - CSS-in-JS styling patterns
  - ioBroker socket client integration patterns
  - Sample HTML demonstration files

### Key Dependencies and Patterns

- `@node-projects/base-custom-webcomponent`: Base class for custom web components
- `@iobroker/adapter-core`: Core ioBroker adapter functionality  
- `@iobroker/socket-client`: Client-side ioBroker connectivity
- `@web/dev-server`: Development server for testing web components
- ES module architecture with import maps
- Component lifecycle management (connectedCallback, disconnectedCallback)

## Testing

### Unit Testing
- Use Jest as the primary testing framework for ioBroker adapters
- Create tests for all adapter main functions and helper methods
- Test error handling scenarios and edge cases
- Mock external API calls and hardware dependencies
- For adapters connecting to APIs/devices not reachable by internet, provide example data files to allow testing of functionality without live connections
- Example test structure:
  ```javascript
  describe('AdapterName', () => {
    let adapter;
    
    beforeEach(() => {
      // Setup test adapter instance
    });
    
    test('should initialize correctly', () => {
      // Test adapter initialization
    });
  });
  ```

### Web Component Testing

For this adapter with webcomponent functionality, additional testing considerations:

#### Component Unit Tests

```javascript
describe('DemoComponent', () => {
    let component;
    
    beforeEach(() => {
        // Setup component in JSDOM environment
        document.body.innerHTML = '<demo-component></demo-component>';
        component = document.querySelector('demo-component');
    });
    
    test('should handle checked property changes', () => {
        component.checked = true;
        expect(component.hasAttribute('checked')).toBe(true);
    });
    
    test('should emit checked-changed events', (done) => {
        component.addEventListener('checked-changed', (event) => {
            expect(event.detail.newValue).toBe(true);
            done();
        });
        component.checked = true;
    });
});
```

#### Browser Integration Tests

```javascript
// Using puppeteer or playwright for actual browser testing
test('component renders correctly in browser', async () => {
    await page.goto(`file://${path.join(__dirname, '../sample/sample.html')}`);
    
    const componentExists = await page.$('demo-component') !== null;
    expect(componentExists).toBe(true);
    
    // Test component interactions
    await page.click('demo-component input');
    const checkedState = await page.evaluate(() => 
        document.querySelector('demo-component').checked
    );
    expect(checkedState).toBe(true);
});
```

## Development Patterns

### ioBroker Adapter Patterns

```javascript
// Basic adapter structure
class MyAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({ ...options, name: 'my-adapter' });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        this.setState('info.connection', false, true);
        // Initialize adapter
    }

    onStateChange(id, state) {
        if (!state || state.ack) return;
        // Handle state changes
    }

    onUnload(callback) {
        try {
            // Clean up resources
            callback();
        } catch (e) {
            callback();
        }
    }
}
```

### Web Component Integration Patterns

For this demo adapter, web components should follow these patterns:

```javascript
// Base component structure using BaseCustomWebComponentConstructorAppend
export class DemoComponent extends BaseCustomWebComponentConstructorAppend {
    static is = 'demo-component';
    
    static get observedAttributes() {
        return ['checked'];
    }
    
    constructor() {
        super();
        this._restoreCachedInitialValues();
        // Initialize component
    }
    
    /**
     * Initialize ioBroker connection for this component
     * @param {import("@iobroker/socket-client").Connection} connection 
     */
    initializeIobroker(connection) {
        this.connection = connection;
        // Setup state subscriptions, object queries, etc.
    }
    
    connectedCallback() {
        super.connectedCallback();
        // Component added to DOM
    }
    
    disconnectedCallback() {
        // Component removed from DOM - clean up subscriptions
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            this._fireEvent('checked-changed', { 
                oldValue: oldValue !== null, 
                newValue: newValue !== null 
            });
        }
    }
}

customElements.define(DemoComponent.is, DemoComponent);
```

### State Management

```javascript
// Create states with proper structure
await this.setObjectNotExistsAsync('device.status', {
    type: 'state',
    common: {
        name: 'Device Status',
        type: 'boolean',
        role: 'indicator',
        read: true,
        write: false,
    },
    native: {},
});

// Update states with acknowledgment
await this.setStateAsync('device.status', true, true);
```

## Error Handling

### Logging Patterns

```javascript
// Use appropriate log levels
this.log.info('Adapter started successfully');
this.log.warn('Configuration incomplete, using defaults');
this.log.error('Failed to connect to device: ' + error.message);
this.log.debug('Received data: ' + JSON.stringify(data));
```

### Connection State Management

```javascript
// Update connection state
this.setState('info.connection', true, true);

// Handle connection loss
try {
    await this.connectToDevice();
    this.setState('info.connection', true, true);
} catch (error) {
    this.log.error('Connection failed: ' + error.message);
    this.setState('info.connection', false, true);
}
```

### Graceful Shutdown

```javascript
onUnload(callback) {
  try {
    // Clear timers
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
      this.updateTimer = undefined;
    }
    // Close connections, clean up resources
    callback();
  } catch (e) {
    callback();
  }
}
```

## Code Style and Standards

- Follow JavaScript/TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper resource cleanup in `unload()` method
- Use semantic versioning for adapter releases
- Include proper JSDoc comments for public methods
- For web components, follow custom element naming conventions (kebab-case)
- Use meaningful event names and consistent event detail structures
- Implement proper CSS encapsulation using shadow DOM or CSS modules