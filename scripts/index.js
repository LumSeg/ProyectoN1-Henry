const boton = document.getElementById("boton");
let repositorioDeActividades;
let contadorId = 0;

class Activity {
    constructor(id, titulo, descripcion, imagen){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    get idActividad(){
        return this.id;
    }

    get tituloActividad(){
        return this.titulo;
    }

    get descripcionActividad(){
        return this.descripcion;
    }

    get imagenActividad(){
        return this.imagen;
    }
} 

class Repository {
    constructor(){
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(id, titulo, descripcion, imagen) {
        const newActivity = new Activity(id, titulo, descripcion, imagen);
        this.activities.push(newActivity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id != id);
    }
}

boton.addEventListener('click', (e) => {
    e.preventDefault();
    handler();
});

document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('actividad-wrapper')) {
        const actividadId = e.target.dataset.id;
        if (actividadId) {
            repositorioDeActividades.deleteActivity(actividadId);
            addActivitiesToHtml(repositorioDeActividades);
        }
    }
});

function handler() {
    const tituloInput = document.getElementById("titulo").value;
    const descripcionInput = document.getElementById("descripcion").value;
    const imagenInput = document.getElementById("imagen").value;

    if (!tituloInput || !descripcionInput || !imagenInput) {
        alert("Por favor completa todos los campos.");
        return;
    }

    if (!repositorioDeActividades) {
       repositorioDeActividades = new Repository();
    }

    const idActividad = contadorId.toString();
    contadorId++;

    repositorioDeActividades.createActivity(idActividad, tituloInput, descripcionInput, imagenInput);

    addActivitiesToHtml(repositorioDeActividades);
}

function createHtmlActivity(actividad) {
    const { idActividad, tituloActividad, descripcionActividad, imagenActividad } = actividad;

    var h3=document.createElement("h3");
    var p=document.createElement("p");
    var img=document.createElement("img");
    var deleteButton = document.createElement("button");

    h3.innerHTML = tituloActividad;
    p.innerHTML = descripcionActividad;
    img.src = imagenActividad;

    h3.classList.add("titulo-actividad");
    p.classList.add("descripcion-actividad");
    img.classList.add("imagenActividad");

    img.style.height = '200px';
    img.style.width = '200px';

    var divActividad = document.createElement("div");
    divActividad.appendChild(h3);
    divActividad.appendChild(p);
    divActividad.appendChild(img);
    divActividad.appendChild(deleteButton);
    divActividad.classList.add("actividad-wrapper");
    divActividad.dataset.id = idActividad;

    deleteButton.innerHTML = 'Eliminar'; 
    deleteButton.addEventListener('click', () => { 
        repositorioDeActividades.deleteActivity(idActividad);
        addActivitiesToHtml(repositorioDeActividades);
    });

    return divActividad;
}


function addActivitiesToHtml(repository) {
    const divResultado = document.getElementsByClassName("resultado")[0];
    divResultado.innerHTML = '';

    const listActivities = repository.getAllActivities();

    const listActivitiesHtml = listActivities.map((activity) => {
        return createHtmlActivity(activity);
    });

    listActivitiesHtml.forEach(activityHtml => {
        divResultado.appendChild(activityHtml);
    });
}








