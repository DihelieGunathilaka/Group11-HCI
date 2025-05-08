import "../styles/Welcome.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      {/* <div className="navbar-logo">
        <img src={logo} alt="InteraVis Logo" className="logo-image" />
      </div> */}

      {/* Welcome Section */}
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">
            Welcome to <span>InteraVis</span>
          </h1>
          <p className="welcome-subtitle">
            Where Interaction meets Visualisation
          </p>
          <p className="welcome-text">
            Experience dynamic and intuitive visual journeys
          </p>
        </div>
      </div>

      {/* CTA Section Before About */}
      <div className="cta-container">
        <h2 className="cta-heading">Ready to dive in?</h2>
        <p className="cta-subtext">Start your journey with InteraVis now.</p>
        <Link to="/login">
          <button className="cta-button">Get Started</button>
        </Link>
        <h1 className="aboutus-title">About InteraVis</h1>
        <p className="aboutus-subtitle text-white">
          Where Interaction Meets Visualisation
        </p>
        <p className="aboutus-text">
          InteraVis is built with a passion for blending intuitive interaction
          and compelling visual design. Our platform offers a dynamic user
          experience that transforms complex data and interfaces into beautiful,
          usable tools.
        </p>
        <p className="aboutus-text">
          Whether you're a developer, designer, or just someone who loves smooth
          digital experiences, InteraVis is here to make it happen — simply,
          elegantly, and interactively.
        </p>
      </div>

      {/* About Us Section */}
      {/* <div id="aboutus-section" className="aboutus-container"> */}
      {/* <div className="aboutus-content">
        <h1 className="aboutus-title">About InteraVis</h1>
        <p className="aboutus-subtitle">
          Where Interaction Meets Visualisation
        </p>
        <p className="aboutus-text">
          InteraVis is built with a passion for blending intuitive interaction
          and compelling visual design. Our platform offers a dynamic user
          experience that transforms complex data and interfaces into beautiful,
          usable tools.
        </p>
        <p className="aboutus-text">
          Whether you're a developer, designer, or just someone who loves smooth
          digital experiences, InteraVis is here to make it happen — simply,
          elegantly, and interactively.
        </p>
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default Welcome;
