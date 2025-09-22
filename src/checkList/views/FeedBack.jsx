import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRechasosEvidenciasFeedback, replaceFile } from '../../store/feedback/thunks';
import { AddAPhotoRounded, MessageSharp } from '@mui/icons-material';
import { downloadedFiles, mensajeDeError } from '../../hooks';

export const FeedBack = () => {
  const dispach = useDispatch();
  useEffect(() => {
    dispach(getRechasosEvidenciasFeedback());
  }, [])
  const [checkedItems, setCheckedItems] = useState([]);
  const {rechazos, evidencias} = useSelector(state => state.feedback);
  useEffect(() => {
    setCheckedItems(rechazos);
  }, [rechazos])
  
  const handleFileUpdate = (datos, {target}) => {
    let objetoCorregido;
    setCheckedItems(elemento =>{
      const rechazo = elemento.map(item => {
        if(item.id === datos.id_Rechazo){
          const newFile = item.archivos.map(file => {
            if(file.id === datos.id){
              const udpateFile = {...file, comentario:"Corregido"}
              objetoCorregido = udpateFile;
              return udpateFile;
            }
            return file;
          });
          return{...item, archivos: newFile}
        }
        return item
      });
      return rechazo;
    });
    
    dispach(replaceFile(objetoCorregido, target))
  }

  return (
    <Grid
      container
      rowSpacing={1} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      className='feedBackContainer'
    >
      <Typography>UPS!!!!! Al parecer tienes evidencias por depurar</Typography>
      {
        checkedItems.filter(x => x.archivos.length !== 0).map(x => (
          <Accordion className='acordionEvidencias' key={x.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Grid item xs={6} md={12} className='blockStoreItem'>
                  <Grid>
                    <h5>Folio: {x.folio}</h5>
                  </Grid>
                  <Grid>
                    <h5>No. de Parte: {x.noParte}</h5>
                  </Grid>
                  <Grid>
                    <h5>Descripcion: {x.descripcion}</h5>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container columns={{ xs: 4, md: 12 }} className="blockStoreContainer" sx={{backgroundColor:'white'}}>
                  {
                    x.archivos.filter(y => y.comentario.trim() != "Corregido" || y.comentario.trim() != "").map(y =>(
                      <Grid item className="parent" xs={4} sx={{mt:1}} key={y.id}>
                        <h4>{evidencias.find(evidencia => evidencia.id == y.id_Evidencia).descripcion}</h4>
                        <Button
                          onClick={ () => mensajeDeError(y.comentario, "Feedback de la evidencia")}
                        >
                          <MessageSharp />
                        </Button>
                        <img 
                          src={`TuURL/${y.guid}_${y.nombre}`} //http://localhost:5073/
                          alt="Preview" 
                          style={{ maxWidth: '100%', maxHeight: '150px' }} 
                          onClick={() => {downloadedFiles(y.guid, y.nombre)}}
                        />
                        <Grid className="file-upload">
                          <AddAPhotoRounded sx={{fontSize: 40, color: 'red'}}/> 
                          <input
                          type="file"
                          onChange={(e) => {handleFileUpdate(y, e)}}
                          />
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
              </AccordionDetails>
            </Accordion>
        ))
      }
    </Grid>
  )
}
