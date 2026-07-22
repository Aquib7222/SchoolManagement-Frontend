import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DocumentList = ({admissionId}) => {
    // const { admissionId } = useParams();
    console.log("admissionId",admissionId);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!admissionId) return;

    setLoading(true);

    axios
      .get(
        `http://localhost:8080/api/documents/admission/${admissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [admissionId, token]);

  return (
    <div className="mt-3">
      <h6><strong>Uploaded Documents</strong></h6>

      <table className="table table-bordered table-sm">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Document Type</th>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
          ) : documents.length > 0 ? (
            documents.map((doc, index) => (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>
                  <span className="badge bg-success">
                    {doc.type}
                  </span>
                </td>
                <td>{doc.fileName}</td>
                <td>
                  <a
                    href={`http://localhost:8080/api/documents/download/${doc.id}`}
                    className="btn btn-sm btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No documents uploaded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
