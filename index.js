const formulario = document.querySelector ("#formulario");
let mensajes = []
let editando = false;
let nombre_previo = "";
let nombreInput = document.getElementById ("text-area");

if (localStorage.getItem("mensajeLlave")){
     mensajes = JSON.parse(localStorage.getItem("mensajeLlave"));
}else {
    mensajes = [];
}

function actualizarLista(){
    const lista= document.getElementById("lista-tareas");
    lista.innerHTML = "";
    mensajes.forEach(mensaje => {
        const li = document.createElement("li");
        li.textContent = mensaje;
        li.classList.add("list-group-item");

        const btnEliminar = document.createElement("button");
        const iconoEliminar = document.createElement("i");
        iconoEliminar.classList.add("fa", "fa-trash");
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.classList.add("btn", "btn-danger", "float-right");
        btnEliminar.addEventListener("click", () => deleteTarea(mensaje));
        li.appendChild(btnEliminar);

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "float-right", "mr-2");
         const iconEdit = document.createElement("i");
         iconEdit.classList.add("fa", "fa-edit");
         btnEditar.appendChild(iconEdit);
         btnEditar.classList.add("btn", "btn-warning", "float-right", "mr-2");
         btnEditar.addEventListener("click", () => editarTarea(mensaje));
         li.appendChild(btnEditar);

         lista.appendChild(li);
    });
}




function agregarTarea (){
    if (editando){
        mensajes= mensajes.map(nombre =>nombre===nombre_previo ? nombreInput.value : nombre);
        editando=false;
    }else {
        const mensaje=document.getElementById("text-area").value;
    mensajes.push(mensaje);
    console.log (mensajes);
    }
    
    localStorage.setItem ("mensajeLlave", JSON.stringify(mensajes) );
    document.getElementById("text-area").value= ' '

    actualizarLista()
}


function editarTarea(mensaje){

    editando = true;
    nombre_previo = mensaje;
    nombreInput.value = mensaje;
    

}




function borrar () {
    localStorage.clear();
    mensajes= []
   console.log ('borrando');
   actualizarLista();

}

function deleteTarea(mensaje){
    console.log(mensaje);
    mensajes = mensajes.filter(elemento => elemento !== mensaje);
    localStorage.setItem("mensajeLlave",JSON.stringify(mensajes))
    actualizarLista();
}

