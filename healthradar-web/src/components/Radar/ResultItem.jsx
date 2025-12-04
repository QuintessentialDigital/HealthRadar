import React from "react";

function ResultItem({ item }) {
  return (
    <li className="result-item">
      <strong>{item.name || item.practiceName}</strong>

      {item.address && (
        <div>{item.address}</div>
      )}

      {item.distanceMiles && (
        <div>{item.distanceMiles.toFixed(1)} miles away</div>
      )}
    </li>
  );
}

export default ResultItem;
