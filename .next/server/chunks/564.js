"use strict";
exports.id = 564;
exports.ids = [564];
exports.modules = {

/***/ 3539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CSkeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9012);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_loading_skeleton_dist_skeleton_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6593);
/* harmony import */ var react_loading_skeleton_dist_skeleton_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton_dist_skeleton_css__WEBPACK_IMPORTED_MODULE_2__);



function CSkeleton({ height , duration , width , circle  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__.SkeletonTheme, {
        color: "#c9c9c9",
        highlightColor: "#f5f5f5",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default()), {
                duration: duration || 1.4,
                height: height,
                width: width,
                count: 1,
                circle: circle
            })
        })
    });
}


/***/ }),

/***/ 5149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6175);

class BiodataRequests {
    getBios(type, jilla) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/home/${type}/${jilla}`);
    }
    filterBios(body) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/filter-bios", body);
    }
    getBioByUID(uId) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/bio-id/${uId}`);
    }
    getBioByToken() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/getbio-by-token");
    }
    updateBio(body) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/createorupdate-biodata", body);
    }
    setField(num) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/set-field/${num}`);
    }
    checkField() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/check-field");
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new BiodataRequests());


/***/ })

};
;