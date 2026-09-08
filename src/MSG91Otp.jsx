
// import React, { useEffect, useRef, useState } from "react";

// const MSG91_SCRIPT_URLS = [
//   "https://verify.msg91.com/otp-provider.js",
//   "https://verify.phone91.com/otp-provider.js",
// ];

// const MSG91Otp = ({
//   mobileNumber,
//   onVerified,
//   onClose,
// }) => {
//   const [scriptLoaded, setScriptLoaded] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const initializedRef = useRef(false);

//   const widgetId = import.meta.env.VITE_MSG91_WIDGET_ID;
//   const tokenAuth = import.meta.env.VITE_MSG91_TOKEN;

//   /*
//    * Load MSG91 OTP script
//    */
//   useEffect(() => {
//     if (!widgetId || !tokenAuth) {
//       setError(
//         "MSG91 configuration missing. Please check your .env file."
//       );
//       setLoading(false);
//       return;
//     }

//     // Script already available
//     if (typeof window.initSendOTP === "function") {
//       setScriptLoaded(true);
//       setLoading(false);
//       return;
//     }

//     let scriptIndex = 0;
//     let cancelled = false;

//     const loadScript = () => {
//       if (scriptIndex >= MSG91_SCRIPT_URLS.length) {
//         setError("Unable to load MSG91 OTP service.");
//         setLoading(false);
//         return;
//       }

//       const script = document.createElement("script");

//       script.src = MSG91_SCRIPT_URLS[scriptIndex];
//       script.async = true;

//       script.onload = () => {
//         if (cancelled) return;

//         if (typeof window.initSendOTP === "function") {
//           setScriptLoaded(true);
//           setLoading(false);
//         } else {
//           setError("MSG91 OTP service could not be initialized.");
//           setLoading(false);
//         }
//       };

//       script.onerror = () => {
//         scriptIndex += 1;
//         loadScript();
//       };

//       document.head.appendChild(script);
//     };

//     loadScript();

//     return () => {
//       cancelled = true;
//     };
//   }, [widgetId, tokenAuth]);

//   /*
//    * Initialize MSG91 OTP Widget
//    */
//   useEffect(() => {
//     if (!scriptLoaded) return;
//     if (initializedRef.current) return;
//     if (!mobileNumber) return;

//     if (typeof window.initSendOTP !== "function") {
//       setError("MSG91 OTP function is not available.");
//       return;
//     }

//     initializedRef.current = true;

//     const configuration = {
//       widgetId: widgetId,

//       tokenAuth: tokenAuth,

//       /*
//        * Indian mobile number
//        * Example: 919876543210
//        */
//       identifier: mobileNumber.startsWith("91")
//         ? mobileNumber
//         : `91${mobileNumber}`,

//       exposeMethods: true,

//       success: (data) => {
//         console.log("MSG91 OTP verified successfully:", data);

//         /*
//          * data contains MSG91 verification response.
//          *
//          * We pass it to the parent component.
//          */
//         if (onVerified) {
//           onVerified(data);
//         }
//       },

//       failure: (error) => {
//         console.error("MSG91 OTP verification failed:", error);

//         setError(
//           error?.message ||
//             "OTP verification failed. Please try again."
//         );
//       },
//     };

//     try {
//       window.initSendOTP(configuration);
//     } catch (err) {
//       console.error("MSG91 initialization error:", err);

//       setError(
//         err?.message ||
//           "Unable to start OTP verification."
//       );
//     }
//   }, [
//     scriptLoaded,
//     widgetId,
//     tokenAuth,
//     mobileNumber,
//     onVerified,
//   ]);

//   /*
//    * Reset when mobile number changes
//    */
//   useEffect(() => {
//     initializedRef.current = false;
//     setError("");
//   }, [mobileNumber]);

//   if (!mobileNumber) {
//     return null;
//   }

//   if (loading) {
//     return (
//       <div className="text-center py-3">
//         <div
//           className="spinner-border text-primary"
//           role="status"
//         >
//           <span className="visually-hidden">
//             Loading...
//           </span>
//         </div>

//         <div className="mt-2">
//           Loading OTP verification...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mt-3">
//         <div className="alert alert-danger">
//           {error}
//         </div>

//         {onClose && (
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         )}
//       </div>
//     );
//   }

//   /*
//    * MSG91 OTP widget UI is injected by MSG91.
//    */
//   return (
//     <div className="msg91-otp-container">
//       <div className="text-center mb-3">
//         <h5>Verify Mobile Number</h5>

//         <p className="text-muted mb-0">
//           OTP has been sent to{" "}
//           <strong>{mobileNumber}</strong>
//         </p>
//       </div>

//       {/* MSG91 Widget UI will appear here */}

//       {onClose && (
//         <div className="text-center mt-3">
//           <button
//             type="button"
//             className="btn btn-link"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MSG91Otp;


import React, { useEffect, useRef, useState } from "react";

const MSG91_SCRIPT_URLS = [
  "https://verify.msg91.com/otp-provider.js",
  "https://verify.phone91.com/otp-provider.js",
];

const MSG91Otp = ({
  mobileNumber,
  onVerified,
  onClose,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initializedRef = useRef(false);

  const widgetId = import.meta.env.VITE_MSG91_WIDGET_ID;
  const tokenAuth = import.meta.env.VITE_MSG91_TOKEN;

  /*
   * Normalize Indian mobile number
   *
   * 9876543210
   *      ↓
   * 919876543210
   */
  const getIdentifier = () => {
    if (!mobileNumber) return "";

    let number = String(mobileNumber).replace(/\D/g, "");

    if (number.startsWith("91") && number.length === 12) {
      return number;
    }

    if (number.length === 10) {
      return `91${number}`;
    }

    return number;
  };

  /*
   * Load MSG91 SDK
   */
  useEffect(() => {
    if (!widgetId || !tokenAuth) {
      setError(
        "MSG91 configuration missing. Please check your .env file."
      );
      setLoading(false);
      return;
    }

    /*
     * SDK already loaded
     */
    if (typeof window.initSendOTP === "function") {
      setScriptLoaded(true);
      setLoading(false);
      return;
    }

    let scriptIndex = 0;
    let cancelled = false;

    const loadScript = () => {
      if (scriptIndex >= MSG91_SCRIPT_URLS.length) {
        setError("Unable to load MSG91 OTP service.");
        setLoading(false);
        return;
      }

      const existingScript = document.querySelector(
        `script[src="${MSG91_SCRIPT_URLS[scriptIndex]}"]`
      );

      if (existingScript) {
        const checkSDK = setInterval(() => {
          if (typeof window.initSendOTP === "function") {
            clearInterval(checkSDK);

            if (!cancelled) {
              setScriptLoaded(true);
              setLoading(false);
            }
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkSDK);

          if (
            !cancelled &&
            typeof window.initSendOTP !== "function"
          ) {
            scriptIndex++;
            loadScript();
          }
        }, 5000);

        return;
      }

      const script = document.createElement("script");

      script.src = MSG91_SCRIPT_URLS[scriptIndex];
      script.async = true;

      script.onload = () => {
        if (cancelled) return;

        if (typeof window.initSendOTP === "function") {
          setScriptLoaded(true);
          setLoading(false);
        } else {
          scriptIndex++;
          loadScript();
        }
      };

      script.onerror = () => {
        scriptIndex++;
        loadScript();
      };

      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      cancelled = true;
    };
  }, [widgetId, tokenAuth]);

  /*
   * Initialize MSG91 Widget
   */
  useEffect(() => {
    if (!scriptLoaded) return;
    if (!mobileNumber) return;
    if (initializedRef.current) return;

    if (typeof window.initSendOTP !== "function") {
      setError("MSG91 OTP service is not available.");
      return;
    }

    const identifier = getIdentifier();

    if (!identifier || identifier.length !== 12) {
      setError(
        "Please enter a valid 10 digit Indian mobile number."
      );
      return;
    }

    initializedRef.current = true;

    const configuration = {
      widgetId: widgetId,

      tokenAuth: tokenAuth,

      identifier: identifier,

      exposeMethods: true,

      success: (data) => {
        console.log(
          "MSG91 OTP verified successfully:",
          data
        );

        /*
         * Pass successful verification
         * to SchoolAddForm.jsx
         */
        if (onVerified) {
          onVerified(data);
        }
      },

      failure: (err) => {
        console.error(
          "MSG91 OTP verification failed:",
          err
        );

        setError(
          err?.message ||
            err?.description ||
            "OTP verification failed. Please try again."
        );
      },
    };

    try {
      console.log(
        "Initializing MSG91 OTP for:",
        identifier
      );

      window.initSendOTP(configuration);

    } catch (err) {
      console.error(
        "MSG91 initialization error:",
        err
      );

      initializedRef.current = false;

      setError(
        err?.message ||
          "Unable to start OTP verification."
      );
    }

    return () => {
      /*
       * We don't remove MSG91's global SDK here.
       * It may be used again by the application.
       */
    };
  }, [
    scriptLoaded,
    widgetId,
    tokenAuth,
    mobileNumber,
    onVerified,
  ]);

  /*
   * Reset widget when mobile number changes
   */
  useEffect(() => {
    initializedRef.current = false;
    setError("");
  }, [mobileNumber]);

  /*
   * No mobile number
   */
  if (!mobileNumber) {
    return null;
  }

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body text-center py-4">

          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <div className="mt-3 fw-semibold">
            Loading OTP verification...
          </div>

          <small className="text-muted">
            Please wait while we connect to MSG91.
          </small>

        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">

          <div className="alert alert-danger mb-3">
            <strong>OTP Error</strong>

            <div className="mt-1">
              {error}
            </div>
          </div>

          {onClose && (
            <div className="text-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }

  /*
   * MSG91 Widget
   */
  return (
    <div className="card border-0 shadow-sm mt-4">

      <div className="card-body">

        <div className="text-center mb-3">

          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              background: "#eef5ff",
              color: "#0d6efd",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            OTP
          </div>

          <h5 className="fw-bold mb-1">
            Verify Mobile Number
          </h5>

          <p className="text-muted mb-0">
            We are verifying
          </p>

          <strong>
            +91 {mobileNumber.replace(/^91/, "")}
          </strong>

        </div>

        {/*
         * MSG91 injects its OTP UI automatically
         */}
        <div
          id="msg91-otp-widget"
          className="msg91-otp-container"
        />

        {onClose && (
          <div className="text-center mt-3">

            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={onClose}
            >
              Cancel verification
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default MSG91Otp;