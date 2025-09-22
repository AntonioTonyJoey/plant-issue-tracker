import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { LoginLayout } from '../layout/LoginLayout'
import { Button, Grid, TextField, Alert } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../store/auth';
import { useForm, validacionesLogin } from '../../hooks';

const validaciones = validacionesLogin;

export const Login = () => {
  const {status, auth, errorMessage} = useSelector(state => state.auth);
  const [formSubmitted, setformSubmitted] = useState(false);
  const dispach = useDispatch();
  const {user, pwd, onInputChange, onResetForm, userValid, pwdValid, isFormValid, formState} = useForm({
    user: '',
    pwd: ''
  }, validaciones);
  const isAuthenticating = useMemo( () => status === 'checking', [status]);
  const onSubmit = (e) => {
    e.preventDefault();
    setformSubmitted(true);
    if(!isFormValid) return;
    dispach(getAuth(formState));
  }

  return (
    <LoginLayout>
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="WIW" 
                type="text" 
                placeholder="Wiw" 
                fullWidth
                name="user"
                value={user}
                onChange={onInputChange}
                error={!!userValid && formSubmitted}
                helperText={userValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                name="pwd"
                value={pwd}
                onChange={onInputChange}
                error={!!pwdValid && formSubmitted}
                helperText={pwdValid}
              />
            </Grid>
            <Grid container spacing={2} sx={{mb:2, mt:1}}> 
              <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button 
                    disabled={isAuthenticating}
                    type='submit'
                    variant="contained" 
                    fullWidth
                    >
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='center'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Solicitar Ayuda
              </Link>
            </Grid>
          </Grid>
        </form>
    </LoginLayout>
  )
}
