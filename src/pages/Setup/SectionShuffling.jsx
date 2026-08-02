import React from "react";

const SectionShuffling = () => {
  return (
    <>
      {/* Header */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Section Shuffling</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">Section Shuffling</li>
          </ol>
        </nav>
      </div>

      <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
        <div className="card ">
          <div className="card-header">Section Shuffling</div>
          <div className="card-body"></div>
        </div>
      </div>
    </>
  );
};

export default SectionShuffling;
