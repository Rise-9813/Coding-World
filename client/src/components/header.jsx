import { Link } from "react-router-dom";
export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  CODING WORLD
                  <span></span>
                </h1>
                <p>
                  Welcome to coding world , a rapidly created API Based online
                  compiler. We offer prooblem statements, test case runs and
                  practice for executing code. As of now we support C++ , Python
                  and Java,
                </p>

                <Link to={{pathname :"/problems"}} class="btn btn-custom btn-lg">
                  Lets Begin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
