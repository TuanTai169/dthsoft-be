import React from "react"
import tai from "../../assets/images/tai_avatar.jpg"
import huy from "../../assets/images/huy_avatar.png"

const About = () => {
  return (
    <div className="about d-flex flex-column ">
      <div className="header">
        <h4>GROUP 08</h4>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-sm-6">
          <div className="our-team">
            <div className="pic">
              <img src={tai} alt="person1" />
            </div>
            <h3 className="title">Nguyen Tuan Tai</h3>
            <span className="post">Fullstack Developer</span>
            <ul className="social">
              <li>
                <i className="bx bxl-facebook"></i>
              </li>
              <li>
                <i className="bx bxl-google-plus"></i>
              </li>
              <li>
                <i className="bx bxl-linkedin"></i>
              </li>
              <li>
                <i className="bx bxl-github"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="our-team">
            <div className="pic">
              <img src={huy} alt="person1" />
            </div>
            <h3 className="title">Vo Anh Huy</h3>
            <span className="post">Front-end Developer</span>
            <ul className="social">
              <li>
                <i className="bx bxl-facebook"></i>
              </li>
              <li>
                <i className="bx bxl-google-plus"></i>
              </li>
              <li>
                <i className="bx bxl-linkedin"></i>
              </li>
              <li>
                <i className="bx bxl-github"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
