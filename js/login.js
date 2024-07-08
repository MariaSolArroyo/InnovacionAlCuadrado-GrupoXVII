const user = document.getElementById('user');
const pass = document.getElementById('pass');
const button = document.getElementById('submit');

button.addEventListener('click', (e) =>{
    e.preventDefault();

    const data = {
        user: user.value,
        pass: pass.value,
    }


    if (data.user=='admin' && data.pass==123456){
        window.location.href = '../back/index.html';
    }
    else {
        alert('El usuario o contraseña no coinciden en nuestra base');
    }
})