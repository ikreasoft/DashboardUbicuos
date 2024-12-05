"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/home/page",{

/***/ "(app-pages-browser)/./src/app/home/page.tsx":
/*!*******************************!*\
  !*** ./src/app/home/page.tsx ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Card,CardContent,Grid,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Card,CardContent,Grid,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Card,CardContent,Grid,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Card,CardContent,Grid,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Card/Card.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Card,CardContent,Grid,Typography!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/CardContent/CardContent.js\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ \"(app-pages-browser)/../../../../../../../node_modules/chart.js/dist/chart.js\");\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-chartjs-2 */ \"(app-pages-browser)/../../../../../../../node_modules/react-chartjs-2/dist/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n// Registrar componentes de Chart.js\nchart_js__WEBPACK_IMPORTED_MODULE_2__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_2__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.LineElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.Title, chart_js__WEBPACK_IMPORTED_MODULE_2__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_2__.Legend);\nconst API_URL = \"http://localhost:4000\"; // URL del backend\nconst Home = ()=>{\n    _s();\n    const [lineData, setLineData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        labels: [],\n        datasets: []\n    });\n    const [metrics, setMetrics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        totalDataPoints: 0,\n        types: {}\n    });\n    // Obtener datos del backend\n    const fetchData = async ()=>{\n        try {\n            const response = await fetch(\"\".concat(API_URL, \"/sensor-data\"));\n            const sensorData = await response.json();\n            // Extraer métricas\n            const totalDataPoints = sensorData.length;\n            const typeCounts = {};\n            sensorData.forEach((item)=>{\n                typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;\n            });\n            // Procesar datos para el gráfico\n            const labels = sensorData.map((item)=>item.from);\n            const values = sensorData.map((item)=>item.value);\n            setLineData({\n                labels,\n                datasets: [\n                    {\n                        label: \"Sensor Values\",\n                        data: values,\n                        borderColor: \"#42A5F5\",\n                        backgroundColor: \"rgba(66, 165, 245, 0.5)\",\n                        fill: true\n                    }\n                ]\n            });\n            setMetrics({\n                totalDataPoints,\n                types: typeCounts\n            });\n        } catch (error) {\n            console.error(\"Error fetching sensor data:\", error);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchData();\n    }, []);\n    const lineOptions = {\n        responsive: true,\n        plugins: {\n            legend: {\n                position: \"top\"\n            },\n            title: {\n                display: true,\n                text: \"Sensor Data Over Time\"\n            }\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        sx: {\n            padding: 3\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"h4\",\n                gutterBottom: true,\n                children: \"Sensor Dashboard\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                lineNumber: 100,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                container: true,\n                spacing: 2,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        item: true,\n                        xs: 12,\n                        sm: 6,\n                        md: 3,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                            sx: {\n                                padding: 2,\n                                textAlign: \"center\"\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                    variant: \"h6\",\n                                    children: \"Total Data Points\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                    lineNumber: 107,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                    variant: \"h4\",\n                                    color: \"primary\",\n                                    children: metrics.totalDataPoints\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                    lineNumber: 108,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                            lineNumber: 106,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                        lineNumber: 105,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        item: true,\n                        xs: 12,\n                        sm: 6,\n                        md: 3,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                            sx: {\n                                padding: 2,\n                                textAlign: \"center\"\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                    variant: \"h6\",\n                                    children: \"Type Breakdown\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                    lineNumber: 115,\n                                    columnNumber: 13\n                                }, undefined),\n                                Object.entries(metrics.types).map((param)=>{\n                                    let [key, value] = param;\n                                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                                children: [\n                                                    key,\n                                                    \":\"\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                                lineNumber: 118,\n                                                columnNumber: 17\n                                            }, undefined),\n                                            \" \",\n                                            value\n                                        ]\n                                    }, key, true, {\n                                        fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                        lineNumber: 117,\n                                        columnNumber: 15\n                                    }, undefined);\n                                })\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                            lineNumber: 114,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                        lineNumber: 113,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                lineNumber: 103,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                sx: {\n                    marginTop: 4\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Card_CardContent_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                variant: \"h6\",\n                                gutterBottom: true,\n                                children: \"Sensor Values Over Time\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                lineNumber: 129,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_chartjs_2__WEBPACK_IMPORTED_MODULE_8__.Line, {\n                                data: lineData,\n                                options: lineOptions\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                                lineNumber: 132,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                        lineNumber: 128,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                    lineNumber: 127,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n                lineNumber: 126,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Kevin\\\\Documents\\\\kevin\\\\4ano_1Semetre\\\\Oblicuos\\\\Ubicuos\\\\DashboardUbicuos\\\\clientJM\\\\src\\\\app\\\\home\\\\page.tsx\",\n        lineNumber: 99,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Home, \"sKKse8emLx9nI9zL9OjNCExRBYs=\");\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvaG9tZS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRW1EO0FBQ3NCO0FBVXZEO0FBQ3FCO0FBRXZDLG9DQUFvQztBQUNwQ1MsMkNBQU9BLENBQUNTLFFBQVEsQ0FDZFIsbURBQWFBLEVBQ2JDLGlEQUFXQSxFQUNYQyxrREFBWUEsRUFDWkMsaURBQVdBLEVBQ1hDLDJDQUFLQSxFQUNMQyw2Q0FBT0EsRUFDUEMsNENBQU1BO0FBR1IsTUFBTUcsVUFBVSx5QkFBeUIsa0JBQWtCO0FBRTNELE1BQU1DLE9BQWlCOztJQUNyQixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR3BCLCtDQUFRQSxDQUFNO1FBQzVDcUIsUUFBUSxFQUFFO1FBQ1ZDLFVBQVUsRUFBRTtJQUNkO0lBRUEsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUd4QiwrQ0FBUUEsQ0FBQztRQUNyQ3lCLGlCQUFpQjtRQUNqQkMsT0FBTyxDQUFDO0lBQ1Y7SUFFQSw0QkFBNEI7SUFDNUIsTUFBTUMsWUFBWTtRQUNoQixJQUFJO1lBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLEdBQVcsT0FBUlosU0FBUTtZQUN4QyxNQUFNYSxhQUFhLE1BQU1GLFNBQVNHLElBQUk7WUFFdEMsbUJBQW1CO1lBQ25CLE1BQU1OLGtCQUFrQkssV0FBV0UsTUFBTTtZQUN6QyxNQUFNQyxhQUFxQyxDQUFDO1lBRTVDSCxXQUFXSSxPQUFPLENBQUMsQ0FBQ0M7Z0JBQ2xCRixVQUFVLENBQUNFLEtBQUtDLElBQUksQ0FBQyxHQUFHLENBQUNILFVBQVUsQ0FBQ0UsS0FBS0MsSUFBSSxDQUFDLElBQUksS0FBSztZQUN6RDtZQUVBLGlDQUFpQztZQUNqQyxNQUFNZixTQUFTUyxXQUFXTyxHQUFHLENBQUMsQ0FBQ0YsT0FBY0EsS0FBS0csSUFBSTtZQUN0RCxNQUFNQyxTQUFTVCxXQUFXTyxHQUFHLENBQUMsQ0FBQ0YsT0FBY0EsS0FBS0ssS0FBSztZQUV2RHBCLFlBQVk7Z0JBQ1ZDO2dCQUNBQyxVQUFVO29CQUNSO3dCQUNFbUIsT0FBTzt3QkFDUEMsTUFBTUg7d0JBQ05JLGFBQWE7d0JBQ2JDLGlCQUFpQjt3QkFDakJDLE1BQU07b0JBQ1I7aUJBQ0Q7WUFDSDtZQUVBckIsV0FBVztnQkFDVEM7Z0JBQ0FDLE9BQU9PO1lBQ1Q7UUFDRixFQUFFLE9BQU9hLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLCtCQUErQkE7UUFDL0M7SUFDRjtJQUVBL0MsZ0RBQVNBLENBQUM7UUFDUjRCO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTXFCLGNBQW1CO1FBQ3ZCQyxZQUFZO1FBQ1pDLFNBQVM7WUFDUEMsUUFBUTtnQkFDTkMsVUFBVTtZQUNaO1lBQ0FDLE9BQU87Z0JBQ0xDLFNBQVM7Z0JBQ1RDLE1BQU07WUFDUjtRQUNGO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ25ELGdIQUFHQTtRQUFDb0QsSUFBSTtZQUFFQyxTQUFTO1FBQUU7OzBCQUNwQiw4REFBQ3RELGdIQUFVQTtnQkFBQ3VELFNBQVE7Z0JBQUtDLFlBQVk7MEJBQUM7Ozs7OzswQkFHdEMsOERBQUN0RCxnSEFBSUE7Z0JBQUN1RCxTQUFTO2dCQUFDQyxTQUFTOztrQ0FFdkIsOERBQUN4RCxnSEFBSUE7d0JBQUM4QixJQUFJO3dCQUFDMkIsSUFBSTt3QkFBSUMsSUFBSTt3QkFBR0MsSUFBSTtrQ0FDNUIsNEVBQUMvRCxnSEFBSUE7NEJBQUN1RCxJQUFJO2dDQUFFQyxTQUFTO2dDQUFHUSxXQUFXOzRCQUFTOzs4Q0FDMUMsOERBQUM5RCxnSEFBVUE7b0NBQUN1RCxTQUFROzhDQUFLOzs7Ozs7OENBQ3pCLDhEQUFDdkQsZ0hBQVVBO29DQUFDdUQsU0FBUTtvQ0FBS1EsT0FBTTs4Q0FDNUIzQyxRQUFRRSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7OztrQ0FJOUIsOERBQUNwQixnSEFBSUE7d0JBQUM4QixJQUFJO3dCQUFDMkIsSUFBSTt3QkFBSUMsSUFBSTt3QkFBR0MsSUFBSTtrQ0FDNUIsNEVBQUMvRCxnSEFBSUE7NEJBQUN1RCxJQUFJO2dDQUFFQyxTQUFTO2dDQUFHUSxXQUFXOzRCQUFTOzs4Q0FDMUMsOERBQUM5RCxnSEFBVUE7b0NBQUN1RCxTQUFROzhDQUFLOzs7Ozs7Z0NBQ3hCUyxPQUFPQyxPQUFPLENBQUM3QyxRQUFRRyxLQUFLLEVBQUVXLEdBQUcsQ0FBQzt3Q0FBQyxDQUFDZ0MsS0FBSzdCLE1BQU07eURBQzlDLDhEQUFDckMsZ0hBQVVBOzswREFDVCw4REFBQ21FOztvREFBUUQ7b0RBQUk7Ozs7Ozs7NENBQVU7NENBQUU3Qjs7dUNBRFY2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBU3pCLDhEQUFDakUsZ0hBQUdBO2dCQUFDb0QsSUFBSTtvQkFBRWUsV0FBVztnQkFBRTswQkFDdEIsNEVBQUN0RSxnSEFBSUE7OEJBQ0gsNEVBQUNDLGdIQUFXQTs7MENBQ1YsOERBQUNDLGdIQUFVQTtnQ0FBQ3VELFNBQVE7Z0NBQUtDLFlBQVk7MENBQUM7Ozs7OzswQ0FHdEMsOERBQUM1QyxpREFBSUE7Z0NBQUMyQixNQUFNdkI7Z0NBQVVxRCxTQUFTeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNM0M7R0E1R005QjtLQUFBQTtBQThHTiwrREFBZUEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2hvbWUvcGFnZS50c3g/ZGIyMSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IENhcmQsIENhcmRDb250ZW50LCBUeXBvZ3JhcGh5LCBCb3gsIEdyaWQgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xyXG5pbXBvcnQge1xyXG4gIENoYXJ0IGFzIENoYXJ0SlMsXHJcbiAgQ2F0ZWdvcnlTY2FsZSxcclxuICBMaW5lYXJTY2FsZSxcclxuICBQb2ludEVsZW1lbnQsXHJcbiAgTGluZUVsZW1lbnQsXHJcbiAgVGl0bGUsXHJcbiAgVG9vbHRpcCxcclxuICBMZWdlbmQsXHJcbn0gZnJvbSBcImNoYXJ0LmpzXCI7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tIFwicmVhY3QtY2hhcnRqcy0yXCI7XHJcblxyXG4vLyBSZWdpc3RyYXIgY29tcG9uZW50ZXMgZGUgQ2hhcnQuanNcclxuQ2hhcnRKUy5yZWdpc3RlcihcclxuICBDYXRlZ29yeVNjYWxlLFxyXG4gIExpbmVhclNjYWxlLFxyXG4gIFBvaW50RWxlbWVudCxcclxuICBMaW5lRWxlbWVudCxcclxuICBUaXRsZSxcclxuICBUb29sdGlwLFxyXG4gIExlZ2VuZFxyXG4pO1xyXG5cclxuY29uc3QgQVBJX1VSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCI7IC8vIFVSTCBkZWwgYmFja2VuZFxyXG5cclxuY29uc3QgSG9tZTogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2xpbmVEYXRhLCBzZXRMaW5lRGF0YV0gPSB1c2VTdGF0ZTxhbnk+KHtcclxuICAgIGxhYmVsczogW10sXHJcbiAgICBkYXRhc2V0czogW10sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFttZXRyaWNzLCBzZXRNZXRyaWNzXSA9IHVzZVN0YXRlKHtcclxuICAgIHRvdGFsRGF0YVBvaW50czogMCxcclxuICAgIHR5cGVzOiB7fSxcclxuICB9KTtcclxuXHJcbiAgLy8gT2J0ZW5lciBkYXRvcyBkZWwgYmFja2VuZFxyXG4gIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vc2Vuc29yLWRhdGFgKTtcclxuICAgICAgY29uc3Qgc2Vuc29yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgIC8vIEV4dHJhZXIgbcOpdHJpY2FzXHJcbiAgICAgIGNvbnN0IHRvdGFsRGF0YVBvaW50cyA9IHNlbnNvckRhdGEubGVuZ3RoO1xyXG4gICAgICBjb25zdCB0eXBlQ291bnRzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XHJcblxyXG4gICAgICBzZW5zb3JEYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIHR5cGVDb3VudHNbaXRlbS50eXBlXSA9ICh0eXBlQ291bnRzW2l0ZW0udHlwZV0gfHwgMCkgKyAxO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFByb2Nlc2FyIGRhdG9zIHBhcmEgZWwgZ3LDoWZpY29cclxuICAgICAgY29uc3QgbGFiZWxzID0gc2Vuc29yRGF0YS5tYXAoKGl0ZW06IGFueSkgPT4gaXRlbS5mcm9tKTtcclxuICAgICAgY29uc3QgdmFsdWVzID0gc2Vuc29yRGF0YS5tYXAoKGl0ZW06IGFueSkgPT4gaXRlbS52YWx1ZSk7XHJcblxyXG4gICAgICBzZXRMaW5lRGF0YSh7XHJcbiAgICAgICAgbGFiZWxzLFxyXG4gICAgICAgIGRhdGFzZXRzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcIlNlbnNvciBWYWx1ZXNcIixcclxuICAgICAgICAgICAgZGF0YTogdmFsdWVzLFxyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogXCIjNDJBNUY1XCIsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDY2LCAxNjUsIDI0NSwgMC41KVwiLFxyXG4gICAgICAgICAgICBmaWxsOiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldE1ldHJpY3Moe1xyXG4gICAgICAgIHRvdGFsRGF0YVBvaW50cyxcclxuICAgICAgICB0eXBlczogdHlwZUNvdW50cyxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgc2Vuc29yIGRhdGE6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZmV0Y2hEYXRhKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsaW5lT3B0aW9uczogYW55ID0ge1xyXG4gICAgcmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgIHBsdWdpbnM6IHtcclxuICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIgYXMgY29uc3QsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICB0ZXh0OiBcIlNlbnNvciBEYXRhIE92ZXIgVGltZVwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCBzeD17eyBwYWRkaW5nOiAzIH19PlxyXG4gICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDRcIiBndXR0ZXJCb3R0b20+XHJcbiAgICAgICAgU2Vuc29yIERhc2hib2FyZFxyXG4gICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgIDxHcmlkIGNvbnRhaW5lciBzcGFjaW5nPXsyfT5cclxuICAgICAgICB7LyogTcOpdHJpY2FzIHByaW5jaXBhbGVzICovfVxyXG4gICAgICAgIDxHcmlkIGl0ZW0geHM9ezEyfSBzbT17Nn0gbWQ9ezN9PlxyXG4gICAgICAgICAgPENhcmQgc3g9e3sgcGFkZGluZzogMiwgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIj5Ub3RhbCBEYXRhIFBvaW50czwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg0XCIgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAge21ldHJpY3MudG90YWxEYXRhUG9pbnRzfVxyXG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgIDxHcmlkIGl0ZW0geHM9ezEyfSBzbT17Nn0gbWQ9ezN9PlxyXG4gICAgICAgICAgPENhcmQgc3g9e3sgcGFkZGluZzogMiwgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIj5UeXBlIEJyZWFrZG93bjwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKG1ldHJpY3MudHlwZXMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiAoXHJcbiAgICAgICAgICAgICAgPFR5cG9ncmFwaHkga2V5PXtrZXl9PlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz57a2V5fTo8L3N0cm9uZz4ge3ZhbHVlfVxyXG4gICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgPC9HcmlkPlxyXG4gICAgICA8L0dyaWQ+XHJcblxyXG4gICAgICB7LyogR3LDoWZpY29zICovfVxyXG4gICAgICA8Qm94IHN4PXt7IG1hcmdpblRvcDogNCB9fT5cclxuICAgICAgICA8Q2FyZD5cclxuICAgICAgICAgIDxDYXJkQ29udGVudD5cclxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgZ3V0dGVyQm90dG9tPlxyXG4gICAgICAgICAgICAgIFNlbnNvciBWYWx1ZXMgT3ZlciBUaW1lXHJcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAgPExpbmUgZGF0YT17bGluZURhdGF9IG9wdGlvbnM9e2xpbmVPcHRpb25zfSAvPlxyXG4gICAgICAgICAgPC9DYXJkQ29udGVudD5cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWU7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ2FyZCIsIkNhcmRDb250ZW50IiwiVHlwb2dyYXBoeSIsIkJveCIsIkdyaWQiLCJDaGFydCIsIkNoYXJ0SlMiLCJDYXRlZ29yeVNjYWxlIiwiTGluZWFyU2NhbGUiLCJQb2ludEVsZW1lbnQiLCJMaW5lRWxlbWVudCIsIlRpdGxlIiwiVG9vbHRpcCIsIkxlZ2VuZCIsIkxpbmUiLCJyZWdpc3RlciIsIkFQSV9VUkwiLCJIb21lIiwibGluZURhdGEiLCJzZXRMaW5lRGF0YSIsImxhYmVscyIsImRhdGFzZXRzIiwibWV0cmljcyIsInNldE1ldHJpY3MiLCJ0b3RhbERhdGFQb2ludHMiLCJ0eXBlcyIsImZldGNoRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJzZW5zb3JEYXRhIiwianNvbiIsImxlbmd0aCIsInR5cGVDb3VudHMiLCJmb3JFYWNoIiwiaXRlbSIsInR5cGUiLCJtYXAiLCJmcm9tIiwidmFsdWVzIiwidmFsdWUiLCJsYWJlbCIsImRhdGEiLCJib3JkZXJDb2xvciIsImJhY2tncm91bmRDb2xvciIsImZpbGwiLCJlcnJvciIsImNvbnNvbGUiLCJsaW5lT3B0aW9ucyIsInJlc3BvbnNpdmUiLCJwbHVnaW5zIiwibGVnZW5kIiwicG9zaXRpb24iLCJ0aXRsZSIsImRpc3BsYXkiLCJ0ZXh0Iiwic3giLCJwYWRkaW5nIiwidmFyaWFudCIsImd1dHRlckJvdHRvbSIsImNvbnRhaW5lciIsInNwYWNpbmciLCJ4cyIsInNtIiwibWQiLCJ0ZXh0QWxpZ24iLCJjb2xvciIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJzdHJvbmciLCJtYXJnaW5Ub3AiLCJvcHRpb25zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/home/page.tsx\n"));

/***/ })

});