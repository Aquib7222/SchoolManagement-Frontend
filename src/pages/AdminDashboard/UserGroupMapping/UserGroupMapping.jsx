

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import {
  LuPencil,
  LuTrash2,
  LuSearch,
  LuRefreshCw,
  LuSave,
  LuUsers,
  LuBox,
  LuMenu,
  LuChevronDown,
} from "react-icons/lu";

const UserGroupMapping = () => {
  const [modules, setModules] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [menus, setMenus] = useState([]);
  const [mappings, setMappings] = useState([]);

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isMapped, setIsMapped] = useState(false);
const [mappedId, setMappedId] = useState(null);

  const [form, setForm] = useState({
    userGroupId: "",
    moduleId: "",
  });

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [selectedSubMenus, setSelectedSubMenus] = useState([]);

  // =========================================================
  // LOAD INITIAL DATA
  // =========================================================

  useEffect(() => {
    loadModules();
    loadUserGroups();
    loadMappings();
  }, []);

  // =========================================================
  // LOAD MAPPINGS
  // =========================================================

  const loadMappings = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/user-group-mapping/all"
      );

      setMappings(res.data || []);
    } catch (err) {
      console.error("Error loading mappings:", err);
    }
  };

  // =========================================================
  // LOAD MODULES
  // =========================================================

  const loadModules = async () => {
    try {
      const res = await axiosInstance.get("/api/module/all");

      setModules(res.data || []);
    } catch (err) {
      console.error("Error loading modules:", err);
    }
  };

  // =========================================================
  // LOAD USER GROUPS
  // =========================================================

  const loadUserGroups = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group/all");

      setUserGroups(res.data || []);
    } catch (err) {
      console.error("Error loading user groups:", err);
    }
  };

  const checkExistingMapping = (userGroupId, moduleId) => {
  if (!userGroupId || !moduleId) {
    setIsMapped(false);
    setMappedId(null);
    setEditingId(null);
    setSelectedMenus([]);
    setSelectedSubMenus([]);
    return;
  }

  const existingMapping = mappings.find(
    (item) =>
      Number(item.userGroup?.id) === Number(userGroupId) &&
      Number(item.module?.id) === Number(moduleId)
  );

  if (existingMapping) {
    console.log("Already Mapped =", existingMapping);

    setIsMapped(true);
    setMappedId(existingMapping.id);
    setEditingId(existingMapping.id);

    setSelectedMenus(
      (existingMapping.menuMappings || []).map(
        (m) => m.menu.id
      )
    );

    setSelectedSubMenus(
      (existingMapping.subMenuMappings || []).map(
        (s) => s.subMenu.id
      )
    );
  } else {
    console.log("Mapping Not Found");

    setIsMapped(false);
    setMappedId(null);
    setEditingId(null);
    setSelectedMenus([]);
    setSelectedSubMenus([]);
  }
};

  // =========================================================
  // FORM CHANGE
  // =========================================================

 const handleChange = async (e) => {
  const { name, value } = e.target;

  const updatedForm = {
    ...form,
    [name]: value,
  };

  setForm(updatedForm);

  if (name === "moduleId") {
    if (!value) {
      setMenus([]);
      setSelectedMenus([]);
      setSelectedSubMenus([]);
      setIsMapped(false);
      setMappedId(null);
      setEditingId(null);
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/api/menu/module/${value}`
      );

      setMenus(res.data);

      // Check existing mapping
      checkExistingMapping(
        form.userGroupId,
        value
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (name === "userGroupId") {
    if (!value) {
      setMenus([]);
      setSelectedMenus([]);
      setSelectedSubMenus([]);
      setIsMapped(false);
      setMappedId(null);
      setEditingId(null);
      return;
    }

    // Agar module already selected hai
    if (form.moduleId) {
      checkExistingMapping(
        value,
        form.moduleId
      );
    }
  }
};

useEffect(() => {
  if (form.userGroupId && form.moduleId && mappings.length > 0) {
    checkExistingMapping(
      form.userGroupId,
      form.moduleId
    );
  }
}, [mappings]);

  // =========================================================
  // MENU CHECK
  // =========================================================

  const handleMenuChange = (menu, checked) => {
    let selected = [...selectedMenus];
    let subSelected = [...selectedSubMenus];

    if (checked) {
      if (!selected.includes(menu.id)) {
        selected.push(menu.id);
      }

      (menu.subMenus || []).forEach((sub) => {
        if (!subSelected.includes(sub.id)) {
          subSelected.push(sub.id);
        }
      });
    } else {
      selected = selected.filter((id) => id !== menu.id);

      (menu.subMenus || []).forEach((sub) => {
        subSelected = subSelected.filter(
          (id) => id !== sub.id
        );
      });
    }

    setSelectedMenus(selected);
    setSelectedSubMenus(subSelected);
  };

  // =========================================================
  // SUB MENU CHECK
  // =========================================================

  const handleSubMenuChange = (menu, sub, checked) => {
    let selectedSub = [...selectedSubMenus];
    let selectedMenu = [...selectedMenus];

    if (checked) {
      if (!selectedSub.includes(sub.id)) {
        selectedSub.push(sub.id);
      }

      if (!selectedMenu.includes(menu.id)) {
        selectedMenu.push(menu.id);
      }
    } else {
      selectedSub = selectedSub.filter(
        (id) => id !== sub.id
      );

      const anySubSelected = (menu.subMenus || []).some(
        (item) => selectedSub.includes(item.id)
      );

      if (!anySubSelected) {
        selectedMenu = selectedMenu.filter(
          (id) => id !== menu.id
        );
      }
    }

    setSelectedMenus(selectedMenu);
    setSelectedSubMenus(selectedSub);
  };

  // =========================================================
  // SELECT ALL MENUS
  // =========================================================

  const handleSelectAll = (checked) => {
    if (checked) {
      const menuIds = menus.map((menu) => menu.id);

      const subMenuIds = menus.flatMap((menu) =>
        (menu.subMenus || []).map((sub) => sub.id)
      );

      setSelectedMenus(menuIds);
      setSelectedSubMenus(subMenuIds);
    } else {
      setSelectedMenus([]);
      setSelectedSubMenus([]);
    }
  };

  // =========================================================
  // SAVE / UPDATE
  // =========================================================

  const handleSave = async () => {
  if (!form.userGroupId) {
    alert("Please Select User Group");
    return;
  }

  if (!form.moduleId) {
    alert("Please Select Module");
    return;
  }

  const payload = {
    userGroupId: Number(form.userGroupId),
    moduleId: Number(form.moduleId),
    menuIds: selectedMenus,
    subMenuIds: selectedSubMenus,
  };

  console.log("Mapping Payload =", payload);

  try {
    let res;

    if (isMapped && mappedId) {
      res = await axiosInstance.put(
        `/api/user-group-mapping/update/${mappedId}`,
        payload
      );

      alert("Mapping Updated Successfully");
    } else {
      res = await axiosInstance.post(
        "/api/user-group-mapping/save",
        payload
      );

      alert("Mapping Saved Successfully");
    }

    await loadMappings();

    setIsMapped(false);
    setMappedId(null);
    setEditingId(null);

    setForm({
      userGroupId: "",
      moduleId: "",
    });

    setMenus([]);
    setSelectedMenus([]);
    setSelectedSubMenus([]);

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data ||
      "Failed To Save Mapping"
    );
  }
};

  // =========================================================
  // DELETE
  // =========================================================

  const deleteMapping = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this mapping?"
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/user-group-mapping/${id}`
      );

      alert("Mapping Deleted Successfully");

      loadMappings();
    } catch (err) {
      console.error("Delete error:", err);

      alert("Unable to Delete Mapping");
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const editMapping = async (id) => {
    try {
      const res = await axiosInstance.get(
        `/api/user-group-mapping/${id}`
      );

      const data = res.data;

      setEditingId(id);

      setForm({
        userGroupId: data.userGroup?.id || "",
        moduleId: data.module?.id || "",
      });

      const menuRes = await axiosInstance.get(
        `/api/menu/module/${data.module?.id}`
      );

      setMenus(menuRes.data || []);

      setSelectedMenus(
        (data.menuMappings || []).map(
          (m) => m.menu.id
        )
      );

      setSelectedSubMenus(
        (data.subMenuMappings || []).map(
          (s) => s.subMenu.id
        )
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Edit mapping error:", err);

      alert("Unable to load mapping");
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setEditingId(null);

    setForm({
      userGroupId: "",
      moduleId: "",
    });

    setMenus([]);
    setSelectedMenus([]);
    setSelectedSubMenus([]);
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredMappings = mappings.filter((item) => {
    const group =
      item.userGroup?.groupName?.toLowerCase() || "";

    const module =
      item.module?.moduleName?.toLowerCase() || "";

    return (
      group.includes(search.toLowerCase()) ||
      module.includes(search.toLowerCase())
    );
  });

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{ minHeight: "70px" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h4 className="fw-bold mb-1">
                User Group Mapping
              </h4>

              <p className="text-muted mb-2">
                Manage modules, menus and submenu permissions
                for user groups.
              </p>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none text-dark"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="breadcrumb-item">
                    Module Management
                  </li>

                  <li className="breadcrumb-item active text-primary">
                    User Group Mapping
                  </li>
                </ol>
              </nav>
            </div>

            {editingId && (
              <span className="badge bg-warning text-dark px-3 py-2">
                Editing Mapping
              </span>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MAPPING FORM
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="bg-white shadow rounded-2 p-3 mb-3">
          <h5 className="fw-bold mb-4 d-flex align-items-center">
            <span
              className="rounded-circle bg-primary me-2 d-inline-flex align-items-center justify-content-center"
              style={{
                width: "34px",
                height: "34px",
              }}
            >
              <LuUsers
                size={18}
                className="text-white"
              />
            </span>

            {editingId
              ? "Update User Group Mapping"
              : "Create User Group Mapping"}
          </h5>

          <div className="row">
            {/* USER GROUP */}

            <div className="col-md-6 mb-3">
              <label className="form-label">
                <h6>
                  User Group{" "}
                  <span className="text-danger">
                    *
                  </span>
                </h6>
              </label>

              <select
                className="form-select"
                name="userGroupId"
                value={form.userGroupId}
                onChange={handleChange}
              >
                <option value="">
                  Select User Group
                </option>

                {userGroups.map((group) => (
                  <option
                    key={group.id}
                    value={group.id}
                  >
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>

            {/* MODULE */}

            <div className="col-md-6 mb-3">
              <label className="form-label">
                <h6>
                  Module{" "}
                  <span className="text-danger">
                    *
                  </span>
                </h6>
              </label>

              <select
                className="form-select"
                name="moduleId"
                value={form.moduleId}
                onChange={handleChange}
              >
                <option value="">
                  Select Module
                </option>

                {modules.map((module) => (
                  <option
                    key={module.id}
                    value={module.id}
                  >
                    {module.moduleName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* =================================================
              PERMISSION TREE
          ================================================= */}

          {menus.length > 0 && (
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    Module Permissions
                  </h5>

                  <p className="text-muted small mb-0">
                    Select menus and submenus for this
                    user group.
                  </p>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="selectAllMenus"
                    checked={
                      menus.length > 0 &&
                      menus.every((menu) =>
                        selectedMenus.includes(
                          menu.id
                        )
                      )
                    }
                    onChange={(e) =>
                      handleSelectAll(
                        e.target.checked
                      )
                    }
                  />

                  <label
                    htmlFor="selectAllMenus"
                    className="form-check-label fw-bold"
                  >
                    Select All
                  </label>
                </div>
              </div>

              {menus.map((menu) => {
                const subMenus =
                  menu.subMenus || [];

                const menuChecked =
                  selectedMenus.includes(
                    menu.id
                  );

                const allSubSelected =
                  subMenus.length > 0 &&
                  subMenus.every((sub) =>
                    selectedSubMenus.includes(
                      sub.id
                    )
                  );

                return (
                  <div
                    key={menu.id}
                    className="border rounded-3 mb-3 overflow-hidden"
                  >
                    {/* MENU HEADER */}

                    <div
                      className="p-3"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(61,87,236,0.08) 0%, rgba(97,150,248,0.08) 50%, rgba(135,221,247,0.08) 100%)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`menu_${menu.id}`}
                            checked={menuChecked}
                            onChange={(e) =>
                              handleMenuChange(
                                menu,
                                e.target.checked
                              )
                            }
                          />

                          <label
                            htmlFor={`menu_${menu.id}`}
                            className="form-check-label fw-bold"
                          >
                            <LuMenu
                              size={16}
                              className="me-2 text-primary"
                            />

                            {menu.menuName}
                          </label>
                        </div>

                        <span className="badge bg-primary-subtle text-primary">
                          {subMenus.length} Sub Menu
                          {subMenus.length !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                    </div>

                    {/* SUBMENUS */}

                    <div className="p-3">
                      {subMenus.length > 0 ? (
                        <div className="row">
                          {subMenus.map((sub) => (
                            <div
                              className="col-xl-4 col-md-6 mb-3"
                              key={sub.id}
                            >
                              <div
                                className={`border rounded-3 p-3 h-100 ${
                                  selectedSubMenus.includes(
                                    sub.id
                                  )
                                    ? "border-primary bg-light"
                                    : ""
                                }`}
                              >
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`sub_${sub.id}`}
                                    checked={selectedSubMenus.includes(
                                      sub.id
                                    )}
                                    onChange={(e) =>
                                      handleSubMenuChange(
                                        menu,
                                        sub,
                                        e.target.checked
                                      )
                                    }
                                  />

                                  <label
                                    htmlFor={`sub_${sub.id}`}
                                    className="form-check-label fw-semibold"
                                  >
                                    {
                                      sub.subMenuName
                                    }
                                  </label>
                                </div>

                                <div className="small text-muted mt-2 ms-4">
                                  {sub.subMenuUrl ||
                                    "No Path"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted small">
                          No Sub Menu Available
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {menus.length === 0 &&
            form.moduleId && (
              <div className="alert alert-warning mt-3">
                No Menus Found For This Module.
              </div>
            )}

          {/* BUTTONS */}

          <div className="text-end mt-4">
            {editingId && (
              <button
                type="button"
                className="btn btn-outline-secondary me-2 px-4"
                onClick={resetForm}
              >
                <LuRefreshCw
                  size={17}
                  className="me-2"
                />
                Cancel
              </button>
            )}

            <button
  className={`btn ${
    isMapped ? "btn-warning" : "btn-primary"
  } px-5`}
  onClick={handleSave}
>
  {isMapped ? "Update Mapping" : "Save Mapping"}
</button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH HEADER
      ===================================================== */}

      <div className="container-fluid px-2 mt-4">
        <div className="bg-white shadow rounded-2 p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h5 className="fw-bold mb-1">
                User Group Mapping List
              </h5>

              <p className="text-muted small mb-0">
                View and manage all user group module
                permissions.
              </p>
            </div>

            <div
              className="position-relative"
              style={{ width: "300px" }}
            >
              <LuSearch
                size={18}
                className="position-absolute text-muted"
                style={{
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                }}
              />

              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search user group or module..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAPPING LIST
      ===================================================== */}

      <div className="container-fluid px-2 mt-3 mb-4">
        <div className="card border-0 shadow rounded-3 overflow-hidden">
          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">
                  Mapping Details
                </h5>

                <p className="text-muted small mb-0">
                  User Group → Module → Menu → Sub Menu
                </p>
              </div>

              <span className="badge bg-primary px-3 py-2">
                {filteredMappings.length} Mapping
                {filteredMappings.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table  table-bordered align-middle mb-0">
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(61,87,236) 0%, rgb(97,150,248) 50%, #87ddf7 100%)",
                      color: "white",
                    }}
                  >
                    <th
                      className="text-center"
                      style={{ width: "7%" }}
                    >
                      S.No
                    </th>

                    <th style={{ width: "18%" }}>
                      User Group
                    </th>

                    <th style={{ width: "20%" }}>
                      Module
                    </th>

                    <th style={{ width: "22%" }}>
                      Menu
                    </th>

                    <th style={{ width: "23%" }}>
                      Sub Menu
                    </th>

                    <th
                      className="text-center"
                      style={{ width: "10%" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMappings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5 text-muted"
                      >
                        <LuBox
                          size={35}
                          className="mb-2"
                        />

                        <div>
                          No Mapping Found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredMappings.map(
                      (item, index) => {
                        const menuMappings =
                          item.menuMappings || [];

                        const subMenuMappings =
                          item.subMenuMappings || [];

                        // =====================================
                        // GROUP MENUS + SUBMENUS
                        // =====================================

                        const groupedMenus =
                          menuMappings.map(
                            (menuMap) => {
                              const menu =
                                menuMap.menu;

                              const menuSubMenus =
                                subMenuMappings.filter(
                                  (subMap) =>
                                    subMap.subMenu?.menu
                                      ?.id === menu?.id
                                );

                              return {
                                menu,
                                subMenus:
                                  menuSubMenus,
                              };
                            }
                          );

                        // =====================================
                        // NO MENU
                        // =====================================

                        if (
                          groupedMenus.length ===
                          0
                        ) {
                          return (
                            <tr key={item.id}>
                              <td className="text-center">
                                {index + 1}
                              </td>

                              <td className="fw-semibold">
                                {
                                  item.userGroup
                                    ?.groupName
                                }
                              </td>

                              <td>
                                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                                  {
                                    item.module
                                      ?.moduleName
                                  }
                                </span>
                              </td>

                              <td>
                                <span className="text-muted">
                                  No Menu
                                </span>
                              </td>

                              <td>
                                <span className="text-muted">
                                  No Sub Menu
                                </span>
                              </td>

                              <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    title="Edit"
                                    onClick={() =>
                                      editMapping(
                                        item.id
                                      )
                                    }
                                  >
                                    <LuPencil
                                      size={16}
                                    />
                                  </button>

                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    title="Delete"
                                    onClick={() =>
                                      deleteMapping(
                                        item.id
                                      )
                                    }
                                  >
                                    <LuTrash2
                                      size={16}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        // =====================================
                        // TOTAL ROWS
                        // =====================================

                        const totalRows =
                          groupedMenus.reduce(
                            (total, group) =>
                              total +
                              Math.max(
                                group.subMenus
                                  .length,
                                1
                              ),
                            0
                          );

                        let currentRow = 0;

                        // =====================================
                        // TABLE ROWS
                        // =====================================

                        return groupedMenus.flatMap(
                          (group) => {
                            const rows =
                              group.subMenus
                                .length > 0
                                ? group.subMenus
                                : [null];

                            return rows.map(
                              (
                                subMenu,
                                subIndex
                              ) => {
                                const firstOverall =
                                  currentRow ===
                                  0;

                                const firstMenu =
                                  subIndex === 0;

                                const row = (
                                  <tr
                                    key={`${item.id}-${group.menu?.id}-${subMenu?.subMenu?.id || "no-sub"}`}
                                  >
                                    {/* S.NO */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                        className="text-center fw-semibold"
                                      >
                                        {index + 1}
                                      </td>
                                    )}

                                    {/* USER GROUP */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                        className="fw-semibold"
                                      >
                                        {
                                          item
                                            .userGroup
                                            ?.groupName
                                        }
                                      </td>
                                    )}

                                    {/* MODULE */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                      >
                                        <span className="badge bg-primary-subtle text-primary px-3 py-2">
                                          {
                                            item
                                              .module
                                              ?.moduleName
                                          }
                                        </span>
                                      </td>
                                    )}

                                    {/* MENU */}

                                    {firstMenu && (
                                      <td
                                        rowSpan={
                                          rows.length
                                        }
                                      >
                                        <div className="fw-semibold">
                                          {
                                            group.menu
                                              ?.menuName
                                          }
                                        </div>

                                        <div className="small text-muted mt-1">
                                          {
                                            group.menu
                                              ?.menuUrl
                                          }
                                        </div>
                                      </td>
                                    )}

                                    {/* SUB MENU */}

                                    <td>
                                      {subMenu ? (
                                        <div>
                                          <div className="fw-medium">
                                            {
                                              subMenu
                                                .subMenu
                                                ?.subMenuName
                                            }
                                          </div>

                                          <div className="small text-muted mt-1">
                                            {
                                              subMenu
                                                .subMenu
                                                ?.subMenuUrl
                                            }
                                          </div>
                                        </div>
                                      ) : (
                                        <span className="text-muted">
                                          No Sub Menu
                                        </span>
                                      )}
                                    </td>

                                    {/* ACTION */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                        className="text-center"
                                      >
                                        <div className="d-flex justify-content-center gap-2">
                                          <button
                                            className="btn btn-outline-primary btn-sm"
                                            title="Edit"
                                            onClick={() =>
                                              editMapping(
                                                item.id
                                              )
                                            }
                                          >
                                            <LuPencil
                                              size={
                                                16
                                              }
                                            />
                                          </button>

                                          <button
                                            className="btn btn-outline-danger btn-sm"
                                            title="Delete"
                                            onClick={() =>
                                              deleteMapping(
                                                item.id
                                              )
                                            }
                                          >
                                            <LuTrash2
                                              size={
                                                16
                                              }
                                            />
                                          </button>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                );

                                currentRow++;

                                return row;
                              }
                            );
                          }
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGroupMapping;