import {girarSpinner, detenerSpinner} from './tabla.js';
const miURL = "http://localhost:3000/superheroes";
const armasURL = "http://localhost:3000/armas";

export const getArmasAjax = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            detenerSpinner();
        }
    });
    xhr.open("GET", armasURL);
    xhr.send();
    });
};

export const getCardsFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
    });
};




// AJAX ===================================================================     
// GET
export const getAnunciosAjax = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            detenerSpinner();
        }
    });
    xhr.open("GET", miURL);
    xhr.send();
    });
};

// GET por ID
export const getAnuncioPorIdAjax = (id) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("GET", miURL + "/" + id);
    xhr.send();
};

// POST
export const createAnuncioAjax = (anuncio) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("POST", miURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(anuncio));
};

// DELETE
export const deleteAnuncioAjax = (id) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log("Borrado");
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("DELETE", miURL + "/" + id);
    xhr.send();
};

// PUT
export const updateAnuncioAjax = (anuncio) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("PUT", miURL + "/" + anuncio.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(anuncio));
};

// AXIOS ===========================================================================================================================================
//<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>

// GET
export const getAnunciosAxios = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) =>{
        axios.get(miURL)            // El Axios trabaja con Ajax, retorna una Promesa
        .then((res)=> // ({data})
        {
            const {data} = res;
            resolve(data);
        })
        .catch((err)=>
        {
            reject(err.message);
        })
        .finally(()=>{
            detenerSpinner();
        });
    });
};

// POST
export const createAnuncioAxios = async (anuncio) => 
{
    girarSpinner();
    try 
    {
        let {datos} = await axios.post(miURL, anuncio, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        detenerSpinner();
    }
};

// DELETE
export const deleteAnuncioAxios = async (id) => 
{
    girarSpinner();
    try
    {
        let {data} = await axios.delete(miURL + "/" + id);
        console.log(data);
    }
    catch(err)
    {
        console.error(err.message);
    }
    finally
    {
        detenerSpinner();
    }
};

// PUT
export const updateAnuncioAxios = async (anuncio) => 
{
    girarSpinner();
    try 
    {
        let {datos} = await axios.put(miURL + "/" + anuncio.id, anuncio, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        detenerSpinner();
    }
};

// FETCH =====================================================================================================================================
// GET

export const getAnunciosFetch = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
        .finally(()=>{
            detenerSpinner();
        })
    });
};

// GET ASYNC
// export const getAnunciosFetch = async () => 
// {
//     try 
//     {
//         girarSpinner();
//         let respuesta = await fetch(miURL);
//         if(!respuesta.ok) throw Error(`Error: ${respuesta.status} - ${respuesta.statusText}`);

//         let data = await respuesta.json();
//         return data;
//     } 
//     catch(error) 
//     {
//         console.error(error.message);
//     }
//     finally
//     {
//         detenerSpinner();
//     }
// };

// POST
export const createAnuncioFetch = (anuncio) => 
{
    girarSpinner();
    fetch(miURL, {    // Objeto como segundo parametro.
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(anuncio)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        detenerSpinner();
    })
};

// DELETE
export const deleteAnuncioFetch = (id) => 
{
    girarSpinner();
    fetch(miURL + "/" + id, {
        method: "DELETE"
    })
    .then((respuesta)=>{
        if(!respuesta.ok) return Promise.reject(respuesta);
        console.log("Borrado con exito");
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        detenerSpinner();
    })
};

// PUT
export const updateAnuncioFetch = (anuncio) => 
{
    girarSpinner();
    fetch(miURL + "/" + anuncio.id, {    // Objeto como segundo parametro.
        method: "PUT",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(anuncio)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        detenerSpinner();
    })
};