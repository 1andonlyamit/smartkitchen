import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="footer-brand">SmartKitchen</h5>
            <p className="footer-tagline">
              Making your kitchen smarter, one recipe at a time.
            </p>
          </div>
          <div className="col-md-6">
            <div className="footer-links">
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                className="footer-link"
              >
                Home
              </Link>
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                className="footer-link"
              >
                About
              </Link>
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                className="footer-link"
              >
                Features
              </Link>
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                className="footer-link"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="footer-copyright">
              &copy; {currentYear} SmartKitchen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
