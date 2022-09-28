"use strict";
exports.id = 270;
exports.ids = [270];
exports.modules = {

/***/ 7270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ AppWrapper),
/* harmony export */   "b": () => (/* binding */ useAppContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
function AppWrapper({ children  }) {
    const { 0: errorState , 1: setErrorState  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: routes , 1: setRoutes  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        primary: {
            name: "প্রাথমিক",
            link: "/primary",
            status: ""
        },
        personal: {
            name: "ব্যক্তিগত তথ্য",
            link: "/personal-info",
            status: ""
        },
        marriage: {
            name: "বিয়ে সংক্রান্ত তথ্য",
            link: "/marriage-related-info",
            status: ""
        },
        general: {
            name: "সাধারণ তথ্য",
            link: "/general-info",
            status: ""
        },
        family: {
            name: "পারিবারিক তথ্য",
            link: "/family-info",
            status: ""
        },
        address: {
            name: "ঠিকানা",
            link: "/address",
            status: ""
        },
        education: {
            name: "শিক্ষাগত যোগ্যতা",
            link: "/educational-qualifications",
            status: ""
        },
        another: {
            name: "অন্যান্য তথ্য",
            link: "/others-info",
            status: ""
        },
        expectation: {
            name: "যেমন জীবনসঙ্গী আশা করেন",
            link: "/expectation",
            status: ""
        },
        // authority: {
        //   name: 'কর্তৃপক্ষের জিজ্ঞাসা',
        //   link: '/authority-question',
        // status: ''
        // },
        contact: {
            name: "যোগাযোগ",
            link: "/contact-info",
            status: ""
        },
        contact: {
            name: "যোগাযোগ",
            link: "/contact-info",
            status: ""
        }
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AppContext.Provider, {
        value: {
            errorState,
            setErrorState,
            routes,
            setRoutes
        },
        children: children
    });
}
function useAppContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AppContext);
}


/***/ })

};
;