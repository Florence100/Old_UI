class EditBox {
    constructor(rootNode, inputSelector, messageSelector) {
        this._rootNode = rootNode;
        this._input = rootNode.querySelector(inputSelector);
        this._message = rootNode.querySelector(messageSelector) 
            ? rootNode.querySelector(messageSelector) 
            : null;
        this._messageText = this._message?.getAttribute('data-error');
        this._pattern = this._input.getAttribute('data-pattern')
            ? this._input.getAttribute('data-pattern')
            : '';
        this._isValid = this._input.getAttribute('data-verify-on-input') 
            ? this._input.getAttribute('data-verify-on-input')
            : 'false';
        this._input.value ? this._input.setAttribute('value', this._input.value) : null;
        this._value = this._input.getAttribute('value')
            ? this._input.getAttribute('value')
            : null;
        this._placeholder = this._input.getAttribute('data-placeholder') 
            ? this._input.getAttribute('data-placeholder') 
            : '';
        this._addListener();
        this._collectInstances();
        this.setValue();
    }

    _addListener() {
        this._input.addEventListener('input', () => {
            this._value = this._input.value;
            this._input.setAttribute('value', this._value);
        })
    }

    _collectInstances() {
        EditBox.instances.push(this);
    }

    getRootNode() {
        return this._rootNode;
    }

    getValue() {
        return this._value;
    }

    setValue(value) {
        if (typeof(value) !== 'undefined') {
            if (typeof(value) === 'string') {
                this._input.setAttribute('value', value);
                this._value = value;
            }
            return this;
        }
    }

    verify() {
        if (this._input.value.match(this._pattern) === null) {
            this._input.setAttribute('data-verify-on-input', 'false');
            this._isValid = 'false';
            if (this._message) {
                this._message.textContent = this._messageText;
            }
        } else {
            this._input.setAttribute('data-verify-on-input', 'true');
            this._isValid = 'true';

            if (this._message) {
                this._message.textContent = '';
            }
        }
        return this._isValid;
    }

    static instances = [];

    static init() {
        const elements = document.querySelectorAll('[rel="control.editbox"]');
        elements.forEach(function(node) {
            const inputSelector = '[rel="editbox.input"]';
            const messageSelector = '[rel="_editbox.message"]';
            new EditBox(node, inputSelector, messageSelector);
        })
    }

    static getInstance(node) {
        let result = null;

        if (node instanceof Node) {
            EditBox.instances.forEach(function(element) {
                if (element._rootNode === node | element._rootNode.contains(node)) {
                    result = element;
                }
            })
        }
        return result;
    }
}