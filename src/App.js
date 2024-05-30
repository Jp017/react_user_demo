
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import Homepage from './Components/Homepage/Homepage.jsx';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
