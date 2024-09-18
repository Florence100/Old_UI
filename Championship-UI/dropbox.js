class DropBox {
    constructor(rootNode) {
        this._rootNode = rootNode;
        this._button = rootNode.querySelector('[rel="dropbox.button"]')
            ? rootNode.querySelector('[rel="dropbox.button"]')
            : null;
        this._arrow = rootNode.querySelector('[rel="_dropbox.arrow"]') 
            ? rootNode.querySelector('[rel="_dropbox.arrow"]')
            : null;
        this._dropdown = rootNode.querySelector('[rel="_dropbox.dropdown"]') 
            ? rootNode.querySelector('[rel="_dropbox.dropdown"]')
            : null;
        this._dropboxValue = rootNode.querySelector('[rel="_dropbox.value"]') 
            ? rootNode.querySelector('[rel="_dropbox.value"]')
            : null;
        this._defaultValue = this._rootNode.getAttribute('data-default-value') 
            ? this._rootNode.getAttribute('data-default-value')
            : "";
        this._defaultIndex = this._rootNode.getAttribute('data-default-index') 
            ? this._rootNode.getAttribute('data-default-index')
            : "";
        this._optionsData = null;
        this._optionIndexes = [];
        this._optionValues = [];
        this._isOpen = false;
        this._options = rootNode.querySelectorAll('li');
        this._value = "";
        this._selectedIndex = "";
        this._initialization();
        this._addListener();
        this._collectInstances();
        return this;
    }

    // получаю отсортированный по data-index объект вида index: value
    _loadData() {
        this._optionsData = {};
        for (let i = 0; i < this._options.length; i++) {
            const index = this._options[i].getAttribute('data-index');
            const value = this._options[i].getAttribute('data-value');
            if (!(index in this._optionsData)) {
                this._optionsData[index] = value;
            } else {
                this._options[i].remove();
            }
        }
        this._optionIndexes = Object.keys(this._optionsData);
        this._optionValues = Object.values(this._optionsData);
        return this._optionsData;
    }

    _getData() {
        if (this._optionsData === null) {
            this._optionsData = _loadData();
        }
        return this._optionsData;
    }

    _applyDefaultValue() {
        this._value = this._defaultValue;
        this._selectedIndex = this._optionIndexes[this._getOptionsValueList().indexOf(this._value)];
        this._dropboxValue.textContent = this._value;
    }

    _applyDefaultIndex() {
        this._selectedIndex = this._defaultIndex;
        this._value = this._optionsData[this._selectedIndex];
        this._dropboxValue.textContent = this._value;
    }

    //назначаю options textContent исходя из data-value
    _setOptionText() {
        for (let i = 0; i < this._options.length; i++) {
            this._options[i].textContent = this._options[i].getAttribute('data-value');
        }
    }

    _showOptions() {
        if (this._dropdown) {
            this._dropdown.classList.add('dropbox-dropdown-show');
            if (this._arrow) {
                this._arrow.classList.add('button-img-active');
            }
            this._isOpen = true;
        }
    }

    _hideOptions() {
        this._dropdown.classList.remove('dropbox-dropdown-show');
        if (this._arrow) {
            this._arrow.classList.remove('button-img-active');
        }
        this._isOpen = false;
    }

    _optionSelect(element) {
        this._value = element.getAttribute('data-value');
        this._selectedIndex = element.getAttribute('data-index');
        if (this._dropboxValue) {
            this._dropboxValue.textContent = this._value;
        }
        this._hideOptions();
    }

    _addListener() {
        if (this._button) {
             this._button.addEventListener('click', () => {
                if (this._isOpen === false) {
                    this._showOptions();
                } else {
                    this._hideOptions();
                }
            })
        }
           
        for (let i = 0; i < this._options.length; i++) {
            this._options[i].addEventListener('click', (event) => {
                this._optionSelect(event.target);
            })
        }

        document.addEventListener('click', (event) => {
            if (this._rootNode.contains(event.target)) {
                null;
            } else {
                if (this._isOpen === true) {
                    this._hideOptions();
                }
            }
        })
    }

    _initialization() {
        this._loadData();
        this._setOptionText();
        if(this._button && this._dropboxValue) {
            //есть data-index и он валиден
            if (this._dropboxValue.getAttribute('data-index') && this._optionIndexes.includes(this._dropboxValue.getAttribute('data-index'))) {
                this._selectedIndex = this._dropboxValue.getAttribute('data-index');
                this._value = this._optionsData[this._selectedIndex];
                this._dropboxValue.textContent = this._value;
            //есть data-value и оно валидно
            } else if (this._dropboxValue.getAttribute('data-value') && this._optionValues.includes(this._dropboxValue.getAttribute('data-value'))) {
                this._value = this._dropboxValue.getAttribute('data-value');
                this._selectedIndex = this._optionIndexes[this._getOptionsValueList().indexOf(this._value)];
                this._dropboxValue.textContent = this._value;
            //есть data-default-index и он валиден
            } else if (this._defaultIndex && this._optionIndexes.includes(this._defaultIndex)) {
                this._applyDefaultIndex();
            //есть data-default-value и оно валидно
            } else if (this._defaultValue && this._optionValues.includes(this._defaultValue)) {
                this._applyDefaultValue();
            //есть placeholder
            } else if (this._dropboxValue.getAttribute('data-placeholder')) {
                this._dropboxValue.textContent = this._dropboxValue.getAttribute('data-placeholder');
            //если нет placeholder выбирается значение с наименьшим индексом
            } else {
                this._selectedIndex = this._optionIndexes[0];
                this._value = this._optionValues[0];
                this._dropboxValue.textContent = this._value;
            }
        }
    }

    _collectInstances() {
        DropBox.instances.push(this);
    }

    getRootNode() {
        return this._rootNode;
    }

    getSelectedIndex() {
        return this._selectedIndex;
    }

    getValue() {
        return this._value;
    }

    setValue(index) {
        if (this._optionIndexes.includes(String(index))) {
            this._selectedIndex = index;
            this._value = this._optionsData[this._selectedIndex];
            this._dropboxValue.textContent = this._value;
        } else {
            if (this._defaultIndex && this._optionIndexes.includes(this._defaultIndex)) {
                this._applyDefaultIndex();
            } else if (this._defaultValue && this._optionValues.includes(this._defaultValue)) {
                this._applyDefaultValue();
            } else if (this._dropboxValue.getAttribute('data-placeholder')) {
                this._dropboxValue.textContent = this._dropboxValue.getAttribute('data-placeholder');
            } else {
                this._selectedIndex = this._optionIndexes[0];
                this._value = this._optionValues[0];
                this._dropboxValue.textContent = this._value;
            }
        }
        return this;
    }

    getData() {
        return this._getData();
    }

    static instances = [];

    static init() {
        const elements = document.querySelectorAll('[rel="control.dropbox"]');
        elements.forEach(function(node) {
            new DropBox(node);
        })
    }

    static getInstance(node) {
        let result = null;

        if (node instanceof Node) {
            DropBox.instances.forEach(function(element) {
                if (element._rootNode === node | element._rootNode.contains(node)) {
                    result = element;
                }
            })
        }
        return result;
    }
}