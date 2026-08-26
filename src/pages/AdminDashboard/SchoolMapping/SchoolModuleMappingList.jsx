
import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuRefreshCw,
  LuLayers3,
  LuMenu,
  LuCircleCheck,
  LuCircleX,
  LuChevronDown,
  LuChevronRight,
  LuExternalLink,
  LuBox,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";

const images = import.meta.glob("/src/assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});

const SchoolModuleMappingList = () => {
  const token = localStorage.getItem("token");


  const [schools, setSchools] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const [mappings, setMappings] = useState({
    moduleIds: [],
    menuIds: [],
    subMenuIds: [],
  });

  const [modules, setModules] = useState([]);
  const [moduleGroups, setModuleGroups] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const [expandedModules, setExpandedModules] = useState({});

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchInitialData();
  }, []);

  // =====================================================
  // FETCH SCHOOL + GROUP
  // =====================================================

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);

      const [schoolRes, groupRes] = await Promise.allSettled([
        axiosInstance.get("/api/school/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axiosInstance.get("/api/user-group/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // ---------------- SCHOOL ----------------

      if (schoolRes.status === "fulfilled") {
        const data = Array.isArray(schoolRes.value.data)
          ? schoolRes.value.data
          : schoolRes.value.data?.data ||
            schoolRes.value.data?.content ||
            [];

        setSchools(data);
      } else {
        console.error(
          "Error fetching schools:",
          schoolRes.reason
        );
        setSchools([]);
      }

      // ---------------- USER GROUP ----------------

      if (groupRes.status === "fulfilled") {
        const data = Array.isArray(groupRes.value.data)
          ? groupRes.value.data
          : groupRes.value.data?.data ||
            groupRes.value.data?.content ||
            [];

        setUserGroups(data);
      } else {
        console.error(
          "Error fetching user groups:",
          groupRes.reason
        );
        setUserGroups([]);
      }
    } catch (error) {
      console.error("Initial data error:", error);
    } finally {
      setInitialLoading(false);
    }
  };

 

  const fetchAllModules = async () => {
    try {
      const res = await axiosInstance.get("/api/module/all");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      return data;
    } catch (error) {
      console.error("Module Load Error:", error);
      return [];
    }
  };

  
  const getMenuName = (menu) => {
    return (
      menu?.menuName ||
      menu?.name ||
      menu?.label ||
      "-"
    );
  };

 
  const getSubMenuName = (subMenu) => {
    return (
      subMenu?.subMenuName ||
      subMenu?.name ||
      subMenu?.label ||
      "-"
    );
  };

 

  const getMenuCode = (menu) => {
    return (
      menu?.menuCode ||
      menu?.code ||
      "-"
    );
  };


  const getSubMenuCode = (subMenu) => {
    return (
      subMenu?.subMenuCode ||
      subMenu?.code ||
      "-"
    );
  };

  

  const getMenuRoute = (menu) => {
    return (
      menu?.menuUrl ||
      menu?.route ||
      menu?.routeUrl ||
      menu?.url ||
      menu?.path ||
      "-"
    );
  };

 

  const getSubMenuRoute = (subMenu) => {
    return (
      subMenu?.subMenuUrl ||
      subMenu?.route ||
      subMenu?.routeUrl ||
      subMenu?.url ||
      subMenu?.path ||
      "-"
    );
  };

  

  const isActive = (item) => {
    if (typeof item?.status === "boolean") {
      return item.status;
    }

    if (typeof item?.status === "string") {
      const status = item.status.toUpperCase();

      return (
        status === "ACTIVE" ||
        status === "TRUE" ||
        status === "ENABLED"
      );
    }

    return true;
  };

  

  const getMenuId = (menu) => {
    return menu?.id || menu?.menuId;
  };

 

  const getModuleId = (module) => {
    return module?.id || module?.moduleId;
  };

  

  const getModuleMenus = async (moduleId) => {
    try {
      const res = await axiosInstance.get(
        `/api/menu/module/${moduleId}`
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      return data;
    } catch (error) {
      console.error(
        `Menu error for module ${moduleId}:`,
        error
      );

      return [];
    }
  };

 

  const loadSchoolMapping = async () => {
    if (!selectedSchool) {
      alert("Please select School");
      return;
    }

    if (!selectedGroup) {
      alert("Please select User Group");
      return;
    }

    try {
      setLoading(true);
      setIsLoaded(false);

      setModuleGroups([]);

      

      const res = await axiosInstance.get(
        "/api/school-mapping/load",
        {
          params: {
            schoolId: selectedSchool,
            groupId: selectedGroup,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "School Mapping Response:",
        res.data
      );

      const data = res.data || {};

      const mappingData = {
        moduleIds: Array.isArray(data.moduleIds)
          ? data.moduleIds.map(Number)
          : [],

        menuIds: Array.isArray(data.menuIds)
          ? data.menuIds.map(Number)
          : [],

        subMenuIds: Array.isArray(data.subMenuIds)
          ? data.subMenuIds.map(Number)
          : [],
      };

      setMappings(mappingData);

     

      const allModules = await fetchAllModules();

      setModules(allModules);

      

      const mappedModules = allModules.filter(
        (module) =>
          mappingData.moduleIds.includes(
            Number(getModuleId(module))
          )
      );

      
      const groups = [];

      for (const module of mappedModules) {
        const moduleId = getModuleId(module);

        const allMenus = await getModuleMenus(
          moduleId
        );

       

        const mappedMenus = allMenus.filter(
          (menu) =>
            mappingData.menuIds.includes(
              Number(getMenuId(menu))
            )
        );

      

        const menusWithSubMenus =
          mappedMenus.map((menu) => {
            const subMenus = Array.isArray(
              menu?.subMenus
            )
              ? menu.subMenus
              : [];

            const mappedSubMenus =
              subMenus.filter((subMenu) =>
                mappingData.subMenuIds.includes(
                  Number(subMenu?.id)
                )
              );

            return {
              ...menu,
              subMenus: mappedSubMenus,
            };
          });

        groups.push({
          module,
          moduleId,
          menus: menusWithSubMenus,
        });
      }

      console.log(
        "FINAL MODULE TREE:",
        groups
      );

      setModuleGroups(groups);

      // Expand all initially
      const expanded = {};

      groups.forEach((group) => {
        expanded[group.moduleId] = true;
      });

      setExpandedModules(expanded);

      setIsLoaded(true);
    } catch (error) {
      console.error(
        "Mapping Load Error:",
        error
      );

      setMappings({
        moduleIds: [],
        menuIds: [],
        subMenuIds: [],
      });

      setModuleGroups([]);

      setIsLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  const getModuleImage = (module) => {
  const imageName = module?.image;

  if (!imageName) return null;

  return imageMap[imageName] || null;
};


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredGroups = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return moduleGroups;
    }

    return moduleGroups
      .map((group) => {
        const module = group.module || {};

        const moduleName = (
          module?.moduleName ||
          module?.name ||
          ""
        ).toLowerCase();

        const moduleCode = (
          module?.moduleCode ||
          module?.code ||
          ""
        ).toLowerCase();

        const moduleMatch =
          moduleName.includes(value) ||
          moduleCode.includes(value);

        const menus = group.menus
          .map((menu) => {
            const menuMatch =
              getMenuName(menu)
                .toLowerCase()
                .includes(value) ||
              getMenuCode(menu)
                .toLowerCase()
                .includes(value) ||
              getMenuRoute(menu)
                .toLowerCase()
                .includes(value);

            const subMenus = (
              menu.subMenus || []
            ).filter((subMenu) => {
              return (
                getSubMenuName(subMenu)
                  .toLowerCase()
                  .includes(value) ||
                getSubMenuCode(subMenu)
                  .toLowerCase()
                  .includes(value) ||
                getSubMenuRoute(subMenu)
                  .toLowerCase()
                  .includes(value)
              );
            });

            if (
              menuMatch ||
              subMenus.length > 0
            ) {
              return {
                ...menu,
                subMenus: menuMatch
                  ? menu.subMenus || []
                  : subMenus,
              };
            }

            return null;
          })
          .filter(Boolean);

        if (
          moduleMatch ||
          menus.length > 0
        ) {
          return {
            ...group,
            menus: moduleMatch
              ? group.menus
              : menus,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [moduleGroups, search]);

  // =====================================================
  // TOGGLE MODULE
  // =====================================================

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // =====================================================
  // EXPAND ALL
  // =====================================================

  const expandAll = () => {
    const state = {};

    filteredGroups.forEach((group) => {
      state[group.moduleId] = true;
    });

    setExpandedModules(state);
  };

  // =====================================================
  // COLLAPSE ALL
  // =====================================================

  const collapseAll = () => {
    setExpandedModules({});
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSelectedSchool("");
    setSelectedGroup("");

    setMappings({
      moduleIds: [],
      menuIds: [],
      subMenuIds: [],
    });

    setModules([]);
    setModuleGroups([]);

    setSearch("");
    setExpandedModules({});
    setIsLoaded(false);
  };

  // =====================================================
  // RENDER STATUS
  // =====================================================

  const StatusBadge = ({ active }) => {
    return active ? (
      <span
        className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
        style={{
          background: "#dcfce7",
          color: "#16a34a",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        <LuCircleCheck
          size={13}
          className="me-1"
        />
        Active
      </span>
    ) : (
      <span
        className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
        style={{
          background: "#fee2e2",
          color: "#dc2626",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        <LuCircleX
          size={13}
          className="me-1"
        />
        Inactive
      </span>
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{
            minHeight: "70px",
          }}
        >
          <h4 className="fw-bold mb-1">
            School Module Mapping List
          </h4>

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
                School Module Mapping List
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ================================================= */}
      {/* FILTER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-3">
          <div className="card-header bg-white">
            <h6 className="fw-bold mb-0">
              Search School Mapping
            </h6>
          </div>

          <div className="card-body">
            <div className="row g-3">

              {/* SCHOOL */}

              <div className="col-md-4">
                <label className="form-label">
                  <h6>
                    School{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </h6>
                </label>

                <select
                  className="form-select"
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(
                      e.target.value
                    );

                    setSelectedGroup("");
                    setModuleGroups([]);
                    setSearch("");
                    setIsLoaded(false);
                  }}
                  disabled={initialLoading}
                >
                  <option value="">
                    Select School
                  </option>

                  {schools.map((school) => (
                    <option
                      key={school.id}
                      value={school.id}
                    >
                      {school.schoolName ||
                        school.name ||
                        school.organizationName}
                    </option>
                  ))}
                </select>
              </div>

              {/* USER GROUP */}

              <div className="col-md-4">
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
                  value={selectedGroup}
                  disabled={
                    !selectedSchool ||
                    initialLoading
                  }
                  onChange={(e) => {
                    setSelectedGroup(
                      e.target.value
                    );

                    setModuleGroups([]);
                    setSearch("");
                    setIsLoaded(false);
                  }}
                >
                  <option value="">
                    Select User Group
                  </option>

                  {userGroups.map((group) => (
                    <option
                      key={group.id}
                      value={group.id}
                    >
                      {group.groupName ||
                        group.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUTTON */}

              <div className="col-md-4 d-flex align-items-end gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={loadSchoolMapping}
                  disabled={
                    !selectedSchool ||
                    !selectedGroup ||
                    loading
                  }
                >
                  <LuLayers3
                    size={18}
                    className="me-2"
                  />

                  {loading
                    ? "Loading..."
                    : "Load Modules"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  <LuRefreshCw
                    size={18}
                    className="me-2"
                  />

                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* LIST */}
        {/* ================================================= */}

        {isLoaded && (
          <div className="card shadow border-0 rounded-3 mt-3">

            {/* HEADER */}

            <div
              className="card-header bg-white border-0"
              style={{
                padding: "16px 18px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                <div className="d-flex align-items-center">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "#f0eaff",
                    }}
                  >
                    <LuLayers3
                      size={17}
                      style={{
                        color: "#6f2cff",
                      }}
                    />
                  </span>

                  <div>
                    <h6 className="mb-0 fw-bold">
                      Module & Menu List
                    </h6>

                    <small className="text-muted">
                      School mapped modules,
                      menus and submenus
                    </small>
                  </div>
                </div>

                {/* SEARCH */}

                <div
                  className="position-relative"
                  style={{
                    width: "250px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search module, menu..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    style={{
                      paddingRight: "38px",
                      fontSize: "13px",
                      height: "36px",
                    }}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "9px",
                    }}
                  />
                </div>
              </div>

              {/* EXPAND COLLAPSE */}

              {!loading &&
                filteredGroups.length > 0 && (
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-light"
                      onClick={expandAll}
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      Expand All
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-light"
                      onClick={collapseAll}
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      Collapse All
                    </button>
                  </div>
                )}
            </div>

            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            <div className="card-body p-0">
              <div className="table-responsive">
                <table
                  className="table align-middle mb-0"
                  style={{
                    minWidth: "1100px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#fafbff",
                        borderTop:
                          "1px solid #f0f0f0",
                        borderBottom:
                          "1px solid #eeeeee",
                      }}
                    >
                      <th
                        className="text-center"
                        style={{
                          width: "5%",
                          fontSize: "12px",
                          color: "#555",
                          padding:
                            "13px 10px",
                        }}
                      >
                        #
                      </th>

                      <th
                        style={{
                          width: "24%",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        Name
                      </th>

                      <th
                        style={{
                          width: "14%",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        Code
                      </th>

                      <th
                        style={{
                          width: "11%",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        Type
                      </th>

                      <th
                        style={{
                          width: "20%",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        Route
                      </th>

                      <th
                        className="text-center"
                        style={{
                          width: "8%",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        Order
                      </th>

                      <th
                        style={{
                          width: "10%",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {/* LOADING */}

                    {loading && (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-5"
                        >
                          <div
                            className="spinner-border text-primary"
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                          />

                          <div className="text-muted mt-2">
                            Loading mapping...
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* EMPTY */}

                    {!loading &&
                      filteredGroups.length ===
                        0 && (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-5"
                          >
                            <LuMenu
                              size={35}
                              className="text-muted mb-2"
                            />

                            <div className="fw-semibold">
                              No mapped modules found
                            </div>

                            <small className="text-muted">
                              No module, menu or
                              submenu is mapped
                              for this selection.
                            </small>
                          </td>
                        </tr>
                      )}

                    {/* ================================================= */}
                    {/* MODULE */}
                    {/* ================================================= */}

                    {!loading &&
                      filteredGroups.map(
                        (
                          group,
                          groupIndex
                        ) => {
                          const module =
                            group.module ||
                            {};

                          const moduleId =
                            group.moduleId;

                          const moduleName =
                            module?.moduleName ||
                            module?.name ||
                            "-";

                          const moduleCode =
                            module?.moduleCode ||
                            module?.code ||
                            "-";
                             
    const moduleImage =
      getModuleImage(module);

                          const expanded =
                            expandedModules[
                              moduleId
                            ] ?? true;

                          const moduleActive =
                            isActive(module);

                          return (
                            <React.Fragment
                              key={moduleId}
                            >

                              {/* ============================= */}
                              {/* MODULE ROW */}
                              {/* ============================= */}

                              <tr
                                style={{
                                  background:
                                    "#fcfbff",
                                  borderBottom:
                                    "1px solid #eeeeee",
                                }}
                              >
                                <td className="text-center">
                                  <span
                                    style={{
                                      fontSize:
                                        "12px",
                                      fontWeight:
                                        "600",
                                      color:
                                        "#555",
                                    }}
                                  >
                                    {groupIndex +
                                      1}
                                    .
                                  </span>
                                </td>

                                <td>
                                  <div className="d-flex align-items-center">

                                    {/* EXPAND */}

                                    <button
                                      type="button"
                                      className="border-0 bg-transparent p-0 me-2 d-flex align-items-center justify-content-center"
                                      onClick={() =>
                                        toggleModule(
                                          moduleId
                                        )
                                      }
                                      style={{
                                        width:
                                          "20px",
                                        height:
                                          "20px",
                                      }}
                                    >
                                      {expanded ? (
                                        <LuChevronDown
                                          size={
                                            15
                                          }
                                        />
                                      ) : (
                                        <LuChevronRight
                                          size={
                                            15
                                          }
                                        />
                                      )}
                                    </button>

                                    {/* ICON */}

                                    <span
                                      className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
                                      style={{
                                        width:
                                          "38px",
                                        height:
                                          "38px",
                                        background:
                                          "#f1edff",
                                      }}
                                    >
                                      {moduleImage ? (
  <img
    src={moduleImage}
    alt={module.moduleName}
    style={{
      width: "23px",
      height: "23px",
      objectFit: "contain",
    }}
  />
) : (
  <LuBox size={19} color="#6f2cff" />
)}
                                    </span>

                                    <div>
                                      <div
                                        className="fw-semibold"
                                        style={{
                                          fontSize:
                                            "13px",
                                        }}
                                      >
                                        {
                                          moduleName
                                        }
                                      </div>

                                      <small
                                        className="text-muted"
                                        style={{
                                          fontSize:
                                            "10px",
                                        }}
                                      >
                                        {
                                          group
                                            .menus
                                            .length
                                        }{" "}
                                        {group
                                          .menus
                                          .length ===
                                        1
                                          ? "menu"
                                          : "menus"}
                                      </small>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <span
                                    className="px-2 py-1 rounded-2"
                                    style={{
                                      background:
                                        "#f1edff",
                                      color:
                                        "#6f2cff",
                                      fontSize:
                                        "10px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >
                                    {
                                      moduleCode
                                    }
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className="px-2 py-1 rounded-2"
                                    style={{
                                      background:
                                        "#f3e8ff",
                                      color:
                                        "#7e22ce",
                                      fontSize:
                                        "10px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >
                                    Module
                                  </span>
                                </td>

                                <td>
                                  <span className="text-muted">
                                    -
                                  </span>
                                </td>

                                <td className="text-center">
                                  -
                                </td>

                                <td>
                                  <StatusBadge
                                    active={
                                      moduleActive
                                    }
                                  />
                                </td>
                              </tr>

                           

                              {expanded &&
                                group.menus.map(
                                  (
                                    menu,
                                    menuIndex
                                  ) => {
                                    const menuActive =
                                      isActive(
                                        menu
                                      );

                                    return (
                                      <React.Fragment
                                        key={
                                          getMenuId(
                                            menu
                                          ) ||
                                          menuIndex
                                        }
                                      >

                                        {/* MENU */}

                                        <tr
                                          style={{
                                            borderBottom:
                                              "1px solid #f4f4f4",
                                          }}
                                        >
                                          <td></td>

                                          <td>
                                            <div
                                              className="d-flex align-items-center"
                                              style={{
                                                paddingLeft:
                                                  "32px",
                                              }}
                                            >

                                              {/* TREE */}

                                              <div
                                                style={{
                                                  width:
                                                    "18px",
                                                  height:
                                                    "30px",
                                                  borderLeft:
                                                    "1px solid #d9d9d9",
                                                  borderBottom:
                                                    "1px solid #d9d9d9",
                                                  borderBottomLeftRadius:
                                                    "5px",
                                                  marginRight:
                                                    "10px",
                                                  marginTop:
                                                    "-15px",
                                                }}
                                              />

                                              

                                              <div>
                                                <div
                                                  className="fw-semibold"
                                                  style={{
                                                    fontSize:
                                                      "12px",
                                                  }}
                                                >
                                                  {getMenuName(
                                                    menu
                                                  )}
                                                </div>

                                                <small
                                                  className="text-muted"
                                                  style={{
                                                    fontSize:
                                                      "10px",
                                                  }}
                                                >
                                                  {getMenuCode(
                                                    menu
                                                  )}
                                                </small>
                                              </div>
                                            </div>
                                          </td>

                                          <td>
                                            <span
                                              className="px-2 py-1 rounded-2"
                                              style={{
                                                background:
                                                  "#f1edff",
                                                color:
                                                  "#6f2cff",
                                                fontSize:
                                                  "9px",
                                                fontWeight:
                                                  "600",
                                              }}
                                            >
                                              {
                                                moduleCode
                                              }
                                            </span>
                                          </td>

                                          <td>
                                            <span
                                              className="px-2 py-1 rounded-2"
                                              style={{
                                                background:
                                                  "#f3e8ff",
                                                color:
                                                  "#7e22ce",
                                                fontSize:
                                                  "9px",
                                                fontWeight:
                                                  "600",
                                              }}
                                            >
                                              Main
                                            </span>
                                          </td>

                                          <td>
                                            <div className="d-flex align-items-center gap-2">
                                              <code
                                                style={{
                                                  fontSize:
                                                    "11px",
                                                }}
                                              >
                                                {getMenuRoute(
                                                  menu
                                                )}
                                              </code>

                                              {getMenuRoute(
                                                menu
                                              ) !==
                                                "-" && (
                                                <LuExternalLink
                                                  size={
                                                    14
                                                  }
                                                  className="text-muted"
                                                />
                                              )}
                                            </div>
                                          </td>

                                          <td className="text-center">
                                            {menu?.displayOrder ??
                                              menu?.order ??
                                              menuIndex +
                                                1}
                                          </td>

                                          <td>
                                            <StatusBadge
                                              active={
                                                menuActive
                                              }
                                            />
                                          </td>
                                        </tr>

                                        {/* ================================================= */}
                                        {/* SUB MENUS */}
                                        {/* ================================================= */}

                                        {Array.isArray(
                                          menu.subMenus
                                        ) &&
                                          menu.subMenus.length >
                                            0 &&
                                          menu.subMenus.map(
                                            (
                                              subMenu,
                                              subIndex
                                            ) => (
                                              <tr
                                                key={
                                                  subMenu?.id ||
                                                  `${getMenuId(
                                                    menu
                                                  )}-${subIndex}`
                                                }
                                                style={{
                                                  borderBottom:
                                                    "1px solid #f7f7f7",
                                                  background:
                                                    "#fff",
                                                }}
                                              >
                                                <td></td>

                                                <td>
                                                  <div
                                                    className="d-flex align-items-center"
                                                    style={{
                                                      paddingLeft:
                                                        "67px",
                                                    }}
                                                  >

                                                    {/* TREE */}

                                                    <div
                                                      style={{
                                                        position:
                                                          "relative",
                                                        width:
                                                          "28px",
                                                        height:
                                                          "28px",
                                                        marginRight:
                                                          "8px",
                                                        flexShrink: 0,
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          position:
                                                            "absolute",
                                                          left: 0,
                                                          top:
                                                            "-14px",
                                                          width:
                                                            "18px",
                                                          height:
                                                            "27px",
                                                          borderLeft:
                                                            "1px solid #d9d9d9",
                                                          borderBottom:
                                                            "1px solid #d9d9d9",
                                                          borderBottomLeftRadius:
                                                            "5px",
                                                        }}
                                                      />

                                                      <div
                                                        style={{
                                                          position:
                                                            "absolute",
                                                          left:
                                                            "14px",
                                                          top:
                                                            "13px",
                                                          width:
                                                            "5px",
                                                          height:
                                                            "5px",
                                                          borderRadius:
                                                            "50%",
                                                          background:
                                                            "#6f2cff",
                                                        }}
                                                      />
                                                    </div>

                                                    <div>
                                                      <div
                                                        style={{
                                                          fontSize:
                                                            "12px",
                                                          fontWeight:
                                                            "500",
                                                          color:
                                                            "#444",
                                                        }}
                                                      >
                                                        {getSubMenuName(
                                                          subMenu
                                                        )}
                                                      </div>

                                                      <small
                                                        className="text-muted"
                                                        style={{
                                                          fontSize:
                                                            "9px",
                                                        }}
                                                      >
                                                        {getSubMenuCode(
                                                          subMenu
                                                        )}
                                                      </small>
                                                    </div>
                                                  </div>
                                                </td>

                                                <td>
                                                  <span
                                                    className="px-2 py-1 rounded-2"
                                                    style={{
                                                      background:
                                                        "#f1edff",
                                                      color:
                                                        "#6f2cff",
                                                      fontSize:
                                                        "9px",
                                                      fontWeight:
                                                        "600",
                                                    }}
                                                  >
                                                    {
                                                      moduleCode
                                                    }
                                                  </span>
                                                </td>

                                                <td>
                                                  <span
                                                    className="px-2 py-1 rounded-2"
                                                    style={{
                                                      background:
                                                        "#f3e8ff",
                                                      color:
                                                        "#7e22ce",
                                                      fontSize:
                                                        "9px",
                                                      fontWeight:
                                                        "600",
                                                    }}
                                                  >
                                                    Sub
                                                  </span>
                                                </td>

                                                <td>
                                                  <div className="d-flex align-items-center gap-2">
                                                    <code
                                                      style={{
                                                        fontSize:
                                                          "11px",
                                                      }}
                                                    >
                                                      {getSubMenuRoute(
                                                        subMenu
                                                      )}
                                                    </code>

                                                    {getSubMenuRoute(
                                                      subMenu
                                                    ) !==
                                                      "-" && (
                                                      <LuExternalLink
                                                        size={
                                                          14
                                                        }
                                                        className="text-muted"
                                                      />
                                                    )}
                                                  </div>
                                                </td>

                                                <td className="text-center">
                                                  {subMenu?.displayOrder ??
                                                    subIndex +
                                                      1}
                                                </td>

                                                <td>
                                                  <StatusBadge
                                                    active={isActive(
                                                      subMenu
                                                    )}
                                                  />
                                                </td>
                                              </tr>
                                            )
                                          )}
                                      </React.Fragment>
                                    )
                                  }
                                )}
                            </React.Fragment>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FOOTER */}

            {!loading &&
              filteredGroups.length > 0 && (
                <div className="card-footer bg-white border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Showing{" "}
                      <strong>
                        {filteredGroups.length}
                      </strong>{" "}
                      mapped modules
                    </small>

                    <small className="text-muted">
                      Modules:{" "}
                      <strong>
                        {
                          mappings.moduleIds
                            .length
                        }
                      </strong>{" "}
                      | Menus:{" "}
                      <strong>
                        {
                          mappings.menuIds
                            .length
                        }
                      </strong>{" "}
                      | Sub Menus:{" "}
                      <strong>
                        {
                          mappings.subMenuIds
                            .length
                        }
                      </strong>
                    </small>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default SchoolModuleMappingList;