import axios from 'axios';

export const aunthApi = axios.create();

const prod = true;
const URL = (prod) ? "TuAPI" : "http://localhost:5073/api/";
const DB2Vendor = (prod) ? "TuAPI" : "http://localhost:5284/api/";
const WIW = window.sessionStorage.getItem("wiw");
/*Rutas para peticion axios*/
export const peticionAuth = {
    url: URL + "Login",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'multipart/form-data'
    },
};
export const peticionEvidencias = {
    url: URL + "Evidencia/obtener",
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
};
export const peticionFiles = {
    url: URL + "Rechazo/obtener",
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
};
export const peticionWithoutQRN = {
    url: URL + "EspecificoQuery/getRechazosWithoutQRN",
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
};
export const peticionSaveRechazo = {
    url: URL + "Rechazo/agregar",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionSaveArchivo = {
    url: URL + "Archivo/agregar",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionSaveLogin = {
    url: URL + "Logueo/agregar",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
};
export const peticionGetLogin ={
    url: URL + "Logueo/obtenerFiltro?Wiw=" + WIW,
    method: "get",
    data: "",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionUpdateLogin ={
    url: URL + "Logueo/actualizar",
    method: "post",
    data: "",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
} 
export const peticionGetFiles ={
    url: "",
    method: "get",
    data: "",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
/*Peticiones de Servidor Archivos*/
export const peticionUploadFile = {
    url: URL + "FileUpload",
    method: "post",
    data: "",
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}
export const peticionReplaceFile = {
    url: URL + "FileUpload/ReplaceFile",
    method: "post",
    data: "",
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}
/*Urls para segmento de Blockstore*/
export const peticionRechazos = {
    url: URL + "EspecificoQuery/rechazos",
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
};
export const peticionUpdateItem = {
    url: URL + "Rechazo/actualizar",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionUpdateFiles = {
    url: URL + "Archivo/actualizar",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionSendMail = {
    url: URL + "Email",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionSendAttMail = {
    url: URL + "Email/enviarCorreoURLs",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionGetFeedBack ={
    url: URL + "EspecificoQuery/getFeedBack?Wiw=" + WIW,
    method: "get",
    data: "",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionDownloadFile = {
    url: URL + "Download/downloadFile",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'blob'
}
export const peticionSaveVisit = {
    url: "TuURLParaGuardarVisistas",
    method: "get",
    headers: {
        'Content-Type': 'application/json',
    }
}
/*Obtener el folio virtual*/
export const peticionGetFolioVirtual = {
    url: URL + "EspecificoQuery/getFolioVirtual",
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
};
/* Planta Hermana */
export const peticionRechazosSisterPlant = {
    url: URL + "EspecificoQuery/rechazosSisterPlant",
    method: "get",
    headers: {
        'Content-Type': 'application/json'
    },
};
export const peticionSaveInformationPlantaHermana = {
    url: URL + "InformacionRechazoSisterPlant/agregar",
    method: "post",
    data: {},
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
}
export const peticionTSOSisterPlant = (serie) => ({
    url: DB2Vendor + "GetTSODiscrepancy?serie=" + serie,
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
})
export const peticionRejectionData = (folio) => ({
    url: DB2Vendor + "GetRechazoByFolio?folio=" + folio,
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
})
export const peticionEnviarCorreoVendorAPP = (body) => ({
    url: URL + "Email/enviarCorreoVendorAPP",
    method: "post",
    data: body,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
});