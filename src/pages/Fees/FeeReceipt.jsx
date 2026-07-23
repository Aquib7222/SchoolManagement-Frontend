import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const FeeReceipt = () => {
  const { receiptNo } = useParams();

  const receiptRef = useRef();

  const [receipt, setReceipt] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User", user?.school);
  const navigate = useNavigate();

  useEffect(() => {
    loadReceipt();
  }, []);

  const loadReceipt = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/api/student-fee/payment/receipt/${receiptNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    setReceipt(data);
  };
  const handleDeleteReceipt = async () => {
    if (!window.confirm("Are you sure want to delete this receipt?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/student-fee/payment/receipt/${receiptNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Receipt Deleted Successfully");

      navigate("/fee/feeledger");
    } catch (error) {
      console.log(error);

      alert("Unable to delete receipt");
    }
  };
  console.log("Receipt", receipt);

  const printReceipt = () => {
    window.print();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width = 190;

    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, width, height);

    pdf.save(`${receipt.receiptNo}.pdf`);
  };

  if (!receipt) return <h3 className="text-center mt-5">Loading...</h3>;

  const formattedDateTime = new Date(receipt.paymentTime).toLocaleString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    },
  );

  return (
    <div className="container mt-4">
      <div className="text-end mb-3">
        <button className="btn btn-primary me-2" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-primary me-2" onClick={printReceipt}>
          Print
        </button>

        <button className="btn btn-success me-2" onClick={downloadPDF}>
          Download PDF
        </button>

        <button
          color="error"
          className="btn btn-danger "
          onClick={handleDeleteReceipt}
        >
          Delete Receipt
        </button>
      </div>

      <div ref={receiptRef} className="card shadow p-4">
        <div className="text-center">
          <h2>{user?.school.schoolName}</h2>

          <p>{user?.school.address}</p>

          <h4>FEE PAYMENT RECEIPT</h4>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6">
            <b>Receipt No :</b>

            {receipt.receiptNo}

            <br />

            <b>Admission No :</b>

            {receipt.admissionNumber}

            <br />

            <b>Name :</b>

            {receipt.studentName}

            <br />

            <b>Class :</b>

            {receipt.studentClass}

            <br />

            <b>Section :</b>

            {receipt.section}
          </div>

          <div className="col-md-6">
            <b>Session :</b>

            {receipt.session}

            <br />

            <b>Date :</b>

            {receipt.paymentDate}

            <br />

            <b>Time :</b>

            {formattedDateTime}

            <br />

            <b>Payment Mode :</b>

            {receipt.paymentMode}

            <br />

            <b>Collected By :</b>

            {receipt.collectedBy}
          </div>
        </div>

        <hr />

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Month</th>

              <th>Fee</th>

              <th>Amount</th>

              <th>Paid</th>

              <th>Due</th>
            </tr>
          </thead>

          <tbody>
            {receipt?.feeDetails?.length > 0 &&
              receipt.feeDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>

                  <td>{item.feeName}</td>

                  <td>₹ {item.amount}</td>

                  <td>₹ {item.paidAmount}</td>

                  <td>₹ {item.dueAmount}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="row mt-4">
          <div className="col-md-6"></div>

          <div className="col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <th>Total</th>

                  <td>₹ {receipt.totalAmount}</td>
                </tr>

                <tr>
                  <th>Paid</th>

                  <td>₹ {receipt.paidAmount}</td>
                </tr>

                <tr>
                  <th>Fine</th>

                  <td>₹ {receipt.fineAmount}</td>
                </tr>

                <tr>
                  <th>Discount</th>

                  <td>₹ {receipt.discountAmount}</td>
                </tr>

                <tr>
                  <th>Balance</th>

                  <td>₹ {receipt.dueAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 text-end">
          ______________________
          <br />
          Authorized Signature
        </div>
      </div>
    </div>
  );
};

export default FeeReceipt;
