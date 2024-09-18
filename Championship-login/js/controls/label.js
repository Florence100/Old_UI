class Label {
    constructor (node) {
        this._rootNode = node;
        this.dataKeys = node.getAttribute('data-subscription-keys');
        this.value = node.getAttribute('value');
        this._getKeys();
        this._showValue();
        this._collectInstances();
        // this.setValue();
    }

    _getKeys() {
        let rawValue = this._rootNode.getAttribute('data-value');
        const keys = [];
        let defaultValue = '';

        while (rawValue.indexOf('{') >= 0) {
            const start = rawValue.indexOf('{');
            const end = rawValue.indexOf('}');
            const pattern = rawValue.slice(start, end + 1);
            const currrentSlice = rawValue.slice(start + 1, end).trim();

            if (currrentSlice.includes('|')) {
                const index = currrentSlice.indexOf('|');
                const key = currrentSlice.slice(0, index).trim();
                keys.push(key);
                let rawDefaultValue = currrentSlice.slice(index + 1, currrentSlice.length).trim();
                const re1 = /^('|")/;
                const re2 = /('|")$/;
                defaultValue = rawDefaultValue.replace(re1, '').replace(re2, '');
                rawValue = (rawValue.slice(0, start) + defaultValue + rawValue.slice(end + 1, rawValue.length)).trim();
            } else {
                const key = currrentSlice.slice(0, currrentSlice.length).trim();
                keys.push(key);
                defaultValue = '';
                rawValue = (rawValue.slice(0, start) + defaultValue + rawValue.slice(end + 1, rawValue.length)).trim();
            }
        }

        this.value = rawValue;
        const stringKeys = keys.join(', ');
        this._rootNode.setAttribute('data-subscription-keys', stringKeys)

        return keys;
    }

    _showValue() {
        this.getValue();
        if (this._rootNode.childNodes[0].nodeType === 3) {
            this._rootNode.childNodes[0].textContent = this.value;
        } else {
            let textNode = document.createTextNode(this.value);
            this._rootNode.prepend(textNode)
        }
    }

    _collectInstances() {
        Label.instances.push(this);
    }

    getRootNode() {
        return this._rootNode;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        if (typeof(value) !== 'undefined') {
            this.value = value;
            this._showValue();
            return this.value;
        }
    }

    static instances = [];

    static init() {
        const elements = document.querySelectorAll('[rel="control.label"]');
        elements.forEach(function(node) {
            new Label(node);
        })
    }

    static getInstance(node) {
        let result = null;

        if (node instanceof Node) {
            Label.instances.forEach(function(element) {
                if (element._rootNode === node | element._rootNode.contains(node)) {
                    result = element;
                }
            })
        }
        return result;
    }
}


Label.init();



























