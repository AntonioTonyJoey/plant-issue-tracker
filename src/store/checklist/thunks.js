import moment from "moment";
import { aunthApi, peticionEvidencias, peticionGetFolioVirtual, peticionSaveArchivo, peticionSaveRechazo, peticionSendMail, peticionUploadFile } from "../../api/authApi";
import { emailsBlockStore, mensajeDeError, objetoArchivo, objetoRechazo } from "../../hooks";
import { evidencias, folioVirtual } from "./";
import { checklist, procesando } from "../nav/navSlice";

export const getEvidencias = () =>{

    return async(dispatch, getState) => {
        const {data} = await aunthApi(peticionEvidencias);
        dispatch(evidencias(data));
    }
};
export const getFolioVirtual = () =>{

    return async(dispatch, getState) => {
        const {data} = await aunthApi(peticionGetFolioVirtual);
        dispatch(folioVirtual(data));
    }
};
export const saveInformacion = (archivos, evidencias, email, check, checkSP) => {
    return async(dispatch, getState) => {
        dispatch(procesando({nav:"procesando"}));
        //Save Item Rechazo
        const item = objetoRechazo;
        item.Folio = archivos.folio.toUpperCase().trim();
        item.NoParte = archivos.numeroP;
        item.Descripcion = archivos.desc;
        item.Ts_Load = moment();
        item.Wiw = window.sessionStorage.getItem("wiw");
        item.Email = email;
        item.Retrabajo = check;
        item.PlantaHermana = checkSP;
        peticionSaveRechazo.data = JSON.stringify(item);
        const {data} = await aunthApi(peticionSaveRechazo);
        if(data.id != 0){
            //Save Archivos en DB y Server
            evidencias.map( async x => {
                if([x.nombre] != ''){
                    //Save in Server
                    let formDataImg = new FormData();
                    formDataImg.append("file", archivos[x.nombre]);
                    peticionUploadFile.data = formDataImg;
                    try{
                        const response = await aunthApi(peticionUploadFile);
                        //DB
                        const {name, type} = archivos[x.nombre];
                        const item = objetoArchivo;
                        item.Id = 0,
                        item.Nombre = name,
                        item.Ext = name.split(".").pop(),
                        item.Id_Rechazo = data.id,
                        item.Id_Evidencia = x.id,
                        item.Aprobado = true,
                        item.Comentario = '',
                        item.Guid = response.data.split("_")[0],
                        item.Wiw = window.sessionStorage.getItem("wiw"),
                        item.Ts_Load = moment(),
                        peticionSaveArchivo.data = JSON.stringify(item);
                        const dataFile = await aunthApi(peticionSaveArchivo);
                        mensajeDeError('Archivo subido con éxito:', response.data);
                    }catch(error){
                        mensajeDeError('Error al subir archivo:', error);
                    }
                }
            });
            let body = `Favor de dar seguimiento al siguiente item con numero ${item.Folio}, noParte ${item.NoParte} y  la siguiente descripcion: ${item.Descripcion}`;
            dispatch(checklist({nav:"checklist"}));
            dispatch(BuildMail(emailsBlockStore, "jose_antonio.leon@daimlertruck.com", "Posible Rechazo", body));
        }else{
            dispatch(checklist({nav:"checklist"}));
            mensajeDeError('Favor de notificar a su ingeniero de vendor e intente la carga nuevamente, gracias', 'Error al crear el posible rechazo');
        }
        
    }
}

export const BuildMail = (to, cc, asunto, body) => {
    return async(dispatch, getState) => {
        let cuerpo = new Object();
        cuerpo.to = to;
        cuerpo.cc = [cc];
        cuerpo.from = "";
        cuerpo.asunto = asunto;
        cuerpo.body = body;
        peticionSendMail.data = JSON.stringify(cuerpo);
        const {data} = await aunthApi(peticionSendMail);
    }
}
