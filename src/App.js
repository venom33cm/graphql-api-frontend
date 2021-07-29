import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import Header from "./components/Header";
import { GetTokenContext } from "./StateManagement/TokenProvider";

function App() {
  const [{ token }, dispatch] = GetTokenContext();
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          {token ? <Redirect to="/events" /> : <Auth />}
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/Bookings">
          {!token ? <Redirect to="/auth" /> : <Bookings />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
