import { Grid, CircularProgress} from '@mui/material'

export const ChargePage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '95vh', backgroundColor: 'primary.main', padding: 4}}
    >
        <Grid item
        sx={{width:'50%'}}
        >
          <CircularProgress color='warning'/>
        </Grid>
    </Grid>
  )
}
