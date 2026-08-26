import axios from "axios";
import React, { useEffect, useState } from "react";
import PermissionTables from "./PermissionTables";

import {
  handleModuleChange,
  handleMenuChange,
  handleSubMenuChange,
  createPermissionPayload,
  loadExistingPermissions,
} from "./permissionUtils";
import axiosInstance from "../../../api/axiosInstance";
import { FaArrowLeft } from "react-icons/fa";
import { TiArrowSync } from "react-icons/ti";
import { LuCodesandbox } from "react-icons/lu";

const SchoolMapping = () => {
  const token = localStorage.getItem("token");
  const [schools, setSchools] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [modules, setModules] = useState([]); 

  
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [checkedModules, setCheckedModules] = useState({});
  const [checkedMenus, setCheckedMenus] = useState({});
  const [checkedSubMenus, setCheckedSubMenus] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
 
  useEffect(() => {
    fetchModules();
    fetchUserGroups();
    fetchSchools();
  }, []);

  

  const filteredModules = modules.filter(
    (item) => item.userGroup?.id === Number(selectedGroup),
  );
  const moduleOptions = [
    ...new Map(
      filteredModules.map((item) => [item.module.id, item.module]),
    ).values(),
  ];

 

  const selectedModuleData = filteredModules.find(
    (item) => item.module.id === Number(selectedModuleId),
  );

 
 
  const onModuleChange = (moduleData, checked) => {
    handleModuleChange(
      moduleData,
      checked,
      checkedModules,
      checkedMenus,
      checkedSubMenus,
      setCheckedModules,
      setCheckedMenus,
      setCheckedSubMenus,
    );
  };

  const onMenuChange = (moduleData, menu, checked) => {
    handleMenuChange(
      moduleData,
      menu,
      checked,
      checkedModules,
      checkedMenus,
      checkedSubMenus,
      setCheckedModules,
      setCheckedMenus,
      setCheckedSubMenus,
    );
  };

  const onSubMenuChange = (moduleData, menu, subMenu, checked) => {
    handleSubMenuChange(
      moduleData,
      menu,
      subMenu,
      checked,
      checkedModules,
      checkedMenus,
      checkedSubMenus,
      setCheckedModules,
      setCheckedMenus,
      setCheckedSubMenus,
    );
  };

  
  const fetchSchools = async () => {
    try {
      const res = await axiosInstance.get("/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(res.data);
    } catch (err) {
      console.error("Error fetching schools", err);
    }
  };

 
  const fetchModules = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group-mapping/all");

      
      setModules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserGroups = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group/all");

      setUserGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadModules = async () => {
    if (!selectedSchool) {
      alert("Please select School");
      return;
    }

    if (!selectedGroup) {
      alert("Please select User Group");
      return;
    }

    try {
      // Pehle existing permissions load karo
      const res = await axiosInstance.get("/api/school-mapping/load", {
        params: {
          schoolId: selectedSchool,
          groupId: selectedGroup,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadExistingPermissions(
        res.data,
        setCheckedModules,
        setCheckedMenus,
        setCheckedSubMenus,
      );

      // Ab permission section show hoga
      setIsLoaded(true);
    } catch (error) {
      console.error("LOAD MAPPING ERROR =", error);

      // Agar mapping nahi mili to blank permissions
      setCheckedModules({});
      setCheckedMenus({});
      setCheckedSubMenus({});

      setIsLoaded(true);
    }
  };

  const handleSelectAll = (checked) => {
    const newCheckedModules = {};
    const newCheckedMenus = {};
    const newCheckedSubMenus = {};

    filteredModules.forEach((moduleData) => {
      newCheckedModules[moduleData.module.id] = checked;

      (moduleData.menuMappings || []).forEach((menuMap) => {
        newCheckedMenus[menuMap.menu.id] = checked;

        (menuMap.menu.subMenus || []).forEach((sub) => {
          newCheckedSubMenus[sub.id] = checked;
        });
      });
    });

    setCheckedModules(newCheckedModules);
    setCheckedMenus(newCheckedMenus);
    setCheckedSubMenus(newCheckedSubMenus);
  };

  const handleSave = async () => {
    try {
      const payload = createPermissionPayload(
        Number(selectedSchool),
        Number(selectedGroup),
        checkedModules,
        checkedMenus,
        checkedSubMenus,
      );

      console.log("Selected School =", selectedSchool);
      console.log("Selected Group =", selectedGroup);
      console.log("Payload =", JSON.stringify(payload, null, 2));

      const response = await axiosInstance.post(
        "/api/school-mapping/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Save Response =", response.data);

      alert("School Mapping Saved Successfully");
    } catch (err) {
      console.error("SAVE ERROR =", err);
      console.error("STATUS =", err.response?.status);
      console.error("DATA =", err.response?.data);

      alert(
        err.response?.data ||
          err.response?.data?.message ||
          "Unable to save mapping",
      );
    }
  };

  const handleReset = () => {
    setSelectedSchool(null);
    setSelectedGroup(null);

    setIsLoaded(false);

    setCheckedModules({});
    setCheckedMenus({});
    setCheckedSubMenus({});
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{ minHeight: "70px" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h4 className="fw-bold mb-1">School Mapping</h4>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none text-dark">
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">Module Management</li>

                  <li className="breadcrumb-item active text-primary">
                    School Mapping
                  </li>
                </ol>
              </nav>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="me-2" />
              Back to Module Creation
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3 px-2">
        <div className="card shadow">
          <div className="card-header bg-white">School Mapping</div>
          <div className="card-body">
            <div className="row ">
              <div className="col-md-3">
                <label htmlFor="" className="form-label">
                  <h6>
                    School<span className="text-danger">*</span>
                  </h6>
                </label>
                <select
                  value={selectedSchool || ""}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value);
                    setSelectedGroup(null);
                    setIsLoaded(false);

                    setCheckedModules({});
                    setCheckedMenus({});
                    setCheckedSubMenus({});
                  }}
                  className="form-select"
                >
                  <option value="">Select School</option>

                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.schoolName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="" className="form-label">
                  <h6>
                    Usergroup<span className="text-danger">*</span>
                  </h6>
                </label>
                <select
                  value={selectedGroup || ""}
                  disabled={!selectedSchool}
                  onChange={(e) => {
                    setSelectedGroup(e.target.value);
                    setIsLoaded(false);

                    setCheckedModules({});
                    setCheckedMenus({});
                    setCheckedSubMenus({});
                  }}
                  className="form-select"
                >
                  <option value="">Select User Group</option>

                  {userGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.groupName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  style={{ marginTop: "36px" }}
                  onClick={handleReset}
                >
                  <TiArrowSync size={20} className="me-2" />
                  Reset
                </button>
              </div>

              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  style={{ marginTop: "36px" }}
                  onClick={handleLoadModules}
                  disabled={!selectedSchool || !selectedGroup}
                >
                  <LuCodesandbox size={20} className="me-2" />
                  Load Modules
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoaded && (
          <div className="card border mt-3 shadow rounded-3 overflow-hidden">
            {filteredModules.length > 0 && (
              <div className="form-check mb-3 mt-3 ms-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    filteredModules.length > 0 &&
                    filteredModules.every((m) => checkedModules[m.module.id])
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />

                <label className="form-check-label fw-bold">
                  Select All Permissions
                </label>
              </div>
            )}

            <div className="card-header bg-white border-0 p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="fw-bold mb-1">Module & Menu Permissions</h5>

                  <p className="text-muted mb-0 small">
                    Manage module, menu and submenu permissions
                  </p>
                </div>

                <span className="badge bg-primary px-3 py-2">
                  {filteredModules.length} Modules
                </span>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle mb-0">
                  <thead>
                    <tr
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(61,87,236) 0%, rgb(97,150,248) 50%, #87ddf7 100%)",
                        color: "white",
                      }}
                    >
                      <th className="text-center" style={{ width: "8%" }}>
                        S.No
                      </th>

                      <th style={{ width: "25%" }}>Module</th>

                      <th style={{ width: "30%" }}>Menu</th>

                      <th style={{ width: "37%" }}>Sub Menu</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredModules.length > 0 ? (
                      filteredModules.map((moduleData, index) => (
                        <PermissionTables
                          key={moduleData.id}
                          index={index}
                          moduleData={moduleData}
                          checkedModules={checkedModules}
                          checkedMenus={checkedMenus}
                          checkedSubMenus={checkedSubMenus}
                          onModuleChange={onModuleChange}
                          onMenuChange={onMenuChange}
                          onSubMenuChange={onSubMenuChange}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No modules found for this user group.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {isLoaded && selectedSchool && selectedGroup && (
          <div className="text-end mt-3 mb-3">
            <button className="btn btn-primary px-4 " onClick={handleSave}>
              Save Mapping
            </button>
          </div>
        )}
       
      </div>
    </>
  );
};

export default SchoolMapping;
