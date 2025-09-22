import { Grid, Typography } from '@mui/material'
import React from 'react'

export const LoginLayout = ({children}) => {
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
        className="box-shadow"
        xs={3}
        sx={{width:'50%', backgroundColor: 'white', padding: 3, borderRadius: 2}}
        >
            <Typography variant="h5" sx={{mb: 1}}>
                Login
            </Typography>
            {
                children
            }
        </Grid>
    </Grid>
  )
}
