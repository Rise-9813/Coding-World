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
import Submissions from "./components/Submissions"
import axios from 'axios'
const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isAuth, setAuth] = useState(localStorage.getItem("auth") || false);
  const [response,setResponse]=useState({});
  //console.log(localStorage.getItem("username"), localStorage.getItem('auth') , isAuth);
  var str = '';
  if(localStorage.getItem("username"))
  str=localStorage.getItem('username');
  else
  str='Default';
  const [user, setUser] = useState(str);
  const Loginf = (username, pwd) => {
    if (pwd === "suraj" || pwd==="pravallika" ) {
      setAuth(true);
      setUser(username);
      localStorage.setItem("username",username);
      localStorage.setItem("auth",true);
    }
    else{
      window.alert('Please check your username and password')
    }
  };
  const Logout = () => {
    setAuth(false);
    setUser("Default");
    localStorage.setItem("username",'Default');
      localStorage.setItem("auth",false);
  };
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  // axios.get('/api/v1/say-something').then((res) => {
  //   const response = res.data;
  //   setResponse(response);
  // });
  //console.log('Auth before render ', isAuth, isAuth==true);
  return (
    <div>
      {isAuth  ? (
        <div>
          <BrowserRouter>
            <Navigation uid={user} logout={Logout} />
            <Header data={landingPageData.Header} uid={user} />
            <Switch>
              <Route exact path="/" component={About} />
              <Route path="/contact" component={Team} />
              <Route path="/compiler" component={Compiler} />
              <Route path="/test" component={Test} />
              <Route path="/problems" component={Problems} />
              <Route path="/submissions" component={Submissions} />
            </Switch>
            {/* <h5>{response.body}</h5> */}
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
