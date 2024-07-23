import './App.css';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import { Route,Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import NotesState from './context/notes/NotesState';
function App() {
  return (
    <>
    <NotesState>  
      <Navbar />
      <Switch>
        <Route exact path='/'><Home/></Route>
        <Route exact path='/signup'><SignUp/></Route>
        <Route exact path='/login'><LoginPage/></Route>
      </Switch>
    </NotesState>

    </>
  );
}

export default App;
