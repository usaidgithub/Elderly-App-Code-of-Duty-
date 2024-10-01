import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login';
import Scheduling from './components/Scheduling';
import Home from './components/Home';
import SubscribedShare from './components/SubscribedShared';
import RequestManagement from './components/RequestManagement';
import DoctorsCaretakers from './components/DoctorsCareTakers';
import JoinPage from './components/JoinPage';
import HealthMetrics from './components/HealthMetrics';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Registration/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/scheduling' element={<Scheduling/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        <Route exact path='/share' element={<SubscribedShare/>}></Route>
        <Route exact path='/accept' element={<RequestManagement/>}></Route>
        <Route exact path='/doctor' element={<DoctorsCaretakers/>}></Route>
        <Route exact path='/join' element={<JoinPage/>}></Route>
        <Route exact path='/health' element={<HealthMetrics/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
