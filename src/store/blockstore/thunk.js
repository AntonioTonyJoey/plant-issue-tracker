import { aunthApi, peticionEvidencias, peticionRechazos, peticionUpdateFiles, peticionUpdateItem } from "../../api/authApi";
import { BuildMail } from "../checklist";
import { blockstore, procesando } from "../nav/navSlice";
import { rechazosEvidencias } from "./blockstoreSlice";

export const getRechazos = () =>{

    return async(dispatch, getState) => {
        const {data: rechazos} = await aunthApi(peticionRechazos);
        const {data: evidencias} = await aunthApi(peticionEvidencias);
        dispatch(rechazosEvidencias({
            rechazos: rechazos,
            evidencias: evidencias
        }));
    }
};

export const updateItem = (item) => {

    return async(dispatch, getState) => {
        dispatch(procesando({nav:"procesando"}));
        peticionUpdateItem.data = JSON.stringify(item);
        const {data} = await aunthApi(peticionUpdateItem);
        let body = `Favor de revisar las evidencias del folio numero: ${data.folio} con la siguiente descripcion: ${data.descripcion}, puedes encontrarlas en la pestaña de FeedBack`;
        data.archivos.forEach(async element => {
            peticionUpdateFiles.data = JSON.stringify(element);
            const {data: archivos} = await aunthApi(peticionUpdateFiles);
        });
        (!item.aceptado) ? dispatch(BuildMail([item.email], "dw_160_DTNA-SAN-QARecibo@daimlertruck.com", "FeedBack", body)) : '' ;
        dispatch(blockstore({nav:"blockstore"}));
    }
};
