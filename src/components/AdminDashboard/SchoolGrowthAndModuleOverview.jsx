
import React from "react";
import SynchronizedChart from "./SynchronizedChart";
import ModuleMenuOverview from "./ModuleMenuOverview";

const SchoolGrowthAndModuleOverview = () => {
  return (
    <>
      <div className="container-fluid px-2 mt-3">
        <div className="row g-3">

          {/* ================================================
              SCHOOL GROWTH
          ================================================= */}

          <div className="col-12 col-lg-6">
            <div className="dashboard-chart-card shadow h-100">

              <div className="dashboard-chart-header">
                <div>
                  <h6 className="dashboard-chart-title">
                    School Growth
                  </h6>

                  <span className="dashboard-chart-subtitle">
                    School growth overview
                  </span>
                </div>
              </div>

              <div className="dashboard-chart-body">
                <SynchronizedChart />
              </div>

            </div>
          </div>

          {/* ================================================
              MODULE & MENU OVERVIEW
          ================================================= */}

          <div className="col-12 col-lg-6">
            <div className="dashboard-chart-card shadow h-100">

              <div className="dashboard-chart-header">
                <div>
                  <h6 className="dashboard-chart-title">
                    Module & Menu Overview
                  </h6>

                  <span className="dashboard-chart-subtitle">
                    Modules, menus and submenu mapping
                  </span>
                </div>
              </div>

              <div className="dashboard-chart-body">
                <ModuleMenuOverview />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          PREMIUM DASHBOARD CHART CSS
      ===================================================== */}

      <style>
        {`
          .dashboard-chart-card {
            position: relative;
            overflow: hidden;

            background: #ffffff;

            border: 1px solid #edf0f5;
            border-radius: 15px;

            transition: all .25s ease;
          }

          .dashboard-chart-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,.07) !important;
          }

          /* ================================================
             HEADER
          ================================================= */

          .dashboard-chart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 17px 20px;

            border-bottom: 1px solid #f0f2f5;
          }

          .dashboard-chart-title {
            margin: 0;

            color: #212529;

            font-size: 15px;
            font-weight: 700;
          }

          .dashboard-chart-subtitle {
            display: block;

            margin-top: 3px;

            color: #9aa1aa;

            font-size: 11px;
            font-weight: 500;
          }

          /* ================================================
             BODY
          ================================================= */

          .dashboard-chart-body {
            width: 100%;
            min-height: 320px;

            padding: 15px;

            position: relative;
          }

          /* ================================================
             RESPONSIVE
          ================================================= */

          @media (max-width: 992px) {

            .dashboard-chart-body {
              min-height: 300px;
            }

          }

          @media (max-width: 576px) {

            .dashboard-chart-header {
              padding: 15px;
            }

            .dashboard-chart-title {
              font-size: 14px;
            }

            .dashboard-chart-subtitle {
              font-size: 10px;
            }

            .dashboard-chart-body {
              padding: 10px;
              min-height: 280px;
            }

          }
        `}
      </style>
    </>
  );
};

export default SchoolGrowthAndModuleOverview;
