import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { GoArrowRight, GoDot } from "react-icons/go";
import { allMenuItems } from "./MenusData";

const images = import.meta.glob("../../assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});

console.log("imageMap", imageMap);
import {
  FaUsers,
  FaUserGraduate,
  FaSchool,
  FaMoneyBill,
  FaBook,
} from "react-icons/fa";

const iconMap = {
  FaUsers,
  FaUserGraduate,
  FaSchool,
  FaMoneyBill,
  FaBook,
 
};


import axios from "../../api/axiosInstance";

const Sidebar_menu = () => {
  const storedUser = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const schoolId = localStorage.getItem("schoolId");
  const groupId = localStorage.getItem("userGroupId");
  console.log("role", storedUser);

  useEffect(() => {
    console.log("Sidebar useEffect");
    loadSidebar();
  }, []);

  const loadSidebar = async () => {
    try {
      const res = await axios.get(
        "api/school-mapping/sidebar",
        {
          params: {
            schoolId,
            groupId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Sidebar Response :", res.data);

      setAllMenus(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  // const allmenus = allMenuItems || {};
  const [allmenus, setAllMenus] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedSubSubMenu, setExpandedSubSubMenu] = useState({});
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);

  const toggleMenu = (menuKey) => {
    setExpandedMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const toggleSubSubMenu = (subLabel) => {
    setExpandedSubSubMenu((prev) => ({
      ...prev,
      [subLabel]: !prev[subLabel],
    }));
  };


  const allowedItems = [...allmenus].sort(
  (a, b) => Number(a.sequenceNumber) - Number(b.sequenceNumber)
);

  return (
    <div
      style={{
        padding: "15px 0",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
       
        backgroundRepeat: "no-repeat",
        // backgroundColor: "#ecf1f7",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginBottom: "20px",
          
        }}
      >
        {allowedItems.map((item, index) => {
          const Icon = iconMap[item.icon];
          const hasSubmenu =
            Array.isArray(item.subMenus) && item.subMenus.length > 0;
          const isExpanded = expandedMenu === item.id;
          const isHovered = hoveredMenu === item.id;

          return (
            <li
              key={item.id}
              style={{ marginBottom: "4px", backgroundColor: "#ffffff" }}
            >
              <div
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                  cursor: "pointer",
                  // backgroundColor:"blue",
                  backgroundColor:
                    isExpanded || isHovered ? "#a5c0f0" : "transparent",
                  color: isExpanded || isHovered ? "#0b57d0" : "#333",
                  borderRadius: "8px",
                  fontWeight: 600,
                  userSelect: "none",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                <img
                      src={imageMap[item.image]}
                      alt={item.label}
                      style={{
                        width: 25,
                        height: 25,
                        objectFit: "contain",
                        marginRight: 10,
                      }}
                    />
                {!hasSubmenu ? (
                  <Link
                    to={item.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textDecoration: "none",
                      color: "inherit",
                      flexGrow: 1,
                      padding: "5px 0",
                    }}
                  >
                    {/* <span style={{ fontSize: "18px" }}>{Icon && <Icon />}</span> */}
                   
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    onClick={() => toggleMenu(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexGrow: 1,
                      userSelect: "none",
                      padding: "5px 0",
                    }}
                  >
                    {/* <span style={{ fontSize: "18px" }}>{Icon && <Icon />}</span> */}
                    
                    <span>{item.label}</span>
                  </span>
                )}

                {hasSubmenu && (
                  <span
                    onClick={() => toggleMenu(item.id)}
                    style={{
                      cursor: "pointer",
                      userSelect: "none",
                      fontSize: "15px",
                      transition: "transform 0.3s",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    <FaAngleDown />
                  </span>
                )}
              </div>

              {hasSubmenu && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    maxHeight: isExpanded ? "500px" : "0",
                    overflowY: "auto",
                    transition: "max-height 0.4s ease",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
 
                  {item.subMenus.map((subItem) => {
                    const isSubHovered = hoveredSubmenu === subItem.path;

                    const hasSubSub =
                      Array.isArray(subItem.subSubMenu) &&
                      subItem.subSubMenu.length > 0;

                    return (
                      <li
                        key={subItem.id || subItem.label}
                        style={{ marginBottom: "6px" }}
                      >
                        {hasSubSub ? (
                          <>
                            <div
                              onClick={() => toggleSubSubMenu(subItem.label)}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px 15px 10px 30px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: isSubHovered ? "#0b57d0" : "#555",
                                fontWeight: 400,
                              }}
                              onMouseEnter={() =>
                                setHoveredSubmenu(subItem.path)
                              }
                              onMouseLeave={() => setHoveredSubmenu(null)}
                            >
                              <span>
                                <GoArrowRight /> {subItem.label}
                              </span>

                              <FaAngleDown
                                style={{
                                  transform: expandedSubSubMenu[subItem.label]
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                  transition: "0.3s",
                                }}
                              />
                            </div>

                            <ul
                              style={{
                                listStyle: "none",
                                paddingLeft: "45px",
                                marginTop: "5px",
                                display: expandedSubSubMenu[subItem.label]
                                  ? "block"
                                  : "none",
                              }}
                            >
                              {subItem.subSubMenu.map((subSub) => (
                                <li key={subSub.id || subSub.path}>
                                  <Link
                                    to={subSub.path}
                                    style={{
                                      display: "block",
                                      padding: "8px 0",
                                      textDecoration: "none",
                                      color:
                                        hoveredSubmenu === subSub.path
                                          ? "#0b57d0"
                                          : "#555",
                                    }}
                                    onMouseEnter={() =>
                                      setHoveredSubmenu(subSub.path)
                                    }
                                    onMouseLeave={() => setHoveredSubmenu(null)}
                                  >
                                    <GoDot /> {subSub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <Link
                            to={subItem.path}
                            style={{
                              display: "block",
                              padding: "10px 0 10px 30px",
                              borderRadius: "6px",
                              color: isSubHovered ? "#0b57d0" : "#555",
                              textDecoration: "none",
                              fontWeight: 400,
                            }}
                            onMouseEnter={() => setHoveredSubmenu(subItem.path)}
                            onMouseLeave={() => setHoveredSubmenu(null)}
                          >
                            <GoArrowRight /> {subItem.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar_menu;
