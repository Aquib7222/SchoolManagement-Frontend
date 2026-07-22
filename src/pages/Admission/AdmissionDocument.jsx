import React, { useState } from "react";
import UploadDocumentModal from "./UploadDocumentModal";
import DocumentList from "./DocumentList";

const AdmissionDocuments = ({ admission }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <button
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#uploadDocumentModal"
      >
        Upload Document
      </button>

      <UploadDocumentModal
        admission={admission}
        onSuccess={() => setRefresh(!refresh)}
      />

      <DocumentList
        key={refresh}
        admissionId={admission.id}
      />
    </>
  );
};

export default AdmissionDocuments;
