import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
