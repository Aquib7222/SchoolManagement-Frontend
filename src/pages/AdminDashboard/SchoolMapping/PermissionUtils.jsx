// // permissionUtils.js

// // ---------------- MODULE ----------------
// export const handleModuleChange = (
//   moduleData,
//   checked,
//   checkedModules,
//   checkedMenus,
//   checkedSubMenus,
//   setCheckedModules,
//   setCheckedMenus,
//   setCheckedSubMenus
// ) => {
//   const modules = { ...checkedModules };
//   const menus = { ...checkedMenus };
//   const subMenus = { ...checkedSubMenus };

//   modules[moduleData.module.id] = checked;

//   moduleData.menuMappings.forEach((menuMap) => {
//     menus[menuMap.menu.id] = checked;

//     (menuMap.menu.subMenus || []).forEach((sub) => {
//       subMenus[sub.id] = checked;
//     });
//   });

//   setCheckedModules(modules);
//   setCheckedMenus(menus);
//   setCheckedSubMenus(subMenus);
// };

// // ---------------- MENU ----------------
// export const handleMenuChange = (
//   moduleData,
//   menu,
//   checked,
//   checkedModules,
//   checkedMenus,
//   checkedSubMenus,
//   setCheckedModules,
//   setCheckedMenus,
//   setCheckedSubMenus
// ) => {
//   const modules = { ...checkedModules };
//   const menus = { ...checkedMenus };
//   const subMenus = { ...checkedSubMenus };

//   menus[menu.id] = checked;

//   // Menu ke saare submenu select/unselect
//   (menu.subMenus || []).forEach((sub) => {
//     subMenus[sub.id] = checked;
//   });

//   if (checked) {
//     modules[moduleData.module.id] = true;
//   } else {
//     // Check karo koi aur menu ya submenu selected hai?
//     const anySelected = moduleData.menuMappings.some((m) => {
//       if (menus[m.menu.id]) return true;

//       return (m.menu.subMenus || []).some((s) => subMenus[s.id]);
//     });

//     modules[moduleData.module.id] = anySelected;
//   }

//   setCheckedModules(modules);
//   setCheckedMenus(menus);
//   setCheckedSubMenus(subMenus);
// };

// // ---------------- SUBMENU ----------------
// export const handleSubMenuChange = (
//   moduleData,
//   menu,
//   subMenu,
//   checked,
//   checkedModules,
//   checkedMenus,
//   checkedSubMenus,
//   setCheckedModules,
//   setCheckedMenus,
//   setCheckedSubMenus
// ) => {
//   const modules = { ...checkedModules };
//   const menus = { ...checkedMenus };
//   const subMenus = { ...checkedSubMenus };

//   subMenus[subMenu.id] = checked;

//   if (checked) {
//     menus[menu.id] = true;
//     modules[moduleData.module.id] = true;
//   } else {
//     // Kya isi menu ka koi aur submenu selected hai?
//     const anySubSelected = (menu.subMenus || []).some(
//       (s) => subMenus[s.id]
//     );

//     menus[menu.id] = anySubSelected;

//     // Kya module ka koi menu ya submenu selected hai?
//     const anyMenuSelected = moduleData.menuMappings.some((m) => {
//       if (menus[m.menu.id]) return true;

//       return (m.menu.subMenus || []).some((s) => subMenus[s.id]);
//     });

//     modules[moduleData.module.id] = anyMenuSelected;
//   }

//   setCheckedModules(modules);
//   setCheckedMenus(menus);
//   setCheckedSubMenus(subMenus);
// };

// // ---------------- SAVE PAYLOAD ----------------
// export const createPermissionPayload = (
//   schoolId,
//   groupId,
//   checkedModules,
//   checkedMenus,
//   checkedSubMenus
// ) => {
//   return {
//     schoolId: Number(schoolId),
//     groupId: Number(groupId),

//     moduleIds: Object.keys(checkedModules)
//       .filter((id) => checkedModules[id])
//       .map(Number),

//     menuIds: Object.keys(checkedMenus)
//       .filter((id) => checkedMenus[id])
//       .map(Number),

//     subMenuIds: Object.keys(checkedSubMenus)
//       .filter((id) => checkedSubMenus[id])
//       .map(Number),
//   };
// };

// // ---------------- EDIT MODE ----------------
// export const loadExistingPermissions = (
//   data,
//   setCheckedModules,
//   setCheckedMenus,
//   setCheckedSubMenus
// ) => {
//   const modules = {};
//   const menus = {};
//   const subMenus = {};

//   (data.moduleIds || []).forEach((id) => {
//     modules[id] = true;
//   });

//   (data.menuIds || []).forEach((id) => {
//     menus[id] = true;
//   });

//   (data.subMenuIds || []).forEach((id) => {
//     subMenus[id] = true;
//   });

//   setCheckedModules(modules);
//   setCheckedMenus(menus);
//   setCheckedSubMenus(subMenus);
// };

// ================= MODULE =================

export const handleModuleChange = (
  moduleData,
  checked,
  checkedModules,
  checkedMenus,
  checkedSubMenus,
  setCheckedModules,
  setCheckedMenus,
  setCheckedSubMenus
) => {
  const modules = { ...checkedModules };
  const menus = { ...checkedMenus };
  const subMenus = { ...checkedSubMenus };

  modules[moduleData.module.id] = checked;

  (moduleData.menuMappings || []).forEach((menuMap) => {
    const menu = menuMap.menu;

    menus[menu.id] = checked;

    (menu.subMenus || []).forEach((sub) => {
      subMenus[sub.id] = checked;
    });
  });

  setCheckedModules(modules);
  setCheckedMenus(menus);
  setCheckedSubMenus(subMenus);
};

// ================= MENU =================
export const handleMenuChange = (
  moduleData,
  menu,
  checked,
  checkedModules,
  checkedMenus,
  checkedSubMenus,
  setCheckedModules,
  setCheckedMenus,
  setCheckedSubMenus
) => {
  const modules = { ...checkedModules };
  const menus = { ...checkedMenus };
  const subMenus = { ...checkedSubMenus };

  menus[menu.id] = checked;

  (menu.subMenus || []).forEach((sub) => {
    subMenus[sub.id] = checked;
  });

  if (checked) {
    modules[moduleData.module.id] = true;
  } else {
    const anySelected = (moduleData.menuMappings || []).some((m) => {
      if (menus[m.menu.id]) return true;

      return (m.menu.subMenus || []).some((s) => subMenus[s.id]);
    });

    modules[moduleData.module.id] = anySelected;
  }

  setCheckedModules(modules);
  setCheckedMenus(menus);
  setCheckedSubMenus(subMenus);
};

// ================= SUB MENU =================
export const handleSubMenuChange = (
  moduleData,
  menu,
  subMenu,
  checked,
  checkedModules,
  checkedMenus,
  checkedSubMenus,
  setCheckedModules,
  setCheckedMenus,
  setCheckedSubMenus
) => {
  const modules = { ...checkedModules };
  const menus = { ...checkedMenus };
  const subMenus = { ...checkedSubMenus };

  subMenus[subMenu.id] = checked;

  if (checked) {
    menus[menu.id] = true;
    modules[moduleData.module.id] = true;
  } else {
    const anySubSelected = (menu.subMenus || []).some(
      (s) => subMenus[s.id]
    );

    menus[menu.id] = anySubSelected;

    const anyMenuSelected = (moduleData.menuMappings || []).some((m) => {
      if (menus[m.menu.id]) return true;

      return (m.menu.subMenus || []).some((s) => subMenus[s.id]);
    });

    modules[moduleData.module.id] = anyMenuSelected;
  }

  setCheckedModules(modules);
  setCheckedMenus(menus);
  setCheckedSubMenus(subMenus);
};

// ================= GLOBAL SELECT ALL =================
export const handleSelectAll = (
  filteredModules,
  checked,
  setCheckedModules,
  setCheckedMenus,
  setCheckedSubMenus
) => {
  const modules = {};
  const menus = {};
  const subMenus = {};

  filteredModules.forEach((moduleData) => {
    modules[moduleData.module.id] = checked;

    (moduleData.menuMappings || []).forEach((menuMap) => {
      menus[menuMap.menu.id] = checked;

      (menuMap.menu.subMenus || []).forEach((sub) => {
        subMenus[sub.id] = checked;
      });
    });
  });

  setCheckedModules(modules);
  setCheckedMenus(menus);
  setCheckedSubMenus(subMenus);
};

// ================= CHECK ALL STATUS =================
export const isAllSelected = (
  filteredModules,
  checkedModules,
  checkedMenus,
  checkedSubMenus
) => {
  if (!filteredModules.length) return false;

  return filteredModules.every((moduleData) => {
    if (!checkedModules[moduleData.module.id]) return false;

    return (moduleData.menuMappings || []).every((menuMap) => {
      if (!checkedMenus[menuMap.menu.id]) return false;

      return (menuMap.menu.subMenus || []).every(
        (sub) => checkedSubMenus[sub.id]
      );
    });
  });
};

// ================= MODULE STATUS =================
export const isModuleChecked = (moduleData, checkedModules) => {
  return !!checkedModules[moduleData.module.id];
};

// ================= MENU STATUS =================
export const isMenuChecked = (menu, checkedMenus) => {
  return !!checkedMenus[menu.id];
};

// ================= SUB MENU STATUS =================
export const isSubMenuChecked = (subMenu, checkedSubMenus) => {
  return !!checkedSubMenus[subMenu.id];
};

// ================= CREATE SAVE PAYLOAD =================
export const createPermissionPayload = (
  schoolId,
  groupId,
  checkedModules,
  checkedMenus,
  checkedSubMenus
) => {
  return {
    schoolId: Number(schoolId),
    userGroupId: Number(groupId),

    moduleIds: Object.keys(checkedModules)
      .filter((id) => checkedModules[id])
      .map(Number),

    menuIds: Object.keys(checkedMenus)
      .filter((id) => checkedMenus[id])
      .map(Number),

    subMenuIds: Object.keys(checkedSubMenus)
      .filter((id) => checkedSubMenus[id])
      .map(Number),
  };
};

// ================= LOAD EDIT DATA =================
export const loadExistingPermissions = (
  data,
  setCheckedModules,
  setCheckedMenus,
  setCheckedSubMenus
) => {
  const modules = {};
  const menus = {};
  const subMenus = {};

  (data.moduleIds || []).forEach((id) => {
    modules[id] = true;
  });

  (data.menuIds || []).forEach((id) => {
    menus[id] = true;
  });

  (data.subMenuIds || []).forEach((id) => {
    subMenus[id] = true;
  });

  setCheckedModules(modules);
  setCheckedMenus(menus);
  setCheckedSubMenus(subMenus);
};