import moment from "moment";
import { aunthApi, peticionEvidencias, peticionRechazosSisterPlant, peticionSaveInformationPlantaHermana, peticionSendAttMail, peticionSendMail, peticionTSOSisterPlant } from "../../api/authApi";
import { rechazosEvidenciasSisterPlant } from "./sisterPlantSlice";
import { showTSODiscrepancyList } from "../../hooks";


export const getRechazosSisterPlants = () =>{

    return async(dispatch, getState) => {
        const {data: rechazos} = await aunthApi(peticionRechazosSisterPlant);
        const {data: evidencias} = await aunthApi(peticionEvidencias);
        dispatch(rechazosEvidenciasSisterPlant({
            rechazos: rechazos,
            evidencias: evidencias
        }));
    }
};

export const saveInformationSisterPlant = (information, id) => {
    return async(dispatch, getState) => {
        const objetoInformacion = {
            Id: 0,
            PlantaHermana: information.planta,
            Modulo: information.modulo.toUpperCase(),
            Modelo: information.modelo.toUpperCase(),
            Correo: information.correos.join(','),
            Id_Rechazo: id,
            Ts_Load: moment()
        }
        peticionSaveInformationPlantaHermana.data = JSON.stringify(objetoInformacion);
        const {data} = await aunthApi(peticionSaveInformationPlantaHermana);
        const {data: rechazos} = await aunthApi(peticionRechazosSisterPlant);
        const {data: evidencias} = await aunthApi(peticionEvidencias);
        dispatch(rechazosEvidenciasSisterPlant({
            rechazos: rechazos,
            evidencias: evidencias
        }));
    }
}

export const showInformartionDB2 = (serie) => {
    return async(dispatch, getState) => {
        const peticion = peticionTSOSisterPlant(serie);
        const {data} = await aunthApi(peticion);
        showTSODiscrepancyList(data);
    }
}

export const sendInformationByMail= (item) => {
    return async(dispatch, getState) => {
        const {folio, informacionRechazoSisterPlant} = item;
        const peticion = peticionTSOSisterPlant(folio);
        const {data} = await aunthApi(peticion);

        let cuerpo = new Object();
        let file = new Object();
        cuerpo.asunto = "Feedback Sister Plant";
        cuerpo.body = `
        <p><b>Notificación de Incidencia con Partes Surtidas por Planta Hermana</b></p>

        <p>A continuación detallamos la información obtenida del ítem repetitivo:</p>

        <ul>
            <li><b>Número(s) de Serie:</b> ${folio}</li>
            <li><b>Descripción:</b> ${item.descripcion}</li>
            <li><b>No. de Parte:</b> ${item.noParte}</li>
            <li><b>Modelo:</b> ${informacionRechazoSisterPlant[0].modelo}</li>
            <li><b>Módulo:</b> ${informacionRechazoSisterPlant[0].modulo}</li>
        </ul>

        <p><b>Por favor dar seguimiento a esta incidencia, y cualquier comentario hacerlo sobre este correo.</b></p>

        <p>El siguiente es un listado de las discrepancias reportadas en esta incidencia:</p>
        <ul>
        `;

        data.forEach((elemento, index) => {
        cuerpo.body += `
            <li><b>${index + 1}.</b> Serie: ${elemento.veH_SER_NO.trim()} - Descripción: ${elemento.insP_COMT.trim()} 
            (<i>${elemento.insP_DSCREP_DESC.trim()}</i>)</li>
        `;
        });

        cuerpo.body += `</ul>`;
        console.log(item.archivos)
        cuerpo.to = informacionRechazoSisterPlant[0].correo.split(",");
        cuerpo.cc = ["axel.rojas@daimlertruck.com"];
        cuerpo.from = "";
        cuerpo.adjuntos = item.archivos.map((element) => ({
            Nombre: `${element.guid}_${element.nombre}`,
            Url: `https://stnaasanw058.us164.corpintra.net:444/uploads/${element.guid}_${element.nombre}`
        }));
        
        peticionSendAttMail.data = JSON.stringify(cuerpo);
        await aunthApi(peticionSendAttMail);
    }
}