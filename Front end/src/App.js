import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import SpaPage from './pages/SpaPage';
import ContactPage from './pages/ContactPage';
import BookedRoom from './pages/BookedRoom';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/booked/:id" element={<BookedRoom />} />
          <Route path="/spa" element={<SpaPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

