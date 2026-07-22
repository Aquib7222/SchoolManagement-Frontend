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

const SchoolMapping = () => {
  const token = localStorage.getItem("token");
  const [schools, setSchools] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [modules, setModules] = useState([]); // dynamic load

  const [selected, setSelected] = useState({});
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [checkedModules, setCheckedModules] = useState({});
  const [checkedMenus, setCheckedMenus] = useState({});
  const [checkedSubMenus, setCheckedSubMenus] = useState({});
  // 🔹 Load schools & super admins
  useEffect(() => {
    fetchModules();
    fetchUserGroups();
    fetchSchools();
  }, []);

  console.log("schools", schools);
  console.log("user groups", userGroups);
  console.log("modules", modules);
  console.log("selectedGroup", selectedGroup);
  //   console.log("selectedModule", selectedModule);
  console.log(typeof selectedGroup);

  const filteredModules = modules.filter(
    (item) => item.userGroup?.id === Number(selectedGroup),
  );
  const moduleOptions = [
    ...new Map(
      filteredModules.map((item) => [item.module.id, item.module]),
    ).values(),
  ];

  console.log(filteredModules.map((i) => i.userGroup.groupCode));

  const selectedModuleData = filteredModules.find(
    (item) => item.module.id === Number(selectedModuleId),
  );

  console.log("selectedModuleData", selectedModuleData);
  //   console.log(selectedModuleData[0]?.menuMappings);
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

  //   school load
  const fetchSchools = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(res.data);
    } catch (err) {
      console.error("Error fetching schools", err);
    }
  };

  //   load modules
  const fetchModules = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user-group-mapping/all",
      );

      //   setModules(res.data.filter((m) => m.hasMenu === true));
      setModules(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  //   load user groups
  const fetchUserGroups = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-group/all");

      setUserGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!selectedSchool || !selectedGroup) return;

    axios
      .get("http://localhost:8080/api/school-mapping/load", {
        params: {
          schoolId: selectedSchool,
          groupId: selectedGroup,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        loadExistingPermissions(
          res.data,
          setCheckedModules,
          setCheckedMenus,
          setCheckedSubMenus,
        );
      })
      .catch(() => {
        setCheckedModules({});
        setCheckedMenus({});
        setCheckedSubMenus({});
      });
  }, [selectedSchool, selectedGroup]);

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
        selectedSchool,
        selectedGroup,
        checkedModules,
        checkedMenus,
        checkedSubMenus,
      );
      console.log("Selected Group =", selectedGroup);
console.log("Payload =", payload);

      await axios.post(
        "http://localhost:8080/api/school-mapping/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("School Mapping Saved Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to save mapping");
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className="row shadow"
        style={{
          background:
            "linear-gradient(135deg, rgb(61,87,236) 0%, rgb(97,150,248) 50%, #87ddf7 100%)",
          margin: "10px",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <h5 className="fw-bold">School Mapping</h5>

        <nav>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">School Mapping</li>
          </ol>
        </nav>
      </div>
      <div className="container-fluid mt-3 p-3">
        <div className="card">
          <div className="card-header">School Mapping</div>
          <div className="card-body">
            <div className="row ">
              <div className="col-md-3">
                <select
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="form-select"
                >
                  <option>Select School</option>
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.schoolName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select
                  disabled={!selectedSchool}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="form-select"
                >
                  <option>Select User Group</option>
                  {userGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.groupName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {selectedGroup && filteredModules.length > 0 && (
          <div className="form-check mb-3">
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
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th width="8%">S.No</th>
              <th width="25%">Module</th>
              <th width="30%">Menu</th>
              <th width="37%">Sub Menu</th>
            </tr>
          </thead>

          <tbody>
            {filteredModules.map((moduleData, index) => (
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
            ))}
          </tbody>
        </table>
        {selectedSchool && selectedGroup && (
          <div className="text-end mt-3">
            <button className="btn btn-success" onClick={handleSave}>
              Save Mapping
            </button>
          </div>
        )}

        {/* {selectedGroup && filteredModules.length > 0 && (
          <div className="text-end mt-3">
            <button className="btn btn-success" onClick={handleSave}>
              Save Permissions
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default SchoolMapping;
