import React, { useEffect, useMemo, useState } from "react";
import {
  FaBan,
  FaCheckCircle,
  FaCreditCard,
  FaEdit,
  FaEye,
  FaFilePdf,
  FaMoneyBillWave,
  FaPlus,
  FaPrint,
  FaRedo,
  FaSearch,
  FaSchool,
  FaTimes,
  FaTrash,
  FaUniversity,
  FaUsers,
  FaWallet,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axiosInstance from "../../api/axiosInstance";
import "./SubscriptionManagement.css";

const SubscriptionManagement = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [activeTab, setActiveTab] = useState("subscriptions");

  const [schools, setSchools] = useState([]);
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);

  const [studentCounts, setStudentCounts] = useState({});
  const [dashboard, setDashboard] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =========================================================
  // MODALS
  // =========================================================

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSubscriptionView, setShowSubscriptionView] = useState(false);
  const [showPlanView, setShowPlanView] = useState(false);

  // =========================================================
  // SELECTED DATA
  // =========================================================

  const [editingPlan, setEditingPlan] = useState(null);
  // const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // =========================================================
  // PLAN FORM
  // =========================================================

  const initialPlanForm = {
    name: "",
    billingType: "PER_STUDENT",
    studentLimit: "",
    price: "",
    duration: "MONTHLY",

    setupFeeType: "NONE",
    setupFeePerStudent: "",
    setupFeeUpToStudents: "",
    setupFeeAmount: "",

    description: "",
  };

  const [planForm, setPlanForm] = useState(initialPlanForm);

  // =========================================================
  // SUBSCRIPTION FORM
  // =========================================================

  const [subscriptionForm, setSubscriptionForm] = useState({
    schoolId: "",
    planId: "",
    startDate: new Date().toISOString().split("T")[0],
    autoRenew: false,
  });

  // =========================================================
  // PAYMENT FORM
  // =========================================================

  const [paymentForm, setPaymentForm] = useState({
    subscriptionId: "",
    paymentType: "SUBSCRIPTION",
    amount: "",
    paymentMode: "CASH",
    paymentDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    notes: "",
  });

  // =========================================================
  // TOKEN
  // =========================================================

  const getToken = () => {
    return localStorage.getItem("AdminToken") || localStorage.getItem("token");
  };

  const authConfig = () => {
    const token = getToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =========================================================
  // MESSAGE
  // =========================================================

  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });

    setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 4000);
  };

  // =========================================================
  // FORMATTERS
  // =========================================================

  const money = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const numberFormat = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const durationLabel = (duration) => {
    switch (duration) {
      case "MONTHLY":
        return "Monthly";

      case "QUARTERLY":
        return "Quarterly";

      case "HALF_YEARLY":
        return "Half Yearly";

      case "YEARLY":
        return "Yearly";

      default:
        return duration || "-";
    }
  };

  const billingLabel = (billingType) => {
    if (billingType === "PER_STUDENT") {
      return "Per Student";
    }

    return "Fixed";
  };

  const paymentStatusLabel = (status) => {
    switch (status) {
      case "VERIFIED":
        return "Verified";

      case "PENDING":
        return "Pending";

      case "REJECTED":
        return "Rejected";

      case "REFUNDED":
        return "Refunded";

      default:
        return status || "-";
    }
  };

  const subscriptionStatusLabel = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Active";

      case "PENDING":
        return "Pending";

      case "EXPIRING":
        return "Expiring";

      case "EXPIRED":
        return "Expired";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status || "-";
    }
  };

  // =========================================================
  // OBJECT HELPERS
  // =========================================================

  const getSchoolName = (subscription) => {
    return (
      subscription?.school?.schoolName ||
      subscription?.school?.name ||
      subscription?.schoolName ||
      "Unknown School"
    );
  };

  const getSchoolCode = (subscription) => {
    return (
      subscription?.school?.schoolCode ||
      subscription?.school?.code ||
      subscription?.schoolCode ||
      "-"
    );
  };

  const getPlanName = (subscription) => {
    return subscription?.plan?.name || subscription?.planName || "Unknown Plan";
  };

  const getPlanById = (planId) => {
    return plans.find((plan) => Number(plan.id) === Number(planId));
  };

  // =========================================================
  // FETCH DASHBOARD
  // =========================================================

  const fetchDashboard = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/admin/subscriptions/dashboard",
        authConfig(),
      );

      setDashboard(response.data || {});
    } catch (error) {
      console.error("Failed to fetch subscription dashboard:", error);
    }
  };

  // =========================================================
  // FETCH SCHOOLS
  // =========================================================

  const fetchSchools = async () => {
    try {
      const response = await axiosInstance.get("/api/school/all", authConfig());

      setSchools(response.data || []);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
      setSchools([]);
    }
  };

  // =========================================================
  // FETCH PLANS
  // =========================================================

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/admin/subscriptions/plans",
        authConfig(),
      );

      setPlans(response.data || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setPlans([]);
    }
  };

  // =========================================================
  // FETCH SUBSCRIPTIONS
  // =========================================================

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/admin/subscriptions",
        authConfig(),
      );

      setSubscriptions(response.data || []);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);

      setSubscriptions([]);
    }
  };

  // =========================================================
  // FETCH PAYMENTS
  // =========================================================

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/admin/subscriptions/payments",
        authConfig(),
      );

      setPayments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPayments([]);
    }
  };

  // =========================================================
  // FETCH STUDENT COUNT
  // =========================================================

  const fetchStudentCount = async (schoolId) => {
    if (!schoolId) return 0;

    try {
      const response = await axiosInstance.get(
        `/api/admin/subscriptions/school/${schoolId}/student-count`,
        authConfig(),
      );

      const count = Number(response.data || 0);

      setStudentCounts((prev) => ({
        ...prev,
        [schoolId]: count,
      }));

      return count;
    } catch (error) {
      console.error("Failed to fetch student count:", error);

      setStudentCounts((prev) => ({
        ...prev,
        [schoolId]: 0,
      }));

      return 0;
    }
  };

  // =========================================================
  // LOAD ALL
  // =========================================================

  const loadAllData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchDashboard(),
        fetchSchools(),
        fetchPlans(),
        fetchSubscriptions(),
        fetchPayments(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // =========================================================
  // PLAN CALCULATION
  // =========================================================

  const selectedSchoolStudentCount = Number(
    studentCounts[subscriptionForm.schoolId] || 0,
  );

  const selectedPlan = useMemo(() => {
    return getPlanById(subscriptionForm.planId);
  }, [subscriptionForm.planId, plans]);

  const calculateRecurringAmount = () => {
    if (!selectedPlan) return 0;

    const price = Number(selectedPlan.price || 0);

    if (selectedPlan.billingType === "FIXED") {
      return price;
    }

    return price * selectedSchoolStudentCount;
  };

  const calculateSetupFee = () => {
    if (!selectedPlan) return 0;

    const count = selectedSchoolStudentCount;

    switch (selectedPlan.setupFeeType) {
      case "PER_STUDENT":
        return count * Number(selectedPlan.setupFeePerStudent || 0);

      case "UP_TO_STUDENT":
        if (count <= Number(selectedPlan.setupFeeUpToStudents || 0)) {
          return Number(selectedPlan.setupFeeAmount || 0);
        }

        return 0;

      case "NONE":
      default:
        return 0;
    }
  };

  const firstCollectionAmount =
    calculateRecurringAmount() + calculateSetupFee();

  // =========================================================
  // CREATE / UPDATE PLAN
  // =========================================================

  const openCreatePlan = () => {
    setEditingPlan(null);
    setPlanForm(initialPlanForm);
    setShowPlanModal(true);
  };

  const openEditPlan = (plan) => {
    setEditingPlan(plan);

    setPlanForm({
      name: plan.name || "",
      billingType: plan.billingType || "PER_STUDENT",
      studentLimit:
        plan.studentLimit !== null && plan.studentLimit !== undefined
          ? plan.studentLimit
          : "",
      price: plan.price ?? "",
      duration: plan.duration || "MONTHLY",

      setupFeeType: plan.setupFeeType || "NONE",
      setupFeePerStudent: plan.setupFeePerStudent ?? "",
      setupFeeUpToStudents: plan.setupFeeUpToStudents ?? "",
      setupFeeAmount: plan.setupFeeAmount ?? "",

      description: plan.description || "",
    });

    setShowPlanModal(true);
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();

    if (!planForm.name.trim()) {
      showMessage("error", "Plan name is required.");
      return;
    }

    if (!planForm.price || Number(planForm.price) <= 0) {
      showMessage("error", "Plan price must be greater than zero.");
      return;
    }

    if (
      planForm.billingType === "PER_STUDENT" &&
      (!planForm.studentLimit || Number(planForm.studentLimit) <= 0)
    ) {
      showMessage("error", "Student limit is required for Per Student plan.");
      return;
    }

    if (
      planForm.setupFeeType === "PER_STUDENT" &&
      (!planForm.setupFeePerStudent || Number(planForm.setupFeePerStudent) <= 0)
    ) {
      showMessage("error", "Setup fee per student must be greater than zero.");
      return;
    }

    if (
      planForm.setupFeeType === "UP_TO_STUDENT" &&
      (!planForm.setupFeeUpToStudents ||
        Number(planForm.setupFeeUpToStudents) <= 0)
    ) {
      showMessage("error", "Setup fee student limit is required.");
      return;
    }

    if (
      planForm.setupFeeType === "UP_TO_STUDENT" &&
      (!planForm.setupFeeAmount || Number(planForm.setupFeeAmount) <= 0)
    ) {
      showMessage("error", "Setup fee amount must be greater than zero.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: planForm.name.trim(),
        billingType: planForm.billingType,

        studentLimit:
          planForm.billingType === "PER_STUDENT"
            ? Number(planForm.studentLimit)
            : null,

        price: Number(planForm.price),

        duration: planForm.duration,

        setupFeeType: planForm.setupFeeType,

        setupFeePerStudent:
          planForm.setupFeeType === "PER_STUDENT"
            ? Number(planForm.setupFeePerStudent)
            : null,

        setupFeeUpToStudents:
          planForm.setupFeeType === "UP_TO_STUDENT"
            ? Number(planForm.setupFeeUpToStudents)
            : null,

        setupFeeAmount:
          planForm.setupFeeType === "UP_TO_STUDENT"
            ? Number(planForm.setupFeeAmount)
            : null,

        description: planForm.description?.trim() || null,
      };

      if (editingPlan) {
        await axiosInstance.put(
          `/api/admin/subscriptions/plans/${editingPlan.id}`,
          payload,
          authConfig(),
        );

        showMessage("success", "Subscription plan updated successfully.");
      } else {
        await axiosInstance.post(
          "/api/admin/subscriptions/plans",
          payload,
          authConfig(),
        );

        showMessage("success", "Subscription plan created successfully.");
      }

      setShowPlanModal(false);
      setEditingPlan(null);
      setPlanForm(initialPlanForm);

      await Promise.all([fetchPlans(), fetchDashboard()]);
    } catch (error) {
      console.error("Plan save failed:", error);

      showMessage(
        "error",
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to save subscription plan.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // TOGGLE PLAN
  // =========================================================

  const handleTogglePlan = async (plan) => {
    try {
      await axiosInstance.put(
        `/api/admin/subscriptions/plans/${plan.id}/toggle`,
        {},
        authConfig(),
      );

      showMessage(
        "success",
        `Plan ${plan.active ? "deactivated" : "activated"} successfully.`,
      );

      await Promise.all([fetchPlans(), fetchDashboard()]);
    } catch (error) {
      console.error("Toggle plan failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Unable to change plan status.",
      );
    }
  };

  // =========================================================
  // DELETE PLAN
  // =========================================================

  const handleDeletePlan = async (plan) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${plan.name}"?`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(
        `/api/admin/subscriptions/plans/${plan.id}`,
        authConfig(),
      );

      showMessage("success", "Subscription plan deleted successfully.");

      await Promise.all([fetchPlans(), fetchDashboard()]);
    } catch (error) {
      console.error("Delete plan failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Plan cannot be deleted.",
      );
    }
  };

  // =========================================================
  // VIEW PLAN
  // =========================================================

  const openPlanView = (plan) => {
    // setSelectedPlan(plan);
    setShowPlanView(true);
  };

  // =========================================================
  // SCHOOL CHANGE
  // =========================================================

  const handleSchoolChange = async (schoolId) => {
    setSubscriptionForm((prev) => ({
      ...prev,
      schoolId,
    }));

    if (schoolId) {
      await fetchStudentCount(schoolId);
    }
  };

  // =========================================================
  // CREATE SUBSCRIPTION
  // =========================================================

  const openCreateSubscription = () => {
    setSubscriptionForm({
      schoolId: "",
      planId: "",
      startDate: new Date().toISOString().split("T")[0],
      autoRenew: false,
    });

    setShowSubscriptionModal(true);
  };

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();

    if (!subscriptionForm.schoolId) {
      showMessage("error", "Please select a school.");
      return;
    }

    if (!subscriptionForm.planId) {
      showMessage("error", "Please select a subscription plan.");
      return;
    }

    try {
      setSaving(true);

      // IMPORTANT:
      // Do NOT send studentCount or amount.
      // Backend calculates both from DB.

      const payload = {
        schoolId: Number(subscriptionForm.schoolId),
        planId: Number(subscriptionForm.planId),
        startDate: subscriptionForm.startDate,
        autoRenew: Boolean(subscriptionForm.autoRenew),
      };

      const response = await axiosInstance.post(
        "/api/admin/subscriptions",
        payload,
        authConfig(),
      );

      const createdSubscription = response.data;

      showMessage(
        "success",
        "Subscription created successfully. Record the required payment(s).",
      );

      setShowSubscriptionModal(false);

      await Promise.all([
        fetchSubscriptions(),
        fetchPayments(),
        fetchDashboard(),
      ]);

      // Automatically open payment modal for first recurring payment.
      if (createdSubscription?.id) {
        setTimeout(() => {
          openPaymentModal(createdSubscription, "SUBSCRIPTION");
        }, 250);
      }
    } catch (error) {
      console.error("Create subscription failed:", error);

      showMessage(
        "error",
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to create subscription.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // VIEW SUBSCRIPTION
  // =========================================================

  const openSubscriptionView = (subscription) => {
    setSelectedSubscription(subscription);
    setShowSubscriptionView(true);
  };

  // =========================================================
  // PAYMENT MODAL
  // =========================================================

  const openPaymentModal = (subscription, paymentType = "SUBSCRIPTION") => {
    setSelectedSubscription(subscription);

    const requiredAmount =
      paymentType === "SETUP_FEE"
        ? Number(subscription.setupFeeAmount || 0)
        : Number(subscription.amount || 0);

    setPaymentForm({
      subscriptionId: subscription.id,
      paymentType,
      amount: requiredAmount > 0 ? requiredAmount : "",
      paymentMode: "CASH",
      paymentDate: new Date().toISOString().split("T")[0],
      referenceNumber: "",
      notes: "",
    });

    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentForm.subscriptionId) {
      showMessage("error", "Subscription is required.");
      return;
    }

    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
      showMessage("error", "Payment amount must be greater than zero.");
      return;
    }

    if (
      paymentForm.paymentMode === "UPI" &&
      !paymentForm.referenceNumber.trim()
    ) {
      showMessage("error", "UPI reference number is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        subscriptionId: Number(paymentForm.subscriptionId),

        paymentType: paymentForm.paymentType,

        amount: Number(paymentForm.amount),

        paymentMode: paymentForm.paymentMode,

        paymentDate: paymentForm.paymentDate,

        referenceNumber: paymentForm.referenceNumber?.trim() || null,

        notes: paymentForm.notes?.trim() || null,
      };

      await axiosInstance.post(
        "/api/admin/subscriptions/payments",
        payload,
        authConfig(),
      );

      showMessage(
        "success",
        "Payment recorded successfully. It is now pending verification.",
      );

      setShowPaymentModal(false);

      await Promise.all([
        fetchPayments(),
        fetchSubscriptions(),
        fetchDashboard(),
      ]);
    } catch (error) {
      console.error("Record payment failed:", error);

      showMessage(
        "error",
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to record payment.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // VERIFY PAYMENT
  // =========================================================

  const handleVerifyPayment = async (payment) => {
    const confirmed = window.confirm(
      `Verify payment ${payment.invoiceNumber || ""}?`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.put(
        `/api/admin/subscriptions/payments/${payment.id}/verify`,
        {},
        authConfig(),
      );

      showMessage("success", "Payment verified successfully.");

      await Promise.all([
        fetchPayments(),
        fetchSubscriptions(),
        fetchDashboard(),
      ]);
    } catch (error) {
      console.error("Verify payment failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Unable to verify payment.",
      );
    }
  };

  // =========================================================
  // REJECT PAYMENT
  // =========================================================

  const handleRejectPayment = async (payment) => {
    const confirmed = window.confirm(
      `Reject payment ${payment.invoiceNumber || ""}?`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.put(
        `/api/admin/subscriptions/payments/${payment.id}/reject`,
        {},
        authConfig(),
      );

      showMessage("success", "Payment rejected successfully.");

      await Promise.all([
        fetchPayments(),
        fetchSubscriptions(),
        fetchDashboard(),
      ]);
    } catch (error) {
      console.error("Reject payment failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Unable to reject payment.",
      );
    }
  };

  // =========================================================
  // REFUND PAYMENT
  // =========================================================

  const handleRefundPayment = async (payment) => {
    const confirmed = window.confirm(
      `Are you sure you want to refund payment ${payment.invoiceNumber || ""}?`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.put(
        `/api/admin/subscriptions/payments/${payment.id}/refund`,
        {},
        authConfig(),
      );

      showMessage("success", "Payment refunded successfully.");

      await Promise.all([
        fetchPayments(),
        fetchSubscriptions(),
        fetchDashboard(),
      ]);
    } catch (error) {
      console.error("Refund payment failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Unable to refund payment.",
      );
    }
  };

  // =========================================================
  // RENEW
  // =========================================================

  const handleRenewSubscription = async (subscription) => {
    const confirmed = window.confirm(
      `Renew subscription for ${getSchoolName(subscription)}?`,
    );

    if (!confirmed) return;

    try {
      setSaving(true);

      const response = await axiosInstance.post(
        `/api/admin/subscriptions/${subscription.id}/renew`,
        {},
        authConfig(),
      );

      showMessage(
        "success",
        "Subscription renewed successfully. Record the recurring payment.",
      );

      await Promise.all([
        fetchSubscriptions(),
        fetchPayments(),
        fetchDashboard(),
      ]);

      if (response.data?.id) {
        setTimeout(() => {
          openPaymentModal(response.data, "SUBSCRIPTION");
        }, 250);
      }
    } catch (error) {
      console.error("Renew subscription failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Unable to renew subscription.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancelSubscription = async (subscription) => {
    const confirmed = window.confirm(
      `Cancel subscription for ${getSchoolName(subscription)}?`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.put(
        `/api/admin/subscriptions/${subscription.id}/cancel`,
        {},
        authConfig(),
      );

      showMessage("success", "Subscription cancelled successfully.");

      await Promise.all([fetchSubscriptions(), fetchDashboard()]);
    } catch (error) {
      console.error("Cancel subscription failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Unable to cancel subscription.",
      );
    }
  };

  // =========================================================
  // DELETE SUBSCRIPTION
  // =========================================================

  const handleDeleteSubscription = async (subscription) => {
    const confirmed = window.confirm(
      `Delete subscription for ${getSchoolName(
        subscription,
      )}? Payment records must not exist.`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(
        `/api/admin/subscriptions/${subscription.id}`,
        authConfig(),
      );

      showMessage("success", "Subscription deleted successfully.");

      await Promise.all([fetchSubscriptions(), fetchDashboard()]);
    } catch (error) {
      console.error("Delete subscription failed:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Subscription cannot be deleted.",
      );
    }
  };

  // =========================================================
  // RECEIPT PDF
  // =========================================================

  const generateReceiptPdf = (payment) => {
    const doc = new jsPDF();

    const schoolName =
      payment?.school?.schoolName || payment?.school?.name || "School";

    const schoolCode =
      payment?.school?.schoolCode || payment?.school?.code || "-";

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("ZYNTaks Education", 105, 20, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("School Management & Subscription Platform", 105, 27, {
      align: "center",
    });

    doc.setDrawColor(220, 230, 245);
    doc.line(15, 34, 195, 34);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT RECEIPT", 105, 45, {
      align: "center",
    });

    const rows = [
      ["Invoice Number", payment.invoiceNumber || "-"],
      ["School", schoolName],
      ["School Code", schoolCode],
      [
        "Payment Type",
        payment.paymentType === "SETUP_FEE" ? "Setup Fee" : "Subscription",
      ],
      ["Amount", money(payment.amount)],
      ["Payment Mode", payment.paymentMode || "-"],
      ["Payment Date", formatDate(payment.paymentDate)],
      ["Reference Number", payment.referenceNumber || "-"],
      ["Status", paymentStatusLabel(payment.status)],
    ];

    autoTable(doc, {
      startY: 55,
      head: [["Particular", "Details"]],
      body: rows,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: {
          cellWidth: 60,
        },
        1: {
          cellWidth: 115,
        },
      },
    });

    const finalY = doc.lastAutoTable?.finalY || 140;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text("Thank you for choosing ZYNTaks Education.", 105, finalY + 20, {
      align: "center",
    });

    doc.setFontSize(8);
    doc.text("This is a computer generated receipt.", 105, finalY + 27, {
      align: "center",
    });

    doc.save(`${payment.invoiceNumber || "ZYNTaks-Receipt"}.pdf`);
  };

  // =========================================================
  // PRINT RECEIPT
  // =========================================================

  const printReceipt = (payment) => {
    const schoolName =
      payment?.school?.schoolName || payment?.school?.name || "School";

    const schoolCode =
      payment?.school?.schoolCode || payment?.school?.code || "-";

    const printWindow = window.open("", "_blank", "width=850,height=700");

    if (!printWindow) {
      showMessage("error", "Please allow popups to print receipt.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #172033;
            }

            .receipt {
              max-width: 700px;
              margin: auto;
              border: 1px solid #dbeafe;
              border-radius: 14px;
              padding: 30px;
            }

            .header {
              text-align: center;
              border-bottom: 1px solid #dbeafe;
              padding-bottom: 20px;
              margin-bottom: 25px;
            }

            .brand {
              font-size: 24px;
              font-weight: 700;
              color: #2563eb;
            }

            .subtitle {
              color: #64748b;
              margin-top: 5px;
              font-size: 13px;
            }

            h2 {
              text-align: center;
              font-size: 18px;
              margin: 25px 0;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            td {
              padding: 12px;
              border: 1px solid #e5e7eb;
              font-size: 13px;
            }

            td:first-child {
              width: 38%;
              font-weight: 600;
              background: #eff6ff;
            }

            .footer {
              text-align: center;
              margin-top: 30px;
              color: #64748b;
              font-size: 12px;
            }
          </style>
        </head>

        <body>
          <div class="receipt">

            <div class="header">
              <div class="brand">
                ZYNTaks Education
              </div>

              <div class="subtitle">
                School Management & Subscription Platform
              </div>
            </div>

            <h2>PAYMENT RECEIPT</h2>

            <table>
              <tr>
                <td>Invoice Number</td>
                <td>${payment.invoiceNumber || "-"}</td>
              </tr>

              <tr>
                <td>School</td>
                <td>${schoolName}</td>
              </tr>

              <tr>
                <td>School Code</td>
                <td>${schoolCode}</td>
              </tr>

              <tr>
                <td>Payment Type</td>
                <td>
                  ${
                    payment.paymentType === "SETUP_FEE"
                      ? "Setup Fee"
                      : "Subscription"
                  }
                </td>
              </tr>

              <tr>
                <td>Amount</td>
                <td>${money(payment.amount)}</td>
              </tr>

              <tr>
                <td>Payment Mode</td>
                <td>${payment.paymentMode || "-"}</td>
              </tr>

              <tr>
                <td>Payment Date</td>
                <td>${formatDate(payment.paymentDate)}</td>
              </tr>

              <tr>
                <td>Reference Number</td>
                <td>${payment.referenceNumber || "-"}</td>
              </tr>

              <tr>
                <td>Status</td>
                <td>${paymentStatusLabel(payment.status)}</td>
              </tr>
            </table>

            <div class="footer">
              Thank you for choosing ZYNTaks Education.
              <br />
              This is a computer generated receipt.
            </div>

          </div>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredPlans = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return plans;

    return plans.filter((plan) => {
      return (
        plan.name?.toLowerCase().includes(text) ||
        plan.billingType?.toLowerCase().includes(text) ||
        plan.duration?.toLowerCase().includes(text) ||
        plan.setupFeeType?.toLowerCase().includes(text)
      );
    });
  }, [plans, search]);

  const filteredSubscriptions = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return subscriptions;

    return subscriptions.filter((subscription) => {
      return (
        getSchoolName(subscription).toLowerCase().includes(text) ||
        getSchoolCode(subscription).toLowerCase().includes(text) ||
        getPlanName(subscription).toLowerCase().includes(text) ||
        subscription.status?.toLowerCase().includes(text)
      );
    });
  }, [subscriptions, search]);

  const filteredPayments = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return payments;

    return payments.filter((payment) => {
      const schoolName =
        payment?.school?.schoolName || payment?.school?.name || "";

      return (
        schoolName.toLowerCase().includes(text) ||
        payment.invoiceNumber?.toLowerCase().includes(text) ||
        payment.paymentType?.toLowerCase().includes(text) ||
        payment.paymentMode?.toLowerCase().includes(text) ||
        payment.status?.toLowerCase().includes(text)
      );
    });
  }, [payments, search]);

  // =========================================================
  // STATS
  // =========================================================

  const totalSchools = dashboard.totalSchools ?? schools.length;

  const activeSubscriptions =
    dashboard.activeSubscriptions ??
    subscriptions.filter((item) => item.status === "ACTIVE").length;

  const totalRevenue = dashboard.totalRevenue ?? 0;

  const pendingPayments =
    dashboard.pendingPayments ??
    payments.filter((item) => item.status === "PENDING").length;

  // =========================================================
  // PAYMENT BUTTON CONDITION
  // =========================================================

  const canRecordPayment = (subscription) => {
    return subscription?.status === "PENDING";
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <>
      <div className="mt-2 p-2">
        <div className="mx-0 mt-1 mb-3">
          <div
            className="rounded-4 shadow overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
              border: "1px solid #dbeafe",
            }}
          >
            <div className="p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                {/* LEFT */}

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                      flexShrink: 0,
                    }}
                  >
                    <FaCreditCard size={27} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      Subscription Management
                    </h5>

                    <div className="text-muted small">
                      SaaS Management &nbsp;/&nbsp; School Subscription
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      fontSize: "13px",
                    }}
                  >
                    <FaUniversity className="me-1" />
                    Saa Management
                  </span>

                  {activeTab === "plans" && (
                    <button
                      className="premium-primary-btn"
                      onClick={openCreatePlan}
                    >
                      <FaPlus />
                      New Plan
                    </button>
                  )}

                  {activeTab === "subscriptions" && (
                    <button
                      className="premium-primary-btn"
                      onClick={openCreateSubscription}
                    >
                      <FaPlus />
                      New Subscription
                    </button>
                  )}

                  {activeTab === "payments" && (
                    <button
                      className="premium-secondary-btn"
                      onClick={loadAllData}
                      disabled={loading}
                    >
                      Refresh
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* BREADCRUMB */}

            <div
              className="px-4 py-2"
              style={{
                backgroundColor: "rgba(239,246,255,.75)",
                borderTop: "1px solid #e0ecff",
              }}
            >
              <small className="text-muted">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </span>
                &nbsp;›&nbsp;
                <span>Subscription Management</span>
                &nbsp;›&nbsp;
                <span className="text-primary fw-semibold">
                  School Subscriptions
                </span>
              </small>
            </div>
          </div>
        </div>

        {message.text && (
          <div
            className={`subscription-alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            {message.type === "success" ? <FaCheckCircle /> : <FaTimes />}

            <span>{message.text}</span>

            <button
              onClick={() =>
                setMessage({
                  type: "",
                  text: "",
                })
              }
            >
              <FaTimes />
            </button>
          </div>
        )}

      
        <div className="subscription-stats-grid">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaSchool />
            </div>

            <div className="stat-content">
              <span>Total Schools</span>
              <h3>{numberFormat(totalSchools)}</h3>
              <small>Registered schools</small>
            </div>
          </div>

          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Active Subscriptions</span>
              <h3>{numberFormat(activeSubscriptions)}</h3>
              <small>Currently active</small>
            </div>
          </div>

          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaWallet />
            </div>

            <div className="stat-content">
              <span>Total Revenue</span>
              <h3>{money(totalRevenue)}</h3>
              <small>Verified payments</small>
            </div>
          </div>

          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>Pending Payments</span>
              <h3>{numberFormat(pendingPayments)}</h3>
              <small>Awaiting verification</small>
            </div>
          </div>
        </div>

     

        <div className="subscription-tabs p-3 shadow rounded-4">
          <button
            className={
              activeTab === "plans"
                ? "subscription-tab active"
                : "subscription-tab"
            }
            onClick={() => {
              setActiveTab("plans");
              setSearch("");
            }}
          >
            <FaUniversity />
            Subscription Plans
            <span>{plans.length}</span>
          </button>

          <button
            className={
              activeTab === "subscriptions"
                ? "subscription-tab active"
                : "subscription-tab"
            }
            onClick={() => {
              setActiveTab("subscriptions");
              setSearch("");
            }}
          >
            <FaSchool />
            Subscriptions
            <span>{subscriptions.length}</span>
          </button>

          <button
            className={
              activeTab === "payments"
                ? "subscription-tab active"
                : "subscription-tab"
            }
            onClick={() => {
              setActiveTab("payments");
              setSearch("");
            }}
          >
            <FaMoneyBillWave />
            Payments
            <span>{payments.length}</span>
          </button>
        </div>

        {/* =====================================================
          TOOLBAR
      ====================================================== */}

        <div className="subscription-toolbar shadow rounded-4">

          
          <div className="toolbar-title">
            <div className="toolbar-title-icon">
              {activeTab === "plans" ? (
                <FaUniversity />
              ) : activeTab === "subscriptions" ? (
                <FaSchool />
              ) : (
                <FaMoneyBillWave />
              )}
            </div>

            <div>
              <h6>
                {activeTab === "plans"
                  ? "Subscription Plans"
                  : activeTab === "subscriptions"
                    ? "School Subscriptions"
                    : "Payment Records"}
              </h6>

              <small>
                {activeTab === "plans"
                  ? "Create and manage SaaS pricing plans"
                  : activeTab === "subscriptions"
                    ? "Manage school subscriptions"
                    : "Manage and verify subscription payments"}
              </small>
            </div>
          </div>

          <div className="toolbar-actions">
            <div className="subscription-search">
              <FaSearch />

              <input
                type="text"
                placeholder={
                  activeTab === "plans"
                    ? "Search plans..."
                    : activeTab === "subscriptions"
                      ? "Search school or plan..."
                      : "Search invoice or school..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button onClick={() => setSearch("")}>
                  <FaTimes />
                </button>
              )}
            </div>

            <button
              className="refresh-button"
              onClick={loadAllData}
              disabled={loading}
            >
              Refresh
            </button>
          </div>
        </div>


        {loading ? (
          <div className="subscription-loading">
            <div className="premium-loader"></div>

            <h6>Loading subscription data...</h6>

            <small>Please wait while we fetch the records.</small>
          </div>
        ) : (
          <>
            {/* =================================================
              PLANS
          ================================================== */}

            {activeTab === "plans" && (
              <div className="plans-grid shadow">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <div
                      className={`plan-card ${
                        plan.active ? "" : "plan-inactive"
                      }`}
                      key={plan.id}
                    >
                      <div className="plan-card-top">
                        <div className="plan-icon">
                          <FaUniversity />
                        </div>

                        <div className="plan-status">
                          <span
                            className={
                              plan.active
                                ? "status-badge status-active"
                                : "status-badge status-inactive"
                            }
                          >
                            {plan.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <div className="plan-details">
                        <h5>{plan.name}</h5>

                        <p>{plan.description || "Subscription plan"}</p>

                        <div className="plan-price">
                          {money(plan.price)}

                          <span>/ {durationLabel(plan.duration)}</span>
                        </div>

                        <div className="plan-meta">
                          <div>
                            <span>Billing</span>
                            <strong>{billingLabel(plan.billingType)}</strong>
                          </div>

                          <div>
                            <span>Student Limit</span>
                            <strong>
                              {plan.billingType === "FIXED"
                                ? "Unlimited"
                                : numberFormat(plan.studentLimit)}
                            </strong>
                          </div>
                        </div>

                        <div className="setup-fee-box">
                          <div className="setup-title">Setup Fee</div>

                          {plan.setupFeeType === "NONE" && (
                            <strong>No Setup Fee</strong>
                          )}

                          {plan.setupFeeType === "PER_STUDENT" && (
                            <strong>
                              {money(plan.setupFeePerStudent)} / student
                            </strong>
                          )}

                          {plan.setupFeeType === "UP_TO_STUDENT" && (
                            <strong>
                              {money(plan.setupFeeAmount)} up to{" "}
                              {numberFormat(plan.setupFeeUpToStudents)} students
                            </strong>
                          )}
                        </div>
                      </div>

                      <div className="plan-actions">
                        <button
                          className="plan-action view"
                          title="View"
                          onClick={() => openPlanView(plan)}
                        >
                          <FaEye />
                        </button>

                        <button
                          className="plan-action edit"
                          title="Edit"
                          onClick={() => openEditPlan(plan)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="plan-action toggle"
                          title={plan.active ? "Deactivate" : "Activate"}
                          onClick={() => handleTogglePlan(plan)}
                        >
                          {plan.active ? <FaToggleOn /> : <FaToggleOff />}
                        </button>

                        <button
                          className="plan-action delete"
                          title="Delete"
                          onClick={() => handleDeletePlan(plan)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state full-width">
                    <div className="empty-icon">
                      <FaUniversity />
                    </div>

                    <h6>No Subscription Plans</h6>

                    <p>Create your first subscription plan to get started.</p>

                    <button
                      className="premium-primary-btn"
                      onClick={openCreatePlan}
                    >
                      <FaPlus />
                      Create Plan
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* =================================================
              SUBSCRIPTIONS
          ================================================== */}

            {activeTab === "subscriptions" && (
              <div className="data-card shadow">
                <div className="table-responsive">
                  <table className="subscription-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>School</th>
                        <th>Plan</th>
                        <th>Students</th>
                        <th>Recurring</th>
                        <th>Setup Fee</th>
                        <th>Start</th>
                        <th>Expiry</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredSubscriptions.length > 0 ? (
                        filteredSubscriptions.map((subscription, index) => (
                          <tr key={subscription.id}>
                            <td>
                              <span className="row-number">{index + 1}</span>
                            </td>

                            <td>
                              <div className="school-cell">
                                <div className="school-avatar">
                                  <FaSchool />
                                </div>

                                <div>
                                  <strong>{getSchoolName(subscription)}</strong>

                                  <small>{getSchoolCode(subscription)}</small>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="plan-cell">
                                <strong>{getPlanName(subscription)}</strong>

                                <small>
                                  {durationLabel(subscription.plan?.duration)}
                                </small>
                              </div>
                            </td>

                            <td>
                              <div className="student-count-cell">
                                <FaUsers />

                                <span>
                                  {subscription.plan?.billingType === "FIXED"
                                    ? "Unlimited"
                                    : numberFormat(subscription.studentCount)}
                                </span>
                              </div>
                            </td>

                            <td>
                              <strong className="amount-value">
                                {money(subscription.amount)}
                              </strong>
                            </td>

                            <td>
                              <strong className="setup-amount">
                                {money(subscription.setupFeeAmount)}
                              </strong>
                            </td>

                            <td>{formatDate(subscription.startDate)}</td>

                            <td>{formatDate(subscription.expiryDate)}</td>

                            <td>
                              <span
                                className={`status-badge subscription-status-${(
                                  subscription.status || ""
                                ).toLowerCase()}`}
                              >
                                {subscriptionStatusLabel(subscription.status)}
                              </span>
                            </td>

                            <td>
                              <div className="action-buttons">
                                <button
                                  className="table-action view"
                                  title="View"
                                  onClick={() =>
                                    openSubscriptionView(subscription)
                                  }
                                >
                                  <FaEye />
                                </button>

                                {canRecordPayment(subscription) && (
                                  <>
                                    <button
                                      className="table-action payment"
                                      title="Subscription Payment"
                                      onClick={() =>
                                        openPaymentModal(
                                          subscription,
                                          "SUBSCRIPTION",
                                        )
                                      }
                                    >
                                      <FaCreditCard />
                                    </button>

                                    {Number(subscription.setupFeeAmount || 0) >
                                      0 && (
                                      <button
                                        className="table-action setup"
                                        title="Setup Fee Payment"
                                        onClick={() =>
                                          openPaymentModal(
                                            subscription,
                                            "SETUP_FEE",
                                          )
                                        }
                                      >
                                        <FaWallet />
                                      </button>
                                    )}
                                  </>
                                )}

                                {(subscription.status === "EXPIRING" ||
                                  subscription.status === "EXPIRED") && (
                                  <button
                                    className="table-action renew"
                                    title="Renew"
                                    onClick={() =>
                                      handleRenewSubscription(subscription)
                                    }
                                  >
                                    <FaRedo />
                                  </button>
                                )}

                                {subscription.status !== "CANCELLED" && (
                                  <button
                                    className="table-action cancel"
                                    title="Cancel"
                                    onClick={() =>
                                      handleCancelSubscription(subscription)
                                    }
                                  >
                                    <FaBan />
                                  </button>
                                )}

                                <button
                                  className="table-action delete"
                                  title="Delete"
                                  onClick={() =>
                                    handleDeleteSubscription(subscription)
                                  }
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="empty-table">
                            <div className="empty-icon">
                              <FaSchool />
                            </div>

                            <h6>No Subscriptions Found</h6>

                            <p>
                              Create a subscription for a school to see it here.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {filteredSubscriptions.length > 0 && (
                  <div className="table-footer">
                    Showing <strong>{filteredSubscriptions.length}</strong> of{" "}
                    <strong>{subscriptions.length}</strong> subscriptions
                  </div>
                )}
              </div>
            )}

            {/* =================================================
              PAYMENTS
          ================================================== */}

            {activeTab === "payments" && (
              <div className="data-card shadow">
                <div className="table-responsive">
                  <table className="subscription-table payment-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Invoice</th>
                        <th>School</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Mode</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment, index) => (
                          <tr key={payment.id}>
                            <td>
                              <span className="row-number">{index + 1}</span>
                            </td>

                            <td>
                              <strong className="invoice-number">
                                {payment.invoiceNumber || "-"}
                              </strong>
                            </td>

                            <td>
                              <div className="school-cell">
                                <div className="school-avatar payment-school">
                                  <FaSchool />
                                </div>

                                <div>
                                  <strong>
                                    {payment?.school?.schoolName ||
                                      payment?.school?.name ||
                                      "Unknown School"}
                                  </strong>

                                  <small>
                                    {payment?.school?.schoolCode || "-"}
                                  </small>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span
                                className={`payment-type ${
                                  payment.paymentType === "SETUP_FEE"
                                    ? "setup"
                                    : "subscription"
                                }`}
                              >
                                {payment.paymentType === "SETUP_FEE"
                                  ? "Setup Fee"
                                  : "Subscription"}
                              </span>
                            </td>

                            <td>
                              <strong className="amount-value">
                                {money(payment.amount)}
                              </strong>
                            </td>

                            <td>
                              <span className="payment-mode">
                                {payment.paymentMode || "-"}
                              </span>
                            </td>

                            <td>{formatDate(payment.paymentDate)}</td>

                            <td>
                              <span
                                className={`status-badge payment-status-${(
                                  payment.status || ""
                                ).toLowerCase()}`}
                              >
                                {paymentStatusLabel(payment.status)}
                              </span>
                            </td>

                            <td>
                              <div className="action-buttons">
                                {payment.status === "PENDING" && (
                                  <>
                                    <button
                                      className="table-action verify"
                                      title="Verify"
                                      onClick={() =>
                                        handleVerifyPayment(payment)
                                      }
                                    >
                                      <FaCheckCircle />
                                    </button>

                                    <button
                                      className="table-action reject"
                                      title="Reject"
                                      onClick={() =>
                                        handleRejectPayment(payment)
                                      }
                                    >
                                      <FaTimes />
                                    </button>
                                  </>
                                )}

                                {payment.status === "VERIFIED" && (
                                  <>
                                    <button
                                      className="table-action pdf"
                                      title="Receipt PDF"
                                      onClick={() =>
                                        generateReceiptPdf(payment)
                                      }
                                    >
                                      <FaFilePdf />
                                    </button>

                                    <button
                                      className="table-action print"
                                      title="Print"
                                      onClick={() => printReceipt(payment)}
                                    >
                                      <FaPrint />
                                    </button>

                                    <button
                                      className="table-action refund"
                                      title="Refund"
                                      onClick={() =>
                                        handleRefundPayment(payment)
                                      }
                                    >
                                      <FaRedo />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="empty-table">
                            <div className="empty-icon">
                              <FaMoneyBillWave />
                            </div>

                            <h6>No Payment Records</h6>

                            <p>Payment records will appear here.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {filteredPayments.length > 0 && (
                  <div className="table-footer">
                    Showing <strong>{filteredPayments.length}</strong> of{" "}
                    <strong>{payments.length}</strong> payments
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* =====================================================
          PLAN MODAL
      ====================================================== */}

        {showPlanModal && (
          <div className="premium-modal-overlay">
            <div className="premium-modal plan-modal">
              <div className="premium-modal-header">
                <div>
                  <h5>
                    {editingPlan
                      ? "Edit Subscription Plan"
                      : "Create Subscription Plan"}
                  </h5>

                  <small>Configure pricing and setup fee</small>
                </div>

                <button onClick={() => setShowPlanModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handlePlanSubmit}>
                <div className="premium-modal-body">
                  <div className="form-section-title">
                    <FaUniversity />
                    Basic Plan Information
                  </div>

                  <div className="form-grid">
                    <div className="form-group full">
                      <label>Plan Name *</label>

                      <input
                        type="text"
                        value={planForm.name}
                        onChange={(e) =>
                          setPlanForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g. Starter Per Student"
                      />
                    </div>

                    <div className="form-group">
                      <label>Billing Type *</label>

                      <select
                        value={planForm.billingType}
                        onChange={(e) =>
                          setPlanForm((prev) => ({
                            ...prev,
                            billingType: e.target.value,
                          }))
                        }
                      >
                        <option value="PER_STUDENT">Per Student</option>

                        <option value="FIXED">Fixed</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Duration *</label>

                      <select
                        value={planForm.duration}
                        onChange={(e) =>
                          setPlanForm((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                      >
                        <option value="MONTHLY">Monthly</option>

                        <option value="QUARTERLY">Quarterly</option>

                        <option value="HALF_YEARLY">Half Yearly</option>

                        <option value="YEARLY">Yearly</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        Price *<small>Selected duration price</small>
                      </label>

                      <div className="money-input">
                        <span>₹</span>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={planForm.price}
                          onChange={(e) =>
                            setPlanForm((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {planForm.billingType === "PER_STUDENT" && (
                      <div className="form-group">
                        <label>Student Limit *</label>

                        <div className="number-input">
                          <FaUsers />

                          <input
                            type="number"
                            min="1"
                            value={planForm.studentLimit}
                            onChange={(e) =>
                              setPlanForm((prev) => ({
                                ...prev,
                                studentLimit: e.target.value,
                              }))
                            }
                            placeholder="e.g. 500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-section-title">
                    <FaWallet />
                    Setup Fee Configuration
                  </div>

                  <div className="form-grid">
                    <div className="form-group full">
                      <label>Setup Fee Type</label>

                      <select
                        value={planForm.setupFeeType}
                        onChange={(e) =>
                          setPlanForm((prev) => ({
                            ...prev,
                            setupFeeType: e.target.value,
                          }))
                        }
                      >
                        <option value="NONE">No Setup Fee</option>

                        <option value="PER_STUDENT">Per Student</option>

                        <option value="UP_TO_STUDENT">
                          Up To Student Limit
                        </option>
                      </select>
                    </div>

                    {planForm.setupFeeType === "PER_STUDENT" && (
                      <div className="form-group full">
                        <label>Setup Fee Per Student *</label>

                        <div className="money-input">
                          <span>₹</span>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={planForm.setupFeePerStudent}
                            onChange={(e) =>
                              setPlanForm((prev) => ({
                                ...prev,
                                setupFeePerStudent: e.target.value,
                              }))
                            }
                            placeholder="e.g. 50"
                          />
                        </div>

                        <small className="field-help">
                          Example: 350 students × ₹50 = ₹17,500 setup fee.
                        </small>
                      </div>
                    )}

                    {planForm.setupFeeType === "UP_TO_STUDENT" && (
                      <>
                        <div className="form-group">
                          <label>Up To Students *</label>

                          <div className="number-input">
                            <FaUsers />

                            <input
                              type="number"
                              min="1"
                              value={planForm.setupFeeUpToStudents}
                              onChange={(e) =>
                                setPlanForm((prev) => ({
                                  ...prev,
                                  setupFeeUpToStudents: e.target.value,
                                }))
                              }
                              placeholder="e.g. 500"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Setup Fee Amount *</label>

                          <div className="money-input">
                            <span>₹</span>

                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={planForm.setupFeeAmount}
                              onChange={(e) =>
                                setPlanForm((prev) => ({
                                  ...prev,
                                  setupFeeAmount: e.target.value,
                                }))
                              }
                              placeholder="e.g. 12000"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="form-section-title">
                    <FaEdit />
                    Description
                  </div>

                  <div className="form-group">
                    <label>Description</label>

                    <textarea
                      rows="3"
                      value={planForm.description}
                      onChange={(e) =>
                        setPlanForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe this subscription plan..."
                    />
                  </div>
                </div>

                <div className="premium-modal-footer">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setShowPlanModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="premium-primary-btn"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="button-spinner"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        {editingPlan ? "Update Plan" : "Create Plan"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =====================================================
          NEW SUBSCRIPTION MODAL
      ====================================================== */}

        {showSubscriptionModal && (
          <div className="premium-modal-overlay">
            <div className="premium-modal subscription-create-modal">
              <div className="premium-modal-header">
                <div>
                  <h5>New School Subscription</h5>

                  <small>
                    Create subscription and collect required payment
                  </small>
                </div>

                <button onClick={() => setShowSubscriptionModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubscriptionSubmit}>
                <div className="premium-modal-body">
                  <div className="form-section-title">
                    <FaSchool />
                    Subscription Information
                  </div>

                  <div className="form-grid">
                    <div className="form-group full">
                      <label>School *</label>

                      <select
                        value={subscriptionForm.schoolId}
                        onChange={(e) => handleSchoolChange(e.target.value)}
                      >
                        <option value="">Select School</option>

                        {schools
                          .filter((school) => school.active !== false)
                          .map((school) => (
                            <option key={school.id} value={school.id}>
                              {school.schoolName ||
                                school.name ||
                                `School #${school.id}`}{" "}
                              — {school.schoolCode || school.code || ""}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Subscription Plan *</label>

                      <select
                        value={subscriptionForm.planId}
                        onChange={(e) =>
                          setSubscriptionForm((prev) => ({
                            ...prev,
                            planId: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Plan</option>

                        {plans
                          .filter((plan) => plan.active === true)
                          .map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name} — {money(plan.price)} /{" "}
                              {durationLabel(plan.duration)}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Start Date</label>

                      <input
                        type="date"
                        value={subscriptionForm.startDate}
                        onChange={(e) =>
                          setSubscriptionForm((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {subscriptionForm.schoolId && (
                    <div className="student-preview-box">
                      <div className="preview-icon">
                        <FaUsers />
                      </div>

                      <div>
                        <span>Current Active Students</span>

                        <strong>
                          {numberFormat(selectedSchoolStudentCount)}
                        </strong>
                      </div>

                      <small>Calculated from backend</small>
                    </div>
                  )}

                  {selectedPlan && (
                    <div className="subscription-calculation">
                      <div className="calculation-header">
                        <div>
                          <strong>{selectedPlan.name}</strong>

                          <small>
                            {billingLabel(selectedPlan.billingType)} ·{" "}
                            {durationLabel(selectedPlan.duration)}
                          </small>
                        </div>
                      </div>

                      <div className="calculation-row">
                        <span>Recurring Amount</span>

                        <strong>{money(calculateRecurringAmount())}</strong>
                      </div>

                      <div className="calculation-row">
                        <span>One-time Setup Fee</span>

                        <strong>{money(calculateSetupFee())}</strong>
                      </div>

                      <div className="calculation-total">
                        <span>First Collection</span>

                        <strong>{money(firstCollectionAmount)}</strong>
                      </div>

                      <div className="calculation-note">
                        <FaCheckCircle />
                        Backend will independently calculate the final amount
                        from actual active students.
                      </div>
                    </div>
                  )}

                  <label className="auto-renew-checkbox">
                    <input
                      type="checkbox"
                      checked={subscriptionForm.autoRenew}
                      onChange={(e) =>
                        setSubscriptionForm((prev) => ({
                          ...prev,
                          autoRenew: e.target.checked,
                        }))
                      }
                    />

                    <span>Enable auto renewal</span>
                  </label>
                </div>

                <div className="premium-modal-footer">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setShowSubscriptionModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="premium-primary-btn"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="button-spinner"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <FaPlus />
                        Create Subscription
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =====================================================
          PAYMENT MODAL
      ====================================================== */}

        {showPaymentModal && (
          <div className="premium-modal-overlay">
            <div className="premium-modal payment-modal">
              <div className="premium-modal-header">
                <div>
                  <h5>
                    {paymentForm.paymentType === "SETUP_FEE"
                      ? "Setup Fee Payment"
                      : "Subscription Payment"}
                  </h5>

                  <small>
                    Record payment for {getSchoolName(selectedSubscription)}
                  </small>
                </div>

                <button onClick={() => setShowPaymentModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                <div className="premium-modal-body">
                  <div className="payment-summary">
                    <div>
                      <span>School</span>

                      <strong>{getSchoolName(selectedSubscription)}</strong>
                    </div>

                    <div>
                      <span>Invoice</span>

                      <strong>Generated by backend</strong>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Payment Type *</label>

                      <select
                        value={paymentForm.paymentType}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            paymentType: e.target.value,
                          }))
                        }
                      >
                        <option value="SUBSCRIPTION">Subscription</option>

                        <option value="SETUP_FEE">Setup Fee</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Amount *</label>

                      <div className="money-input">
                        <span>₹</span>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={paymentForm.amount}
                          onChange={(e) =>
                            setPaymentForm((prev) => ({
                              ...prev,
                              amount: e.target.value,
                            }))
                          }
                          placeholder="Payment amount"
                        />
                      </div>

                      <small className="field-help">
                        Backend validates the maximum pending amount.
                      </small>
                    </div>

                    <div className="form-group">
                      <label>Payment Mode *</label>

                      <select
                        value={paymentForm.paymentMode}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            paymentMode: e.target.value,
                          }))
                        }
                      >
                        <option value="CASH">Cash</option>

                        <option value="UPI">UPI</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Payment Date</label>

                      <input
                        type="date"
                        value={paymentForm.paymentDate}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            paymentDate: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {paymentForm.paymentMode === "UPI" && (
                      <div className="form-group full">
                        <label>UPI Reference Number *</label>

                        <input
                          type="text"
                          value={paymentForm.referenceNumber}
                          onChange={(e) =>
                            setPaymentForm((prev) => ({
                              ...prev,
                              referenceNumber: e.target.value,
                            }))
                          }
                          placeholder="Enter UPI transaction reference"
                        />
                      </div>
                    )}

                    <div className="form-group full">
                      <label>Notes</label>

                      <textarea
                        rows="3"
                        value={paymentForm.notes}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        placeholder="Optional payment notes..."
                      />
                    </div>
                  </div>

                  <div className="payment-pending-note">
                    <FaMoneyBillWave />

                    <div>
                      <strong>Payment will remain Pending</strong>

                      <span>
                        Admin must verify the payment before the subscription
                        becomes Active.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="premium-modal-footer">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="premium-primary-btn"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="button-spinner"></span>
                        Recording...
                      </>
                    ) : (
                      <>
                        <FaCreditCard />
                        Record Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =====================================================
          PLAN VIEW MODAL
      ====================================================== */}

        {showPlanView && selectedPlan && (
          <div className="premium-modal-overlay">
            <div className="premium-modal view-modal">
              <div className="premium-modal-header">
                <div>
                  <h5>Subscription Plan Details</h5>
                  <small>Complete plan information</small>
                </div>

                <button onClick={() => setShowPlanView(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="premium-modal-body">
                <div className="detail-profile">
                  <div className="detail-profile-icon">
                    <FaUniversity />
                  </div>

                  <div>
                    <h5>{selectedPlan.name}</h5>

                    <span
                      className={
                        selectedPlan.active
                          ? "status-badge status-active"
                          : "status-badge status-inactive"
                      }
                    >
                      {selectedPlan.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="detail-grid">
                  <div>
                    <span>Billing Type</span>
                    <strong>{billingLabel(selectedPlan.billingType)}</strong>
                  </div>

                  <div>
                    <span>Duration</span>
                    <strong>{durationLabel(selectedPlan.duration)}</strong>
                  </div>

                  <div>
                    <span>Price</span>
                    <strong>{money(selectedPlan.price)}</strong>
                  </div>

                  <div>
                    <span>Student Limit</span>
                    <strong>
                      {selectedPlan.billingType === "FIXED"
                        ? "Unlimited"
                        : numberFormat(selectedPlan.studentLimit)}
                    </strong>
                  </div>

                  <div>
                    <span>Setup Fee Type</span>
                    <strong>{selectedPlan.setupFeeType || "NONE"}</strong>
                  </div>

                  <div>
                    <span>Setup Fee</span>
                    <strong>
                      {selectedPlan.setupFeeType === "PER_STUDENT"
                        ? `${money(selectedPlan.setupFeePerStudent)} / student`
                        : selectedPlan.setupFeeType === "UP_TO_STUDENT"
                          ? money(selectedPlan.setupFeeAmount)
                          : "None"}
                    </strong>
                  </div>
                </div>

                <div className="description-box">
                  <span>Description</span>
                  <p>
                    {selectedPlan.description || "No description available."}
                  </p>
                </div>
              </div>

              <div className="premium-modal-footer">
                <button
                  className="modal-cancel-btn"
                  onClick={() => setShowPlanView(false)}
                >
                  Close
                </button>

                <button
                  className="premium-primary-btn"
                  onClick={() => {
                    setShowPlanView(false);
                    openEditPlan(selectedPlan);
                  }}
                >
                  <FaEdit />
                  Edit Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
          SUBSCRIPTION VIEW MODAL
      ====================================================== */}

        {showSubscriptionView && selectedSubscription && (
          <div className="premium-modal-overlay">
            <div className="premium-modal view-modal">
              <div className="premium-modal-header">
                <div>
                  <h5>Subscription Details</h5>

                  <small>Complete subscription information</small>
                </div>

                <button onClick={() => setShowSubscriptionView(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="premium-modal-body">
                <div className="detail-profile">
                  <div className="detail-profile-icon school">
                    <FaSchool />
                  </div>

                  <div>
                    <h5>{getSchoolName(selectedSubscription)}</h5>

                    <span
                      className={`status-badge subscription-status-${(
                        selectedSubscription.status || ""
                      ).toLowerCase()}`}
                    >
                      {subscriptionStatusLabel(selectedSubscription.status)}
                    </span>
                  </div>
                </div>

                <div className="detail-grid">
                  <div>
                    <span>School Code</span>
                    <strong>{getSchoolCode(selectedSubscription)}</strong>
                  </div>

                  <div>
                    <span>Plan</span>
                    <strong>{getPlanName(selectedSubscription)}</strong>
                  </div>

                  <div>
                    <span>Students</span>
                    <strong>
                      {selectedSubscription.plan?.billingType === "FIXED"
                        ? "Unlimited"
                        : numberFormat(selectedSubscription.studentCount)}
                    </strong>
                  </div>

                  <div>
                    <span>Student Limit</span>
                    <strong>
                      {selectedSubscription.studentLimit
                        ? numberFormat(selectedSubscription.studentLimit)
                        : "Unlimited"}
                    </strong>
                  </div>

                  <div>
                    <span>Recurring Amount</span>
                    <strong>{money(selectedSubscription.amount)}</strong>
                  </div>

                  <div>
                    <span>Setup Fee</span>
                    <strong>
                      {money(selectedSubscription.setupFeeAmount)}
                    </strong>
                  </div>

                  <div>
                    <span>Start Date</span>
                    <strong>
                      {formatDate(selectedSubscription.startDate)}
                    </strong>
                  </div>

                  <div>
                    <span>Expiry Date</span>
                    <strong>
                      {formatDate(selectedSubscription.expiryDate)}
                    </strong>
                  </div>

                  <div>
                    <span>Auto Renew</span>
                    <strong>
                      {selectedSubscription.autoRenew ? "Enabled" : "Disabled"}
                    </strong>
                  </div>
                </div>

                {selectedSubscription.status === "PENDING" && (
                  <div className="payment-pending-note">
                    <FaMoneyBillWave />

                    <div>
                      <strong>Payment Required</strong>

                      <span>
                        This subscription is pending payment verification.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="premium-modal-footer">
                <button
                  className="modal-cancel-btn"
                  onClick={() => setShowSubscriptionView(false)}
                >
                  Close
                </button>

                {canRecordPayment(selectedSubscription) && (
                  <button
                    className="premium-primary-btn"
                    onClick={() => {
                      setShowSubscriptionView(false);

                      openPaymentModal(selectedSubscription, "SUBSCRIPTION");
                    }}
                  >
                    <FaCreditCard />
                    Record Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
    


    `}
      </style>
    </>
  );
};

export default SubscriptionManagement;
