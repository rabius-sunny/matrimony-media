"use strict";
exports.id = 627;
exports.ids = [627];
exports.modules = {

/***/ 6175:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const baseURL = "https://matrimony-media.herokuapp.com";
const instance = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
    baseURL,
    timeout: 10000
});
// Adding a request interceptor
instance.interceptors.request.use(function(config) {
    return {
        ...config,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
});
// Common function to get acctual data from response
const responseBody = (response)=>response.data;
const requests = {
    get: (url)=>instance.get(url).then(responseBody),
    post: (url, body)=>instance.post(url, body).then(responseBody),
    patch: (url, body)=>instance.patch(url, body).then(responseBody),
    delete: (url)=>instance.delete(url).then(responseBody)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requests);


/***/ }),

/***/ 6627:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6175);

class UserRequests {
    signIn(body) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/sign-in", body);
    }
    getUser() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/get-user");
    }
    getType() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/get-type");
    }
    getFavorites() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/favorites");
    }
    checkFavorite(bioid) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/is-favorite/${bioid}`);
    }
    addToBookmark(id) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/post-favorites/${id}`);
    }
    removeBookmark(id) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["delete"] */ .Z["delete"](`/delete-favorites/${id}`);
    }
    getFeatureds() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/get-featureds");
    }
    makeRequest(body) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/request-info", body);
    }
    deleteHideRequest(reason) {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/delete-hide-request", reason);
    }
    hideByUser() {
        return _http__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/hide-by-user");
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserRequests());


/***/ })

};
;