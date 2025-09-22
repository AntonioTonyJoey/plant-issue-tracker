import { aunthApi, peticionDownloadFile, peticionEnviarCorreoVendorAPP, peticionFiles, peticionGetFiles, peticionRejectionData, peticionUpdateItem, peticionWithoutQRN } from "../../api/authApi";
import { mensajeDeError } from "../../hooks";
import { procesando, pruebas } from "../nav/navSlice";
import { withoutQRN } from "./pruebasSlice";

export const getFiles = (folio) =>{

    return async(dispatch, getState) => {
        const {data} = await aunthApi(peticionFiles);
        const rechazo = data.find(x => x.folio == folio.toUpperCase().trim());
        if (rechazo === undefined) {
            mensajeDeError("Verifica el numero de folio", "No se encuentran coincidencias");
        }else{
            const {id} = rechazo;
            peticionGetFiles.url = "https://stnaasanw058.us164.corpintra.net:444/api/Archivo/obtenerPorLlaveForanea?Id="+id;
            const {data} = await aunthApi(peticionGetFiles);
            
            data.map(async x => {
                let nombre = x.guid.trim() + '_' + x.nombre.trim();
                
                peticionDownloadFile.data = nombre;
                const {data:info} = await aunthApi(peticionDownloadFile); 
                const url = window.URL.createObjectURL(new Blob([info]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', nombre);
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
            mensajeDeError("Los archivos fueron descargados");
        }
        
    }
};
export const getFolioWithoutRechazo = () =>{

    return async(dispatch, getState) => {
        const {data} = await aunthApi(peticionWithoutQRN);
        
        dispatch(withoutQRN({
            withoutQRN: data
        }));
    }
};
export const getRejectionData = (item) =>{

    return async(dispatch, getState) => {
        const {data} = await aunthApi(peticionRejectionData(item.folio));
        let newItem = { ...item };
        dispatch(procesando({nav:"procesando"}));
        if (data.qA_ITEM_INSP_NO === null) {
            mensajeDeError("No hay coinsidencia de folio en la lista de rechazos", "Sin Informacion")
            newItem.noRechazo = "NoInfo";
        } else if (data.emaiL_ID.length === 0) {
            mensajeDeError("No se encuentran correos asocioados", "Sister Plant");
            newItem.noRechazo = "Sister";
        } else {
            newItem.noRechazo = data.qA_ITEM_INSP_NO;
            const urls = [];
            const fileUrls = item.archivos.map(f => 
            `https://stnaasanw058.us164.corpintra.net:444/uploads/${f.guid}_${f.nombre}`
            );

            const correoBody = {
                Cuerpo: "As already communicated through the automated supplier reject notification, a rejection has been generated for supplier " + data.resP_PARTY_ID + " part number " + data.iteM_NO + " and " + data.reJ_QTY + " units, with the following description " + data.insP_REJ_DESC + ". Attachments have the appropriate pictures of the non-conforming part. As mentioned in step 3 of the rejection notification, Respond with a Return Goods Authorization(RGA) number to the plant quality contact within 2 business days. If a response is not received, a decision will be made to scrap/rework the parts & your account will be debited with the cost of the parts along with the processing fee if scrapped, or with the labor charges from DTNA, in case of a rework of the parts at the facility to avoid production disruption. ¡¡¡This e-mail address cannot receive replys; for any additional information please contact dw_160-San-recibo_Calidad@DAIMLERTRUCK.COM!!!",
                Rechazo: data.qA_ITEM_INSP_NO,
                From: "CalidadRecibo@daimler.com",
                To: data.emaiL_ID,
                Cc: ["pablo.anaya@daimlertruck.com",
                      "ulises.camacho@daimlertruck.com",
                      "miguel.esteves@daimlertruck.com",
                      "eli.gonzalez@daimlertruck.com",
                      "karla_patricia.hernandez@daimlertruck.com",
                      "jose_antonio.leon@daimlertruck.com",
                      "josue_faraon.lima@daimlertruck.com",
                      "ulises.medina@daimlertruck.com",
                      "brandon.martinez@daimlertruck.com",
                      "rigoberto.martinez@daimlertruck.com",
                      "gerardo.ramiro@daimlertruck.com",
                      "axel.rojas@daimlertruck.com",
                      "adan.rosas@daimlertruck.com"],
                FileUrls: fileUrls,
            };
            
            const response = await aunthApi(peticionEnviarCorreoVendorAPP(correoBody));
            mensajeDeError("Envio de correo exitoso", "Rechazo numero " + data.qA_ITEM_INSP_NO);
            //console.log("Respuesta del servidor:", response.data);
        }
        
        peticionUpdateItem.data = JSON.stringify(newItem);
        const {data: updatedItem} = await aunthApi(peticionUpdateItem);
        dispatch(getFolioWithoutRechazo());
        dispatch(pruebas({nav:"pruebas"}));
        
    }
};
async function downloadFiles(urls) {
    const fileCollection = [];
  
    for (const fileUrl of urls) {
      const response = await fetch(fileUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al descargar ${fileUrl}`);
      }
  
      const blob = await response.blob();
      const fileName = fileUrl.split("/").pop();
  
      const ext = fileName.split(".").pop().toLowerCase();
      const contentType =
        ext === "jpg" || ext === "jpeg"
          ? "image/jpeg"
          : ext === "png"
          ? "image/png"
          : ext === "mov"
          ? "video/quicktime"
          : "application/octet-stream";
  
      
      fileCollection.push({
        fileName,
        contentType,
        content: blob,
      });
    }
  
    return fileCollection;
}
async function blobToByteArray(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer); 
  }
  