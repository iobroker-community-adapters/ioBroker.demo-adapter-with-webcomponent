import utils from '@iobroker/adapter-core';

class Demo extends utils.Adapter {
    _unloaded;
    _instanceName = 'webui.0';
    
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: adapterName,
        });
        this.on('ready', this.main.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }
   
    
    async main() {
        this.log.info(`adapter ready`);
    }
    onUnload() {
        this._unloaded = true;
    }
}

new Demo();
