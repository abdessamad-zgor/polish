import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/Layouts/Home';
import Products from './components/Layouts/Products';
import NavBar from './components/NavBar';
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <NavBar />
        <main>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/products' component={Products}></Route>
          </Switch>
        </main>

      </Router>
    </div>

  );
}

export default App;
