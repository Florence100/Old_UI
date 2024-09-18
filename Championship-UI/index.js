// Dropbox
DropBox.init();

// PanelMenu 
PanelMenu.init();
const instancesPanelMenu = PanelMenu.instances;
instancesPanelMenu.forEach(function(instance) {
    instance.abledAll().switchTab(0).disabled(3);
})

//EditBox
EditBox.init();
instansesAll = EditBox.instances;

const button = document.querySelector('.button-submit');

button.addEventListener('click', (event) => {
    event.preventDefault();
    instansesAll.forEach(function(instanse) {
        instanse.verify();
    })
})

//SubmitBox
SubmitBox.init();

//Выделение колонок при наведении мыши на ячейку
const columnHoverElements = document.querySelectorAll('.column-hover');
columnHoverElements.forEach(element => {
    const cells = element.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            const nodes =  Array.prototype.slice.call(cell.parentElement.children);
            const index = nodes.indexOf(cell);
            const table = cell.closest('table');

            table.querySelectorAll('tr').forEach(tr => {
                tr.children[index].tagName.toLowerCase() === 'td'
                ? tr.children[index].classList.add('cell-active')
                : null;

                tr.children[index].tagName.toLowerCase() === 'th'
                ? tr.children[index].classList.add('cell-active')
                :null

                cell.addEventListener('mouseleave', () => {
                    tr.children[index].classList.remove('cell-active');
                })
            })
        })
    })
});