import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react'
import { AttachEmail, GppBadOutlined, GppBadSharp, Mood, Psychology, SentimentNeutral } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getRechazos, updateItem } from '../../store/blockstore/thunk';
import { downloadedFiles } from '../../hooks/downloaded';
import moment from 'moment';
import { ventanaComentario, ventanaFormularioSisterPlant, ventanaMostrarSisterPlant } from '../../hooks';
import { getRechazosSisterPlants, saveInformationSisterPlant, sendInformationByMail, showInformartionDB2 } from '../../store/sisterPlant/thunks';

export const SisterPlant = () => {
  const dispach = useDispatch();
  useEffect(() => {
    dispach(getRechazosSisterPlants());
  }, [])
  const [checkedItems, setCheckedItems] = useState([]);
  const {rechazos, evidencias} = useSelector(state => state.sisterplant);
  
  useEffect(() => {
    setCheckedItems(rechazos);
  }, [rechazos])
  const onHandleUpdate = (id, aceptado) => {
    const item = checkedItems.find(item => item.id === id);
    const itemUpdated = {...item, aceptado:aceptado, ts_Status:moment()}
    dispach(updateItem(itemUpdated));
  }
  const handleChecked = async ({target}, padre, hijo) => {
    const {checked} = target;
    let comentarioItem = "";
    if(checked){
      comentarioItem = await ventanaComentario();
    // Si comentarioItem es una cadena vacía, salir de la función
      if (comentarioItem === "") {
        return;
      }
    }
    let comentario = "";
    setCheckedItems(elemento => {
      const newItem = elemento.map(item => {
        if(item.id === padre){
          const newArchivos = item.archivos.map(archivo => {
            if(archivo.id === hijo){
              (checked) ? comentario = comentarioItem : comentario = "";
              return { ... archivo, aprobado: !checked, comentario: comentario};
            }
            return archivo;
          });
          return {...item, archivos: newArchivos}
        }
        return item;
      });
      return newItem;
    });
  };

    const handleInformation = async (id) => {
        let informationSisterPlant = "";
        informationSisterPlant = await ventanaFormularioSisterPlant();
        // Si comentarioItem es una cadena vacía, salir de la función
        if (informationSisterPlant === null) {
            return;
        }
        dispach(saveInformationSisterPlant(informationSisterPlant, id));
    }

    const handleShowInformation = async (information) => {
        ventanaMostrarSisterPlant(information[0])
    }

    const handleShowInformationDB2 = async (serie) => {
        dispach(showInformartionDB2(serie));
    }

    const handleSendInformationToSisterPlant = async (item) => {
        dispach(sendInformationByMail(item))
    }

    const setBackGroundColor = (item) => {
      console.log(item)
        if(item.ts_Status){
        if(item.archivos.some(file => file.comentario == "Corregido")){
            return 'yellow';
        } else if(item.archivos.some(file => file.comentario != "")){
            return 'red';
        }else{
          return 'green';
        }
        }else{
            return '';
        }
    }

  return (
    <Grid 
      container 
      rowSpacing={1} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      className="blockStoreContainer"
      >
        {
          checkedItems.map(x =>(
            <Accordion className='acordionEvidencias' key={x.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  border: `4px solid ${setBackGroundColor(x)}`, // Borde dinámico
                  backgroundColor: "transparent", // Sin relleno de fondo
                  borderRadius: "4px", // Opcional: bordes redondeados
                }}
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
                <Grid sx={{margin:"auto"}}>
                  {
                    (x.archivos.find(w => w.aprobado === false))
                    ? <Button variant="contained" color="error" onClick={() => (onHandleUpdate(x.id, false))}>Rechazar</Button>
                    : <Button variant="contained" color="success" onClick={() => (onHandleUpdate(x.id, true))}>Validar</Button>
                  }
                </Grid> 
                <Grid sx={{margin:"auto"}}>
                    <Button>
                        {
                            (x.informacionRechazoSisterPlant.length == 0)
                            ? <SentimentNeutral onClick={() => handleInformation(x.id)}/>
                            : <Mood onClick={() => handleShowInformation(x.informacionRechazoSisterPlant)}/>
                        }
                    </Button>
                    <Button>
                        <Psychology onClick={() => handleShowInformationDB2(x.folio)}/>
                    </Button>
                    <Button>
                        <AttachEmail onClick={() => handleSendInformationToSisterPlant(x)}/>
                    </Button>
                </Grid> 
                <Grid container columns={{ xs: 4, md: 12 }} className="blockStoreContainer" sx={{backgroundColor:'white'}}>
                  {
                    x.archivos.map(y =>(
                      <Grid item className="parent" xs={4} sx={{mt:1}} key={y.id}>
                        <h4>{evidencias.find(evidencia => evidencia.id == y.id_Evidencia).descripcion}</h4>

                        {/* Renderizado condicional según la extensión */}
                        {y.ext.trim() === "mp4" || y.ext.trim() === "MOV" || y.ext.trim() === "avi" ? (
                          <video
                            controls
                            style={{ maxWidth: '100%', maxHeight: '150px' }}
                            onClick={() => { downloadedFiles(y.guid, y.nombre); }}
                            width='100%'
                          >
                            <source 
                              src={`TuURL/${y.guid}_${y.nombre}`} 
                              type={"video/mp4"} 
                            />
                          </video>
                        ) : (
                          <img
                            src={`TuURL/${y.guid}_${y.nombre}`}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '150px' }}
                            onClick={() => { downloadedFiles(y.guid, y.nombre); }}
                          />
                        )}
                        <Checkbox 
                          icon={<GppBadOutlined/>}
                          checkedIcon={<GppBadSharp/>}
                          onChange={(e) => {handleChecked(e, x.id, y.id)}}
                          sx={{
                            color: 'red',
                            '&.Mui-checked': {
                              color: 'red',
                            },
                          }}
                          checked={!y.aprobado}
                        />
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

