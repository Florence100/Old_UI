class PanelMenu {
    constructor(rootNode) {
        this._rootNode = rootNode;
        this._menuTabs = this._rootNode.querySelectorAll('[rel="control.menu-tab"]');
        this._tabCount = this._menuTabs.length;
        this._collectInstances();
        this._addSeparator();
        this._addListener();
    }

    _getRootNode() {
        return this._rootNode;
    }

    _addSeparator() {
        if (this._tabCount > 1) {
            for (let i = 0; i < this._tabCount - 1; i++) {
                this._menuTabs[i].classList.add('separator');
            }
        }
    }

    _addListener() {
        this._menuTabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                if(tab.classList.contains('disabled')) {
                    event.preventDefault();
                } else {
                    const link = tab.querySelector('a');
                    this._menuTabs.forEach(currentTab => {
                        const currentLink = currentTab.querySelector('a');
                        currentLink.classList.remove('tab-hover');
                    });
                    link.classList.add('tab-hover');
                }
            })
        })
    }

    _collectInstances() {
        PanelMenu.instances.push(this);
    }

    switchTab(index) {
        if (typeof index === 'number' && index < this._tabCount) {
            const link = this._menuTabs[index].querySelector('a')?.getAttribute('href');
            if(link && !this._menuTabs[index].classList.contains('disabled')) {
                document.location.href = link;
                this._menuTabs.forEach(tab => {
                    tab.querySelector('a').classList.remove('tab-hover');
                });
                this._menuTabs[index].querySelector('a').classList.add('tab-hover');
            }
        }
        return this;
    }

    disabled(index) {
        if (typeof index === 'number' && index < this._tabCount) {
            this._menuTabs[index].classList.add('disabled');
            this._menuTabs[index]?.querySelector('a').classList.remove('tab-hover');
        }
        return this;
    }

    disabledAll() {
        this._menuTabs.forEach(tab => {
            tab.classList.add('disabled');
            tab.querySelector('a').classList.remove('tab-hover');
        })
        return this;
    }

    abled(index) {
        if (typeof index === 'number' && index < this._tabCount) {
            this._menuTabs[index].classList.remove('disabled');
        }
        return this;
    }

    abledAll() {
        this._menuTabs.forEach(tab => {
            tab.classList.remove('disabled');
        })
        return this;
    }

    static instances = [];

    static init() {
        const elements = document.querySelectorAll('[rel="control.panel-menu"]');
        elements.forEach(function(node) {
            new PanelMenu(node);
        })
    }

    static getInstance(node) {
        let result = null;

        if (node instanceof Node) {
            PanelMenu.instances.forEach(function(element) {
                if (element._rootNode === node | element._rootNode.contains(node)) {
                    result = element;
                }
            })
        }
        return result;
    }
}