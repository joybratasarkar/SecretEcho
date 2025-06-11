(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/services/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchMessages": (()=>fetchMessages),
    "login": (()=>login),
    "register": (()=>register),
    "sendMessage": (()=>sendMessage)
});
const BASE_URL = "http://localhost:5000"; // or use process.env.NEXT_PUBLIC_API_URL
const login = async (username, password)=>{
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    return res.json();
};
const register = async (username, email, password)=>{
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
    return res.json();
};
const sendMessage = async (token, message)=>{
    const res = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            message
        })
    });
    return res.json();
};
const fetchMessages = async (token, userId)=>{
    const res = await fetch(`${BASE_URL}/api/conversations/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch messages");
    }
    return res.json(); // returns array of conversation documents with populated messages
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ChatBox.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatBox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-client] (ecmascript)"); // Your API to fetch past messages
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const BASE_URL = "http://localhost:5000"; // Defined at the top
function LoadingDots() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "animate-pulse text-sm text-gray-500",
        children: "Typing..."
    }, void 0, false, {
        fileName: "[project]/src/components/ChatBox.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = LoadingDots;
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function ChatBox() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [aiTyping, setAiTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Grab token and user_id from localStorage if available
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : ("TURBOPACK unreachable", undefined);
    const user_id = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("user_id") : ("TURBOPACK unreachable", undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatBox.useEffect": ()=>{
            if (!token || !user_id) return;
            console.log("Connecting to socket with token:", token, "and user_id:", user_id);
            // Connect socket with token auth
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(BASE_URL, {
                auth: {
                    token
                },
                transports: [
                    "websocket"
                ],
                withCredentials: true
            });
            console.log("Socket connected:", socket.id);
            socketRef.current = socket;
            // Fetch existing messages from API
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMessages"])(token, user_id).then({
                "ChatBox.useEffect": (conversations)=>{
                    const allMessages = conversations.flatMap({
                        "ChatBox.useEffect.allMessages": (conv)=>conv.messages
                    }["ChatBox.useEffect.allMessages"]);
                    setMessages(allMessages);
                }
            }["ChatBox.useEffect"]).catch({
                "ChatBox.useEffect": (err)=>console.error("Failed to fetch messages:", err)
            }["ChatBox.useEffect"]).finally({
                "ChatBox.useEffect": ()=>setLoading(false)
            }["ChatBox.useEffect"]);
            socket.on("connect", {
                "ChatBox.useEffect": ()=>{
                    console.log("✅ Socket connected:", socket.id);
                }
            }["ChatBox.useEffect"]);
            // Listen for new messages from server
            socket.on("newMessage", {
                "ChatBox.useEffect": (msg)=>{
                    setMessages({
                        "ChatBox.useEffect": (prev)=>[
                                ...prev,
                                msg
                            ]
                    }["ChatBox.useEffect"]);
                    console.log("New message received:", msg);
                }
            }["ChatBox.useEffect"]);
            socket.on("connect_error", {
                "ChatBox.useEffect": (err)=>{
                    console.error("❌ Socket connection error:", err.message || err);
                }
            }["ChatBox.useEffect"]);
            socket.on("aiTyping", {
                "ChatBox.useEffect": (typing)=>{
                    setAiTyping(typing);
                }
            }["ChatBox.useEffect"]);
            // Cleanup on unmount
            return ({
                "ChatBox.useEffect": ()=>{
                    socket.disconnect();
                    console.log("Socket disconnected");
                    socket.off("newMessage");
                    socket.off("aiTyping");
                    socket.off("connect_error");
                    socketRef.current?.removeAllListeners();
                    socketRef.current = null;
                }
            })["ChatBox.useEffect"];
        }
    }["ChatBox.useEffect"], [
        token,
        user_id
    ]);
    // Scroll to bottom on new messages or typing indicator change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatBox.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatBox.useEffect"], [
        messages,
        aiTyping
    ]);
    // Send message handler
    const handleSend = ()=>{
        if (!input.trim() || !socketRef.current) return;
        socketRef.current.emit("sendMessage", input.trim());
        setInput("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-lg rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto mb-4 space-y-3 px-2",
                style: {
                    scrollbarWidth: "thin"
                },
                children: [
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-400 mt-10",
                        children: "Loading messages..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatBox.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-400 mt-10",
                        children: "No messages yet"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatBox.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this) : messages.map((msg)=>{
                        // Determine if the message is from the current user
                        // Assuming user_id is stored as string matching sender._id or sender.username
                        const isUser = msg.sender?._id === user_id || msg.sender?.username === user_id;
                        const isAI = msg.isAIResponse;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${isUser ? "justify-end" : "justify-start"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[75%] px-4 py-2 rounded-lg break-words 
          ${isUser ? "bg-blue-600 text-white rounded-br-none" : ""}
          ${isAI ? "bg-gray-300 text-gray-900 rounded-bl-none" : ""}
          ${!isUser && !isAI ? "bg-gray-200 text-gray-900 rounded-bl-none" : ""}
        `,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "whitespace-pre-wrap text-left",
                                    children: msg.content
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatBox.tsx",
                                    lineNumber: 132,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatBox.tsx",
                                lineNumber: 125,
                                columnNumber: 17
                            }, this)
                        }, msg._id, false, {
                            fileName: "[project]/src/components/ChatBox.tsx",
                            lineNumber: 121,
                            columnNumber: 15
                        }, this);
                    }),
                    aiTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[60%] px-4 py-2 bg-gray-200 rounded-xl rounded-bl-none shadow-sm text-gray-600 select-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingDots, {}, void 0, false, {
                            fileName: "[project]/src/components/ChatBox.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatBox.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatBox.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatBox.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: (e)=>{
                    e.preventDefault();
                    handleSend();
                },
                className: "flex space-x-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        className: "flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
                        placeholder: "Type your message...",
                        autoComplete: "off",
                        spellCheck: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatBox.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: !input.trim(),
                        className: `px-5 py-2 rounded-md text-white font-semibold transition
            ${input.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}
          `,
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatBox.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatBox.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatBox.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(ChatBox, "LSYhDQHr0UJ7atvFPMmm3Tlx6Yw=");
_c1 = ChatBox;
var _c, _c1;
__turbopack_context__.k.register(_c, "LoadingDots");
__turbopack_context__.k.register(_c1, "ChatBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b631d475._.js.map