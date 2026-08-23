import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const MenuCreation = () => {
  const [modules, setModules] = useState([]);
  console.log("Modules:", modules);
  const [userGroups,setUserGroups]=useState([]);
 console.log("User Groups:",userGroups);

  const loadUserGroups = async () => {
    try{

        const res = await axiosInstance.get(
            "/api/user-group/all"
        );

       
        setUserGroups(res.data);

        
    }catch(error){

        console.log(error);

    }
};

  useEffect(() => {
    loadModules();
    loadUserGroups();
  }, []);

  const loadModules = async () => {
    try {
      const res = await axiosInstance.get("/api/module/all");

      const filteredModules = res.data.filter(
        (module) => module.hasMenu === true,
      );

      setModules(filteredModules);
    } catch (error) {
      console.error(error);
    }
  };
  const [form, setForm] = useState({
    moduleId: "",
    menuName: "",
    menuUrl: "",

    displayOrder: 1,
    status: "Active",
    hasSubMenu: false,
  });

  const [subMenus, setSubMenus] = useState([
    {
      subMenuName: "",
      subMenuUrl: "",

      displayOrder: 1,
    },
  ]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubMenuChange = (index, e) => {
    const values = [...subMenus];
    values[index][e.target.name] = e.target.value;
    setSubMenus(values);
  };

  const addSubMenu = () => {
    setSubMenus([
      ...subMenus,
      {
        subMenuName: "",
        subMenuUrl: "",

        displayOrder: subMenus.length + 1,
      },
    ]);
  };

  const removeSubMenu = (index) => {
    const values = [...subMenus];
    values.splice(index, 1);
    setSubMenus(values);
  };

  const handleSave = async () => {
    if (!form.moduleId) {
      alert("Please Select Module");
      return;
    }

    if (!form.menuName.trim()) {
      alert("Enter Menu Name");
      return;
    }

    if (!form.menuUrl.trim()) {
      alert("Enter Menu URL");
      return;
    }

    const payload = {
      moduleId: Number(form.moduleId),
      menuName: form.menuName,
      menuUrl: form.menuUrl,
      displayOrder: Number(form.displayOrder),
      status: form.status,
      hasSubMenu: form.hasSubMenu,
      subMenus: form.hasSubMenu ? subMenus : [],
    };

    console.log(payload);

    try {
      const response = await axiosInstance.post(
        "/api/menu/create",
        payload,
      );

      alert(response.data);

      // Reset Form
      setForm({
        moduleId: "",
        menuName: "",
        menuUrl: "",
        displayOrder: 1,
        status: "Active",
        hasSubMenu: false,
      });

      setSubMenus([
        {
          subMenuName: "",
          subMenuUrl: "",
          displayOrder: 1,
        },
      ]);
    } catch (error) {
      console.log(error);

      alert("Failed to Save Menu");
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
        <h5 className="fw-bold">Menu Creation</h5>

        <nav>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">Menu Creation</li>
          </ol>
        </nav>
      </div>

      {/* Form */}
      <div className="container-fluid mt-3">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">Create Menu</div>

          <div className="card-body">
            <div className="row g-3">
              {/* Module */}
              <div className="col-md-4">
                <label className="form-label">Module</label>

                <select
                  className="form-select"
                  name="moduleId"
                  value={form.moduleId}
                  onChange={handleChange}
                >
                  <option value="">Select Module</option>

                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.moduleName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Menu Name */}

              <div className="col-md-4">
                <label className="form-label">Menu Name</label>

                <input
                  className="form-control"
                  name="menuName"
                  value={form.menuName}
                  onChange={handleChange}
                />
              </div>

              {/* URL */}

              <div className="col-md-4">
                <label className="form-label">Menu URL</label>

                <input
                  className="form-control"
                  placeholder="/students"
                  name="menuUrl"
                  value={form.menuUrl}
                  onChange={handleChange}
                />
              </div>

              {/* Order */}

              <div className="col-md-4">
                <label className="form-label">Display Order</label>

                <input
                  type="number"
                  className="form-control"
                  name="displayOrder"
                  value={form.displayOrder}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}

              <div className="col-md-4">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>

                  <option>Inactive</option>
                </select>
              </div>

              {/* Has Sub Menu */}

              <div className="col-md-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="hasSubMenu"
                    checked={form.hasSubMenu}
                    onChange={handleChange}
                  />

                  <label className="form-check-label">Has Sub Menu</label>
                </div>
              </div>
            </div>

            {/* SubMenus */}

            {form.hasSubMenu && (
              <div className="card mt-4">
                <div className="card-header bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Sub Menus</h6>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={addSubMenu}
                      type="button"
                    >
                      <FaPlus /> Add More
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  {subMenus.map((sub, index) => (
                    <div className="border rounded p-3 mb-3" key={index}>
                      <div className="d-flex justify-content-between mb-3">
                        <strong>Sub Menu {index + 1}</strong>

                        {subMenus.length > 1 && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeSubMenu(index)}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>

                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">Sub Menu Name</label>

                          <input
                            className="form-control"
                            name="subMenuName"
                            value={sub.subMenuName}
                            onChange={(e) => handleSubMenuChange(index, e)}
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">URL</label>

                          <input
                            className="form-control"
                            placeholder="/new-admission"
                            name="subMenuUrl"
                            value={sub.subMenuUrl}
                            onChange={(e) => handleSubMenuChange(index, e)}
                          />
                        </div>

                        <div className="col-md-2">
                          <label className="form-label">Order</label>

                          <input
                            type="number"
                            className="form-control"
                            name="displayOrder"
                            value={sub.displayOrder}
                            onChange={(e) => handleSubMenuChange(index, e)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-end mt-4">
              <button className="btn btn-primary px-4" onClick={handleSave}>
                Save Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCreation;
