"use strict";
exports.id = 594;
exports.ids = [594];
exports.modules = {

/***/ 6625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/female.6abc0738.svg","height":50,"width":50});

/***/ }),

/***/ 654:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/male.445aac8c.svg","height":50,"width":50});

/***/ }),

/***/ 6773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ BioCard)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./public/images/male.svg
var male = __webpack_require__(654);
// EXTERNAL MODULE: ./public/images/female.svg
var female = __webpack_require__(6625);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./services/http.js
var http = __webpack_require__(6175);
;// CONCATENATED MODULE: ./hooks/getWidth.js

function getWidth() {
    const { 0: width , 1: setWidth  } = (0,external_react_.useState)({
        xs: false,
        md: false,
        lg: false
    });
    (0,external_react_.useEffect)(()=>{
        if (true) {
            if (window.innerWidth <= 500) {
                setWidth({
                    ...width,
                    xs: true
                });
            } else if (window.innerWidth > 500 && window.innerWidth < 768) {
                setWidth({
                    ...width,
                    md: true
                });
            } else if (window.innerWidth >= 768) {
                setWidth({
                    ...width,
                    lg: true
                });
            }
        }
    }, []);
    return width;
}

;// CONCATENATED MODULE: ./components/shared/BioCard.jsx








function BioCard({ bio , type  }) {
    const { 0: uId , 1: setUId  } = (0,external_react_.useState)(null);
    (0,external_react_.useEffect)(()=>{
        if (type === "userid") {
            http/* default.get */.Z.get(`/bio-uId/${bio.user}`).then((data)=>setUId(data.uId)).catch((err)=>err);
        }
    }, [
        bio.user,
        type
    ]);
    const { xs , md , lg  } = getWidth();
    console.log("width", {
        xs,
        md,
        lg
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        id: "card",
        className: "col-span-12 sm:col-span-6 lg:col-span-4 bg-primary pt-4 md:pt-8 border-2 border-dark rounded-md overflow-hidden duration-500 hover:scale-105 hover:shadow-lg",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "text-center",
                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    width: xs ? "90px" : md ? "120px" : lg ? "150px" : "100px",
                    height: xs ? "90px" : md ? "120px" : lg ? "150px" : "100px",
                    src: bio.type === "পাত্রের বায়োডাটা" ? male/* default */.Z : female/* default */.Z,
                    alt: "avatar"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "search-body",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: "বৈবাহিক অবস্থা "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: bio.condition
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: "জন্মসন "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: bio.birth
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        id: "lastspan",
                        children: "পেশা "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: bio.profession
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "pt-2 pb-5 md:py-8 text-center bg-white",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: `/bios/bio/${type !== "userid" ? bio?.user?.uId : uId}`,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        className: "bg-primary py-1 md:py-3 px-3 text-sm md:text-md md:px-6 rounded shadow text-white",
                        children: "বায়োডাটা দেখুন"
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 9630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CardSkeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CSkeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3539);


function CardSkeleton() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "my-4",
        style: {
            minHeight: "60vh"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8",
            children: [
                1,
                2,
                3,
                4,
                5,
                6
            ].map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "col-span-12 sm:col-span-6 lg:col-span-4",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_CSkeleton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                        duration: 1.4,
                        height: 250,
                        width: "100%"
                    })
                }, item))
        })
    });
}


/***/ })

};
;