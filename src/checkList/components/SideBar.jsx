import { useDispatch, useSelector } from 'react-redux';
import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { arrayNavegacion } from '../../hooks/inicializacionObjetos';
import { pruebas } from '../../store/nav/navSlice';

export const SideBar = ({drawerWidth=240}) => {
  const {displayName, rol} = useSelector(state => state.auth);
  const dispach = useDispatch();
  const onHandleNav = (navTo) => dispach(pruebas({nav:navTo}))
  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
        <Drawer
            variant="permanent"
            open= {true}
            sx={{display:{xs: 'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}  
        >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    {`${displayName}`}
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {
                    arrayNavegacion.filter(x => x.Privilegios.includes(rol)).map(x => (
                            <ListItem key={x.StatusNav} disablePadding onClick={() => onHandleNav(x.StatusNav)}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot/>
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={x.Nombre}/>
                                        <ListItemText secondary={x.Descripcion}/>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
