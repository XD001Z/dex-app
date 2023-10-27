import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useAuthContext } from './hooks/useAuthContext';
import AnimePage from './pages/AnimePage';

function App() {
  const { user } = useAuthContext();
  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={ user ? <HomePage /> : <Navigate to='/auth' /> }/>
          <Route path='/auth' element={ !user ? <AuthPage /> : <Navigate to='/' /> }/>
          <Route path='/anime/:id' element={ user ? <AnimePage /> : <Navigate to='/auth'/>}/> 
        </Routes>
    </>
  )
}

export default App;
