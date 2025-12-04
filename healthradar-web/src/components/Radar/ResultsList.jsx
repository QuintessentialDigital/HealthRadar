import React from "react";
import ResultItem from "./ResultItem.jsx";

function ResultsList({ results }) {
  if (!results?.results || results.results.length === 0) {
    return <p>No accepting NHS dentists were found in this radius.</p>;
  }

  return (
    <div className="results">
      <h3>Results</h3>

      <ul>
        {results.results.map((item, idx) => (
          <ResultItem key={item.id || idx} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ResultsList;
