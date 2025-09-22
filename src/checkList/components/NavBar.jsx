import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { logOutDB, logout } from "../../store/auth";

export const NavBar = ({drawerWidth = 240}) => {
    const {status, wiw} = useSelector(state => state.auth);
    const dispach = useDispatch();
    const onLogout = () => {
        dispach(logOutDB(wiw));
    }
  return (
    <AppBar 
        position="fixed"
        sx={{
            width:{sm: `calc(100% - ${drawerWidth}px)`},
            ml:{sm: `${drawerWidth}px`}
        }}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
                sx={{mr:2, display:{sm:'none'}}}
            >
            <MenuOutlined/>
            </IconButton>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant="h6" noWrap component='div'>Vendor App</Typography>
                <IconButton color='error' onClick={() => onLogout()}>
                    <LogoutOutlined/>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
 