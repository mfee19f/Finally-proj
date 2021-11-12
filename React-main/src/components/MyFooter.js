import React from 'react'
import '../styles/footerstyle.css'
import { withRouter } from 'react-router-dom'
function MyFooter(props) {
  return (
    <>
      <div className="footer mt-auto d-flex pt-5 pb-2">
        <div className="col-4 align-self-center mb-5 rocky-mobile">
          <h5 className="text-center white">
            Secure Payment
          </h5>
          <div className="d-flex  justify-content-center">
            <a href="/#">
              <i className="fab fa-cc-jcb white"></i>
            </a>
            <a href="/#">
              <i className="fab white fa-cc-visa"></i>
            </a>
          </div>
        </div>
        <div className="col-4  rocky-mobile">
          <div className="d-flex justify-content-center">
            <img
              src="http://localhost:3000/image/logo.svg"
              alt=""
            />
          </div>
        </div>
        <div className="col-4 align-self-center mb-5 rocky-mobile">
          <h5 className="text-center white ">Follow Us</h5>
          <div className="d-flex  justify-content-center">
            <a href="/#">
              <i className="fab fa-facebook white"></i>
            </a>
            <a href="/#">
              <i className="fab fa-twitter white"></i>
            </a>
            <a href="/#">
              <i className="fab fa-skype white"></i>
            </a>
            <a href="/#">
              <i className="fab fa-tumblr-square white"></i>
            </a>
            <a href="/#">
              <i className="fas fa-envelope-square white"></i>
            </a>
          </div>
        </div>
        <div className="col rocky-center">
          <div className="d-flex justify-content-center">
            <img
              src="http://localhost:3000/image/logo.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MyFooter)
