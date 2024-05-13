const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input');
const select = document.querySelectorAll('#formulario select');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,24}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    imagen: /^image\//,
    select: "",
    textArea: /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{1,128}$/
}

const campos = {
    nombre: false,
    correo: false,
    imagen: false,
    select: false
}


const validarFormulario = (e) =>{
    switch (e.target.name){
        case "nombre": 
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;

        case "email":
            validarCampo(expresiones.correo, e.target, 'email');
        break;

        case "pais":
            validarSelect(expresiones.select, e.target, 'select');
        break;
    }
}






const mensajeTextArea = document.getElementById('mensaje'); 

const validarMensaje = () => {
    const valor = mensajeTextArea.value.trim();
    if (expresiones.textArea.test(valor)) {
        campos.mensaje = true;
        console.log('TextArea: ' +campos.mensaje);
        document.querySelector('#grupo_textarea .formulario__textarea-error').classList.remove('formulario__textarea-error-activo')
    } else {
        campos.mensaje = false;
        console.log('TextArea: ' +campos.mensaje);
        document.querySelector('#grupo_textarea .formulario__textarea-error').classList.add('formulario__textarea-error-activo');
    }
};

mensajeTextArea.addEventListener('keyup', validarMensaje);
mensajeTextArea.addEventListener('blur', validarMensaje);



const inputImagen = document.getElementById('imagen'); 
inputImagen.addEventListener('change', (e) => {
    const imagen = e.target.files[0];
    if (imagen && expresiones.imagen.test(imagen.type)) {
        campos.imagen = true;
        
        document.querySelector('#grupo__imagen .formulario__imagen-error').classList.add('formulario__imagen-error');
        document.querySelector('#grupo__imagen .formulario__imagen-error').classList.remove('formulario__imagen-error-activo');
            console.log(campos.imagen)
    } else {
        campos.imagen = false;
        console.log(campos.imagen);
        document.querySelector('#grupo__imagen .formulario__imagen-error').classList.add('formulario__imagen-error-activo');
    }
});



const validarSelect = (expresion,select, campo)=>{
    if (expresion !== select.value){
        campos['select'] = true;
        document.querySelector('#grupo_'+campo+' .formulario__select-error').classList.remove('formulario__select-error-activo');
        document.querySelector('#grupo_'+campo+' .formulario__select-error').classList.add('formulario__select-error');
    }else{
        campos['select'] = false;
        document.querySelector('#grupo_'+campo+' .formulario__select-error').classList.add('formulario__select-error-activo');
    }
    console.log( 'Expresion: ', expresion, 'Valor : ' + select.value +"$" )
}   


const validarCampo = (expresion, input, campo) =>{
    if (expresion.test(input.value)) {
        campos[campo] = true;
        campos['imagen']= true;
        document.getElementById('grupo_'+campo).classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo_'+campo).classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo_'+campo+' i').classList.remove('fa-solid', 'fa-xmark');
        document.querySelector('#grupo_'+campo+' i').classList.add('fa-solid', 'fa-check');
        document.querySelector('#grupo_'+campo+' .formulario__input-error').classList.remove('formulario__input-error-activo')
    } else {
        campos[campo] = true;
        campos['imagen']= false; 
        document.getElementById('grupo_'+campo).classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo_'+campo).classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo_'+campo+' i').classList.remove('fa-solid', 'fa-check');
        document.querySelector('#grupo_'+campo+' i').classList.add('fa-solid', 'fa-xmark');
        document.querySelector('#grupo_'+campo+' .formulario__input-error').classList.add('formulario__input-error-activo');
    }
}

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

select.forEach((select) =>{
    select.addEventListener('blur', validarFormulario);
});



formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.imagen && terminos && campos.imagen && campos.select && campos.imagen && campos.mensaje){
        document.getElementById('formulario__mensaje').classList.remove('formulario_mensaje-activo');
        console.log('reset');
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(()=>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
        },5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto')
        });
        //formulario.submit();
        formulario.reset();
    }else{
        console.log('false');
        document.getElementById('formulario__mensaje').classList.add('formulario_mensaje-activo');
        setTimeout(()=>{
            document.getElementById('formulario__mensaje').classList.remove('formulario_mensaje-activo');
            document.getElementById('formulario__mensaje').classList.add('formulario_mensaje');
        },3000);
        
    }
});