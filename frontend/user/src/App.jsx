import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import GroundDetails from './pages/GroundDetails';
import Bookings from './pages/Bookings';
import TimeSlotSelection from './pages/SelectTimeSlot';

function App() {
  localStorage.setItem("userId", "6710162b025ce9b398ec21d0");
  localStorage.setItem("username", "Aditya");

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ground/:id" element={<GroundDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/select-time-slot" element={<TimeSlotSelection />} />
          </Routes>
        </Router>
        
      </Provider>
    </>
  )
}

export default App
