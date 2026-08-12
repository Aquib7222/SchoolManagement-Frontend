import React from "react";
import SynchronizedChart from "./SynchronizedChart";
import ModuleMenuOverview from "./ModuleMenuOverview";

const SchoolGrowthAndModuleOverview = () => {
  return (
    <>
      <div className="container-fluid px-2 mt-3">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-md-6 col-lg  ">
            <SynchronizedChart />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg ">
            <ModuleMenuOverview/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolGrowthAndModuleOverview;
