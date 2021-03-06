import { useState } from "react";
import emailjs from "emailjs-com";
import logo from "../img/team/01.jpg"
import "./contact.css"
const initialState = {
  name: "",
  email: "",
  message: ""
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <div id="contact" class="row">
        <div class="col-md-9 col-md-offset-1 contact-info" id="special">

          <div className="contact-item">
            <h3>Contact Info</h3>
            <p>
              <span>
                <i className="fa fa-map-marker"></i> Address
              </span>
              Coding World Ground Room , Old Safilguda , Hyderabad
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-phone"></i> Phone
              </span>{" "}
              +91- 7661017071
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-envelope-o"></i> Email
              </span>{" "}
              baradhisuraj13@gmail.com
            </p>
          </div>
        </div>
        < div class="col-md-3 col-md-offset-1" id='special2' >
          <img width="200px" height="200px" src="../img/team/01.jpg" />
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2021 Suraj Baradhi. Designed with care. </p>
        </div>
      </div>
    </div>
  );
};
