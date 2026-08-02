import axios from "axios";
import React, { useEffect, useState } from "react";

const UserGroupMapping = () => {
  const [modules, setModules] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [menus, setMenus] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    userGroupId: "",
    moduleId: "",
  });

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [selectedSubMenus, setSelectedSubMenus] = useState([]);

  useEffect(() => {
    loadModules();
    loadUserGroups();
    loadMappings();
  }, []);

  const loadMappings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user-group-mapping/all",
      );

      setMappings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadModules = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/module/all");

      // setModules(res.data.filter((m) => m.hasMenu === true));
      setModules(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Modules in usergroup",modules);
  console.log("mappings",mappings);

  const loadUserGroups = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-group/all");

      setUserGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "moduleId") {
      if (!value) {
        setMenus([]);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8080/api/menu/module/${value}`,
        );

        setMenus(res.data);
        setSelectedMenus([]);
        setSelectedSubMenus([]);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSave = async () => {
    if (!form.userGroupId) {
      alert("Please Select User Group");
      return;
    }

    if (!form.moduleId) {
      alert("Please Select Module");
      return;
    }

    // if (selectedMenus.length === 0 && selectedSubMenus.length === 0) {
    //   alert("Please Select At Least One Permission");
    //   return;
    // }

    const payload = {
      userGroupId: Number(form.userGroupId),

      moduleId: Number(form.moduleId),

      menuIds: selectedMenus,

      subMenuIds: selectedSubMenus,
    };

    console.log(payload);

    try {
      let res;

      if (editingId) {
        res = await axios.put(
          `http://localhost:8080/api/user-group-mapping/update/${editingId}`,
          payload,
        );
      } else {
        res = await axios.post(
          "http://localhost:8080/api/user-group-mapping/save",
          payload,
        );
      }

      alert(res.data);

      loadMappings();

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

      alert("Failed To Save Mapping");
    }
  };
  const deleteMapping = async (id) => {
    if (!window.confirm("Delete Mapping?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/user-group-mapping/${id}`);

      loadMappings();
    } catch (err) {
      console.log(err);
    }
  };
  const editMapping = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user-group-mapping/${id}`,
      );

      const data = res.data;

      setEditingId(id);

      setForm({
        userGroupId: data.userGroup.id,
        moduleId: data.module.id,
      });

      const menuRes = await axios.get(
        `http://localhost:8080/api/menu/module/${data.module.id}`,
      );

      setMenus(menuRes.data);

      setSelectedMenus(data.menuMappings.map((m) => m.menu.id));

      setSelectedSubMenus(data.subMenuMappings.map((s) => s.subMenu.id));
    } catch (err) {
      console.log(err);
    }
  };
  console.log("mappings", mappings);
  const filteredMappings = mappings.filter((item) => {
    const group = item.userGroup.groupName.toLowerCase();

    const module = item.module.moduleName.toLowerCase();

    return (
      group.includes(search.toLowerCase()) ||
      module.includes(search.toLowerCase())
    );
  });
  console.log("Filtered Mappings:", filteredMappings);
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
        <h5 className="fw-bold">UserGroup Mapping</h5>

        <nav>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">User Group Mapping</li>
          </ol>
        </nav>
      </div>

      <div className="container-fluid mt-3">
        <div className="card">
          <div className="card-header">UserGroup Mapping</div>
          <div className="card-body border shadow rounded p-4">
            <div className="row">
              {/* User Group */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">User Group</label>

                <select
                  className="form-select"
                  name="userGroupId"
                  value={form.userGroupId}
                  onChange={handleChange}
                >
                  <option value="">Select User Group</option>

                  {userGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Module */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Module</label>

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
            </div>

            

            {/* Permission Tree */}

            
              <div className="mt-3">
                <h5 className="text-primary mb-3">Module Permissions</h5>

                {menus.map((menu) => (
                  <div
                    key={menu.id}
                    className="card mb-3 border-primary shadow-sm"
                  >
                    <div className="card-header bg-light">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`menu_${menu.id}`}
                          checked={selectedMenus.includes(menu.id)}
                          onChange={(e) => {
                            let selected = [...selectedMenus];

                            let subSelected = [...selectedSubMenus];

                            if (e.target.checked) {
                              if (!selected.includes(menu.id)) {
                                selected.push(menu.id);
                              }

                              if (menu.subMenus) {
                                menu.subMenus.forEach((sub) => {
                                  if (!subSelected.includes(sub.id)) {
                                    subSelected.push(sub.id);
                                  }
                                });
                              }
                            } else {
                              selected = selected.filter(
                                (id) => id !== menu.id,
                              );

                              if (menu.subMenus) {
                                menu.subMenus.forEach((sub) => {
                                  subSelected = subSelected.filter(
                                    (id) => id !== sub.id,
                                  );
                                });
                              }
                            }

                            setSelectedMenus(selected);

                            setSelectedSubMenus(subSelected);
                          }}
                        />

                        <label
                          className="form-check-label fw-bold"
                          htmlFor={`menu_${menu.id}`}
                        >
                          {menu.menuName}
                        </label>
                      </div>
                    </div>

                    <div className="card-body">
                      {menu.subMenus && menu.subMenus.length > 0 ? (
                        <div className="row">
                          {menu.subMenus.map((sub) => (
                            <div className="col-md-4 mb-2" key={sub.id}>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`sub_${sub.id}`}
                                  checked={selectedSubMenus.includes(sub.id)}
                                  onChange={(e) => {
                                    let selected = [...selectedSubMenus];

                                    if (e.target.checked) {
                                      selected.push(sub.id);
                                    } else {
                                      selected = selected.filter(
                                        (id) => id !== sub.id,
                                      );
                                    }

                                    setSelectedSubMenus(selected);
                                  }}
                                />

                                <label
                                  className="form-check-label"
                                  htmlFor={`sub_${sub.id}`}
                                >
                                  {sub.subMenuName}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">
                          No Sub Menu Available
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            

            {menus.length === 0 && form.moduleId && (
              <div className="alert alert-warning mt-3">
                No Menus Found For This Module.
              </div>
            )}

            <div className="text-end mt-4">
              <button
                className={`btn ${editingId ? "btn-warning" : "btn-primary"} px-5`}
                onClick={handleSave}
              >
                {editingId ? "Update Mapping" : "Save Mapping"}
              </button>
              {editingId && (
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditingId(null);

                    setForm({
                      userGroupId: "",
                      moduleId: "",
                    });

                    setMenus([]);
                    setSelectedMenus([]);
                    setSelectedSubMenus([]);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* search bar  */}
      <div className="mt-5 container-fluid rounded shadow p-2 mx-2" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="d-flex justify-content-between mb-3">
          <h4>User Group Mapping List</h4>

          <input
            className="form-control"
            placeholder="Search..."
            style={{ width: 300 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

    {/* usergroup mapping table  */}
      <div className="card mt-4 shadow mx-2">
        <div className="card-header bg-primary text-white">
          User Group Mapping List
        </div>

        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>

                <th>User Group</th>

                <th>Module</th>

                <th>Menus</th>

                <th>Sub Menus</th>

                <th width="170">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMappings.map((item, index) => {
                const menus = item.menuMappings || [];
                const subMenus = item.subMenuMappings || [];

                const groupedMenus = menus.map((menuMap) => ({
                  menu: menuMap.menu,
                  subMenus: subMenus.filter(
                    (s) => s.subMenu.menu.id === menuMap.menu.id,
                  ),
                }));

                const totalRows = groupedMenus.reduce(
                  (sum, g) => sum + Math.max(g.subMenus.length, 1),
                  0,
                );

                let firstRow = true;

                return groupedMenus.flatMap((group) => {
                  const rows =
                    group.subMenus.length > 0 ? group.subMenus : [null];

                  return rows
                    .map((sub, i) => (
                      <tr key={`${item.id}-${group.menu.id}-${i}`}>
                        {firstRow && (
                          <>
                            <td rowSpan={totalRows}>{index + 1}</td>

                            <td rowSpan={totalRows}>
                              {item.userGroup.groupName}
                            </td>

                            <td rowSpan={totalRows}>
                              {item.module.moduleName}
                            </td>
                          </>
                        )}

                        {i === 0 && (
                          <td rowSpan={rows.length}>{group.menu.menuName}</td>
                        )}

                        <td>{sub ? sub.subMenu.subMenuName : "-"}</td>

                        {firstRow && (
                          <td rowSpan={totalRows}>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => editMapping(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteMapping(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                    .map((row, idx) => {
                      if (firstRow && idx === rows.length - 1) firstRow = false;
                      return row;
                    });
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserGroupMapping;
