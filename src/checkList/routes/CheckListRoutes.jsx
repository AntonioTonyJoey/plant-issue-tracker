import { Navigate, Route, Routes } from 'react-router-dom';
import { CheckList } from '../pages/CheckList';

export const CheckListRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<CheckList/>}/>
        <Route path="/*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}
