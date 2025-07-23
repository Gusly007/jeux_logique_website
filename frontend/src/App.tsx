
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Contact from './components/Contact';
import AProposDeMoi from './components/AProposDeMoi';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Loging';
import Profil from './components/Profil';
import PrivateRoute from './components//PrivateRoute';
import { AuthProvider } from './AuthContext';
import Jeux from './components/Jeux';
import BibliographiePage from './components/Bibliographiepage';
import MotManquant from './components/MotManquant';
import Factorielle from './components/Factorielle';
import MentionsLegales from './components/MentionLegal';
import CalculMental from './components/CalculMental';
import Suite from './components/Suite';
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header title="Jeu de Logique" />

          <Routes>
            <Route
              path="/"
              element={
                <section className="home-container">
                  <div className="intro">
                    <h2>Bienvenue sur notre plateforme de jeux de logique</h2>
                    <p>
                      Ce site propose des jeux éducatifs pour entraîner votre cerveau : logique, calcul mental, mémoire et plus encore.
                      Rejoignez-nous pour améliorer vos compétences tout en vous amusant.
                    </p>
                  </div>
                </section>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/AProposDeMoi" element={<AProposDeMoi />} />

            <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
            <Route path="/Profil" element={<PrivateRoute>
                <Profil />
              </PrivateRoute>} />
    <Route path="/Bibliographiepage" element={
      <PrivateRoute>
        <>
          <BibliographiePage />
        </>
      </PrivateRoute>
      
    } />
    <Route path="/motmanquant" element={
      <PrivateRoute>
        <MotManquant />
      </PrivateRoute>
    } />
    <Route path="/factorielle" element={
      <PrivateRoute>
        <Factorielle />
      </PrivateRoute>
    } />
    <Route
      path="/jeux"
      element={
        <PrivateRoute>
          <Jeux />
        </PrivateRoute>
      }
    />
    <Route
    
      path="/mentionlegal"
      element={
        <PrivateRoute>
          <MentionsLegales />
        </PrivateRoute>
      }
    />
    <Route
    
      path="/suite"
      element={
        <PrivateRoute>
          <Suite />
        </PrivateRoute>
      }
    />
    <Route
    
      path="/calculmental"
      element={
        <PrivateRoute>
          <CalculMental />
        </PrivateRoute>
      }
    />
          </Routes>
  <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
