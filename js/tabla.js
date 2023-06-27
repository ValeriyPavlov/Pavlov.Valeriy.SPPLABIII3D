export const crearTabla = (data)=>
{
    if(!Array.isArray(data)) return null; // Validacion
    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));
    return tabla;
};

const crearCabecera = (elemento)=>
{
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.setAttribute("class", "cabecera"); // Clase cabecera para CSS.
    for (const key in elemento) 
    {
        if(key === "id") continue; // Oculto el id.
        const th = document.createElement('th');
        th.setAttribute("class", "ths");
        th.textContent = key;
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    return thead;
};

const crearCuerpo = (data)=>
{
    if(!Array.isArray(data)) return null; // Validacion
    const tBody = document.createElement('tbody');
    data.forEach((elemento, index)=>
    {
        const tr = document.createElement('tr');
        if(index % 2 == 0)
        {
            tr.classList.add("rowPar"); // rowPar para alternar colores.
        }
        else
        {
            tr.classList.add("rowImpar"); // rowImpar para alternar colores.
        }
        for (const key in elemento) 
        {
            const td = document.createElement('td');
            if(key === "id") // Oculto id pero lo mantengo como atributo.
            {
                tr.dataset.id = index;
                // tr.setAttribute("data-id", elemento[key]); //Otra opcion
            }
            else
            {
                td.textContent = elemento[key];
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    })
    return tBody;
};

const DELAY = 100; // Tiempo en milisegundos para mostrar el spinner

export const actualizarTabla = (contenedor, data)=>
{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }
    girarSpinner();
    setTimeout(() => {detenerSpinner();}, DELAY);
    promedio.value = calcularPromedio(data);
    contenedor.appendChild(crearTabla(data));
};

let orden = true; // Variable Global para ordenamiento de la tabla.

export function ordenarTabla(lista, clave)
{
    if(orden)
    {
        orden = false;
        lista.sort((a,b)=>{
            return a[clave] > b[clave]
        });
    }
    else
    {
        orden = true;
        lista.sort((a,b)=>{
            return a[clave] < b[clave]
        });
    }
}

// ==================== Spinner ====================
export function girarSpinner() 
{
    const divSpinner = document.getElementById("spinner");
    const imagen = document.createElement("img");
    const tabla = document.getElementById("tabla");
    imagen.setAttribute("src", "./img/Infinity-1s-200px.gif");
    imagen.setAttribute("alt", "Spinner girando");
    imagen.setAttribute("id", "spinner-girando");
    document.getElementById("btnGuardar").disabled = true;
    document.getElementById("btnCancelar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
    tabla.hidden = true;
    divSpinner.appendChild(imagen);
}

export function detenerSpinner() 
{
    const imagen = document.getElementById("spinner-girando");
    const tabla = document.getElementById("tabla");
    imagen.remove();
    tabla.hidden = false;
    document.getElementById("btnGuardar").disabled = false;
}

function calcularPromedio(lista)
{
    let acumulador = lista.reduce((anterior, actual) => // REDUCE
    {
        let acumulador = anterior + parseInt(actual.fuerza);
        return acumulador;
    }, 0);
    if(acumulador >= 1)
    {
        return Math.round(acumulador / lista.length);
    }
    else
    {
        return "N/A"; // NO DISPONIBLE
    }
};