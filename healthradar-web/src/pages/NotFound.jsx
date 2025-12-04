import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="section">
      <h2>Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  );
}

export default NotFound;
