import { Routes, Route } from 'react-router-dom';

import './App.css'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { UpdateProfilePage } from './pages/UpdateProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {

  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/user/:id' element={<ProfilePage />} />
        <Route path='/update' element={<UpdateProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
