import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const ModuleList = () => {
  const [modules, setModules] = useState([]);

  console.log("modules", modules);

  //   load modules
  const fetchModules = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/user-group-mapping/all",
      );

      //   setModules(res.data.filter((m) => m.hasMenu === true));
      setModules(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchModules();
  }, []);

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
        <h5 className="fw-bold">Module List</h5>

        <nav>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">Module Wise Menu</li>
          </ol>
        </nav>
      </div>
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header  ">
            <h5 className="mb-0">Module List</h5>
          </div>

          <div className="card-body p-0">
            <table className="table table-bordered rounded shadow  mb-0 align-middle">
              <thead className="">
                <tr>
                  <th style={{ width: "10%" }}>S.No</th>
                  <th style={{ width: "25%" }}>Module</th>
                  <th style={{ width: "35%" }}>Menu</th>
                  <th style={{ width: "40%" }}>Sub Menu</th>
                </tr>
              </thead>

              <tbody>
                {modules.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {/* Module Row */}
                    <tr className="">
                      <td>{index + 1}</td>
                      <td className="fw-bold">{item.module?.moduleName}</td>
                      <td></td>
                      <td></td>
                    </tr>

                    {item.menuMappings?.length > 0 ? (
                      item.menuMappings.map((menuMap) => (
                        <React.Fragment key={menuMap.id}>
                          {/* Menu Row */}
                          <tr>
                            <td></td>
                            <td></td>
                            <td className="ps-4 fw-semibold">
                             {menuMap.menu?.menuName}
                            </td>
                            <td></td>
                          </tr>

                          {/* SubMenus */}
                          {item.subMenuMappings
                            ?.filter(
                              (sub) =>
                                sub.subMenu?.menu?.id === menuMap.menu?.id,
                            )
                            .map((sub) => (
                              <tr key={sub.id}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="ps-5">
                                  ↳ {sub.subMenu?.subMenuName}
                                </td>
                              </tr>
                            ))}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="text-muted">No Menu</td>
                        <td>-</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleList;
