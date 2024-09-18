class SubmitBox extends EditBox {
    constructor(rootNode, inputSelector, messageSelector) {
        super(rootNode, inputSelector, messageSelector);
        this._buttonSubmit = rootNode.querySelector('[rel="_submitbox.button"]');
        this._addListenerButton();
    }

    _submit(event) {
        this.verify();
        if(this._isValid === 'false') {
            event.preventDefault();
            this.verify();
        }
    }

    _addListenerButton() {
        this._buttonSubmit.addEventListener('click', (event) => {
            this._submit(event);
        })
    }

    static init() {
        const elements = document.querySelectorAll('[rel="control.submitbox"]');
        elements.forEach(function(node) {
            const inputSelector = '[rel="submitbox.input"]';
            const messageSelector = '[rel="_submitbox.message"]';
            new SubmitBox(node, inputSelector, messageSelector);
        })
    }
}