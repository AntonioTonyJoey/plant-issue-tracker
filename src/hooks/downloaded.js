import { aunthApi, peticionDownloadFile } from "../api/authApi";

export const downloadedFiles = async (guid, nombreFile) => {
    let nombre =  `${guid}_${nombreFile}`;   
    peticionDownloadFile.data = nombre;
    const {data:info} = await aunthApi(peticionDownloadFile); 
    const url = window.URL.createObjectURL(new Blob([info]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nombre);
    document.body.appendChild(link);
    link.click();
    link.remove();
}