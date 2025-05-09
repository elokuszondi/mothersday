import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import KhuluPage from './pages/KhuluPage';
import TributePage from './pages/TributePage';
import { tributeData } from './data/tributeData';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/khulu" element={<KhuluPage />} />
            {tributeData
              .filter(person => person.id !== 'khulu')
              .map(person => (
                <Route 
                  key={person.id}
                  path={`/tribute/${person.id}`}
                  element={<TributePage personId={person.id} />}
                />
              ))
            }
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;