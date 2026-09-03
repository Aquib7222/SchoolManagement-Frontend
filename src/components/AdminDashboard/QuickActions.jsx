
import React from "react";
import { useNavigate } from "react-router-dom";

import { FaSchool, FaUserTie, FaUsers } from "react-icons/fa";
import { MdViewInAr, MdAssessment } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create School",
      icon: <FaSchool />,
      color: "#0d6efd",
      bg: "#eaf2ff",
      path: "/add/schools",
    },
    {
      title: "Create Superadmin",
      icon: <FaUserTie />,
      color: "#7950f2",
      bg: "#f1eaff",
      path: "/add/superadmins",
    },
    {
      title: "Create Module",
      icon: <MdViewInAr />,
      color: "#198754",
      bg: "#eaf8f0",
      path: "/admin/add-modules",
    },
    {
      title: "Create Menu",
      icon: <AiOutlineBars />,
      color: "#d99a00",
      bg: "#fff8df",
      path: "/admin/menus/creation",
    },
    {
      title: "Create User Group",
      icon: <HiOutlineUserGroup />,
      color: "#d63384",
      bg: "#fceaf3",
      path: "/admin/user-group/create",
    },
    {
      title: "Map School",
      icon: <BsBuildings />,
      color: "#dc3545",
      bg: "#ffeded",
      path: "/admin/schoolMapping",
    },
    {
      title: "User Mapping",
      icon: <FaUsers />,
      color: "#0aa2c0",
      bg: "#e8f9fc",
      path: "/admin/userGroupmapping",
    },
    {
      title: "View Reports",
      icon: <MdAssessment />,
      color: "#6f42c1",
      bg: "#f3edff",
      path: "/reports",
    },
  ];

  return (
    <>
      <div className="container-fluid px-2 mt-3">

        <div className="quick-actions-card shadow">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="quick-actions-header">

            <div>
              <span className="quick-actions-label">
                SHORTCUTS
              </span>

              <h6 className="quick-actions-title">
                Quick Actions
              </h6>
            </div>

            <div className="quick-actions-count">
              {actions.length} Actions
            </div>

          </div>


          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="quick-actions-body">

            <div className="row g-3">

              {actions.map((action, index) => (

                <div
                  key={index}
                  className="col-6 col-sm-4  col-md-3 col-lg"
                >

                  <div
                    className="quick-action-item "
                    style={{
                      "--action-color": action.color,
                      "--action-bg": action.bg,
                    }}
                    onClick={() =>
                      navigate(action.path)
                    }
                  >

                    {/* ICON */}

                    <div
                      className="quick-action-icon"
                      style={{
                        backgroundColor: action.bg,
                        color: action.color,
                      }}
                    >
                      {React.cloneElement(
                        action.icon,
                        {
                          size: 21,
                        }
                      )}
                    </div>


                    {/* TITLE */}

                    <span className="quick-action-title">
                      {action.title}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          /* ============================================
             MAIN CARD
          ============================================ */

          .quick-actions-card {
            position: relative;
            overflow: hidden;
            background: #ffffff;
            border: 1px solid #edf0f5;
            border-radius: 15px;
            box-shadow: 0 5px 18px rgba(0,0,0,.05);
            transition: all .25s ease;
          }

          .quick-actions-card:hover {
            box-shadow: 0 8px 22px rgba(0,0,0,.06);
          }


          /* ============================================
             HEADER
          ============================================ */

          .quick-actions-header {
            min-height: 70px;
            padding: 15px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid #edf0f5;
            background: #ffffff;
          }

          .quick-actions-label {
            display: block;
            margin-bottom: 3px;
            color: #0d6efd;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: .8px;
          }

          .quick-actions-title {
            margin: 0;
            color: #212529;
            font-size: 15px;
            font-weight: 700;
          }

          .quick-actions-count {
            padding: 5px 9px;
            border-radius: 20px;
            background: #f4f8ff;
            border: 1px solid #e1eaf7;
            color: #667085;
            font-size: 9px;
            font-weight: 600;
            white-space: nowrap;
          }


          /* ============================================
             BODY
          ============================================ */

          .quick-actions-body {
            padding: 17px 18px;
          }


          /* ============================================
             ACTION ITEM
          ============================================ */

          .quick-action-item {
            position: relative;
            min-height: 92px;
            padding: 13px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;

            background: #ffffff;
            border: 1px solid #edf0f5;
            border-radius: 13px;

            cursor: pointer;

            transition:
              transform .22s ease,
              box-shadow .22s ease,
              border-color .22s ease,
              background .22s ease;
          }

          .quick-action-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 14px;
            bottom: 14px;
            width: 3px;
            border-radius: 0 4px 4px 0;
            background: var(--action-color);
            opacity: 0;
            transition: opacity .22s ease;
          }

          .quick-action-item:hover {
            transform: translateY(-3px);
            background: #fcfdff;
            border-color: #dfe7f2;
            box-shadow: 0 8px 20px rgba(0,0,0,.07);
          }

          .quick-action-item:hover::before {
            opacity: 1;
          }


          /* ============================================
             ICON
          ============================================ */

          .quick-action-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
            margin-bottom: 9px;

            border-radius: 12px;

            display: flex;
            align-items: center;
            justify-content: center;

            transition:
              transform .22s ease,
              box-shadow .22s ease;
          }

          .quick-action-item:hover
          .quick-action-icon {
            transform: scale(1.06);
            box-shadow:
              0 5px 12px rgba(0,0,0,.07);
          }


          /* ============================================
             TITLE
          ============================================ */

          .quick-action-title {
            color: #344054;
            font-size: 10px;
            font-weight: 700;
            line-height: 1.3;
          }

          .quick-action-item:hover
          .quick-action-title {
            color: var(--action-color);
          }


          /* ============================================
             TABLET
          ============================================ */

          @media (max-width: 992px) {

            .quick-actions-header {
              padding: 14px 16px;
            }

            .quick-actions-body {
              padding: 15px 16px;
            }

            .quick-action-item {
              min-height: 90px;
            }

          }


          /* ============================================
             MOBILE
          ============================================ */

          @media (max-width: 576px) {

            .quick-actions-card {
              border-radius: 13px;
            }

            .quick-actions-header {
              min-height: 64px;
              padding: 13px 14px;
            }

            .quick-actions-body {
              padding: 13px 14px;
            }

            .quick-actions-label {
              font-size: 8px;
            }

            .quick-actions-title {
              font-size: 14px;
            }

            .quick-actions-count {
              font-size: 8px;
              padding: 4px 7px;
            }

            .quick-action-item {
              min-height: 86px;
              padding: 11px 6px;
            }

            .quick-action-icon {
              width: 42px;
              height: 42px;
              min-width: 42px;
              margin-bottom: 7px;
            }

            .quick-action-title {
              font-size: 9px;
            }

          }
        `}
      </style>
    </>
  );
};

export default QuickActions;

