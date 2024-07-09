const tareas = [
    { id: 1, descripcion: "Cocinar", completada: false },
    { id: 2, descripcion: "Lavar la ropa", completada: false },
    { id: 3, descripcion: "Hacer ejercicio", completada: false }
];

let proximoId = 4;

const renderizarTareas = () => {
    const listaTareas = document.getElementById('listaTareas');
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const elementoTarea = document.createElement('li');
        
        const contenedorBotones = document.createElement('div');
        contenedorBotones.style.display = 'flex';
        contenedorBotones.style.marginRight = '10px';
        
        const tareaId = document.createElement('span');
        tareaId.textContent = `ID: ${tarea.id}`;
        tareaId.classList.add('tarea-id');
        
        const tareaDescripcion = document.createElement('span');
        tareaDescripcion.textContent = tarea.descripcion;
        
        const tareaContenido = document.createElement('div');
        tareaContenido.classList.add('tarea-contenido');
        tareaContenido.appendChild(tareaId);
        tareaContenido.appendChild(tareaDescripcion);

        if (tarea.completada) {
            tareaDescripcion.classList.add('completada');
        } else {
            tareaDescripcion.classList.remove('completada');
        }

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.onclick = () => eliminarTarea(tarea.id);

        const botonCambiar = document.createElement('button');
        botonCambiar.classList.add('toggle');
        if (tarea.completada) {
            botonCambiar.textContent = '-';
            botonCambiar.classList.add('minus');
        } else {
            botonCambiar.textContent = '+';
            botonCambiar.classList.add('plus');
            botonCambiar.classList.remove('minus');
        }
        botonCambiar.onclick = () => cambiarEstadoTarea(tarea.id);

        contenedorBotones.appendChild(botonCambiar);
        contenedorBotones.appendChild(botonEliminar);
        
        elementoTarea.appendChild(contenedorBotones);
        elementoTarea.appendChild(tareaContenido);
        listaTareas.appendChild(elementoTarea);
    });

    actualizarContadores();
};

const agregarTarea = () => {
    const entradaTarea = document.getElementById('entradaTarea');
    const descripcionTarea = entradaTarea.value.trim();

    if (descripcionTarea) {
        const nuevaTarea = {
            id: proximoId++ % 10,
            descripcion: descripcionTarea,
            completada: false
        };
        tareas.push(nuevaTarea);
        entradaTarea.value = '';
        renderizarTareas();
    }
};

const eliminarTarea = id => {
    const indice = tareas.findIndex(tarea => tarea.id === id);

    if (indice !== -1) {
        tareas.splice(indice, 1);
        renderizarTareas();
    }
};

const cambiarEstadoTarea = id => {
    const tarea = tareas.find(tarea => tarea.id === id);

    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarTareas();
    }
};

const actualizarContadores = () => {
    const totalTareas = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;

    document.getElementById('totalTareas').textContent = totalTareas;
    document.getElementById('tareasCompletadas').textContent = tareasCompletadas;
};

renderizarTareas();
