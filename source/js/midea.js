// const OUTDOOR_INDEX = {
//   8: { idx: [252], max: 13 },
//   10: { idx: [280], max: 16 },
//   12: { idx: [335], max: 20 },
//   14: { idx: [400], max: 23 },
//   16: { idx: [450], max: 26 },
//   18: { idx: [500], max: 29 },
//   20: { idx: [560], max: 33 },
//   22: { idx: [615], max: 36 },
//   24: { idx: [670], max: 39 },
//   26: { idx: [730], max: 43 },
//   28: { idx: [785], max: 46 },
//   30: { idx: [850], max: 50 },
//   32: { idx: [900], max: 53 },
//   34: { idx: [335, 615], max: 56 },
//   36: { idx: [400, 615], max: 59 },
//   38: { idx: [450, 615], max: 63 },
//   40: { idx: [335, 785], max: 64 },
//   42: { idx: [560, 615], max: 64 },
//   44: { idx: [615, 615], max: 64 },
//   46: { idx: [615, 670], max: 64 },
//   48: { idx: [615, 730], max: 64 },
//   50: { idx: [615, 785], max: 64 },
//   52: { idx: [730, 730], max: 64 },
//   54: { idx: [785, 730], max: 64 },
// };

// const OUTDOOR_MINI_INDEX = {
//   4: { idx: 120, max: 7 },
//   5: { idx: 140, max: 8 },
//   6: { idx: 160, max: 9 },
//   8: { idx: 220, max: 13 },
//   10: { idx: 280, max: 16 },
//   12: { idx: 335, max: 25 },
// };

// const OUTDOORS = {
//   "RXYS": {
//     getIdx: function (name) {
//       let idx = null;
//       if (name.slice(0, 6) === "RXYSCQ") {
//         idx = name.slice(6, 7);
//       }

//       if (name.slice(0, 5) === "RXYSQ") {
//         idx = isNaN(+name.slice(5, 7)) ? +name.slice(5, 6) : +name.slice(5, 7);
//       }

//       return idx;
//     },
//     getType: function (idx) {
//       return idx < 8 ? this.mini : this.compact;
//     },
//     mini: "MVUH(index)BT-VA1",
//     compact: "MVUH(index)C-VA3i",
//   },
//   "RXYQ": {
//     getModulesAmount: function (systemRows) {
//       const idx = systemRows.findIndex((item) => {
//         return item.name.slice(0, 7) === "BHFQ22P";
//       });

//       if (idx === -1) {
//         return 1;
//       } else {
//         const jointIdx = +systemRows[idx].name.slice(7, 10);
//         return jointIdx === 100 ? 2 : 3;
//       }
//     },
//     single: "MV6-i(index)WV2GN1",
//     double: "MV6-(index)WV2GN1",
//   },
// };

// const INDOORS_ATOM = {
//   //wall
//   "FXAQ15A": { unit: "MVW22T-VA1", alarm: "overload" },
//   "FXAQ20A": { unit: "MVW22T-VA1", alarm: "" },
//   "FXAQ25A": { unit: "MVW28T-VA1", alarm: "" },
//   "FXAQ32A": { unit: "MVW36T-VA1", alarm: "" },
//   "FXAQ40A": { unit: "MVW45T-VA1", alarm: "" },
//   "FXAQ50A": { unit: "MVW56T-VA1", alarm: "" },
//   "FXAQ63A": { unit: "MVW71T-VA1", alarm: "" },
//   //4-way
//   "FXFQ20B": { unit: "MVS22T-VA1", alarm: "wrongType" },
//   "FXFQ25B": { unit: "MVC28T-VA1", alarm: "" },
//   "FXFQ32B": { unit: "MVC36T-VA1", alarm: "" },
//   "FXFQ40B": { unit: "MVC45T-VA1", alarm: "" },
//   "FXFQ50B": { unit: "MVC56T-VA1", alarm: "" },
//   "FXFQ63B": { unit: "MVC71T-VA1", alarm: "" },
//   "FXFQ80B": { unit: "MVC90T-VA1", alarm: "" },
//   "FXFQ100B": { unit: "MVC112T-VA1", alarm: "" },
//   "FXFQ125B": { unit: "MVC140T-VA1", alarm: "" },
//   //4-way 600x600
//   "FXZQ15A": { unit: "MVS22T-VA1", alarm: "overload" },
//   "FXZQ20A": { unit: "MVS22T-VA1", alarm: "" },
//   "FXZQ25A": { unit: "MVS28T-VA1", alarm: "" },
//   "FXZQ32A": { unit: "MVS36T-VA1", alarm: "" },
//   "FXZQ40A": { unit: "MVS45T-VA1", alarm: "" },
//   "FXZQ50A": { unit: "MVC56T-VA1", alarm: "wrongType" },
//   //2-way
//   "FXCQ20A": { unit: "MVN22T-VA1", alarm: "wrongType" },
//   "FXCQ25A": { unit: "MVN28T-VA1", alarm: "wrongType" },
//   "FXCQ32A": { unit: "MVN36T-VA1", alarm: "wrongType" },
//   "FXCQ40A": { unit: "MVN45T-VA1", alarm: "wrongType" },
//   "FXCQ50A": { unit: "MVN56T-VA1", alarm: "wrongType" },
//   "FXCQ63A": { unit: "MVN71T-VA1", alarm: "wrongType" },
//   "FXCQ80A": { unit: "??????", alarm: "wrongType" },
//   "FXCQ125A": { unit: "??????", alarm: "wrongType" },
//   //1-way
//   "FXKQ25M": { unit: "MVN28T-VA1", alarm: "" },
//   "FXKQ32M": { unit: "MVN36T-VA1", alarm: "" },
//   "FXKQ40M": { unit: "MVN45T-VA1", alarm: "" },
//   "FXKQ63M": { unit: "MVN71T-VA1", alarm: "" },
//   //duct low
//   "FXDQ15A3": { unit: "MVM22T-VA1", alarm: "overload" },
//   "FXDQ20A3": { unit: "MVM22T-VA1", alarm: "" },
//   "FXDQ25A3": { unit: "MVM28T-VA1", alarm: "" },
//   "FXDQ32A3": { unit: "MVM36T-VA1", alarm: "" },
//   "FXDQ40A3": { unit: "MVM45T-VA1", alarm: "" },
//   "FXDQ50A3": { unit: "MVM56T-VA1", alarm: "" },
//   "FXDQ63A3": { unit: "MVM71T-VA1", alarm: "" },
//   //duct medium
//   "FXSQ15A3": { unit: "MVM22T-VA1", alarm: "" },
//   "FXSQ20A3": { unit: "MVM22T-VA1", alarm: "" },
//   "FXSQ25A3": { unit: "MVM28T-VA1", alarm: "" },
//   "FXSQ32A3": { unit: "MVM36T-VA1", alarm: "" },
//   "FXSQ40A3": { unit: "MVM45T-VA1", alarm: "" },
//   "FXSQ50A3": { unit: "MVM56T-VA1", alarm: "" },
//   "FXSQ63A3": { unit: "MVM71T-VA1", alarm: "" },
//   "FXSQ80A3": { unit: "MVM90T-VA1", alarm: "" },
//   "FXSQ100A3": { unit: "MVM112T-VA1", alarm: "" },
//   "FXSQ125A3": { unit: "MVM140T-VA1", alarm: "" },
//   "FXSQ140A3": { unit: "MVM160T-VA1", alarm: "" },
//   //duct high
//   "FXMQ50P7": { unit: "??????", alarm: "wrongType" },
//   "FXMQ63P7": { unit: "??????", alarm: "wrongType" },
//   "FXMQ80P7": { unit: "??????", alarm: "wrongType" },
//   "FXMQ100P7": { unit: "??????", alarm: "wrongType" },
//   "FXMQ125P7": { unit: "??????", alarm: "wrongType" },
//   "FXMQ200M": { unit: "??????", alarm: "wrongType" },
//   "FXMQ250M": { unit: "??????", alarm: "wrongType" },
//   //under ceiling
//   "FXHQ32A": { unit: "MVX36T-VA1", alarm: "" },
//   "FXHQ63A": { unit: "MVX71T-VA1", alarm: "" },
//   "FXHQ100A": { unit: "MVX112T-VA1", alarm: "" },
//   //under ceiling 4-way
//   "FXUQ71A": { unit: "MVC71T-VA1", alarm: "wrongType" },
//   "FXUQ100A": { unit: "MVC112T-VA1", alarm: "wrongType" },
//   //floor standing
//   "FXLQ20P": { unit: "MVX36T-VA1", alarm: "overload" },
//   "FXLQ25P": { unit: "MVX36T-VA1", alarm: "overload" },
//   "FXLQ32P": { unit: "MVX36T-VA1", alarm: "" },
//   "FXLQ40P": { unit: "MVX45T-VA1", alarm: "" },
//   "FXLQ50P": { unit: "MVX56T-VA1", alarm: "" },
//   "FXLQ63P": { unit: "MVX71T-VA1", alarm: "" },
//   //floor standing hidden
//   "FXNQ20A": { unit: "MVX36T-VA1", alarm: "overload wrongType" },
//   "FXNQ25A": { unit: "MVX36T-VA1", alarm: "overload wrongType" },
//   "FXNQ32A": { unit: "MVX36T-VA1", alarm: "wrongType" },
//   "FXNQ40A": { unit: "MVX45T-VA1", alarm: "wrongType" },
//   "FXNQ50A": { unit: "MVX56T-VA1", alarm: "wrongType" },
//   "FXNQ63A": { unit: "MVX71T-VA1", alarm: "wrongType" },
// };
import { MIDEA_OUTDOORS, MIDEA_INDOORS, MIDEA_CONTROLLERS, MIDEA_PANELS, MIDEA_OUTDOOR_JOINTS } from "./midea_data";

// export const MIDEA_OUTDOORS = {
//   individual: {
//     title: "V6i",
//     units: {
//       252: { name: "MV6-i252WV2GN1", modules: ["MV6-i252WV2GN1"], type: "v6i", maxIDU: 13, maxINDEX: 328 },
//       280: { name: "MV6-i280WV2GN1", modules: ["MV6-i280WV2GN1"], type: "v6i", maxIDU: 16, maxINDEX: 364 },
//       335: { name: "MV6-i335WV2GN1", modules: ["MV6-i335WV2GN1"], type: "v6i", maxIDU: 20, maxINDEX: 436 },
//       400: { name: "MV6-i400WV2GN1", modules: ["MV6-i400WV2GN1"], type: "v6i", maxIDU: 23, maxINDEX: 520 },
//       450: { name: "MV6-i450WV2GN1", modules: ["MV6-i450WV2GN1"], type: "v6i", maxIDU: 26, maxINDEX: 585 },
//       500: { name: "MV6-i500WV2GN1", modules: ["MV6-i500WV2GN1"], type: "v6i", maxIDU: 29, maxINDEX: 650 },
//       560: { name: "MV6-i560WV2GN1", modules: ["MV6-i560WV2GN1"], type: "v6i", maxIDU: 33, maxINDEX: 728 },
//       615: { name: "MV6-i615WV2GN1", modules: ["MV6-i615WV2GN1"], type: "v6i", maxIDU: 36, maxINDEX: 800 },
//       670: { name: "MV6-i670WV2GN1", modules: ["MV6-i670WV2GN1"], type: "v6i", maxIDU: 39, maxINDEX: 871 },
//       730: { name: "MV6-i730WV2GN1", modules: ["MV6-i730WV2GN1"], type: "v6i", maxIDU: 43, maxINDEX: 949 },
//       785: { name: "MV6-i785WV2GN1", modules: ["MV6-i785WV2GN1"], type: "v6i", maxIDU: 46, maxINDEX: 1021 },
//       850: { name: "MV6-i850WV2GN1", modules: ["MV6-i850WV2GN1"], type: "v6i", maxIDU: 50, maxINDEX: 1105 },
//       900: { name: "MV6-i900WV2GN1", modules: ["MV6-i900WV2GN1"], type: "v6i", maxIDU: 53, maxINDEX: 1170 },
//     },
//   },
//   multi: {
//     title: "V6",
//     units: {
//       950: { name: "MV6-950WV2GN1", modules: ["MV6-335WV2GN1", "MV6-615WV2GN1"], type: "v6", maxIDU: 56, maxINDEX: 1235, joint: "KJRT02E" },
//       1015: {
//         name: "MV6-1015WV2GN1",
//         modules: ["MV6-400WV2GN1", "MV6-615WV2GN1"],
//         type: "v6",
//         maxIDU: 59,
//         maxINDEX: 1320,
//         joint: "KJRT02E",
//       },
//       1065: {
//         name: "MV6-1065WV2GN1",
//         modules: ["MV6-450WV2GN1", "MV6-615WV2GN1"],
//         type: "v6",
//         maxIDU: 63,
//         maxINDEX: 1385,
//         joint: "KJRT02E",
//       },
//       1120: {
//         name: "MV6-1120WV2GN1",
//         modules: ["MV6-335WV2GN1", "MV6-785WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1456,
//         joint: "KJRT02E",
//       },
//       1175: {
//         name: "MV6-1175WV2GN1",
//         modules: ["MV6-560WV2GN1", "MV6-615WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1528,
//         joint: "KJRT02E",
//       },
//       1230: {
//         name: "MV6-1230WV2GN1",
//         modules: ["MV6-615WV2GN1", "MV6-615WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1599,
//         joint: "KJRT02E",
//       },
//       1285: {
//         name: "MV6-1285WV2GN1",
//         modules: ["MV6-615WV2GN1", "MV6-670WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1671,
//         joint: "FQZHW-02N1E",
//       },
//       1345: {
//         name: "MV6-1345WV2GN1",
//         modules: ["MV6-615WV2GN1", "MV6-730WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1749,
//         joint: "FQZHW-02N1E",
//       },
//       1400: {
//         name: "MV6-1400WV2GN1",
//         modules: ["MV6-615WV2GN1", "MV6-785WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1820,
//         joint: "FQZHW-02N1E",
//       },
//       1460: {
//         name: "MV6-1460WV2GN1",
//         modules: ["MV6-730WV2GN1", "MV6-730WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1898,
//         joint: "FQZHW-02N1E",
//       },
//       1515: {
//         name: "MV6-1515WV2GN1",
//         modules: ["MV6-785WV2GN1", "MV6-730WV2GN1"],
//         type: "v6",
//         maxIDU: 64,
//         maxINDEX: 1970,
//         joint: "FQZHW-02N1E",
//       },
//     },
//   },
//   compact: {
//     title: "Compact C-series",
//     units: {
//       220: { name: "MVUH220C-VA3i", modules: ["MVUH220C-VA3i"], type: "compact", maxIDU: 13, maxINDEX: 291 },
//       280: { name: "MVUH280C-VA3i", modules: ["MVUH280C-VA3i"], type: "compact", maxIDU: 16, maxINDEX: 364 },
//       335: { name: "MVUH335C-VA3i", modules: ["MVUH335C-VA3i"], type: "compact", maxIDU: 20, maxINDEX: 436 },
//     },
//   },
//   atom: {
//     title: "ATOM серия B",
//     units: {
//       80: { name: "MVUH80BT-VA1", modules: ["MVUH80BT-VA1"], type: "atom", maxIDU: 4, maxINDEX: 104 },
//       100: { name: "MVUH100BT-VA1", modules: ["MVUH100BT-VA1"], type: "atom", maxIDU: 6, maxINDEX: 130 },
//       120: { name: "MVUH120BT-VA1", modules: ["MVUH120BT-VA1"], type: "atom", maxIDU: 7, maxINDEX: 156 },
//       140: { name: "MVUH140BT-VA1", modules: ["MVUH140BT-VA1"], type: "atom", maxIDU: 8, maxINDEX: 182 },
//       160: { name: "MVUH160BT-VA1", modules: ["MVUH160BT-VA1"], type: "atom", maxIDU: 9, maxINDEX: 208 },
//     },
//   },
// };

const OUTDOOR_UNITS = {
  "RXYSCQ4TV1": { unit: MIDEA_OUTDOORS.atom.units[120], maxIndx: 130 },
  "RXYSCQ5TV1": { unit: MIDEA_OUTDOORS.atom.units[140], maxIndx: 162.5 },
  "RXYSCQ6TV1": { unit: MIDEA_OUTDOORS.atom.units[160], maxIndx: 182 },
  "RXYSQ4T8V": { unit: MIDEA_OUTDOORS.atom.units[120], maxIndx: 130 },
  "RXYSQ5T8V": { unit: MIDEA_OUTDOORS.atom.units[140], maxIndx: 162.5 },
  "RXYSQ6T8V": { unit: MIDEA_OUTDOORS.atom.units[160], maxIndx: 182 },
  "RXYSQ4T8Y": { unit: MIDEA_OUTDOORS.atom.units[120], maxIndx: 130 },
  "RXYSQ5T8Y": { unit: MIDEA_OUTDOORS.atom.units[140], maxIndx: 162.5 },
  "RXYSQ6T8Y": { unit: MIDEA_OUTDOORS.atom.units[160], maxIndx: 182 },
  "RXYSQ8TY": { unit: MIDEA_OUTDOORS.compact.units[220], maxIndx: 260 },
  "RXYSQ10TY": { unit: MIDEA_OUTDOORS.compact.units[280], maxIndx: 325 },
  "RXYSQ12TY": { unit: MIDEA_OUTDOORS.compact.units[335], maxIndx: 390 },
  ////
  "RXYQ8U": { unit: MIDEA_OUTDOORS.individual.units[252], maxIndx: 260 },
  "RXYQ10U": { unit: MIDEA_OUTDOORS.individual.units[280], maxIndx: 325 },
  "RXYQ12U": { unit: MIDEA_OUTDOORS.individual.units[335], maxIndx: 390 },
  "RXYQ14U": { unit: MIDEA_OUTDOORS.individual.units[400], maxIndx: 455 },
  "RXYQ16U": { unit: MIDEA_OUTDOORS.individual.units[450], maxIndx: 520 },
  "RXYQ18U": { unit: MIDEA_OUTDOORS.individual.units[500], maxIndx: 585 },
  "RXYQ20U": { unit: MIDEA_OUTDOORS.individual.units[560], maxIndx: 650 },
  "RXYQ22U": { unit: MIDEA_OUTDOORS.individual.units[615], maxIndx: 715 },
  "RXYQ24U": { unit: MIDEA_OUTDOORS.individual.units[670], maxIndx: 780 },
  "RXYQ26U": { unit: MIDEA_OUTDOORS.individual.units[730], maxIndx: 845 },
  "RXYQ28U": { unit: MIDEA_OUTDOORS.individual.units[785], maxIndx: 910 },
  "RXYQ30U": { unit: MIDEA_OUTDOORS.individual.units[850], maxIndx: 975 },
  "RXYQ32U": { unit: MIDEA_OUTDOORS.individual.units[900], maxIndx: 1040 },
  "RXYQ34U": { unit: MIDEA_OUTDOORS.multi.units[950], maxIndx: 1105 },
  "RXYQ36U": { unit: MIDEA_OUTDOORS.multi.units[1015], maxIndx: 1170 },
  "RXYQ38U": { unit: MIDEA_OUTDOORS.multi.units[1065], maxIndx: 1235 },
  "RXYQ40U": { unit: MIDEA_OUTDOORS.multi.units[1120], maxIndx: 1300 },
  "RXYQ42U": { unit: MIDEA_OUTDOORS.multi.units[1175], maxIndx: 1365 },
  "RXYQ44U": { unit: MIDEA_OUTDOORS.multi.units[1230], maxIndx: 1430 },
  "RXYQ46U": { unit: MIDEA_OUTDOORS.multi.units[1285], maxIndx: 1495 },
  "RXYQ48U": { unit: MIDEA_OUTDOORS.multi.units[1345], maxIndx: 1560 },
  "RXYQ50U": { unit: MIDEA_OUTDOORS.multi.units[1400], maxIndx: 1625 },
  "RXYQ52U": { unit: MIDEA_OUTDOORS.multi.units[1460], maxIndx: 1690 },
  "RXYQ54U": { unit: MIDEA_OUTDOORS.multi.units[1515], maxIndx: 1755 },
};

// export const MIDEA_INDOORS = {
//   general: {
//     wall: {
//       title: "Настенный",
//       units: {
//         22: { name: "MI2-22GDHN1", indx: 22, type: "wall" },
//         28: { name: "MI2-28GDHN1", indx: 28, type: "wall" },
//         36: { name: "MI2-36GDHN1", indx: 36, type: "wall" },
//         45: { name: "MI2-45GDHN1", indx: 45, type: "wall" },
//         56: { name: "MI2-56GDHN1", indx: 56, type: "wall" },
//         71: { name: "MI2-71GDHN1", indx: 71, type: "wall" },
//         80: { name: "MI2-80GDHN1", indx: 80, type: "wall" },
//         90: { name: "MI2-90GDHN1", indx: 90, type: "wall" },
//       },
//     },
//     cassette: {
//       title: "Кассетный",
//       units: {
//         28: { name: "MI2-28Q4DHN1", indx: 28, type: "4w", panel: "T-MBQ4-01E" },
//         36: { name: "MI2-36Q4DHN1", indx: 36, type: "4w", panel: "T-MBQ4-01E" },
//         45: { name: "MI2-45Q4DHN1", indx: 45, type: "4w", panel: "T-MBQ4-01E" },
//         56: { name: "MI2-56Q4DHN1", indx: 56, type: "4w", panel: "T-MBQ4-01E" },
//         71: { name: "MI2-71Q4DHN1", indx: 71, type: "4w", panel: "T-MBQ4-01E" },
//         80: { name: "MI2-80Q4DHN1", indx: 80, type: "4w", panel: "T-MBQ4-01E" },
//         90: { name: "MI2-90Q4DHN1", indx: 90, type: "4w", panel: "T-MBQ4-01E" },
//         100: { name: "MI2-100Q4DHN1", indx: 100, type: "4w", panel: "T-MBQ4-01E" },
//         112: { name: "MI2-112Q4DHN1", indx: 112, type: "4w", panel: "T-MBQ4-01E" },
//         140: { name: "MI2-140Q4DHN1", indx: 140, type: "4w", panel: "T-MBQ4-01E" },
//       },
//     },
//     cassetteC: {
//       title: "Кассетный 600х600",
//       units: {
//         22: { name: "MI2-22Q4CDHN1", indx: 22, type: "4wc", panel: "CE-MBQ4-03B5" },
//         28: { name: "MI2-28Q4CDHN1", indx: 28, type: "4wc", panel: "CE-MBQ4-03B5" },
//         36: { name: "MI2-36Q4CDHN1", indx: 36, type: "4wc", panel: "CE-MBQ4-03B5" },
//         45: { name: "MI2-45Q4CDHN1", indx: 45, type: "4wc", panel: "CE-MBQ4-03B5" },
//       },
//     },
//     twoWay: {
//       title: "Кассетный 2-х поточный",
//       units: {
//         22: { name: "MI2-22Q2DHN1", indx: 22, type: "2w", panel: "CE-MBQ2-01" },
//         28: { name: "MI2-28Q2DHN1", indx: 28, type: "2w", panel: "CE-MBQ2-01" },
//         36: { name: "MI2-36Q2DHN1", indx: 36, type: "2w", panel: "CE-MBQ2-01" },
//         45: { name: "MI2-45Q2DHN1", indx: 45, type: "2w", panel: "CE-MBQ2-01" },
//         56: { name: "MI2-56Q2DHN1", indx: 56, type: "2w", panel: "CE-MBQ2-01" },
//         71: { name: "MI2-71Q2DHN1", indx: 71, type: "2w", panel: "CE-MBQ2-01" },
//       },
//     },
//     oneWay: {
//       title: "Кассетный однопоточный",
//       units: {
//         18: { name: "MI2-18Q1DHN1", indx: 18, type: "1w", panel: "MBQ1-02D" },
//         22: { name: "MI2-22Q1DHN1", indx: 22, type: "1w", panel: "MBQ1-02D" },
//         28: { name: "MI2-28Q1DHN1", indx: 28, type: "1w", panel: "MBQ1-02D" },
//         36: { name: "MI2-36Q1DHN1", indx: 36, type: "1w", panel: "MBQ1-02D" },
//         45: { name: "MI2-45Q1DHN1", indx: 45, type: "1w", panel: "MBQ1-01D" },
//         56: { name: "MI2-56Q1DHN1", indx: 56, type: "1w", panel: "MBQ1-01D" },
//         71: { name: "MI2-71Q1DHN1", indx: 71, type: "1w", panel: "MBQ1-01D" },
//       },
//     },
//     ductMedium: {
//       title: "Канальный средненапорный",
//       units: {
//         22: { name: "MI2-22T2DHN1", indx: 22, type: "dm" },
//         28: { name: "MI2-28T2DHN1", indx: 28, type: "dm" },
//         36: { name: "MI2-36T2DHN1", indx: 36, type: "dm" },
//         45: { name: "MI2-45T2DHN1", indx: 45, type: "dm" },
//         56: { name: "MI2-56T2DHN1", indx: 56, type: "dm" },
//         71: { name: "MI2-71T2DHN1", indx: 71, type: "dm" },
//         80: { name: "MI2-80T2DHN1", indx: 80, type: "dm" },
//         90: { name: "MI2-90T2DHN1", indx: 90, type: "dm" },
//         112: { name: "MI2-112T2DHN1", indx: 112, type: "dm" },
//         140: { name: "MI2-140T2DHN1", indx: 140, type: "dm" },
//       },
//     },
//     ductMediumA: {
//       title: "Канальный средненапорный",
//       units: {
//         22: { name: "MI2-22T2DHN1(A)", indx: 22, type: "dm(a)" },
//         28: { name: "MI2-28T2DHN1(A)", indx: 28, type: "dm(a)" },
//         36: { name: "MI2-36T2DHN1(A)", indx: 36, type: "dm(a)" },
//         45: { name: "MI2-45T2DHN1(A)", indx: 45, type: "dm(a)" },
//         56: { name: "MI2-56T2DHN1(A)", indx: 56, type: "dm(a)" },
//         71: { name: "MI2-71T2DHN1(A)", indx: 71, type: "dm(a)" },
//         90: { name: "MI2-90T2DHN1(A)", indx: 90, type: "dm(a)" },
//         112: { name: "MI2-112T2DHN1(A)", indx: 112, type: "dm(a)" },
//         140: { name: "MI2-140T2DHN1(A)", indx: 140, type: "dm(a)" },
//         160: { name: "MI2-160T2DHN1(A)", indx: 160, type: "dm(a)" },
//       },
//     },
//     ductHigh: {
//       title: "Канальный высоконапорный",
//       units: {
//         71: { name: "MI2-71T1DHN1", indx: 71, type: "dh" },
//         90: { name: "MI2-90T1DHN1", indx: 90, type: "dh" },
//         112: { name: "MI2-112T1DHN1", indx: 112, type: "dh" },
//         140: { name: "MI2-140T1DHN1", indx: 140, type: "dh" },
//         160: { name: "MI2-160T1DHN1", indx: 160, type: "dh" },
//         200: { name: "MI2-200T1DHN1", indx: 200, type: "dh" },
//         250: { name: "MI2-250T1DHN1", indx: 250, type: "dh" },
//         280: { name: "MI2-280T1DHN1", indx: 280, type: "dh" },
//         400: { name: "MI2-400T1DHN1", indx: 400, type: "dh" },
//         450: { name: "MI2-450T1DHN1", indx: 450, type: "dh" },
//         560: { name: "MI2-560T1DHN1", indx: 560, type: "dh" },
//       },
//     },
//     underCeiling: {
//       title: "Напольно-потолочный",
//       units: {
//         36: { name: "MI2-36DLDHN1", indx: 36, type: "un" },
//         45: { name: "MI2-45DLDHN1", indx: 45, type: "un" },
//         56: { name: "MI2-56DLDHN1", indx: 56, type: "un" },
//         71: { name: "MI2-71DLDHN1", indx: 71, type: "un" },
//         80: { name: "MI2-80DLDHN1", indx: 80, type: "un" },
//         90: { name: "MI2-90DLDHN1", indx: 90, type: "un" },
//         112: { name: "MI2-112DLDHN1", indx: 112, type: "un" },
//         140: { name: "MI2-140DLDHN1", indx: 140, type: "un" },
//       },
//     },
//     console: {
//       title: "Консольный",
//       units: {
//         22: { name: "MI2-22ZDHN1", indx: 22 },
//         28: { name: "MI2-28ZDHN1", indx: 28 },
//         36: { name: "MI2-36ZDHN1", indx: 36 },
//         45: { name: "MI2-45ZDHN1", indx: 45 },
//       },
//     },
//   },
//   atom: {
//     oneWay: {
//       title: "Кассетный однопоточный",
//       units: {
//         18: { name: "MVN18T-VA1", indx: 18, type: "1w", panel: "MBQ1-02D" },
//         22: { name: "MVN22T-VA1", indx: 22, type: "1w", panel: "MBQ1-02D" },
//         28: { name: "MVN28T-VA1", indx: 28, type: "1w", panel: "MBQ1-02D" },
//         36: { name: "MVN36T-VA1", indx: 36, type: "1w", panel: "MBQ1-02D" },
//         45: { name: "MVN45T-VA1", indx: 45, type: "1w", panel: "MBQ1-01D" },
//         56: { name: "MVN56T-VA1", indx: 56, type: "1w", panel: "MBQ1-01D" },
//         71: { name: "MVN71T-VA1", indx: 71, type: "1w", panel: "MBQ1-01D" },
//       },
//     },
//     cassette: {
//       title: "Кассетный",
//       units: {
//         28: { name: "MVC28T-VA1", indx: 28, type: "4w", panel: "T-MBQ4-01E" },
//         36: { name: "MVC36T-VA1", indx: 36, type: "4w", panel: "T-MBQ4-01E" },
//         45: { name: "MVC45T-VA1", indx: 45, type: "4w", panel: "T-MBQ4-01E" },
//         56: { name: "MVC56T-VA1", indx: 56, type: "4w", panel: "T-MBQ4-01E" },
//         71: { name: "MVC71T-VA1", indx: 71, type: "4w", panel: "T-MBQ4-01E" },
//         80: { name: "MVC80T-VA1", indx: 80, type: "4w", panel: "T-MBQ4-01E" },
//         90: { name: "MVC90T-VA1", indx: 90, type: "4w", panel: "T-MBQ4-01E" },
//         100: { name: "MVC100T-VA1", indx: 100, type: "4w", panel: "T-MBQ4-01E" },
//         112: { name: "MVC112T-VA1", indx: 112, type: "4w", panel: "T-MBQ4-01E" },
//         140: { name: "MVC140T-VA1", indx: 140, type: "4w", panel: "T-MBQ4-01E" },
//       },
//     },
//     cassetteC: {
//       title: "Кассетный 600х600",
//       units: {
//         15: { name: "MVS15T-VA1", indx: 15, type: "4wc", panel: "CE-MBQ4-03B5" },
//         22: { name: "MVS22T-VA1", indx: 22, type: "4wc", panel: "CE-MBQ4-03B5" },
//         28: { name: "MVS28T-VA1", indx: 28, type: "4wc", panel: "CE-MBQ4-03B5" },
//         36: { name: "MVS36T-VA1", indx: 36, type: "4wc", panel: "CE-MBQ4-03B5" },
//         45: { name: "MVS45T-VA1", indx: 45, type: "4wc", panel: "CE-MBQ4-03B5" },
//       },
//     },
//     underCeiling: {
//       title: "Напольно-потолочный",
//       units: {
//         36: { name: "MVX36T-VA1", indx: 36, type: "un" },
//         45: { name: "MVX45T-VA1", indx: 45, type: "un" },
//         56: { name: "MVX56T-VA1", indx: 56, type: "un" },
//         71: { name: "MVX71T-VA1", indx: 71, type: "un" },
//         80: { name: "MVX80T-VA1", indx: 80, type: "un" },
//         90: { name: "MVX90T-VA1", indx: 90, type: "un" },
//         112: { name: "MVX112T-VA1", indx: 112, type: "un" },
//         140: { name: "MVX140T-VA1", indx: 140, type: "un" },
//       },
//     },
//     ductMedium: {
//       title: "Канальный средненапорный",
//       units: {
//         22: { name: "MVM22T-VA1", indx: 22, type: "dm" },
//         28: { name: "MVM28T-VA1", indx: 28, type: "dm" },
//         36: { name: "MVM36T-VA1", indx: 36, type: "dm" },
//         45: { name: "MVM45T-VA1", indx: 45, type: "dm" },
//         56: { name: "MVM56T-VA1", indx: 56, type: "dm" },
//         71: { name: "MVM71T-VA1", indx: 71, type: "dm" },
//         90: { name: "MVM90T-VA1", indx: 90, type: "dm" },
//         112: { name: "MVM112T-VA1", indx: 112, type: "dm" },
//         140: { name: "MVM140T-VA1", indx: 140, type: "dm" },
//         160: { name: "MVM160T-VA1", indx: 160, type: "dm" },
//       },
//     },
//     wall: {
//       title: "Настенный",
//       units: {
//         22: { name: "MVW22T-VA1", indx: 22, type: "wall" },
//         28: { name: "MVW28T-VA1", indx: 28, type: "wall" },
//         36: { name: "MVW36T-VA1", indx: 36, type: "wall" },
//         45: { name: "MVW45T-VA1", indx: 45, type: "wall" },
//         56: { name: "MVW56T-VA1", indx: 56, type: "wall" },
//         71: { name: "MVW71T-VA1", indx: 71, type: "wall" },
//         80: { name: "MVW80T-VA1", indx: 80, type: "wall" },
//         90: { name: "MVW90T-VA1", indx: 90, type: "wall" },
//       },
//     },
//   },
// };

export const INDOORS = {
  general: {
    //wall
    "FXAQ15A": { unit: MIDEA_INDOORS.general.wall.units[22], initIndx: 18, label: "настенный", initType: "wall" },
    "FXAQ20A": { unit: MIDEA_INDOORS.general.wall.units[22], initIndx: 22, label: "настенный", initType: "wall" },
    "FXAQ25A": { unit: MIDEA_INDOORS.general.wall.units[28], initIndx: 28, label: "настенный", initType: "wall" },
    "FXAQ32A": { unit: MIDEA_INDOORS.general.wall.units[36], initIndx: 36, label: "настенный", initType: "wall" },
    "FXAQ40A": { unit: MIDEA_INDOORS.general.wall.units[45], initIndx: 45, label: "настенный", initType: "wall" },
    "FXAQ50A": { unit: MIDEA_INDOORS.general.wall.units[56], initIndx: 56, label: "настенный", initType: "wall" },
    "FXAQ63A": { unit: MIDEA_INDOORS.general.wall.units[71], initIndx: 71, label: "настенный", initType: "wall" },
    //4-way
    "FXFQ20B": { unit: MIDEA_INDOORS.general.cassetteC.units[22], initIndx: 22, label: "кассетный", initType: "4w" },
    "FXFQ25B": { unit: MIDEA_INDOORS.general.cassette.units[28], initIndx: 28, label: "кассетный", initType: "4w" },
    "FXFQ32B": { unit: MIDEA_INDOORS.general.cassette.units[36], initIndx: 36, label: "кассетный", initType: "4w" },
    "FXFQ40B": { unit: MIDEA_INDOORS.general.cassette.units[45], initIndx: 45, label: "кассетный", initType: "4w" },
    "FXFQ50B": { unit: MIDEA_INDOORS.general.cassette.units[56], initIndx: 56, label: "кассетный", initType: "4w" },
    "FXFQ63B": { unit: MIDEA_INDOORS.general.cassette.units[71], initIndx: 71, label: "кассетный", initType: "4w" },
    "FXFQ80B": { unit: MIDEA_INDOORS.general.cassette.units[90], initIndx: 90, label: "кассетный", initType: "4w" },
    "FXFQ100B": { unit: MIDEA_INDOORS.general.cassette.units[112], initIndx: 112, label: "кассетный", initType: "4w" },
    "FXFQ125B": { unit: MIDEA_INDOORS.general.cassette.units[140], initIndx: 140, label: "кассетный", initType: "4w" },
    //4-way 600x600
    "FXZQ15A": { unit: MIDEA_INDOORS.general.cassetteC.units[22], initIndx: 18, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ20A": { unit: MIDEA_INDOORS.general.cassetteC.units[22], initIndx: 22, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ25A": { unit: MIDEA_INDOORS.general.cassetteC.units[28], initIndx: 28, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ32A": { unit: MIDEA_INDOORS.general.cassetteC.units[36], initIndx: 36, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ40A": { unit: MIDEA_INDOORS.general.cassetteC.units[45], initIndx: 45, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ50A": { unit: MIDEA_INDOORS.general.cassette.units[56], initIndx: 56, label: "кассетный 600х600", initType: "4wc" },
    //2-way
    "FXCQ20A": { unit: MIDEA_INDOORS.general.twoWay.units[22], initIndx: 22, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ25A": { unit: MIDEA_INDOORS.general.twoWay.units[28], initIndx: 28, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ32A": { unit: MIDEA_INDOORS.general.twoWay.units[36], initIndx: 36, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ40A": { unit: MIDEA_INDOORS.general.twoWay.units[45], initIndx: 45, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ50A": { unit: MIDEA_INDOORS.general.twoWay.units[56], initIndx: 56, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ63A": { unit: MIDEA_INDOORS.general.twoWay.units[71], initIndx: 71, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ80A": { unit: MIDEA_INDOORS.general.cassette.units[90], initIndx: 90, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ125A": { unit: MIDEA_INDOORS.general.cassette.units[140], initIndx: 140, label: "касс. двухпоточный", initType: "2w" },
    //1-way
    "FXKQ25M": { unit: MIDEA_INDOORS.general.oneWay.units[28], initIndx: 28, label: "касс. однопоточный", initType: "1w" },
    "FXKQ32M": { unit: MIDEA_INDOORS.general.oneWay.units[36], initIndx: 36, label: "касс. однопоточный", initType: "1w" },
    "FXKQ40M": { unit: MIDEA_INDOORS.general.oneWay.units[45], initIndx: 45, label: "касс. однопоточный", initType: "1w" },
    "FXKQ63M": { unit: MIDEA_INDOORS.general.oneWay.units[71], initIndx: 71, label: "касс. однопоточный", initType: "1w" },
    //duct low
    "FXDQ15A3": { unit: MIDEA_INDOORS.general.ductMedium.units[22], initIndx: 18, label: "кан. низконапорный", initType: "dm" },
    "FXDQ20A3": { unit: MIDEA_INDOORS.general.ductMedium.units[22], initIndx: 22, label: "кан. низконапорный", initType: "dm" },
    "FXDQ25A3": { unit: MIDEA_INDOORS.general.ductMedium.units[28], initIndx: 28, label: "кан. низконапорный", initType: "dm" },
    "FXDQ32A3": { unit: MIDEA_INDOORS.general.ductMedium.units[36], initIndx: 36, label: "кан. низконапорный", initType: "dm" },
    "FXDQ40A3": { unit: MIDEA_INDOORS.general.ductMedium.units[45], initIndx: 45, label: "кан. низконапорный", initType: "dm" },
    "FXDQ50A3": { unit: MIDEA_INDOORS.general.ductMedium.units[56], initIndx: 56, label: "кан. низконапорный", initType: "dm" },
    "FXDQ63A3": { unit: MIDEA_INDOORS.general.ductMedium.units[71], initIndx: 71, label: "кан. низконапорный", initType: "dm" },
    //duct medium
    "FXSQ15A": { unit: MIDEA_INDOORS.general.ductMediumA.units[22], initIndx: 18, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ20A": { unit: MIDEA_INDOORS.general.ductMediumA.units[22], initIndx: 22, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ25A": { unit: MIDEA_INDOORS.general.ductMediumA.units[28], initIndx: 28, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ32A": { unit: MIDEA_INDOORS.general.ductMediumA.units[36], initIndx: 36, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ40A": { unit: MIDEA_INDOORS.general.ductMediumA.units[45], initIndx: 45, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ50A": { unit: MIDEA_INDOORS.general.ductMediumA.units[56], initIndx: 56, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ63A": { unit: MIDEA_INDOORS.general.ductMediumA.units[71], initIndx: 71, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ80A": { unit: MIDEA_INDOORS.general.ductMediumA.units[90], initIndx: 90, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ100A": { unit: MIDEA_INDOORS.general.ductMediumA.units[112], initIndx: 112, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ125A": { unit: MIDEA_INDOORS.general.ductMediumA.units[140], initIndx: 140, label: "кан. средненапорный", initType: "dm(a)" },
    "FXSQ140A": { unit: MIDEA_INDOORS.general.ductHigh.units[160], initIndx: 160, label: "кан. средненапорный", initType: "dm(a)" },
    //duct high
    "FXMQ50P7": { unit: MIDEA_INDOORS.general.ductMediumA.units[56], initIndx: 56, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ63P7": { unit: MIDEA_INDOORS.general.ductHigh.units[71], initIndx: 71, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ80P7": { unit: MIDEA_INDOORS.general.ductHigh.units[90], initIndx: 90, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ100P7": { unit: MIDEA_INDOORS.general.ductHigh.units[112], initIndx: 112, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ125P7": { unit: MIDEA_INDOORS.general.ductHigh.units[140], initIndx: 140, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ200M": {
      unit: MIDEA_INDOORS.general.ductHigh.units[200],
      initIndx: 220,
      label: "кан. высоконапорный",
      initType: "dh",
      alarm: "underload",
    },
    "FXMQ250M": { unit: MIDEA_INDOORS.general.ductHigh.units[280], initIndx: 280, label: "кан. высоконапорный", initType: "dh" },
    //under ceiling
    "FXHQ32A": { unit: MIDEA_INDOORS.general.underCeiling.units[36], initIndx: 36, label: "подпотолочный", initType: "uc" },
    "FXHQ63A": { unit: MIDEA_INDOORS.general.underCeiling.units[71], initIndx: 71, label: "подпотолочный", initType: "uc" },
    "FXHQ100A": { unit: MIDEA_INDOORS.general.underCeiling.units[112], initIndx: 112, label: "подпотолочный", initType: "uc" },
    //under ceiling 4-way
    "FXUQ71A": { unit: MIDEA_INDOORS.general.cassette.units[71], initIndx: 71, label: "подпотолочный 4-х поточн.", initType: "uc4w" },
    "FXUQ100A": { unit: MIDEA_INDOORS.general.cassette.units[112], initIndx: 112, label: "подпотолочный 4-х поточн.", initType: "uc4w" },
    //floor standing
    "FXLQ20P": { unit: MIDEA_INDOORS.general.console.units[22], initIndx: 22, label: "напольный", initType: "con" },
    "FXLQ25P": { unit: MIDEA_INDOORS.general.console.units[28], initIndx: 28, label: "напольный", initType: "con" },
    "FXLQ32P": { unit: MIDEA_INDOORS.general.console.units[36], initIndx: 36, label: "напольный", initType: "con" },
    "FXLQ40P": { unit: MIDEA_INDOORS.general.console.units[45], initIndx: 45, label: "напольный", initType: "con" },
    "FXLQ50P": { unit: MIDEA_INDOORS.general.underCeiling.units[56], initIndx: 56, label: "напольный", initType: "uc" },
    "FXLQ63P": { unit: MIDEA_INDOORS.general.underCeiling.units[71], initIndx: 71, label: "напольный", initType: "uc" },
    //floor standing hidden
    "FXNQ20A": { unit: MIDEA_INDOORS.general.console.units[22], initIndx: 22, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ25A": { unit: MIDEA_INDOORS.general.console.units[28], initIndx: 28, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ32A": { unit: MIDEA_INDOORS.general.console.units[36], initIndx: 36, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ40A": { unit: MIDEA_INDOORS.general.console.units[45], initIndx: 45, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ50A": { unit: MIDEA_INDOORS.general.underCeiling.units[56], initIndx: 56, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ63A": { unit: MIDEA_INDOORS.general.underCeiling.units[71], initIndx: 71, label: "напольный встраиваемый", initType: "fsh" },
  },
  atom: {
    //wall
    "FXAQ15A": { unit: MIDEA_INDOORS.atom.wall.units[22], initIndx: 18, label: "настенный", initType: "wall" },
    "FXAQ20A": { unit: MIDEA_INDOORS.atom.wall.units[22], initIndx: 22, label: "настенный", initType: "wall" },
    "FXAQ25A": { unit: MIDEA_INDOORS.atom.wall.units[28], initIndx: 28, label: "настенный", initType: "wall" },
    "FXAQ32A": { unit: MIDEA_INDOORS.atom.wall.units[36], initIndx: 36, label: "настенный", initType: "wall" },
    "FXAQ40A": { unit: MIDEA_INDOORS.atom.wall.units[45], initIndx: 45, label: "настенный", initType: "wall" },
    "FXAQ50A": { unit: MIDEA_INDOORS.atom.wall.units[56], initIndx: 56, label: "настенный", initType: "wall" },
    "FXAQ63A": { unit: MIDEA_INDOORS.atom.wall.units[71], initIndx: 71, label: "настенный", initType: "wall" },
    //4-way
    "FXFQ20B": { unit: MIDEA_INDOORS.atom.cassetteC.units[22], initIndx: 22, label: "кассетный", initType: "4w" },
    "FXFQ25B": { unit: MIDEA_INDOORS.atom.cassette.units[28], initIndx: 28, label: "кассетный", initType: "4w" },
    "FXFQ32B": { unit: MIDEA_INDOORS.atom.cassette.units[36], initIndx: 36, label: "кассетный", initType: "4w" },
    "FXFQ40B": { unit: MIDEA_INDOORS.atom.cassette.units[45], initIndx: 45, label: "кассетный", initType: "4w" },
    "FXFQ50B": { unit: MIDEA_INDOORS.atom.cassette.units[56], initIndx: 56, label: "кассетный", initType: "4w" },
    "FXFQ63B": { unit: MIDEA_INDOORS.atom.cassette.units[71], initIndx: 71, label: "кассетный", initType: "4w" },
    "FXFQ80B": { unit: MIDEA_INDOORS.atom.cassette.units[90], initIndx: 90, label: "кассетный", initType: "4w" },
    "FXFQ100B": { unit: MIDEA_INDOORS.atom.cassette.units[112], initIndx: 112, label: "кассетный", initType: "4w" },
    "FXFQ125B": { unit: MIDEA_INDOORS.atom.cassette.units[140], initIndx: 140, label: "кассетный", initType: "4w" },
    //4-way 600x600
    "FXZQ15A": { unit: MIDEA_INDOORS.atom.cassetteC.units[15], initIndx: 18, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ20A": { unit: MIDEA_INDOORS.atom.cassetteC.units[22], initIndx: 22, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ25A": { unit: MIDEA_INDOORS.atom.cassetteC.units[28], initIndx: 28, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ32A": { unit: MIDEA_INDOORS.atom.cassetteC.units[36], initIndx: 36, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ40A": { unit: MIDEA_INDOORS.atom.cassetteC.units[45], initIndx: 45, label: "кассетный 600х600", initType: "4wc" },
    "FXZQ50A": { unit: MIDEA_INDOORS.atom.cassette.units[56], initIndx: 56, label: "кассетный 600х600", initType: "4wc" },
    //2-way
    "FXCQ20A": { unit: MIDEA_INDOORS.atom.cassette.units[22], initIndx: 22, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ25A": { unit: MIDEA_INDOORS.atom.cassette.units[28], initIndx: 28, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ32A": { unit: MIDEA_INDOORS.atom.cassette.units[36], initIndx: 36, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ40A": { unit: MIDEA_INDOORS.atom.cassette.units[45], initIndx: 45, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ50A": { unit: MIDEA_INDOORS.atom.cassette.units[56], initIndx: 56, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ63A": { unit: MIDEA_INDOORS.atom.cassette.units[71], initIndx: 71, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ80A": { unit: MIDEA_INDOORS.atom.cassette.units[90], initIndx: 90, label: "касс. двухпоточный", initType: "2w" },
    "FXCQ125A": { unit: MIDEA_INDOORS.atom.cassette.units[140], initIndx: 140, label: "касс. двухпоточный", initType: "2w" },
    //1-way
    "FXKQ25M": { unit: MIDEA_INDOORS.atom.oneWay.units[28], initIndx: 28, label: "касс. однопоточный", initType: "1w" },
    "FXKQ32M": { unit: MIDEA_INDOORS.atom.oneWay.units[36], initIndx: 36, label: "касс. однопоточный", initType: "1w" },
    "FXKQ40M": { unit: MIDEA_INDOORS.atom.oneWay.units[45], initIndx: 45, label: "касс. однопоточный", initType: "1w" },
    "FXKQ63M": { unit: MIDEA_INDOORS.atom.oneWay.units[71], initIndx: 71, label: "касс. однопоточный", initType: "1w" },
    //duct low
    "FXDQ15A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[22], initIndx: 18, label: "кан. низконапорный", initType: "dm" },
    "FXDQ20A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[22], initIndx: 22, label: "кан. низконапорный", initType: "dm" },
    "FXDQ25A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[28], initIndx: 28, label: "кан. низконапорный", initType: "dm" },
    "FXDQ32A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[36], initIndx: 36, label: "кан. низконапорный", initType: "dm" },
    "FXDQ40A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[45], initIndx: 45, label: "кан. низконапорный", initType: "dm" },
    "FXDQ50A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[56], initIndx: 56, label: "кан. низконапорный", initType: "dm" },
    "FXDQ63A3": { unit: MIDEA_INDOORS.atom.ductMedium.units[71], initIndx: 71, label: "кан. низконапорный", initType: "dm" },
    //duct medium
    "FXSQ15A": { unit: MIDEA_INDOORS.atom.ductMedium.units[22], initIndx: 18, label: "кан. средненапорный", initType: "dm" },
    "FXSQ20A": { unit: MIDEA_INDOORS.atom.ductMedium.units[22], initIndx: 22, label: "кан. средненапорный", initType: "dm" },
    "FXSQ25A": { unit: MIDEA_INDOORS.atom.ductMedium.units[28], initIndx: 28, label: "кан. средненапорный", initType: "dm" },
    "FXSQ32A": { unit: MIDEA_INDOORS.atom.ductMedium.units[36], initIndx: 36, label: "кан. средненапорный", initType: "dm" },
    "FXSQ40A": { unit: MIDEA_INDOORS.atom.ductMedium.units[45], initIndx: 45, label: "кан. средненапорный", initType: "dm" },
    "FXSQ50A": { unit: MIDEA_INDOORS.atom.ductMedium.units[56], initIndx: 56, label: "кан. средненапорный", initType: "dm" },
    "FXSQ63A": { unit: MIDEA_INDOORS.atom.ductMedium.units[71], initIndx: 71, label: "кан. средненапорный", initType: "dm" },
    "FXSQ80A": { unit: MIDEA_INDOORS.atom.ductMedium.units[90], initIndx: 90, label: "кан. средненапорный", initType: "dm" },
    "FXSQ100A": { unit: MIDEA_INDOORS.atom.ductMedium.units[112], initIndx: 112, label: "кан. средненапорный", initType: "dm" },
    "FXSQ125A": { unit: MIDEA_INDOORS.atom.ductMedium.units[140], initIndx: 140, label: "кан. средненапорный", initType: "dm" },
    "FXSQ140A": { unit: MIDEA_INDOORS.atom.ductMedium.units[160], initIndx: 160, label: "кан. средненапорный", initType: "dm" },
    //duct high
    "FXMQ50P7": { unit: MIDEA_INDOORS.atom.ductMedium.units[56], initIndx: 56, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ63P7": { unit: MIDEA_INDOORS.atom.ductMedium.units[71], initIndx: 71, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ80P7": { unit: MIDEA_INDOORS.atom.ductMedium.units[90], initIndx: 90, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ100P7": { unit: MIDEA_INDOORS.atom.ductMedium.units[112], initIndx: 112, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ125P7": { unit: MIDEA_INDOORS.atom.ductMedium.units[140], initIndx: 140, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ200M": { unit: null, label: "кан. высоконапорный", initType: "dh" },
    "FXMQ250M": { unit: null, label: "кан. высоконапорный", initType: "dh" },
    //under ceiling
    "FXHQ32A": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 36, label: "подпотолоный", initType: "uc" },
    "FXHQ63A": { unit: MIDEA_INDOORS.atom.underCeiling.units[71], initIndx: 71, label: "подпотолоный", initType: "uc" },
    "FXHQ100A": { unit: MIDEA_INDOORS.atom.underCeiling.units[112], initIndx: 112, label: "подпотолоный", initType: "uc" },
    //under ceiling 4-way
    "FXUQ63A": { unit: MIDEA_INDOORS.atom.cassette.units[71], initIndx: 71, label: "подпотолочный 4-х поточн.", initType: "uc4w" },
    "FXUQ100A": { unit: MIDEA_INDOORS.atom.cassette.units[112], initIndx: 112, label: "подпотолочный 4-х поточн.", initType: "uc4w" },
    //floor standing
    "FXLQ20P": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 22, label: "напольный", initType: "uc" },
    "FXLQ25P": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 28, label: "напольный", initType: "uc" },
    "FXLQ32P": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 36, label: "напольный", initType: "uc" },
    "FXLQ40P": { unit: MIDEA_INDOORS.atom.underCeiling.units[45], initIndx: 45, label: "напольный", initType: "uc" },
    "FXLQ50P": { unit: MIDEA_INDOORS.atom.underCeiling.units[56], initIndx: 56, label: "напольный", initType: "uc" },
    "FXLQ63P": { unit: MIDEA_INDOORS.atom.underCeiling.units[71], initIndx: 71, label: "напольный", initType: "uc" },
    //floor standing hidden
    "FXNQ20A": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 22, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ25A": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 28, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ32A": { unit: MIDEA_INDOORS.atom.underCeiling.units[36], initIndx: 36, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ40A": { unit: MIDEA_INDOORS.atom.underCeiling.units[45], initIndx: 45, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ50A": { unit: MIDEA_INDOORS.atom.underCeiling.units[56], initIndx: 56, label: "напольный встраиваемый", initType: "fsh" },
    "FXNQ63A": { unit: MIDEA_INDOORS.atom.underCeiling.units[71], initIndx: 71, label: "напольный встраиваемый", initType: "fsh" },
  },
};

// const INIT_INDOOR_TYPES = {
//   'wall': 'настенный',
//   '4w': 'кассетный',
//   '4wc': 'кассетный 600х600',
//   '2w': 'двухпоточный',
//   '1w': 'однопоточный',
//   'dm': 'канальный низконапорный',
//   'dm(a)': 'канальный средненапорный',
//   'dh': 'канальный высоконапорный',
//   'uc': 'подпотолочный',
//   'uc4w': 'подпотолочный четырехпоточный',

// }

const JOINTS = {
  "KHRQ22M20": "DJR101E",
  "KHRQ22M29": "DJR102E",
  "KHRQ22M64": "DJR103E",
  "KHRQ22M75": "DJR104E",
};

const OUTDOOR_JOINTS = {
  "BHFQ22P100": 2,
  "BHFQ23P90": 2,
  "BHFQ22P151": 3,
  "BHFQ23P135": 3,
};

const CONTROLLERS = {
  "BRC1": MIDEA_CONTROLLERS.wired,
  "DC60": MIDEA_CONTROLLERS.wired,
  "BRC7": MIDEA_CONTROLLERS.infrared,
  "BRC4": MIDEA_CONTROLLERS.infrared,
};

function getIndxFromName(str) {
  const arr = str.split("");

  const idx = arr.findIndex((letter) => {
    return !isNaN(+letter);
  });

  const newArr = arr.slice(idx);

  const idx2 = newArr.findIndex((letter) => {
    return isNaN(+letter);
  });

  return newArr.slice(0, idx2).join("");
}

function getNewSystem(systemRows) {
  const newSystemRows = [];

  const oldOutdoorUnits = [];
  let oldModules = 1;
  let oldTotalOutdoorIndx = 0;
  let oldOutdoorSplitName = [];
  let oldOutdoorName;
  let oldOutdoorMaxIndx;
  let oldTotalIDUIndx = 0;

  let systemsAmount = 1;
  let totalSystemIDU = 0;
  let maxNewOutdoorIDU = 0;
  let totalIDUIndx = 0;
  let maxNewOutdoorIndx = 0;

  let newOutdoorType = "";
  let newOutdoorJoint = "";

  const newOutdoorRows = [];
  const newOutdoorJointRow = {};
  const newIDURows = [];
  const newJointsRows = [];
  const newControllersRows = [];
  let panels = {};
  let newOutdoorJoints = {};
  let unknownRows = [];

  systemRows.forEach((row, rowIdx) => {
    const updatedOldModules = OUTDOOR_JOINTS[row.name];

    if (updatedOldModules) {
      oldModules = updatedOldModules;
      systemsAmount = row.amount;
    }

    const outdoorUnit = OUTDOOR_UNITS[row.name];

    if (outdoorUnit) {
      oldOutdoorUnits.push({ unit: row.name, amount: row.amount });
      oldOutdoorSplitName = row.name.split(getIndxFromName(row.name));

      row.done = true;
    }
  });

  if (oldOutdoorUnits.length !== 0) {
    if (oldModules === 1) {
      systemsAmount = oldOutdoorUnits[0].amount;
    }

    oldOutdoorUnits.forEach((unit) => {
      for (let i = 0; i < unit.amount / systemsAmount; i++) {
        oldTotalOutdoorIndx += +getIndxFromName(unit.unit);
      }
    });

    oldOutdoorName = oldOutdoorSplitName.join(oldTotalOutdoorIndx);

    console.log(oldOutdoorName);

    newOutdoorType = OUTDOOR_UNITS[oldOutdoorName].unit.type;
    maxNewOutdoorIndx = OUTDOOR_UNITS[oldOutdoorName].unit.maxINDEX;
    maxNewOutdoorIDU = OUTDOOR_UNITS[oldOutdoorName].unit.maxIDU;
    oldOutdoorMaxIndx = OUTDOOR_UNITS[oldOutdoorName].maxIndx;

    const newModules = OUTDOOR_UNITS[oldOutdoorName].unit.modules;

    const modules = {};

    if (newModules) {
      newModules.forEach((module) => {
        if (!modules[module]) {
          modules[module] = systemsAmount;
        } else {
          modules[module] += systemsAmount;
        }
      });

      Object.keys(modules).forEach((key) => {
        const newRow = {
          title: "",
          name: key,
          fullName: OUTDOOR_UNITS[oldOutdoorName].unit.name,
          amount: modules[key],
          type: "outdoor",
          outdoorMaxIndx: OUTDOOR_UNITS[oldOutdoorName].unit.maxINDEX,
          outdoorMaxIDU: OUTDOOR_UNITS[oldOutdoorName].unit.maxIDU,
          outdoorType: OUTDOOR_UNITS[oldOutdoorName].unit.type,
          // outdoorInitName: oldOutdoorName,
          // outdoorInitMaxIndx: oldOutdoorMaxIndx,
        };

        newOutdoorRows.push(newRow);
      });
    }

    newOutdoorJoint = OUTDOOR_UNITS[oldOutdoorName].unit.joint;

    if (newOutdoorJoint) {
      if (!newOutdoorJoints[newOutdoorJoint]) {
        newOutdoorJoints[newOutdoorJoint] = systemsAmount;
      } else {
        newOutdoorJoints[newOutdoorJoint] += systemsAmount;
      }
      // newOutdoorJointRow.title = "";
      // newOutdoorJointRow.name = newOutdoorJoint;
      // newOutdoorJointRow.amount = systemsAmount;
    }
  }

  systemRows.forEach((row, rowIdx) => {
    const indoor = newOutdoorType === "atom" ? INDOORS.atom[row.name] : INDOORS.general[row.name];
    const joint = JOINTS[row.name.slice(0, 9)];
    const controller = CONTROLLERS[row.name.slice(0, 4)];

    ///START/// ===== INDOOR UNITS
    if (indoor) {
      const newRow = {
        title: "",
        name: indoor.unit.name ? indoor.unit.name : "??????",
        amount: row.amount,
        //alarm: indoor.alarm,
        type: "indoor",
        oldIndoor: row.name,
        indoorIndx: indoor.unit.indx,
        indoorType: indoor.unit.type,
        indoorInitIndx: indoor.initIndx,
        indoorInitType: indoor.initType,
        panel: indoor.unit.panel,
        label: indoor.label,
      };

      if (indoor.unit.panel) {
        if (!panels[indoor.unit.panel]) {
          panels[indoor.unit.panel] = row.amount;
        } else {
          panels[indoor.unit.panel] += row.amount;
        }
      }

      totalSystemIDU += row.amount / systemsAmount;
      totalIDUIndx += indoor.unit.indx * (row.amount / systemsAmount);
      oldTotalIDUIndx += +getIndxFromName(row.name) * (row.amount / systemsAmount);

      row.done = true;

      newIDURows.push(newRow);
    } else if (joint) {
      const newRow = {
        title: "",
        name: joint,
        amount: row.amount,
        type: "joint",
      };

      row.done = true;

      newJointsRows.push(newRow);
    } else if (row.name.slice(0, 4) === "BHFQ") {
      row.done = true;
    } else if (controller) {
      const newRow = {
        title: "",
        name: controller,
        amount: row.amount,
        type: "controller",
      };

      row.done = true;

      newControllersRows.push(newRow);
    } else if (
      row.name.slice(0, 4) === "BYCQ" ||
      row.name.slice(0, 4) === "BYFQ" ||
      row.name.slice(0, 4) === "BYK4" ||
      row.name.slice(0, 4) === "BYBC"
    ) {
      row.done = true;
    } else if (!OUTDOOR_UNITS[row.name]) {
      const newRow = {
        title: "",
        name: row.name,
        amount: row.amount,
        type: "unknown",
      };

      unknownRows.push(newRow);
    }

    // if (rowIdx === systemRows.length - 1) {
    //   console.log("###isEmptyPanels: ", $.isEmptyObject(panels));
    //   if (!$.isEmptyObject(panels)) {
    //     Object.keys(panels).forEach((panel) => {
    //       const newRow = {
    //         title: "",
    //         name: panel,
    //         amount: panels[panel],
    //       };

    //       newSystemRows.push(newRow);
    //     });
    //   }
    // }
    ///END/// ===== PANELS
  });

  newOutdoorRows.forEach((row) => {
    newSystemRows.push(row);
  });

  newIDURows.forEach((row) => {
    newSystemRows.push(row);
  });

  newJointsRows.forEach((row) => {
    newSystemRows.push(row);
  });

  // if (newOutdoorJointRow.name) {
  //   newSystemRows.push(newOutdoorJointRow);
  // }

  MIDEA_OUTDOOR_JOINTS.forEach((joint) => {
    const newRow = {
      title: "",
      name: joint,
      amount: newOutdoorJoints[joint] ? newOutdoorJoints[joint] : 0,
      type: "outdoorJoint",
    };

    newSystemRows.push(newRow);
  });

  newControllersRows.forEach((row) => {
    newSystemRows.push(row);
  });

  // if (!$.isEmptyObject(panels)) {
  //   Object.keys(panels).forEach((panel) => {
  //     const newRow = {
  //       title: "",
  //       name: panel,
  //       amount: panels[panel],
  //       type: "panel",
  //     };

  //     newSystemRows.push(newRow);
  //   });
  // }

  MIDEA_PANELS.forEach((panel) => {
    const newRow = {
      title: "",
      name: panel,
      amount: panels[panel] ? panels[panel] : 0,
      type: "panel",
    };

    newSystemRows.push(newRow);
  });

  unknownRows.forEach((row) => {
    newSystemRows.push(row);
  });

  if (newSystemRows.length > 0) {
    newSystemRows[0].title = systemRows[0].title;
  }

  // let totalSystemIDU = 0;
  // let maxNewOutdoorIDU = 0;
  // let totalIDUIndx = 0;
  // let maxNewOutdoorIndx = 0;

  const newSystemInfo = {
    systemsAmount,
    type: newOutdoorType,
    totalIndex: totalIDUIndx,
    maxIndex: maxNewOutdoorIndx,
    totalAmount: totalSystemIDU,
    maxAmount: maxNewOutdoorIDU,
    oldOutdoorName,
    oldOutdoorMaxIndx,
    oldTotalIDUIndx,
    title: systemRows[0].title,
  };

  return {
    info: newSystemInfo,
    rows: newSystemRows,
  };
}

const midea = {
  getNewSystem,
};

export default midea;
