import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginRoutes } from '../auth/routes/LoginRoutes'
import { useDispatch, useSelector } from 'react-redux';
import { CheckListRoutes } from '../checkList/routes/CheckListRoutes';
import { validateTimeLogin } from '../store/auth';

export const RoutesApp = () => {
  const {status, wiw} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const wiw = window.sessionStorage.getItem("wiw");
    dispatch(validateTimeLogin(wiw));
  }, [])
  
  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path='/*' element={<CheckListRoutes/>} />
        : <Route path='/auth/*' element={<LoginRoutes/>} />
      }
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
