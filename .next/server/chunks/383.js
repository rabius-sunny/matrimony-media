"use strict";
exports.id = 383;
exports.ids = [383];
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

/***/ 7383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ BioInfoCard)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./public/images/male.svg
var male = __webpack_require__(654);
// EXTERNAL MODULE: ./public/images/female.svg
var female = __webpack_require__(6625);
// EXTERNAL MODULE: ./components/shared/CSkeleton.jsx
var CSkeleton = __webpack_require__(3539);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./utils/copyToClip.js
async function copyToClip(text) {
    if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand("copy", true, text);
    }
}

// EXTERNAL MODULE: ./components/shared/Modals/LongModal.jsx
var LongModal = __webpack_require__(8127);
// EXTERNAL MODULE: external "@nextui-org/react"
var react_ = __webpack_require__(6735);
// EXTERNAL MODULE: ./services/userRequest.js
var userRequest = __webpack_require__(6627);
;// CONCATENATED MODULE: ./components/bio/BioInfoCard.jsx










function BioInfoCard({ data , loading , uId  }) {
    const { 0: id , 1: setId  } = (0,external_react_.useState)(null);
    const { 0: copy , 1: setCopy  } = (0,external_react_.useState)(false);
    const { 0: info , 1: setInfo  } = (0,external_react_.useState)({
        type: "",
        condition: "",
        permanent_address: "",
        permanent_division: "",
        current_address: "",
        current_division: "",
        birth: "",
        complexion: "",
        height: "",
        weight: "",
        blood: "",
        profession: ""
    });
    const { 0: _delete , 1: set_delete  } = (0,external_react_.useState)(false);
    const { 0: hide , 1: setHide  } = (0,external_react_.useState)(false);
    const HideAction = ()=>{
        const handleHide = ()=>{
            userRequest/* default.hideByUser */.Z.hideByUser().then((info)=>{
                if (info.message === "ok") {
                    setHide(false);
                    window.location.reload();
                }
            }).catch((err)=>{
                alert("ইরর হয়েছে, আবার চেষ্টা করুন");
                setHide(false);
            });
        };
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                    className: "mb-4 italic text-yellow-500",
                    children: [
                        "বায়োডাটা “হাইড” এর মাধ্যমে আপনার বায়োডাটাটি সার্চ ফিল্টার থেকে গোপনে রাখতে পারবেন। পরবর্তীতে যে যেকোন সময় পুনরায় পাব্লিশ করতে পারবেন ",
                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                        "ইন শা আল্লাহ।"
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex gap-x-2 justify-end",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                            bordered: true,
                            auto: true,
                            color: "success",
                            onPress: ()=>setHide(false),
                            children: "ফিরে যান"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                            bordered: true,
                            auto: true,
                            color: "warning",
                            onPress: handleHide,
                            children: "হাইড করুন"
                        })
                    ]
                })
            ]
        });
    };
    const DeleteAction = ()=>{
        const { 0: reason , 1: setReason  } = (0,external_react_.useState)("");
        const handleDelete = (type)=>{
            if (reason !== "") {
                userRequest/* default.deleteHideRequest */.Z.deleteHideRequest({
                    reason,
                    type
                }).then((info)=>{
                    if (info.message === "ok") {
                        alert("আপনার delete রিকুয়েস্টটি গৃহীত হয়েছে, শীঘ্রই SMS এর মাধ্যমে ফলাফল পেয়ে যাবেন ইনশা আল্লাহ!");
                        set_delete(false);
                    }
                }).catch((err)=>{
                    alert("ইরর হয়েছে, আবার চেষ্টা করুন");
                    set_delete(false);
                });
            } else alert("কারণ বর্ণনা করুন");
        };
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "mb-4 font-semibold italic text-primary",
                    children: "বায়োডাটা “ডিলিট” এর মাধ্যমে আপনার বায়োডাটা সম্পূর্ণভাবে ওয়েবসাইট থেকে মুছে ফেলতে পারবেন। যা পরবর্তীতে ফিরিয়ে আনা সম্ভব না।"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "my-4 text-sm",
                    children: "আপনার বায়োডাটা ডিলিট করতে নিম্নোক্ত ফর্মটি পূরণের মাধ্যমে আবেদন করুন।"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "my-2",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                        onChange: ({ target: { value  }  })=>setReason(value),
                        placeholder: "সংক্ষেপে কারণ বর্ণনা করুন...",
                        className: "border-gray-300 border-2 mb-2 w-full p-2 focus:border-blue-500 rounded-lg",
                        rows: "4"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex gap-x-2 justify-end",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                            bordered: true,
                            auto: true,
                            color: "success",
                            onPress: ()=>set_delete(false),
                            children: "ফিরে যান"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                            type: "submit",
                            bordered: true,
                            auto: true,
                            color: "error",
                            onPress: handleDelete,
                            children: "ডিলিট করুন"
                        })
                    ]
                })
            ]
        });
    };
    (0,external_react_.useEffect)(()=>{
        data && setInfo({
            type: data.type,
            condition: data.condition,
            permanent_address: data.permanent_address,
            permanent_division: data.permanent_division,
            current_address: data.current_address,
            current_division: data.current_division,
            birth: data.birth,
            complexion: data.complexion,
            height: data.height,
            weight: data.weight,
            blood: data.blood,
            profession: data.profession
        });
        const localId = localStorage.getItem("id");
        localId && setId(localId);
    }, [
        data
    ]);
    const handleCopy = (text)=>{
        copyToClip(text);
        setCopy(true);
        setTimeout(()=>{
            setCopy(false);
        }, 1000);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "rounded-md bg-primary p-4 text-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(LongModal/* default */.Z, {
                        color: "error",
                        bodyColor: "error",
                        header: "প্রোফাইলে ডিলিট করুন",
                        visible: _delete,
                        onClose: ()=>set_delete(false),
                        preventClose: false,
                        body: /*#__PURE__*/ jsx_runtime_.jsx(DeleteAction, {
                            action: "ডিলিট"
                        }),
                        blur: true
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(LongModal/* default */.Z, {
                        header: "প্রোফাইল হাইড করুন",
                        color: "warning",
                        bodyColor: "warning",
                        visible: hide,
                        onClose: ()=>setHide(false),
                        preventClose: false,
                        body: /*#__PURE__*/ jsx_runtime_.jsx(HideAction, {}),
                        blur: true
                    }),
                    loading && !data ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                height: 150,
                                width: 150,
                                circle: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "my-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                    height: 30,
                                    width: "100%"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "my-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                    height: 30,
                                    width: "100%"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "my-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                    height: 30,
                                    width: "100%"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "my-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                    height: 30,
                                    width: "100%"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "my-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                    height: 30,
                                    width: "100%"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "my-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CSkeleton/* default */.Z, {
                                    height: 30,
                                    width: "100%"
                                })
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            id && data?.user?._id === id ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        height: "150px",
                                        width: "150px",
                                        src: info.type === "পাত্রীর বায়োডাটা" ? female/* default */.Z : male/* default */.Z,
                                        alt: "profile avatar"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                        className: "mt-2 text-xl text-white",
                                        children: [
                                            "Biodata ID",
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "text-5xl",
                                                children: uId
                                            })
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex justify-between items-center md:px-8 mb-4",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                height: "60px",
                                                width: "60px",
                                                src: info.type === "পাত্রীর বায়োডাটা" ? female/* default */.Z : male/* default */.Z,
                                                alt: "profile avatar"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "pl-3 text-xl text-left md:text-3xl text-white",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: " text-sm sm:text-2xl font-semibold ",
                                                        children: "Biodata ID"
                                                    }),
                                                    " ",
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: " text-sm sm:text-2xl font-semibold",
                                                        children: [
                                                            '" ',
                                                            uId,
                                                            ' "'
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                onClick: ()=>handleCopy(uId),
                                                className: `block text-sm sm:text-md px-1 sm:px-4 rounded-md border-2 ${copy ? "border-red-800" : "border-white"} py-1 sm:py-2 font-bold text-white`,
                                                children: copy ? "Copied" : "Copy BioID"
                                            })
                                        })
                                    })
                                ]
                            }),
                            id && id === data?.user?._id ? /*#__PURE__*/ jsx_runtime_.jsx("div", {}) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "item__holder2",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "বায়োডাটার ধরণ"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.type
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "বৈবাহিক অবস্থা"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.condition
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "স্থায়ী ঠিকানা"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.permanent_address
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "স্থায়ী বিভাগ"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.permanent_division
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "বর্তমান ঠিকানা"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.current_address
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "বর্তমান বিভাগ"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.current_division
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "জন্মসন (আসল)"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.birth
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "গাত্রবর্ণ"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.complexion
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "উচ্চতা"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.height
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "ওজন"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.weight
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "রক্তের গ্রুপ"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.blood
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: "পেশা"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: info.profession
                                            })
                                        ]
                                    })
                                ]
                            }),
                            id && id === data?.user?._id && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "mt-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: ()=>handleCopy(uId),
                                            className: `block w-full rounded-md ${copy ? "bg-red-800" : "bg-white"} py-3 font-bold ${copy ? "text-white" : "text-primary"} focus:ring-2 focus:ring-red-700`,
                                            children: copy ? "Copied" : "Copy BioID"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "btnHolder mt-4 flex rounded-md bg-white font-bold text-primary",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                onClick: ()=>{
                                                    set_delete(true);
                                                },
                                                className: "font-semibold hover:bg-red-200",
                                                children: "Delete Biodata"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {}),
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                onClick: ()=>{
                                                    setHide(true);
                                                },
                                                className: `font-semibold ${data?.published ? "cursor-pointer" : "pointer-events-none"} hover:bg-red-200`,
                                                children: "Hide Biodata"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            id && id === data?.user?._id && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `${data ? "block" : "hidden"} my-4 ${data?.published ? "bg-green-600" : "bg-primary "} shadow-lg py-2 text-white rounded text-2xl text-center`,
                        children: data?.published ? "বায়োটি পাবলিশড রয়েছে" : "বায়োটি হাইড রয়েছে"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `${!data || data?.published ? "hidden" : "block"} bg-red-200 text-primary p-2 shadow font-semibold`,
                        children: "পাবলিশ করতে প্রিভিউ থেকে পাবলিশ রিকুয়েস্ট করুন"
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;