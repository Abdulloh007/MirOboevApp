export default [
  {
    context: [
      "/erpdev/hs/api",
      "/erpdev/hs/msgr",
    ],
    target: "http://10.102.20.160:3202",
    secure: false,
    changeOrigin: true
  }
]