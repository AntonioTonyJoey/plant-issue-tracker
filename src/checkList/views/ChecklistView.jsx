import { AddAPhotoRounded, VideocamRounded } from "@mui/icons-material"
import { Grid, TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { incrementFolio, mensajeDeError, objetoFormularioChecklist, useForm, validacionesChecklist } from "../../hooks"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEvidencias, getFolioVirtual, saveInformacion } from "../../store/checklist"

const validaciones = validacionesChecklist;

export const ChecklistView = () => {
  //Obtener el listado de Evidencias
  const dispach = useDispatch();
  useEffect(() => {
    dispach(getEvidencias());
    dispach(getFolioVirtual());
  }, []); 
  const {evidencias, folioVirtual} = useSelector(state => state.checklist);
  const {email} = useSelector(state => state.auth);
  //Validaciones de useForm
  const [formSubmitted, setformSubmitted] = useState(false);
  const {folio, numeroP, desc, onInputChange, OnInputChangeFile, onResetForm, folioValid, numeroPValid, descValid, isFormValid, formState, validacion} = useForm(objetoFormularioChecklist, validaciones);

  //Validaciones de check, y creacion de Folio Virtual
  const [isChecked, setIsChecked] = useState(false); 
  const [isCheckedSP, setIsCheckedSP] = useState(false); 
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = ({target}) => {
    const checked = target.checked;
    setIsChecked(target.checked);
    if(checked) setIsCheckedSP(!checked);
    const nextFolio = incrementFolio(folioVirtual, isChecked);
    setIsDisabled(!isDisabled)
    onInputChange(nextFolio)
  };
  const handleChangeSP = ({target}) => {
    const checked = target.checked;
    setIsCheckedSP(target.checked);
    if(checked){
      setIsChecked(!checked);
      const nextFolio = incrementFolio(folioVirtual, true);
      setIsDisabled(false)
      onInputChange(nextFolio)
      mensajeDeError("El folio es el numero de serie", "Mensaje Informativo");
    } 
  };

  //Validar todos los archivos
  const onHandleEnviar = () => {
    setformSubmitted(true);
    if(!isFormValid){//Regresar a !isFormValid
      const mensajeError = Object.values(validacion).map(x => {
        return (x!='') ? x : ''
      }).join('  -  ');
      mensajeDeError(mensajeError, "Formulario invalido, favor de cargar la siguiente informacion:");
      return;
    }
    dispach(saveInformacion(formState, evidencias, email, isChecked, isCheckedSP));
  }
  
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    OnInputChangeFile(event);
  };
  return (
      <Grid container columns={{ xs: 4, md: 12 }} className="app">
        <Grid item xs={12}>
          <TextField 
            type="text" 
            label="Folio"  
            placeholder="Folio" 
            sx={{m:1}}
            name="folio"
            value={folio}
            onChange={onInputChange}
            error={!!folioValid && formSubmitted}
            helperText={folioValid}
            disabled={isDisabled}
            />
          <TextField 
            type="text" 
            label="NumeroP"  
            placeholder="Numero de Parte" 
            sx={{m:1}}
            name="numeroP"
            value={numeroP}
            onChange={onInputChange}
            error={!!numeroPValid && formSubmitted}
            helperText={numeroPValid}
          />
          <TextField 
            type="text" 
            label="Descripcion del Problema"  
            placeholder="Descripcion del problema" 
            sx={{m:1}}
            name="desc"
            value={desc}
            onChange={onInputChange}
            error={!!descValid && formSubmitted}
            helperText={descValid}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleChange}
              />
            }
            sx={{m:1}}
            label="Retrabajo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedSP}
                onChange={handleChangeSP}
              />
            }
            sx={{m:1}}
            label="Planta Hermana"
          />
          <Grid item>
      {file && file.type.startsWith('image/') && (
        <div>
          <h2>Ultima imagen cargada:</h2>
          <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>
      )}
            <Button variant="contained" onClick={onHandleEnviar}>
              Enviar
            </Button>
          </Grid>
        </Grid>
        {
          evidencias.map( x => (
            <Grid item className="parent" xs={4} sx={{mt:1}} key={x.id}>
              <Grid className="file-upload">
                {
                  (x.tipo.trim() == "image") 
                  ? <AddAPhotoRounded sx={{fontSize: 50, color: formState[x.nombre] == '' ? 'red' : 'green'}}/> 
                  : <VideocamRounded sx={{fontSize: 50, color: formState[x.nombre] == '' ? 'red' : 'green'}}/>
                }
                <h4>{x.descripcion}</h4>
                {x.mandatorio ? <p>Evidencia Mandatoria</p> : null}
                <input
                  type="file" 
                  onChange={handleFileChange}
                  name={x.nombre}
                  accept={x.tipo.trim() == "image" ? "image/*" : ""}
                />
              </Grid>
            </Grid>
          ))
        }
      </Grid>
  )
}
