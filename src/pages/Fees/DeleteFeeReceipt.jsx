import React from "react";

const DeleteFeeReceipt = () => {
  return (
    <>
      {/* ===========================
        Header
      =========================== */}
      <div className=" shadow p-3 mb-3">
        <div className="col-md-8">
          <h4 className="mb-1">
            <strong>Delete Fee Receipt</strong>
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Fee</li>
              <li className="breadcrumb-item active">Delete Fee Receipt</li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DeleteFeeReceipt;
