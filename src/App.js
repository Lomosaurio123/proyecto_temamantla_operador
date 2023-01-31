import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LogInPage } from './pages/LogInPage';
import { BeneficiarioPage } from './pages/BeneficiarioPage';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext();

  return (
    <div className="App">

      <BrowserRouter>

        <Routes>

          <Route path='/' element = { !user ? <LogInPage/> : <Navigate to = "/beneficiario" /> } />
          
          <Route path='/beneficiario' element = { user ? <BeneficiarioPage/> : <Navigate to = "/" /> } />

        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
