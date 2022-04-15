//index.js
const app = getApp()
const {
  envList
} = require('../../../envList.js')

Page({
  data: {
    isPositionPermited: true,
    pics: ["a", "b"],
    seatings: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0,
      0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0
    ],
    buildingName: "思源湖畔",
    showUploadTip: false
  }
})