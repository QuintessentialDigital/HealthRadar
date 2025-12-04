import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} HealthRadar — Built to make NHS access easier.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
