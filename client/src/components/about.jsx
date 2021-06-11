import {Header} from "./header";
export const About = (props) => {
  return (
    
    <div>
    <Header  uid={localStorage.getItem("username")} />
    <div id="about">
     
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About This Page</h2>
              <p>
                This page provides free access to one of the fastest Compile and
                Test Platforms in the country. Developed by a NITW undergraduate
                , this platform helps users test several practice problems on
                the Go. We also offer a <strong> COMPILE AND RUN </strong>option
                before testing.{" "}
              </p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>Fastest UI driven API.</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    Available at no cost to students practicing for coding
                    contests.
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
