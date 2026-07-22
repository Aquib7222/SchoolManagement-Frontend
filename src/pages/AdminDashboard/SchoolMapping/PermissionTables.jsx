// import React from "react";

// const PermissionTables = ({
//   moduleData,
//   checkedModules,
//   checkedMenus,
//   checkedSubMenus,
//   onModuleChange,
//   onMenuChange,
//   onSubMenuChange,
// }) => {
//   if (!moduleData) return null;

//   const menus = moduleData.menuMappings || [];

//   const totalRows =
//     menus.reduce((total, menuMap) => {
//       const subCount = menuMap.menu?.subMenus?.length || 0;
//       return total + Math.max(subCount, 1);
//     }, 0) || 1;

//   let modulePrinted = false;

//   return (
//     <table className="table table-bordered table-hover align-middle">
//       <thead className="table-dark">
//         <tr>
//           <th width="8%">S.No</th>
//           <th width="25%">Module</th>
//           <th width="30%">Menu</th>
//           <th width="37%">Sub Menu</th>
//         </tr>
//       </thead>

//       <tbody>
//         {menus.map((menuMap) => {
//           const menu = menuMap.menu;
//           const subMenus = menu.subMenus || [];
//           const menuRows = Math.max(subMenus.length, 1);

//           let menuPrinted = false;

//           if (subMenus.length > 0) {
//             return subMenus.map((subMenu) => (
//               <tr key={`${menu.id}-${subMenu.id}`}>
//                 {!modulePrinted && (
//                   <>
//                     <td rowSpan={totalRows}>1</td>

//                     <td rowSpan={totalRows}>
//                       <div className="form-check">
//                         <input
//                           type="checkbox"
//                           className="form-check-input"
//                           checked={checkedModules[moduleData.module.id] || false}
//                           onChange={(e) =>
//                             onModuleChange(moduleData, e.target.checked)
//                           }
//                         />

//                         <label className="form-check-label fw-bold">
//                           {moduleData.module.moduleName}
//                         </label>
//                       </div>
//                     </td>
//                   </>
//                 )}

//                 {!menuPrinted && (
//                   <td rowSpan={menuRows}>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={checkedMenus[menu.id] || false}
//                         onChange={(e) =>
//                           onMenuChange(moduleData, menu, e.target.checked)
//                         }
//                       />

//                       <label className="form-check-label">
//                         {menu.menuName}
//                       </label>
//                     </div>
//                   </td>
//                 )}

//                 <td>
//                   <div className="form-check ms-3">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       checked={checkedSubMenus[subMenu.id] || false}
//                       onChange={(e) =>
//                         onSubMenuChange(
//                           moduleData,
//                           menu,
//                           subMenu,
//                           e.target.checked
//                         )
//                       }
//                     />

//                     <label className="form-check-label">
//                       {subMenu.subMenuName}
//                     </label>
//                   </div>
//                 </td>

//                 {(modulePrinted = true) && null}
//                 {(menuPrinted = true) && null}
//               </tr>
//             ));
//           }

//           return (
//             <tr key={menu.id}>
//               {!modulePrinted && (
//                 <>
//                   <td rowSpan={totalRows}>1</td>

//                   <td rowSpan={totalRows}>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         checked={checkedModules[moduleData.module.id] || false}
//                         onChange={(e) =>
//                           onModuleChange(moduleData, e.target.checked)
//                         }
//                       />

//                       <label className="fw-bold ms-2">
//                         {moduleData.module.moduleName}
//                       </label>
//                     </div>
//                   </td>
//                 </>
//               )}

//               <td>
//                 <div className="form-check">
//                   <input
//                     type="checkbox"
//                     checked={checkedMenus[menu.id] || false}
//                     onChange={(e) =>
//                       onMenuChange(moduleData, menu, e.target.checked)
//                     }
//                   />

//                   <label className="ms-2">{menu.menuName}</label>
//                 </div>
//               </td>

//               <td>-</td>

//               {(modulePrinted = true) && null}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
    
//   );
// };

// export default PermissionTables;

// import React from "react";

// const PermissionTables = ({
//   index,
//   moduleData,
//   checkedModules,
//   checkedMenus,
//   checkedSubMenus,
//   onModuleChange,
//   onMenuChange,
//   onSubMenuChange,
// }) => {
//   if (!moduleData) return null;

//   const menus = moduleData.menuMappings || [];

//   const totalRows =
//     menus.reduce((total, menuMap) => {
//       const subCount = menuMap.menu?.subMenus?.length || 0;
//       return total + Math.max(subCount, 1);
//     }, 0) || 1;

//   let modulePrinted = false;

//   return (
//     <>
//       {menus.length === 0 ? (
//         <tr>
//           <td>{index + 1}</td>

//           <td>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 checked={checkedModules[moduleData.module.id] || false}
//                 onChange={(e) =>
//                   onModuleChange(moduleData, e.target.checked)
//                 }
//               />

//               <label className="form-check-label fw-bold">
//                 {moduleData.module.moduleName}
//               </label>
//             </div>
//           </td>

//           <td>-</td>
//           <td>-</td>
//         </tr>
//       ) : (
//         menus.map((menuMap) => {
//           const menu = menuMap.menu;
//           const subMenus = menu.subMenus || [];
//           const menuRows = Math.max(subMenus.length, 1);

//           let menuPrinted = false;

//           if (subMenus.length > 0) {
//             return subMenus.map((subMenu) => (
//               <tr key={`${menu.id}-${subMenu.id}`}>
//                 {!modulePrinted && (
//                   <>
//                     <td rowSpan={totalRows}>{index + 1}</td>

//                     <td rowSpan={totalRows}>
//                       <div className="form-check">
//                         <input
//                           type="checkbox"
//                           className="form-check-input"
//                           checked={checkedModules[moduleData.module.id] || false}
//                           onChange={(e) =>
//                             onModuleChange(moduleData, e.target.checked)
//                           }
//                         />

//                         <label className="form-check-label fw-bold">
//                           {moduleData.module.moduleName}
//                         </label>
//                       </div>
//                     </td>
//                   </>
//                 )}

//                 {!menuPrinted && (
//                   <td rowSpan={menuRows}>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={checkedMenus[menu.id] || false}
//                         onChange={(e) =>
//                           onMenuChange(moduleData, menu, e.target.checked)
//                         }
//                       />

//                       <label className="form-check-label">
//                         {menu.menuName}
//                       </label>
//                     </div>
//                   </td>
//                 )}

//                 <td>
//                   <div className="form-check ms-3">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       checked={checkedSubMenus[subMenu.id] || false}
//                       onChange={(e) =>
//                         onSubMenuChange(
//                           moduleData,
//                           menu,
//                           subMenu,
//                           e.target.checked
//                         )
//                       }
//                     />

//                     <label className="form-check-label">
//                       {subMenu.subMenuName}
//                     </label>
//                   </div>
//                 </td>

//                 {(modulePrinted = true) && null}
//                 {(menuPrinted = true) && null}
//               </tr>
//             ));
//           }

//           return (
//             <tr key={menu.id}>
//               {!modulePrinted && (
//                 <>
//                   <td rowSpan={totalRows}>{index + 1}</td>

//                   <td rowSpan={totalRows}>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={checkedModules[moduleData.module.id] || false}
//                         onChange={(e) =>
//                           onModuleChange(moduleData, e.target.checked)
//                         }
//                       />

//                       <label className="form-check-label fw-bold">
//                         {moduleData.module.moduleName}
//                       </label>
//                     </div>
//                   </td>
//                 </>
//               )}

//               <td>
//                 <div className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={checkedMenus[menu.id] || false}
//                     onChange={(e) =>
//                       onMenuChange(moduleData, menu, e.target.checked)
//                     }
//                   />

//                   <label className="form-check-label">
//                     {menu.menuName}
//                   </label>
//                 </div>
//               </td>

//               <td>-</td>

//               {(modulePrinted = true) && null}
//             </tr>
//           );
//         })
//       )}
//     </>
//   );
// };

// export default PermissionTables;

import React, { memo, useEffect, useRef } from "react";

/*
==================================================
Reusable Checkbox
==================================================
*/
const CheckBox = ({
  checked,
  indeterminate = false,
  onChange,
  className = "form-check-input",
}) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={className}
      checked={checked}
      onChange={onChange}
    />
  );
};

/*
==================================================
Permission Table
==================================================
*/

const PermissionTables = ({
  index,
  moduleData,
  checkedModules,
  checkedMenus,
  checkedSubMenus,
  onModuleChange,
  onMenuChange,
  onSubMenuChange,
}) => {
  if (!moduleData) return null;

  const menus = moduleData.menuMappings || [];

  /*
  ==================================================
  Total rows
  ==================================================
  */

  const totalRows =
    menus.reduce((count, menuMap) => {
      return (
        count +
        Math.max(
          menuMap.menu?.subMenus?.length || 0,
          1
        )
      );
    }, 0) || 1;

  /*
  ==================================================
  Module Checkbox State
  ==================================================
  */

  const moduleChecked =
    checkedModules[moduleData.module.id] || false;

  const moduleIndeterminate =
    !moduleChecked &&
    menus.some((menuMap) => {
      if (checkedMenus[menuMap.menu.id]) return true;

      return (menuMap.menu.subMenus || []).some(
        (sub) => checkedSubMenus[sub.id]
      );
    });

  let modulePrinted = false;

  /*
  ==================================================
  Module without Menu
  ==================================================
  */

  if (menus.length === 0) {
    return (
      <tr>
        <td>{index + 1}</td>

        <td>
          <div className="form-check">

            <CheckBox
              checked={moduleChecked}
              indeterminate={moduleIndeterminate}
              onChange={(e) =>
                onModuleChange(
                  moduleData,
                  e.target.checked
                )
              }
            />

            <label className="form-check-label fw-bold">
              {moduleData.module.moduleName}
            </label>

          </div>
        </td>

        <td>-</td>

        <td>-</td>
      </tr>
    );
  }

  /*
  ==================================================
  Module with Menus
  ==================================================
  */

  return (
    <>
      {menus.map((menuMap) => {

        const menu = menuMap.menu;

        const subMenus = menu.subMenus || [];

        const menuRows = Math.max(
          subMenus.length,
          1
        );

        let menuPrinted = false;

        /*
        ============================================
        Menu Checkbox
        ============================================
        */

        const menuChecked =
          checkedMenus[menu.id] || false;

        const menuIndeterminate =
          !menuChecked &&
          subMenus.some(
            (sub) => checkedSubMenus[sub.id]
          );

                  /*
        ============================================
        Menu has SubMenus
        ============================================
        */

        if (subMenus.length > 0) {
          return subMenus.map((subMenu) => (
            <tr key={`${menu.id}-${subMenu.id}`}>

              {!modulePrinted && (
                <>
                  <td rowSpan={totalRows}>
                    {index + 1}
                  </td>

                  <td rowSpan={totalRows}>
                    <div className="form-check">

                      <CheckBox
                        checked={moduleChecked}
                        indeterminate={moduleIndeterminate}
                        onChange={(e) =>
                          onModuleChange(
                            moduleData,
                            e.target.checked
                          )
                        }
                      />

                      <label className="form-check-label fw-bold">
                        {moduleData.module.moduleName}
                      </label>

                    </div>
                  </td>
                </>
              )}

              {!menuPrinted && (
                <td rowSpan={menuRows}>

                  <div className="form-check">

                    <CheckBox
                      checked={menuChecked}
                      indeterminate={menuIndeterminate}
                      onChange={(e) =>
                        onMenuChange(
                          moduleData,
                          menu,
                          e.target.checked
                        )
                      }
                    />

                    <label className="form-check-label">
                      {menu.menuName}
                    </label>

                  </div>

                </td>
              )}

              <td>

                <div className="form-check ms-3">

                  <CheckBox
                    checked={
                      checkedSubMenus[subMenu.id] || false
                    }
                    onChange={(e) =>
                      onSubMenuChange(
                        moduleData,
                        menu,
                        subMenu,
                        e.target.checked
                      )
                    }
                  />

                  <label className="form-check-label">
                    {subMenu.subMenuName}
                  </label>

                </div>

              </td>

              {(modulePrinted = true) && null}
              {(menuPrinted = true) && null}

            </tr>
          ));
        }

        /*
        ============================================
        Menu without SubMenus
        ============================================
        */

        return (
          <tr key={menu.id}>

            {!modulePrinted && (
              <>
                <td rowSpan={totalRows}>
                  {index + 1}
                </td>

                <td rowSpan={totalRows}>

                  <div className="form-check">

                    <CheckBox
                      checked={moduleChecked}
                      indeterminate={moduleIndeterminate}
                      onChange={(e) =>
                        onModuleChange(
                          moduleData,
                          e.target.checked
                        )
                      }
                    />

                    <label className="form-check-label fw-bold">
                      {moduleData.module.moduleName}
                    </label>

                  </div>

                </td>
              </>
            )}

            <td>

              <div className="form-check">

                <CheckBox
                  checked={menuChecked}
                  indeterminate={menuIndeterminate}
                  onChange={(e) =>
                    onMenuChange(
                      moduleData,
                      menu,
                      e.target.checked
                    )
                  }
                />

                <label className="form-check-label">
                  {menu.menuName}
                </label>

              </div>

            </td>

            <td>-</td>

            {(modulePrinted = true) && null}

          </tr>
        );

      })}

          </>
  );
};

/*
========================================================
Prevent unnecessary re-render
========================================================
*/
export default memo(PermissionTables);