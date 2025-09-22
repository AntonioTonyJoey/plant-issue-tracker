import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolioWithoutRechazo, getRejectionData } from "../../store/pruebas/thunks";
import { Button, Grid } from "@mui/material";
import { AttachEmail } from "@mui/icons-material";

export const Pruebas = () => {
  const dispach = useDispatch();
  useEffect(() => {
    dispach(getFolioWithoutRechazo());
  }, [])

  const {withoutQRN} = useSelector(state => state.pruebas);

  const handleManageFolio = (item) => {
    dispach(getRejectionData(item));
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
        {
            withoutQRN.map(x => (
                <Grid key={x.folio} item xs={6} md={12} className='withoutQRNItem'>
                    <Grid>
                    <h5>Folio: {x.folio}</h5>
                    </Grid>
                    <Grid>
                    <h5>No. de Parte: {x.noParte}</h5>
                    </Grid>
                    <Grid>
                    <h5>Descripcion: {x.descripcion}</h5>
                    </Grid>
                    <Grid>
                        <Button
                            onClick={() => {handleManageFolio(x)}}
                        >
                            <AttachEmail/>
                        </Button>
                    </Grid>
                </Grid>
            ))
        }
        
    </Grid>
  )
}
