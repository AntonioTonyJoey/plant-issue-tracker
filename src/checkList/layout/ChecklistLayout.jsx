import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';

const drawerWidth = 240;

export const ChecklistLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}}>

        <NavBar drawerWidth={drawerWidth}/>

        <SideBar drawerWidth={drawerWidth}/>

        <Box component='main' sx={{flex: 1, p:3}}>
            <Toolbar/>
            {
                children
            }
        </Box>
    </Box>
  )
}
