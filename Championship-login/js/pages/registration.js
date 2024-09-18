//EditBox
EditBox.init();

instansesAll = EditBox.instances;

const buttonSubmit = document.querySelector('.button-submit');
const form = document.querySelector('.registration__form');

buttonSubmit.addEventListener('click', (event) => {
    const isValidList = [];

    instansesAll.forEach(function(instanse) {
        instanse.verify();
        isValidList.push(instanse._isValid);
    })
    if (isValidList.includes('false')) {
        event.preventDefault();
    } else {
        event.preventDefault();
        const nameValue = instansesAll[0].getValue();
        const emailValue = instansesAll[1].getValue();

        localStorage.setItem('userName', nameValue);
        localStorage.setItem('userEmail', emailValue);
        document.location.href = 'welcome.html';
    }
})