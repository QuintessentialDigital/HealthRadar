import React, { useState } from "react";
import PostcodeForm from "../components/Radar/PostcodeForm.jsx";
import ResultsList from "../components/Radar/ResultsList.jsx";
import { searchDentists } from "../services/radarService.js";

function DentistRadarPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(postcode, radiusMiles) {
    setLoading(true);
    const data = await searchDentists(postcode, radiusMiles);
    setResults(data);
    setLoading(false);
  }

  return (
    <section className="section">
      <h2>DentistRadar</h2>
      <p>Find NHS dentists accepting new patients near you.</p>

      <PostcodeForm onSearch={handleSearch} loading={loading} />

      {results && <ResultsList results={results} />}
    </section>
  );
}

export default DentistRadarPage;
