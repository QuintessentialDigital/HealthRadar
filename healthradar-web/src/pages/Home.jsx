import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="section">
      <h1>HealthRadar</h1>
      <p>Your gateway to faster access to NHS services.</p>

      <div className="radar-list">
        <Link className="radar-card" to="/dentist">
          DentistRadar → Find NHS dentist openings
        </Link>

        <Link className="radar-card disabled" to="/gp">
          GPRadar → Coming Soon
        </Link>
      </div>
    </section>
  );
}

export default Home;
