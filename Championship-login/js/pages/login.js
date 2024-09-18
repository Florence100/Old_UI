//SubmitBox
SubmitBox.init();

//login

const loginForm = document.querySelector('[rel="login-form"]');
loginForm.addEventListener('submit', () => {
    console.log('submit!')
})

// var dpt = window.devicePixelRatio;
// var widthM = window.screen.width;
// var widthH = window.screen.height;
// alert(dpt+' '+widthM+' '+widthH+' '+(widthM*dpt)+' '+(widthH*dpt));