import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Sighin from './Components/Sighin';
import User from './Components/User';



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='' element={<Login/>}/>
      <Route path='signin' element={<Sighin/>}/>
      <Route path='user' element={<User/>}/>
    </Routes>
    </div>

  );
}

export default App;
