import React, { useState } from "react";

function PostcodeForm({ onSearch, loading }) {
  const [postcode, setPostcode] = useState("");
  const [radiusMiles, setRadiusMiles] = useState("25");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(postcode.trim(), radiusMiles);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Postcode</label>
        <input
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. RG41"
          required
        />
      </div>

      <div className="form-row">
        <label>Radius (miles)</label>
        <input
          type="number"
          min="1"
          max="200"
          value={radiusMiles}
          onChange={(e) => setRadiusMiles(e.target.value)}
        />
      </div>

      <button disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default PostcodeForm;
