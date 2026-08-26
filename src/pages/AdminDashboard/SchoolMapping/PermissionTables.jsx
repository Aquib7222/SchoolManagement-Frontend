// // import React from "react";

// // const PermissionTables = ({
// //   moduleData,
// //   checkedModules,
// //   checkedMenus,
// //   checkedSubMenus,
// //   onModuleChange,
// //   onMenuChange,
// //   onSubMenuChange,
// // }) => {
// //   if (!moduleData) return null;

// //   const menus = moduleData.menuMappings || [];

// //   const totalRows =
// //     menus.reduce((total, menuMap) => {
// //       const subCount = menuMap.menu?.subMenus?.length || 0;
// //       return total + Math.max(subCount, 1);
// //     }, 0) || 1;

// //   let modulePrinted = false;

// //   return (
// //     <table className="table table-bordered table-hover align-middle">
// //       <thead className="table-dark">
// //         <tr>
// //           <th width="8%">S.No</th>
// //           <th width="25%">Module</th>
// //           <th width="30%">Menu</th>
// //           <th width="37%">Sub Menu</th>
// //         </tr>
// //       </thead>

// //       <tbody>
// //         {menus.map((menuMap) => {
// //           const menu = menuMap.menu;
// //           const subMenus = menu.subMenus || [];
// //           const menuRows = Math.max(subMenus.length, 1);

// //           let menuPrinted = false;

// //           if (subMenus.length > 0) {
// //             return subMenus.map((subMenu) => (
// //               <tr key={`${menu.id}-${subMenu.id}`}>
// //                 {!modulePrinted && (
// //                   <>
// //                     <td rowSpan={totalRows}>1</td>

// //                     <td rowSpan={totalRows}>
// //                       <div className="form-check">
// //                         <input
// //                           type="checkbox"
// //                           className="form-check-input"
// //                           checked={checkedModules[moduleData.module.id] || false}
// //                           onChange={(e) =>
// //                             onModuleChange(moduleData, e.target.checked)
// //                           }
// //                         />

// //                         <label className="form-check-label fw-bold">
// //                           {moduleData.module.moduleName}
// //                         </label>
// //                       </div>
// //                     </td>
// //                   </>
// //                 )}

// //                 {!menuPrinted && (
// //                   <td rowSpan={menuRows}>
// //                     <div className="form-check">
// //                       <input
// //                         type="checkbox"
// //                         className="form-check-input"
// //                         checked={checkedMenus[menu.id] || false}
// //                         onChange={(e) =>
// //                           onMenuChange(moduleData, menu, e.target.checked)
// //                         }
// //                       />

// //                       <label className="form-check-label">
// //                         {menu.menuName}
// //                       </label>
// //                     </div>
// //                   </td>
// //                 )}

// //                 <td>
// //                   <div className="form-check ms-3">
// //                     <input
// //                       type="checkbox"
// //                       className="form-check-input"
// //                       checked={checkedSubMenus[subMenu.id] || false}
// //                       onChange={(e) =>
// //                         onSubMenuChange(
// //                           moduleData,
// //                           menu,
// //                           subMenu,
// //                           e.target.checked
// //                         )
// //                       }
// //                     />

// //                     <label className="form-check-label">
// //                       {subMenu.subMenuName}
// //                     </label>
// //                   </div>
// //                 </td>

// //                 {(modulePrinted = true) && null}
// //                 {(menuPrinted = true) && null}
// //               </tr>
// //             ));
// //           }

// //           return (
// //             <tr key={menu.id}>
// //               {!modulePrinted && (
// //                 <>
// //                   <td rowSpan={totalRows}>1</td>

// //                   <td rowSpan={totalRows}>
// //                     <div className="form-check">
// //                       <input
// //                         type="checkbox"
// //                         checked={checkedModules[moduleData.module.id] || false}
// //                         onChange={(e) =>
// //                           onModuleChange(moduleData, e.target.checked)
// //                         }
// //                       />

// //                       <label className="fw-bold ms-2">
// //                         {moduleData.module.moduleName}
// //                       </label>
// //                     </div>
// //                   </td>
// //                 </>
// //               )}

// //               <td>
// //                 <div className="form-check">
// //                   <input
// //                     type="checkbox"
// //                     checked={checkedMenus[menu.id] || false}
// //                     onChange={(e) =>
// //                       onMenuChange(moduleData, menu, e.target.checked)
// //                     }
// //                   />

// //                   <label className="ms-2">{menu.menuName}</label>
// //                 </div>
// //               </td>

// //               <td>-</td>

// //               {(modulePrinted = true) && null}
// //             </tr>
// //           );
// //         })}
// //       </tbody>
// //     </table>
    
// //   );
// // };

// // export default PermissionTables;

// // import React from "react";

// // const PermissionTables = ({
// //   index,
// //   moduleData,
// //   checkedModules,
// //   checkedMenus,
// //   checkedSubMenus,
// //   onModuleChange,
// //   onMenuChange,
// //   onSubMenuChange,
// // }) => {
// //   if (!moduleData) return null;

// //   const menus = moduleData.menuMappings || [];

// //   const totalRows =
// //     menus.reduce((total, menuMap) => {
// //       const subCount = menuMap.menu?.subMenus?.length || 0;
// //       return total + Math.max(subCount, 1);
// //     }, 0) || 1;

// //   let modulePrinted = false;

// //   return (
// //     <>
// //       {menus.length === 0 ? (
// //         <tr>
// //           <td>{index + 1}</td>

// //           <td>
// //             <div className="form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 checked={checkedModules[moduleData.module.id] || false}
// //                 onChange={(e) =>
// //                   onModuleChange(moduleData, e.target.checked)
// //                 }
// //               />

// //               <label className="form-check-label fw-bold">
// //                 {moduleData.module.moduleName}
// //               </label>
// //             </div>
// //           </td>

// //           <td>-</td>
// //           <td>-</td>
// //         </tr>
// //       ) : (
// //         menus.map((menuMap) => {
// //           const menu = menuMap.menu;
// //           const subMenus = menu.subMenus || [];
// //           const menuRows = Math.max(subMenus.length, 1);

// //           let menuPrinted = false;

// //           if (subMenus.length > 0) {
// //             return subMenus.map((subMenu) => (
// //               <tr key={`${menu.id}-${subMenu.id}`}>
// //                 {!modulePrinted && (
// //                   <>
// //                     <td rowSpan={totalRows}>{index + 1}</td>

// //                     <td rowSpan={totalRows}>
// //                       <div className="form-check">
// //                         <input
// //                           type="checkbox"
// //                           className="form-check-input"
// //                           checked={checkedModules[moduleData.module.id] || false}
// //                           onChange={(e) =>
// //                             onModuleChange(moduleData, e.target.checked)
// //                           }
// //                         />

// //                         <label className="form-check-label fw-bold">
// //                           {moduleData.module.moduleName}
// //                         </label>
// //                       </div>
// //                     </td>
// //                   </>
// //                 )}

// //                 {!menuPrinted && (
// //                   <td rowSpan={menuRows}>
// //                     <div className="form-check">
// //                       <input
// //                         type="checkbox"
// //                         className="form-check-input"
// //                         checked={checkedMenus[menu.id] || false}
// //                         onChange={(e) =>
// //                           onMenuChange(moduleData, menu, e.target.checked)
// //                         }
// //                       />

// //                       <label className="form-check-label">
// //                         {menu.menuName}
// //                       </label>
// //                     </div>
// //                   </td>
// //                 )}

// //                 <td>
// //                   <div className="form-check ms-3">
// //                     <input
// //                       type="checkbox"
// //                       className="form-check-input"
// //                       checked={checkedSubMenus[subMenu.id] || false}
// //                       onChange={(e) =>
// //                         onSubMenuChange(
// //                           moduleData,
// //                           menu,
// //                           subMenu,
// //                           e.target.checked
// //                         )
// //                       }
// //                     />

// //                     <label className="form-check-label">
// //                       {subMenu.subMenuName}
// //                     </label>
// //                   </div>
// //                 </td>

// //                 {(modulePrinted = true) && null}
// //                 {(menuPrinted = true) && null}
// //               </tr>
// //             ));
// //           }

// //           return (
// //             <tr key={menu.id}>
// //               {!modulePrinted && (
// //                 <>
// //                   <td rowSpan={totalRows}>{index + 1}</td>

// //                   <td rowSpan={totalRows}>
// //                     <div className="form-check">
// //                       <input
// //                         type="checkbox"
// //                         className="form-check-input"
// //                         checked={checkedModules[moduleData.module.id] || false}
// //                         onChange={(e) =>
// //                           onModuleChange(moduleData, e.target.checked)
// //                         }
// //                       />

// //                       <label className="form-check-label fw-bold">
// //                         {moduleData.module.moduleName}
// //                       </label>
// //                     </div>
// //                   </td>
// //                 </>
// //               )}

// //               <td>
// //                 <div className="form-check">
// //                   <input
// //                     type="checkbox"
// //                     className="form-check-input"
// //                     checked={checkedMenus[menu.id] || false}
// //                     onChange={(e) =>
// //                       onMenuChange(moduleData, menu, e.target.checked)
// //                     }
// //                   />

// //                   <label className="form-check-label">
// //                     {menu.menuName}
// //                   </label>
// //                 </div>
// //               </td>

// //               <td>-</td>

// //               {(modulePrinted = true) && null}
// //             </tr>
// //           );
// //         })
// //       )}
// //     </>
// //   );
// // };

// // export default PermissionTables;

// import React, { memo, useEffect, useRef } from "react";


// const CheckBox = ({
//   checked,
//   indeterminate = false,
//   onChange,
//   className = "form-check-input",
// }) => {
//   const ref = useRef();

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.indeterminate = indeterminate;
//     }
//   }, [indeterminate]);

//   return (
//     <input
//       ref={ref}
//       type="checkbox"
//       className={className}
//       checked={checked}
//       onChange={onChange}
//     />
//   );
// };

// /*
// ==================================================
// Permission Table
// ==================================================
// */

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

//   /*
//   ==================================================
//   Total rows
//   ==================================================
//   */

//   const totalRows =
//     menus.reduce((count, menuMap) => {
//       return (
//         count +
//         Math.max(
//           menuMap.menu?.subMenus?.length || 0,
//           1
//         )
//       );
//     }, 0) || 1;

//   /*
//   ==================================================
//   Module Checkbox State
//   ==================================================
//   */

//   const moduleChecked =
//     checkedModules[moduleData.module.id] || false;

//   const moduleIndeterminate =
//     !moduleChecked &&
//     menus.some((menuMap) => {
//       if (checkedMenus[menuMap.menu.id]) return true;

//       return (menuMap.menu.subMenus || []).some(
//         (sub) => checkedSubMenus[sub.id]
//       );
//     });

//   let modulePrinted = false;

//   /*
//   ==================================================
//   Module without Menu
//   ==================================================
//   */

//   if (menus.length === 0) {
//     return (
//       <tr>
//         <td>{index + 1}</td>

//         <td>
//           <div className="form-check">

//             <CheckBox
//               checked={moduleChecked}
//               indeterminate={moduleIndeterminate}
//               onChange={(e) =>
//                 onModuleChange(
//                   moduleData,
//                   e.target.checked
//                 )
//               }
//             />

//             <label className="form-check-label fw-bold">
//               {moduleData.module.moduleName}
//             </label>

//           </div>
//         </td>

//         <td>-</td>

//         <td>-</td>
//       </tr>
//     );
//   }

//   /*
//   ==================================================
//   Module with Menus
//   ==================================================
//   */

//   return (
//     <>
//       {menus.map((menuMap) => {

//         const menu = menuMap.menu;

//         const subMenus = menu.subMenus || [];

//         const menuRows = Math.max(
//           subMenus.length,
//           1
//         );

//         let menuPrinted = false;

//         /*
//         ============================================
//         Menu Checkbox
//         ============================================
//         */

//         const menuChecked =
//           checkedMenus[menu.id] || false;

//         const menuIndeterminate =
//           !menuChecked &&
//           subMenus.some(
//             (sub) => checkedSubMenus[sub.id]
//           );

//                   /*
//         ============================================
//         Menu has SubMenus
//         ============================================
//         */

//         if (subMenus.length > 0) {
//           return subMenus.map((subMenu) => (
//             <tr key={`${menu.id}-${subMenu.id}`}>

//               {!modulePrinted && (
//                 <>
//                   <td rowSpan={totalRows}>
//                     {index + 1}
//                   </td>

//                   <td rowSpan={totalRows}>
//                     <div className="form-check">

//                       <CheckBox
//                         checked={moduleChecked}
//                         indeterminate={moduleIndeterminate}
//                         onChange={(e) =>
//                           onModuleChange(
//                             moduleData,
//                             e.target.checked
//                           )
//                         }
//                       />

//                       <label className="form-check-label fw-bold">
//                         {moduleData.module.moduleName}
//                       </label>

//                     </div>
//                   </td>
//                 </>
//               )}

//               {!menuPrinted && (
//                 <td rowSpan={menuRows}>

//                   <div className="form-check">

//                     <CheckBox
//                       checked={menuChecked}
//                       indeterminate={menuIndeterminate}
//                       onChange={(e) =>
//                         onMenuChange(
//                           moduleData,
//                           menu,
//                           e.target.checked
//                         )
//                       }
//                     />

//                     <label className="form-check-label">
//                       {menu.menuName}
//                     </label>

//                   </div>

//                 </td>
//               )}

//               <td>

//                 <div className="form-check ms-3">

//                   <CheckBox
//                     checked={
//                       checkedSubMenus[subMenu.id] || false
//                     }
//                     onChange={(e) =>
//                       onSubMenuChange(
//                         moduleData,
//                         menu,
//                         subMenu,
//                         e.target.checked
//                       )
//                     }
//                   />

//                   <label className="form-check-label">
//                     {subMenu.subMenuName}
//                   </label>

//                 </div>

//               </td>

//               {(modulePrinted = true) && null}
//               {(menuPrinted = true) && null}

//             </tr>
//           ));
//         }

//         /*
//         ============================================
//         Menu without SubMenus
//         ============================================
//         */

//         return (
//           <tr key={menu.id}>

//             {!modulePrinted && (
//               <>
//                 <td rowSpan={totalRows}>
//                   {index + 1}
//                 </td>

//                 <td rowSpan={totalRows}>

//                   <div className="form-check">

//                     <CheckBox
//                       checked={moduleChecked}
//                       indeterminate={moduleIndeterminate}
//                       onChange={(e) =>
//                         onModuleChange(
//                           moduleData,
//                           e.target.checked
//                         )
//                       }
//                     />

//                     <label className="form-check-label fw-bold">
//                       {moduleData.module.moduleName}
//                     </label>

//                   </div>

//                 </td>
//               </>
//             )}

//             <td>

//               <div className="form-check">

//                 <CheckBox
//                   checked={menuChecked}
//                   indeterminate={menuIndeterminate}
//                   onChange={(e) =>
//                     onMenuChange(
//                       moduleData,
//                       menu,
//                       e.target.checked
//                     )
//                   }
//                 />

//                 <label className="form-check-label">
//                   {menu.menuName}
//                 </label>

//               </div>

//             </td>

//             <td>-</td>

//             {(modulePrinted = true) && null}

//           </tr>
//         );

//       })}

//           </>
//   );
// };

// /*
// ========================================================
// Prevent unnecessary re-render
// ========================================================
// */
// export default memo(PermissionTables);

import React, { memo, useEffect, useRef } from "react";
import { LuChevronRight } from "react-icons/lu";

const CheckBox = ({
  checked,
  indeterminate = false,
  onChange,
  className = "form-check-input",
}) => {
  const ref = useRef(null);

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
  if (!moduleData?.module) return null;

  const menus = moduleData.menuMappings || [];

  const totalRows =
    menus.reduce((total, menuMap) => {
      const subMenus = menuMap?.menu?.subMenus || [];
      return total + Math.max(subMenus.length, 1);
    }, 0) || 1;

  const moduleId = moduleData.module.id;

  const moduleChecked = !!checkedModules[moduleId];

  const moduleIndeterminate =
    !moduleChecked &&
    menus.some((menuMap) => {
      const menu = menuMap?.menu;

      if (!menu) return false;

      if (checkedMenus[menu.id]) {
        return true;
      }

      return (menu.subMenus || []).some(
        (sub) => checkedSubMenus[sub.id]
      );
    });

  /* =====================================================
     MODULE WITHOUT MENU
  ===================================================== */

  if (menus.length === 0) {
    return (
      <tr className="permission-row">
        <td className="text-center fw-semibold">
          {index + 1}
        </td>

        <td>
          <div className="d-flex align-items-center gap-2">
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

            <div>
              <div className="fw-semibold">
                {moduleData.module.moduleName}
              </div>

              {moduleData.module.path && (
                <small className="text-muted">
                  {moduleData.module.path}
                </small>
              )}
            </div>
          </div>
        </td>

        <td className="text-muted text-center">No Menu</td>

        <td className="text-muted text-center">-</td>
      </tr>
    );
  }

  /* =====================================================
     MODULE WITH MENUS
  ===================================================== */

  let modulePrinted = false;

  return (
    <>
      {menus.map((menuMap) => {
        const menu = menuMap?.menu;

        if (!menu) return null;

        const subMenus = menu.subMenus || [];

        const menuRows = Math.max(subMenus.length, 1);

        const menuChecked = !!checkedMenus[menu.id];

        const menuIndeterminate =
          !menuChecked &&
          subMenus.some(
            (sub) => checkedSubMenus[sub.id]
          );

        let menuPrinted = false;

        /* =================================================
           MENU WITH SUB MENU
        ================================================= */

        if (subMenus.length > 0) {
          return subMenus.map((subMenu) => {
            const showModule = !modulePrinted;
            const showMenu = !menuPrinted;

            modulePrinted = true;
            menuPrinted = true;

            return (
              <tr
                key={`${menu.id}-${subMenu.id}`}
                className="permission-row"
              >
                {/* S.NO + MODULE */}

                {showModule && (
                  <>
                    <td
                      rowSpan={totalRows}
                      className="text-center align-middle fw-semibold"
                    >
                      {index + 1}
                    </td>

                    <td
                      rowSpan={totalRows}
                      className="align-middle"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <CheckBox
                          checked={moduleChecked}
                          indeterminate={
                            moduleIndeterminate
                          }
                          onChange={(e) =>
                            onModuleChange(
                              moduleData,
                              e.target.checked
                            )
                          }
                        />

                        <div>
                          <div className="fw-bold">
                            {
                              moduleData.module
                                .moduleName
                            }
                          </div>

                          {moduleData.module
                            .description && (
                            <small className="text-muted">
                              {
                                moduleData.module
                                  .description
                              }
                            </small>
                          )}
                        </div>
                      </div>
                    </td>
                  </>
                )}

                {/* MENU */}

                {showMenu && (
                  <td
                    rowSpan={menuRows}
                    className="align-middle"
                  >
                    <div className="d-flex align-items-start gap-2">
                      <CheckBox
                        checked={menuChecked}
                        indeterminate={
                          menuIndeterminate
                        }
                        onChange={(e) =>
                          onMenuChange(
                            moduleData,
                            menu,
                            e.target.checked
                          )
                        }
                      />

                      <div>
                        <div className="fw-semibold">
                          {menu.menuName}
                        </div>

                        {menu.menuUrl && (
                          <small className="text-muted d-block">
                            {menu.menuUrl}
                          </small>
                        )}
                      </div>
                    </div>
                  </td>
                )}

                {/* SUB MENU */}

                <td>
                  <div className="d-flex align-items-start gap-2 ms-2">
                    <CheckBox
                      checked={
                        !!checkedSubMenus[
                          subMenu.id
                        ]
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

                    <LuChevronRight
                      size={16}
                      className="text-primary mt-1"
                    />

                    <div>
                      <div className="fw-medium">
                        {subMenu.subMenuName}
                      </div>

                      {subMenu.subMenuUrl && (
                        <small className="text-muted d-block">
                          {subMenu.subMenuUrl}
                        </small>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          });
        }

        /* =================================================
           MENU WITHOUT SUB MENU
        ================================================= */

        const showModule = !modulePrinted;
        modulePrinted = true;

        return (
          <tr
            key={menu.id}
            className="permission-row"
          >
            {showModule && (
              <>
                <td
                  rowSpan={totalRows}
                  className="text-center align-middle fw-semibold"
                >
                  {index + 1}
                </td>

                <td
                  rowSpan={totalRows}
                  className="align-middle"
                >
                  <div className="d-flex align-items-center gap-2">
                    <CheckBox
                      checked={moduleChecked}
                      indeterminate={
                        moduleIndeterminate
                      }
                      onChange={(e) =>
                        onModuleChange(
                          moduleData,
                          e.target.checked
                        )
                      }
                    />

                    <div>
                      <div className="fw-bold">
                        {
                          moduleData.module
                            .moduleName
                        }
                      </div>

                      {moduleData.module
                        .description && (
                        <small className="text-muted">
                          {
                            moduleData.module
                              .description
                          }
                        </small>
                      )}
                    </div>
                  </div>
                </td>
              </>
            )}

            <td>
              <div className="d-flex align-items-start gap-2">
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

                <div>
                  <div className="fw-semibold">
                    {menu.menuName}
                  </div>

                  {menu.menuUrl && (
                    <small className="text-muted d-block">
                      {menu.menuUrl}
                    </small>
                  )}
                </div>
              </div>
            </td>

            <td className="text-muted">-</td>
          </tr>
        );
      })}
    </>
  );
};

export default memo(PermissionTables);