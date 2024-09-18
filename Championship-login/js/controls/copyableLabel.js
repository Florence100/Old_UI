class CopyableLabel extends Label {
    constructor(rootNode) {
        super(rootNode);
        this._window = rootNode.querySelector('[rel="copyableLabel.window"]');
        this._message = rootNode.querySelector('[rel="copyableLabel.message"]');
        this._messageText = this._message?.getAttribute('data-message');
        this._addListener();
        this._showValue();
    }
    
    _showValue() {
        this.getValue();
        this._window ? this._window.textContent = this.value : null;
    }

    _showMessage() {
        this._message.textContent = this._messageText;
    }

    _hideMessage() {
        this._message.classList.add('hidden');
        this._message.addEventListener('transitionend', () => {
            this._message.classList.remove('hidden');
            this._message.textContent = '';
        })
    }

    _copyValue() {
        const value = this.getValue();
        navigator.clipboard.writeText(value)
        .then(() => {
            this._showMessage();
            setTimeout(this._hideMessage.bind(this), 5000);
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
    }

    _addListener() {
        this._window.addEventListener('click', () => {
            this._copyValue();
        })
    }
    
    static init() {
        const elements = document.querySelectorAll('[rel="control.copyableLabel"]');
        elements.forEach(function(node) {
            new CopyableLabel(node);
        })
    }
}


CopyableLabel.init();



























