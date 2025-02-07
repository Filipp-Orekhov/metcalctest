import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Contacts from './pages/Contacts/Contacts.tsx';
import './styles/globals.scss'

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  </div>
);

export default App;