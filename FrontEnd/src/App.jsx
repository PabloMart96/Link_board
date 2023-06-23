import { Routes, Route } from 'react-router-dom';

import './App.css'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RegisterPage } from './pages/RegisterPage';

function App() {

  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
