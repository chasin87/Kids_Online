import React from "react";
import bg from "../../Images/bg.png";
import wolken1 from "../../Images/wolken1.png";
import wolken2 from "../../Images/wolken2.png";
import wolken3 from "../../Images/wolken3.png";
import star from "../../Images/star.png";
import rocket from "../../Images/rocket.png";
import boy_tablet from "../../Images/boy_tablet.png";
import girl_tablet from "../../Images/girl_tablet.png";

import "./index.css";

export default function HeaderImage() {
  return (
    <div>
      <img className="wolken1" src={wolken1} alt="wolken1" style={{}} />
      <img className="wolken2" src={wolken2} alt="wolken2" style={{}} />
      <img className="wolken3" src={wolken3} alt="wolken3" style={{}} />
      <img className="star" src={star} alt="star" style={{}} />
      <img className="star2" src={star} alt="star2" style={{}} />
      <img className="star3" src={star} alt="star3" style={{}} />
      <img className="star4" src={star} alt="star4" style={{}} />
      <img className="star5" src={star} alt="star5" style={{}} />
      <img className="star6" src={star} alt="star6" style={{}} />
      <img className="star7" src={star} alt="star7" style={{}} />
      <img className="rocket" src={rocket} alt="rocket" style={{}} />
      <img
        className="boy_tablet"
        src={boy_tablet}
        alt="boy_tablet"
        style={{}}
      />
      <img
        className="girl_tablet"
        src={girl_tablet}
        alt="girl_tablet"
        style={{}}
      />
      <div className="header-img">
        <h1 className="header_text">
          Learn and have fun playing on Kids online
        </h1>
        <img src={bg} alt="background" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
