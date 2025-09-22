import { aunthApi, peticionEvidencias, peticionGetFeedBack, peticionReplaceFile, peticionUpdateFiles } from "../../api/authApi";
import { emailsBlockStore, mensajeDeError } from "../../hooks";
import { BuildMail } from "../checklist";
import { feedback, procesando } from "../nav/navSlice";
import { rechazosFeedback } from "./feedbackSlice";


export const getRechasosEvidenciasFeedback = () =>{

    return async(dispatch, getState) => {
        const wiw = window.sessionStorage.getItem("wiw");
        const {data: evidencias} = await aunthApi(peticionEvidencias);
        peticionGetFeedBack.data = wiw;
        const {data: rechazos} = await aunthApi(peticionGetFeedBack);
        
        dispatch(rechazosFeedback({
            rechazos: rechazos,
            evidencias: evidencias
        }));
    }
};

export const replaceFile = (datos, {files}) => {

    return async(dispatch, getState) => {
        dispatch(procesando({nav:"procesando"}));
        //Replace File
        const nombreFileNuevo = `${datos.guid}_${datos.nombre}`;
        let formDataImg = new FormData();
        formDataImg.append("file", files[0]);
        formDataImg.append("fileName", nombreFileNuevo);
        peticionReplaceFile.data = formDataImg;
        const {data: replace} = await aunthApi(peticionReplaceFile);

        if(replace == "Exito"){
            //Update in DB File
            peticionUpdateFiles.data = JSON.stringify(datos);
            const {data} = await aunthApi(peticionUpdateFiles);

            mensajeDeError("Archivo actualizado correctamente");

            let body = "Se ha corregido una evidencia favor de revisarla en el apartado de BlockStore";
            
            dispatch(BuildMail(emailsBlockStore, "jose_antonio.leon@daimlertruck.com", "Actualizacion de Evidencias", body));
        }else{
            mensajeDeError("Error al actualizar archivo, favor de reportar con su supervisor");
        }
        dispatch(feedback({nav:"feedback"}));
    }
};
