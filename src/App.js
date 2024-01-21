import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BattlePassPage from './pages/BattlePassPage';
import CreateAnAccountPage from './pages/CreateAnAccountPage';
import LoginPage from './pages/LoginPage';
import CreateBattlePassPage from './pages/CreateBattlePassPage';
import BattlePassDetailPage from './pages/BattlePassDetailPage';
import MyBattlePassPage from './pages/MyBattlePassPage';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import UsersPageAdmin from './pages/admin/UsersPageAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/battlepass' element={<BattlePassPage />} />
        <Route path='/accountcreate' element={<CreateAnAccountPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/createbattlepass' element={<CreateBattlePassPage />} />
        <Route path='/battlepassdetails/:id' element={<BattlePassDetailPage />} />
        <Route path='/mybattlepass/:pseudo' element={<MyBattlePassPage />} />

        <Route path='/admin' element={<DashboardAdmin />} />
        <Route path='/useradmin' element={<UsersPageAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
