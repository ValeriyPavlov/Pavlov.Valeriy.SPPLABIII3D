import {actualizarTabla, ordenarTabla} from "./tabla.js";
import {Superheroe} from "./Superheroe.js";
import {validarDatos, limpiarValidaciones} from "./validaciones.js";
import {
    getArmasAjax,
    getAnunciosAjax,
    getAnunciosAxios,
    getAnunciosFetch,
    createAnuncioAjax,
    createAnuncioAxios,
    createAnuncioFetch,
    updateAnuncioAjax,
    updateAnuncioAxios,
    updateAnuncioFetch,
    deleteAnuncioAjax,
    deleteAnuncioAxios,
    deleteAnuncioFetch,
    getAnuncioPorIdAjax
} from "./db.js";

// SPINNER en ActualizarTabla con un delay muy bajito, y spinner en la conexion con el json-server.

let id = null; // ID Global para modificar o eliminar items.
let index = null; // Index Global para modificar o eliminar items.
const $form = document.forms[0];
const $containerTabla = document.getElementById("tabla");
const $containerBotones = document.getElementById("botones-container");
const $select = document.getElementById("filtro");
const listaArmas = await getArmasAjax(); // Importo Armas desde la BD
const lista = await getAnunciosAjax(); // Importo Anuncios desde la BD
let banderaFiltros = false;
let listaFiltrada = filtrarTabla($containerTabla, lista, $select.value);
let listadoCheck = listaFiltrada;
document.getElementById("btnGuardar").disabled = false;
const checkbox = document.querySelectorAll(".chbox");
checkbox.forEach(element => {element.checked = true;}); // Cada vez que se recarga la pagina vuelvo a inicializar los checkboxes

// Limpiar form en caso de F5
window.addEventListener("load", ()=>{$form.reset();});

$containerBotones.addEventListener("click", async (e) => 
{
    const boton = e.target.textContent;
    if(boton == "Guardar")
    {
        // Desestructuracion del objeto form
        const {txtId, txtNombre, txtAlias, rdoEditorial, txtFuerza, opcArma} = $form;
        if(txtId.value === "")
        {
            //Validacion
            if(validarDatos($form))
            {
                // ALTA
                const newItem = new Superheroe(
                    Date.now(), 
                    txtNombre.value,
                    parseInt(txtFuerza.value),
                    txtAlias.value, 
                    rdoEditorial.value, 
                    opcArma.value
                    );
                limpiarForm();
                createAnuncioAjax(newItem);   //Ajax 
                //createAnuncioAxios(newItem); //Axios
                //createAnuncioFetch(newItem); //Fetch
            }
        }
        else
        {
            //Validacion
            if(validarDatos($form) && confirm("¿Desea guardar los cambios?"))
            {
                // MODIFICACION
                const newItem = new Superheroe(
                    parseInt(txtId.value), 
                    txtNombre.value,
                    parseInt(txtFuerza.value),
                    txtAlias.value, 
                    rdoEditorial.value, 
                    opcArma.value
                    );
                limpiarForm();
                updateAnuncioAjax(newItem); //Ajax
                //updateAnuncioAxios(newItem); //Axios
                //updateAnuncioFetch(newItem); //Fetch
            }
        }
    }
    else if(boton == "Eliminar")
    {   
        // BAJA
        if(index && confirm("¿Desea ELIMINAR el item seleccionado?"))
        {
            deleteAnuncioAjax(id); //Ajax
            //deleteAnuncioAxios(id); //Axios
            //deleteAnuncioFetch(id); //Fetch
            limpiarForm();
        }
    }
    else if(boton == "Cancelar")
    {
        limpiarForm();
        limpiarValidaciones();
    }
});

$containerTabla.addEventListener("click", (e)=>
{
    if(e.target.matches("td")) // Solamente cuando haces click sobre TD y no en cualquier lado de la ventana.
    {
        let selectedItem;
        index = e.target.parentElement.getAttribute("data-id");
        id = listaFiltrada[index].id;
        selectedItem = listaFiltrada.find((item)=>item.id == id);
        cargarFormItem($form, selectedItem);
        document.getElementById("btnCancelar").disabled = false;
        document.getElementById("btnEliminar").disabled = false;
        limpiarValidaciones();
    }
    else if(e.target.matches("th"))
    {   //TODO (EL SORT NO ESTA TERMINADO TOTALMENTE, FUNCIONA PARCIALMENTE, FALTAN ALGUNOS DETALLES)
        let claveSort = e.target.textContent;
        ordenarTabla(listadoCheck, claveSort);
        limpiarForm();
        actualizarTabla($containerTabla, listadoCheck);
    }
});

function cargarFormItem(formulario, item)
{  
    formulario.txtId.value = item.id;
    formulario.txtNombre.value = item.nombre;
    formulario.txtFuerza.value = item.fuerza;
    formulario.txtAlias.value = item.alias;
    formulario.rdoEditorial.value = item.editorial;
    formulario.opcArma.value = item.arma;
}

function limpiarForm()
{
    id = null;
    index = null;
    document.getElementById("txtId").value = "";
    document.getElementById("btnCancelar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
    $form.reset();
}

cargarArmas(listaArmas);
function cargarArmas(lista)
{
    let input = document.getElementById("txtArma");
    for (let i = 0; i < 6; i++)
    {
        const arma = document.createElement('option');
        input.appendChild(arma);
        arma.value = lista[i];
        arma.textContent = lista[i];
    }
}

// ORDEN DE DATOS: FILTRADO -> CHECKBOXES -> ORDENAMIENTO POR COLUMNA.

// FILTRADO
function filtrarTabla(contenedor, lista, filtro)
{
    if(filtro != "Todos")
    {
        let listaFiltrada = lista.filter((elemento)=>elemento.editorial == filtro); // FILTRO
        actualizarTabla(contenedor, listaFiltrada);
        banderaFiltros = true;
        return listaFiltrada;
    }
    else
    {
        actualizarTabla(contenedor, lista);
        banderaFiltros = false;
        return lista;
    }
}

$select.addEventListener("change", () => 
{
    listaFiltrada = filtrarTabla($containerTabla, lista, $select.value);
    checkbox.forEach(element => {element.checked = true;});
    limpiarForm();
});

// CHECKBOXES
const modificarTabla = () =>
{
    const checked = {};
    checkbox.forEach((elem) => {checked[elem.name] = elem.checked});
    listadoCheck = listaFiltrada.map((elem) => // MAPEO
    {
        const newElement = {};
        for (const key in elem)
        {
            if(key == "id" || checked[key] == true)
            {
                newElement[key] = elem[key];
            }
        }
        return newElement;
    });
    actualizarTabla($containerTabla, listadoCheck);
};

checkbox.forEach((elem) => elem.addEventListener("click", modificarTabla));

// Reduce en tabla->promedio