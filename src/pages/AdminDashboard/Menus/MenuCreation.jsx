import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";
import { IoIosListBox } from "react-icons/io";
import { MdGridView } from "react-icons/md";

const MenuCreation = () => {
  const [modules, setModules] = useState([]);
  console.log("Modules:", modules);
  const [userGroups, setUserGroups] = useState([]);
  console.log("User Groups:", userGroups);

  const loadUserGroups = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group/all");

      setUserGroups(res.data);
    } catch (error) {
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
      const response = await axiosInstance.post("/api/menu/create", payload);

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
      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{ minHeight: "70px" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h4 className="fw-bold mb-1">Menu Creation</h4>

              <p className="text-muted mb-2">
                Create menus and submenus under modules.
              </p>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none text-dark">
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">Menu Management</li>

                  <li className="breadcrumb-item active text-primary">
                    Menu Creation
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
              Back to Menu List
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-fluid mt-3 px-2">
        <div className="bg-white shadow rounded-2 p-3 mt-2 mb-3">
          <h4 className="mb-4 d-flex align-items-center">
            <span
              className="rounded-circle bg-primary me-2 d-inline-flex align-items-center justify-content-center"
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              <IoIosListBox size={20} className="text-white" />
            </span>
            Create New Menu
          </h4>

          <div className="card-body">
            <div className="row g-3">
              {/* Module */}
              <div className="col-md-4">
                <label className="form-label">
                  <h6>
                    Module <span className="text-danger">*</span>
                  </h6>
                </label>

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
                <label htmlFor="" className="form-label">
                  <h6>
                    Menu Name <span className="text-danger">*</span>
                  </h6>
                </label>

                <input
                  className="form-control"
                  name="menuName"
                  value={form.menuName}
                  onChange={handleChange}
                  placeholder="Enter menu name (e.g.New Admission"
                />
              </div>

              {/* URL */}
                  {!form.hasSubMenu && (
                       <div className="col-md-4">
                <label className="form-label">
                  {" "}
                  <h6>
                    Route/URL <span className="text-danger">*</span>
                  </h6>
                </label>

                <input
                  className="form-control"
                  placeholder="/students"
                  name="menuUrl"
                  value={form.menuUrl}
                  onChange={handleChange}
                />
                <small className="text-muted">Frontend route path</small>
              </div>
                  )}
             

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
          </div>
        </div>
      </div>

      <div className="container-fluid px-2 mt-3">
        {form.hasSubMenu && (
          <div className="card shadow">
            <div className="card-header bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Sub Menus</h5>

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
                <div className=" rounded p-2 mb-3" key={index}>
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Sub Menu {index + 1}</h6>

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
                      <label className="form-label">
                        <h6>
                          Sub Menu Name <span className="text-danger">*</span>
                        </h6>
                      </label>

                      <input
                        className="form-control"
                        name="subMenuName"
                        value={sub.subMenuName}
                        onChange={(e) => handleSubMenuChange(index, e)}
                        placeholder="Enter sub menu name"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        <h6>
                          Route/URL <span className="text-danger">*</span>
                        </h6>
                      </label>

                      <input
                        className="form-control"
                        placeholder="/new-admission"
                        name="subMenuUrl"
                        value={sub.subMenuUrl}
                        onChange={(e) => handleSubMenuChange(index, e)}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label"><h6>Sequence Order<span className="text-danger">*</span></h6></label>

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
      </div>

      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-primary px-4"
          onClick={handleSave}
        >
          <MdGridView size={20} className="me-2" />
          Create Menu
        </button>
      </div>
    </>
  );
};

export default MenuCreation;
