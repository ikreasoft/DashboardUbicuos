"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/devices/page",{

/***/ "(app-pages-browser)/./src/app/devices/page.tsx":
/*!**********************************!*\
  !*** ./src/app/devices/page.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ DevicesList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/x-data-grid */ \"(app-pages-browser)/./node_modules/@mui/x-data-grid/DataGrid/DataGrid.js\");\n/* harmony import */ var _refinedev_mui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @refinedev/mui */ \"(app-pages-browser)/./node_modules/@refinedev/mui/dist/index.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction DevicesList() {\n    _s();\n    const { dataGridProps } = (0,_refinedev_mui__WEBPACK_IMPORTED_MODULE_2__.useDataGrid)({\n        resource: \"devices\",\n        syncWithLocation: true\n    });\n    console.log(\"dataGridProps\", dataGridProps);\n    console.log(\"DataGrid Props:\", dataGridProps.rows); // <-- Verifica los datos que llegan\n    const columns = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>[\n            {\n                field: \"_id\",\n                headerName: \"ID\",\n                type: \"string\",\n                minWidth: 50,\n                flex: 1\n            },\n            {\n                field: \"name\",\n                headerName: \"Name\",\n                type: \"string\",\n                minWidth: 150,\n                flex: 1\n            },\n            {\n                field: \"type\",\n                headerName: \"Type\",\n                type: \"string\",\n                minWidth: 100,\n                flex: 1\n            },\n            {\n                field: \"location\",\n                headerName: \"Location\",\n                type: \"string\",\n                minWidth: 150,\n                flex: 1\n            },\n            {\n                field: \"protocol\",\n                headerName: \"Protocol\",\n                type: \"string\",\n                minWidth: 100,\n                flex: 1\n            },\n            {\n                field: \"ipAddress\",\n                headerName: \"IP Address\",\n                type: \"string\",\n                minWidth: 150,\n                flex: 1\n            },\n            {\n                field: \"isActive\",\n                headerName: \"Active\",\n                type: \"boolean\",\n                minWidth: 80,\n                flex: 1,\n                valueGetter: (params)=>params.row.isActive ? \"Yes\" : \"No\"\n            },\n            {\n                field: \"actions\",\n                headerName: \"Actions\",\n                sortable: false,\n                renderCell: function render(param) {\n                    let { row } = param;\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_refinedev_mui__WEBPACK_IMPORTED_MODULE_2__.EditButton, {\n                                hideText: true,\n                                recordItemId: row._id\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\devices\\\\page.tsx\",\n                                lineNumber: 81,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_refinedev_mui__WEBPACK_IMPORTED_MODULE_2__.ShowButton, {\n                                hideText: true,\n                                recordItemId: row._id\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\devices\\\\page.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_refinedev_mui__WEBPACK_IMPORTED_MODULE_2__.DeleteButton, {\n                                hideText: true,\n                                recordItemId: row._id\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\devices\\\\page.tsx\",\n                                lineNumber: 83,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true);\n                },\n                align: \"center\",\n                headerAlign: \"center\",\n                minWidth: 120\n            }\n        ], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_refinedev_mui__WEBPACK_IMPORTED_MODULE_2__.List, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_x_data_grid__WEBPACK_IMPORTED_MODULE_3__.DataGrid, {\n            ...dataGridProps,\n            columns: columns,\n            autoHeight: true\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\devices\\\\page.tsx\",\n            lineNumber: 97,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\devices\\\\page.tsx\",\n        lineNumber: 96,\n        columnNumber: 5\n    }, this);\n}\n_s(DevicesList, \"oGjfv8Bgwp+9OJsxQADUe5jaZPo=\", false, function() {\n    return [\n        _refinedev_mui__WEBPACK_IMPORTED_MODULE_2__.useDataGrid\n    ];\n});\n_c = DevicesList;\nvar _c;\n$RefreshReg$(_c, \"DevicesList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGV2aWNlcy9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUUwQjtBQUNtQztBQU9yQztBQUVULFNBQVNPOztJQUN0QixNQUFNLEVBQUVDLGFBQWEsRUFBRSxHQUFHTCwyREFBV0EsQ0FBQztRQUNwQ00sVUFBVTtRQUNWQyxrQkFBa0I7SUFDcEI7SUFFQUMsUUFBUUMsR0FBRyxDQUFDLGlCQUFpQko7SUFDN0JHLFFBQVFDLEdBQUcsQ0FBQyxtQkFBbUJKLGNBQWNLLElBQUksR0FBRyxvQ0FBb0M7SUFFeEYsTUFBTUMsVUFBVWQsb0RBQWEsQ0FDM0IsSUFBTTtZQUNKO2dCQUNFZ0IsT0FBTztnQkFDUEMsWUFBWTtnQkFDWkMsTUFBTTtnQkFDTkMsVUFBVTtnQkFDVkMsTUFBTTtZQUNSO1lBQ0E7Z0JBQ0VKLE9BQU87Z0JBQ1BDLFlBQVk7Z0JBQ1pDLE1BQU07Z0JBQ05DLFVBQVU7Z0JBQ1ZDLE1BQU07WUFDUjtZQUNBO2dCQUNFSixPQUFPO2dCQUNQQyxZQUFZO2dCQUNaQyxNQUFNO2dCQUNOQyxVQUFVO2dCQUNWQyxNQUFNO1lBQ1I7WUFDQTtnQkFDRUosT0FBTztnQkFDUEMsWUFBWTtnQkFDWkMsTUFBTTtnQkFDTkMsVUFBVTtnQkFDVkMsTUFBTTtZQUNSO1lBQ0E7Z0JBQ0VKLE9BQU87Z0JBQ1BDLFlBQVk7Z0JBQ1pDLE1BQU07Z0JBQ05DLFVBQVU7Z0JBQ1ZDLE1BQU07WUFDUjtZQUNBO2dCQUNFSixPQUFPO2dCQUNQQyxZQUFZO2dCQUNaQyxNQUFNO2dCQUNOQyxVQUFVO2dCQUNWQyxNQUFNO1lBQ1I7WUFDQTtnQkFDRUosT0FBTztnQkFDUEMsWUFBWTtnQkFDWkMsTUFBTTtnQkFDTkMsVUFBVTtnQkFDVkMsTUFBTTtnQkFDTkMsYUFBYSxDQUFDQyxTQUFZQSxPQUFPQyxHQUFHLENBQUNDLFFBQVEsR0FBRyxRQUFRO1lBQzFEO1lBQ0E7Z0JBQ0VSLE9BQU87Z0JBQ1BDLFlBQVk7Z0JBQ1pRLFVBQVU7Z0JBQ1ZDLFlBQVksU0FBU0MsT0FBTyxLQUFPO3dCQUFQLEVBQUVKLEdBQUcsRUFBRSxHQUFQO29CQUMxQixxQkFDRTs7MENBQ0UsOERBQUNuQixzREFBVUE7Z0NBQUN3QixRQUFRO2dDQUFDQyxjQUFjTixJQUFJTyxHQUFHOzs7Ozs7MENBQzFDLDhEQUFDekIsc0RBQVVBO2dDQUFDdUIsUUFBUTtnQ0FBQ0MsY0FBY04sSUFBSU8sR0FBRzs7Ozs7OzBDQUMxQyw4REFBQ3hCLHdEQUFZQTtnQ0FBQ3NCLFFBQVE7Z0NBQUNDLGNBQWNOLElBQUlPLEdBQUc7Ozs7Ozs7O2dCQUdsRDtnQkFDQUMsT0FBTztnQkFDUEMsYUFBYTtnQkFDYmIsVUFBVTtZQUNaO1NBQ0QsRUFDRCxFQUFFO0lBR0oscUJBQ0UsOERBQUNqQixnREFBSUE7a0JBQ0gsNEVBQUNELHNEQUFRQTtZQUFFLEdBQUdPLGFBQWE7WUFBRU0sU0FBU0E7WUFBU21CLFVBQVU7Ozs7Ozs7Ozs7O0FBRy9EO0dBdkZ3QjFCOztRQUNJSix1REFBV0E7OztLQURmSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2RldmljZXMvcGFnZS50c3g/NmNmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRGF0YUdyaWQsIHR5cGUgR3JpZENvbERlZiB9IGZyb20gXCJAbXVpL3gtZGF0YS1ncmlkXCI7XHJcbmltcG9ydCB7XHJcbiAgTGlzdCxcclxuICB1c2VEYXRhR3JpZCxcclxuICBFZGl0QnV0dG9uLFxyXG4gIFNob3dCdXR0b24sXHJcbiAgRGVsZXRlQnV0dG9uLFxyXG59IGZyb20gXCJAcmVmaW5lZGV2L211aVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV2aWNlc0xpc3QoKSB7XHJcbiAgY29uc3QgeyBkYXRhR3JpZFByb3BzIH0gPSB1c2VEYXRhR3JpZCh7XHJcbiAgICByZXNvdXJjZTogXCJkZXZpY2VzXCIsXHJcbiAgICBzeW5jV2l0aExvY2F0aW9uOiB0cnVlLFxyXG4gIH0pO1xyXG4gIFxyXG4gIGNvbnNvbGUubG9nKFwiZGF0YUdyaWRQcm9wc1wiLCBkYXRhR3JpZFByb3BzKTtcclxuICBjb25zb2xlLmxvZyhcIkRhdGFHcmlkIFByb3BzOlwiLCBkYXRhR3JpZFByb3BzLnJvd3MpOyAvLyA8LS0gVmVyaWZpY2EgbG9zIGRhdG9zIHF1ZSBsbGVnYW5cclxuXHJcbiAgY29uc3QgY29sdW1ucyA9IFJlYWN0LnVzZU1lbW88R3JpZENvbERlZltdPihcclxuICAgICgpID0+IFtcclxuICAgICAge1xyXG4gICAgICAgIGZpZWxkOiBcIl9pZFwiLFxyXG4gICAgICAgIGhlYWRlck5hbWU6IFwiSURcIixcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIG1pbldpZHRoOiA1MCxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmllbGQ6IFwibmFtZVwiLFxyXG4gICAgICAgIGhlYWRlck5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgbWluV2lkdGg6IDE1MCxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmllbGQ6IFwidHlwZVwiLFxyXG4gICAgICAgIGhlYWRlck5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgbWluV2lkdGg6IDEwMCxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmllbGQ6IFwibG9jYXRpb25cIixcclxuICAgICAgICBoZWFkZXJOYW1lOiBcIkxvY2F0aW9uXCIsXHJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICBtaW5XaWR0aDogMTUwLFxyXG4gICAgICAgIGZsZXg6IDEsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaWVsZDogXCJwcm90b2NvbFwiLFxyXG4gICAgICAgIGhlYWRlck5hbWU6IFwiUHJvdG9jb2xcIixcclxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIG1pbldpZHRoOiAxMDAsXHJcbiAgICAgICAgZmxleDogMSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpZWxkOiBcImlwQWRkcmVzc1wiLFxyXG4gICAgICAgIGhlYWRlck5hbWU6IFwiSVAgQWRkcmVzc1wiLFxyXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgbWluV2lkdGg6IDE1MCxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmllbGQ6IFwiaXNBY3RpdmVcIixcclxuICAgICAgICBoZWFkZXJOYW1lOiBcIkFjdGl2ZVwiLFxyXG4gICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgIG1pbldpZHRoOiA4MCxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICAgIHZhbHVlR2V0dGVyOiAocGFyYW1zKSA9PiAocGFyYW1zLnJvdy5pc0FjdGl2ZSA/IFwiWWVzXCIgOiBcIk5vXCIpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmllbGQ6IFwiYWN0aW9uc1wiLFxyXG4gICAgICAgIGhlYWRlck5hbWU6IFwiQWN0aW9uc1wiLFxyXG4gICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICByZW5kZXJDZWxsOiBmdW5jdGlvbiByZW5kZXIoeyByb3cgfSkge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8RWRpdEJ1dHRvbiBoaWRlVGV4dCByZWNvcmRJdGVtSWQ9e3Jvdy5faWR9IC8+XHJcbiAgICAgICAgICAgICAgPFNob3dCdXR0b24gaGlkZVRleHQgcmVjb3JkSXRlbUlkPXtyb3cuX2lkfSAvPlxyXG4gICAgICAgICAgICAgIDxEZWxldGVCdXR0b24gaGlkZVRleHQgcmVjb3JkSXRlbUlkPXtyb3cuX2lkfSAvPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICBoZWFkZXJBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICBtaW5XaWR0aDogMTIwLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxMaXN0PlxyXG4gICAgICA8RGF0YUdyaWQgey4uLmRhdGFHcmlkUHJvcHN9IGNvbHVtbnM9e2NvbHVtbnN9IGF1dG9IZWlnaHQgLz5cclxuICAgIDwvTGlzdD5cclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiRGF0YUdyaWQiLCJMaXN0IiwidXNlRGF0YUdyaWQiLCJFZGl0QnV0dG9uIiwiU2hvd0J1dHRvbiIsIkRlbGV0ZUJ1dHRvbiIsIkRldmljZXNMaXN0IiwiZGF0YUdyaWRQcm9wcyIsInJlc291cmNlIiwic3luY1dpdGhMb2NhdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJyb3dzIiwiY29sdW1ucyIsInVzZU1lbW8iLCJmaWVsZCIsImhlYWRlck5hbWUiLCJ0eXBlIiwibWluV2lkdGgiLCJmbGV4IiwidmFsdWVHZXR0ZXIiLCJwYXJhbXMiLCJyb3ciLCJpc0FjdGl2ZSIsInNvcnRhYmxlIiwicmVuZGVyQ2VsbCIsInJlbmRlciIsImhpZGVUZXh0IiwicmVjb3JkSXRlbUlkIiwiX2lkIiwiYWxpZ24iLCJoZWFkZXJBbGlnbiIsImF1dG9IZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/devices/page.tsx\n"));

/***/ })

});