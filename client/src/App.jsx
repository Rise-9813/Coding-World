import { useState, useEffect } from "react";
import Navigation from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import Problems from "./components/Problems";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Compiler from "./components/Compiler";
import Test from "./components/Test";
import Login from "./components/Login";
const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState("Default");
  const Loginf = (username, pwd) => {
    if (pwd === "suraj") {
      setAuth(true);
      setUser(username);
    }
  };
  const Logout = () => {
    setAuth(false);
    setUser("");
  };
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div>
      {isAuth === true ? (
        <div>
          <BrowserRouter>
            <Navigation uid={user} logout={Logout} />
            <Header data={landingPageData.Header} />
            <Switch>
              <Route exact path="/" component={About} />
              <Route path="/contact" component={Team} />
              <Route path="/compiler" component={Compiler} />
              <Route path="/test" component={Test} />
              <Route path="/problems" component={Problems} />
            </Switch>
            <Contact data={landingPageData.Contact} />
          </BrowserRouter>
        </div>
      ) : (
        <Login LoginF={Loginf} />
      )}
    </div>
  );
};
export default App;
