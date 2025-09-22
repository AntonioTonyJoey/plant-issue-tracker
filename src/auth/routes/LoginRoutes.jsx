import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { useDispatch, useSelector } from 'react-redux';
import { ChargePage } from '../../ui/components/ChargePage';
import { saveVisit } from '../../store/auth';

export const LoginRoutes = () => {
  const {status, auth} = useSelector(state => state.auth);
  const dispach = useDispatch();
  useEffect(() => {
    dispach(saveVisit());
  }, []);

  if(status === 'checking'){
    return <ChargePage/>
  }
  
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>

        <Route path="/*" element={<Navigate to="/auth/login"/>}/>
    </Routes>
  )
}
