import { loader } from "./fileLoader";
import { makeTotalTable, clearTotalTable } from "./totalTable";
import quantityInputEventListeners from "./quantityInputEventListeners";
import { getTablesFromDoc, makeSeparateTable, clearSeparateTable } from "./separateTable";
import { totalSystems } from "./globalData";
import { resultLabel } from "./resultLabel";
import { dropdownEvents } from "./dropdownEvents";
import { resultBlock } from "./resultBlock";
import { resetRefnetsCheckbox } from "./changeAccessories";
import { resetControllers } from "./changeAccessories";
import { modal } from "./errorModal";
import ppd from "./ppd";
import vrf from "./vrfTable";
//import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import * as PDFJS from "pdfjs-dist";
import * as genPng from "../js/vendor/generatepng";
import autoTable from "jspdf-autotable";
import { loadedFont } from "./fontForPdf";

import { refcool, refcoolNote } from "./chillers";

PDFJS.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.js";
// import * as PDFJS from "pdfjs-dist";
// import PDFJSWorker from "pdfjs-dist/build/pdf.worker.js";

//PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const uploads = document.querySelectorAll(".upload");

function onLastFileLoaded() {
  resultLabel.show();

  if ($(".result__midea table").find("tr").length > 0) {
    $(".result__midea").show();
  }

  if ($(".result table").find("tr").length > 0) {
    resultBlock.show();

    // $(".result-block__radios button").removeAttr("disabled");
    // $(".result-block__radios button").first().addClass("active");
    // $(".result-info").show();
    // $(".result-block__accessories").show();

    makeTotalTable();

    quantityInputEventListeners.remove();
    quantityInputEventListeners.add();
  }

  setTimeout(() => {
    loader.remove();
    modal.isNeededToShow() && modal.show();
  }, 1000);
}

// function gettext(pdfUrl) {
//   var pdf = pdfjsLib.getDocument(pdfUrl);
//   return pdf.then(function (pdf) {
//     // get all pages text
//     var maxPages = pdf.pdfInfo.numPages;
//     var countPromises = []; // collecting all page promises
//     for (var j = 1; j <= maxPages; j++) {
//       var page = pdf.getPage(j);

//       var txt = "";
//       countPromises.push(
//         page.then(function (page) {
//           // add page promise
//           var textContent = page.getTextContent();
//           return textContent.then(function (text) {
//             // return content promise
//             return text.items
//               .map(function (s) {
//                 return s.str;
//               })
//               .join(""); // value page text
//           });
//         })
//       );
//     }
//     // Wait for all pages and join text
//     return Promise.all(countPromises).then(function (texts) {
//       return texts.join("");
//     });
//   });
// }

async function getPdfText(data) {
  let doc = await pdfjsLib.getDocument({ data }).promise;
  let pageTexts = Array.from({ length: doc.numPages }, async (v, i) => {
    return (await (await doc.getPage(i + 1)).getTextContent()).items.map((token) => token.str).join(" ");
  });
  return (await Promise.all(pageTexts)).join(" ");
}

// const getPageText = async (pdf: Pdf, pageNo: number) => {
//   const page = await pdf.getPage(pageNo);
//   const tokenizedText = await page.getTextContent();
//   const pageText = tokenizedText.items.map(token => token.str).join("");
//   return pageText;
// };

/* see example of a PDFSource below */
// const getPDFText = async (source: PDFSource): Promise<string> => {
//   Object.assign(window, {pdfjsWorker: PDFJSWorker}); // added to fit 2.3.0
//   const pdf: Pdf = await PDFJS.getDocument(source).promise;
//   const maxPages = pdf.numPages;
//   const pageTextPromises = [];
//   for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
//     pageTextPromises.push(getPageText(pdf, pageNo));
//   }
//   const pageTexts = await Promise.all(pageTextPromises);
//   return pageTexts.join(" ");
// };

export function putBinaryImageData(ctx, imgData, transferMaps = null) {
  const FULL_CHUNK_HEIGHT = 16;

  const ImageKind = {
    GRAYSCALE_1BPP: 1,
    RGB_24BPP: 2,
    RGBA_32BPP: 3,
  };

  if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
    ctx.putImageData(imgData, 0, 0);
    return;
  }

  const height = imgData.height,
    width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  let srcPos = 0,
    destPos;
  const src = imgData.data;
  const dest = chunkImgData.data;
  let i, j, thisChunkHeight, elemsInThisChunk;
  let transferMapRed, transferMapGreen, transferMapBlue, transferMapGray;

  if (transferMaps) {
    switch (transferMaps.length) {
      case 1:
        transferMapRed = transferMaps[0];
        transferMapGreen = transferMaps[0];
        transferMapBlue = transferMaps[0];
        transferMapGray = transferMaps[0];
        break;

      case 4:
        transferMapRed = transferMaps[0];
        transferMapGreen = transferMaps[1];
        transferMapBlue = transferMaps[2];
        transferMapGray = transferMaps[3];
        break;
    }
  }

  if (imgData.kind === ImageKind.GRAYSCALE_1BPP) {
    const srcLength = src.byteLength;
    const dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
    const dest32DataLength = dest32.length;
    const fullSrcDiff = (width + 7) >> 3;
    let white = 0xffffffff;
    let black = _util.IsLittleEndianCached.value ? 0xff000000 : 0x000000ff;

    if (transferMapGray) {
      if (transferMapGray[0] === 0xff && transferMapGray[0xff] === 0) {
        [white, black] = [black, white];
      }
    }

    for (i = 0; i < totalChunks; i++) {
      thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
      destPos = 0;

      for (j = 0; j < thisChunkHeight; j++) {
        const srcDiff = srcLength - srcPos;
        let k = 0;
        const kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
        const kEndUnrolled = kEnd & ~7;
        let mask = 0;
        let srcByte = 0;

        for (; k < kEndUnrolled; k += 8) {
          srcByte = src[srcPos++];
          dest32[destPos++] = srcByte & 128 ? white : black;
          dest32[destPos++] = srcByte & 64 ? white : black;
          dest32[destPos++] = srcByte & 32 ? white : black;
          dest32[destPos++] = srcByte & 16 ? white : black;
          dest32[destPos++] = srcByte & 8 ? white : black;
          dest32[destPos++] = srcByte & 4 ? white : black;
          dest32[destPos++] = srcByte & 2 ? white : black;
          dest32[destPos++] = srcByte & 1 ? white : black;
        }

        for (; k < kEnd; k++) {
          if (mask === 0) {
            srcByte = src[srcPos++];
            mask = 128;
          }

          dest32[destPos++] = srcByte & mask ? white : black;
          mask >>= 1;
        }
      }

      while (destPos < dest32DataLength) {
        dest32[destPos++] = 0;
      }

      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
    }
  } else if (imgData.kind === ImageKind.RGBA_32BPP) {
    const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
    j = 0;
    elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;

    for (i = 0; i < fullChunks; i++) {
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
      srcPos += elemsInThisChunk;

      if (hasTransferMaps) {
        for (let k = 0; k < elemsInThisChunk; k += 4) {
          if (transferMapRed) {
            dest[k + 0] = transferMapRed[dest[k + 0]];
          }

          if (transferMapGreen) {
            dest[k + 1] = transferMapGreen[dest[k + 1]];
          }

          if (transferMapBlue) {
            dest[k + 2] = transferMapBlue[dest[k + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, j);
      j += FULL_CHUNK_HEIGHT;
    }

    if (i < totalChunks) {
      elemsInThisChunk = width * partialChunkHeight * 4;
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));

      if (hasTransferMaps) {
        for (let k = 0; k < elemsInThisChunk; k += 4) {
          if (transferMapRed) {
            dest[k + 0] = transferMapRed[dest[k + 0]];
          }

          if (transferMapGreen) {
            dest[k + 1] = transferMapGreen[dest[k + 1]];
          }

          if (transferMapBlue) {
            dest[k + 2] = transferMapBlue[dest[k + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, j);
    }
  } else if (imgData.kind === ImageKind.RGB_24BPP) {
    const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
    thisChunkHeight = FULL_CHUNK_HEIGHT;
    elemsInThisChunk = width * thisChunkHeight;

    for (i = 0; i < totalChunks; i++) {
      if (i >= fullChunks) {
        thisChunkHeight = partialChunkHeight;
        elemsInThisChunk = width * thisChunkHeight;
      }

      destPos = 0;

      for (j = elemsInThisChunk; j--; ) {
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = 255;
      }

      if (hasTransferMaps) {
        for (let k = 0; k < destPos; k += 4) {
          if (transferMapRed) {
            dest[k + 0] = transferMapRed[dest[k + 0]];
          }

          if (transferMapGreen) {
            dest[k + 1] = transferMapGreen[dest[k + 1]];
          }

          if (transferMapBlue) {
            dest[k + 2] = transferMapBlue[dest[k + 2]];
          }
        }
      }

      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
    }
  } else {
    throw new Error(`bad image kind: ${imgData.kind}`);
  }
}

function addColontitles(doc) {
  const logo = new Image();
  logo.src = "/img/kentatsu.jpg";
  doc.addImage(logo, "JPEG", 15, 7, 60, 8.7);

  doc.setFontSize(14);
  doc.setFont("Calibri-bold");
  doc.text("Технические характеристики", 135, 13, { lang: "ru" });

  const city = new Image();
  city.src = "/img/city.png";
  doc.addImage(city, "png", 13, 263.3, 186, 16.7);

  const bLogo = new Image();
  bLogo.src = "/img/daichi.jpg";
  doc.addImage(bLogo, "JPEG", 169.5, 279, 32, 9.3);

  doc.setFont("Calibri");
  doc.setFontSize(8);
  doc.text(
    `
ООО«ДАИЧИ» 125167,  Москва,
Ленинградский пр-т д. 39, стр. 80
  `,
    13,
    280
  );
  doc.text(
    `
Тел.: +7(495) 737-37-33
info@daichi.ru
  `,
    70,
    280
  );
}

function addTitleBlock(doc, name, isMainPage, type, compressor, freon) {
  const name1 = name ? name : "";
  const type1 = type ? type : "";
  const compressor1 = compressor ? compressor : "";
  const freon1 = freon ? freon : "";

  doc.setFont("Calibri-bold");
  doc.setFontSize(16);

  if (isMainPage) {
    doc.text(name1, 115, 25);

    doc.setFont("Calibri");
    doc.setFontSize(12);
    doc.text(
      `
- ${type1}
- ${compressor1}
- ${freon1}
    `,
      115,
      26
    );
  } else {
    doc.text(name1, 155, 25);
  }
}

function addRefcoolNote(doc) {
  doc.setFontSize(10);
  const lineHeight = 4.4;
  const maxWidth = 165;
  const wordSpace = 3;
  const blockSpace = 9;

  let sX = 30;
  let sY = 60;

  refcoolNote.forEach((txt) => {
    doc.setFont("Calibri-bold");
    doc.text("•", sX - 5, sY);

    const txtArr = txt.split(" ").filter((item) => item);

    let x = sX;
    let y = sY;

    let isBold = true;

    txtArr.forEach((item, idx) => {
      doc.setFont("Calibri");

      const w = doc.getTextWidth(item);
      const wn = idx < txtArr.length - 1 ? doc.getTextWidth(txtArr[idx + 1]) : 0;

      if (x + w - sX > maxWidth) {
        x = sX;
        y += lineHeight;
      }

      if (item.length < 3 && x + wn - sX > maxWidth) {
        x = sX;
        y += lineHeight;
      }

      isBold && doc.setFont("Calibri-bold");
      doc.text(item, x, y);
      if (isBold && item.slice(-1) === ":") {
        isBold = false;
      }
      x += w + wordSpace;
    });

    sY = y + blockSpace;
  });
}

function makeRow(data1, data2, isFirst, isLast) {
  return [
    {
      content: data1 && data1.title ? data1.title : "",
      styles: { halign: "right", cellPadding: { top: isFirst ? 2 : 0.5, right: 2, bottom: isLast ? 2 : 0.5, left: 2 } },
    },
    {
      content: data1 && data1.value ? data1.value : "",
      styles: {
        halign: "left",
        font: "Calibri-bold",
        cellPadding: { top: isFirst ? 2 : 0.5, right: 2, bottom: isLast ? 2 : 0.5, left: 2 },
      },
    },
    {
      content: data2 && data2.title ? data2.title : "",
      styles: { halign: "right", cellWidth: 53, cellPadding: { top: isFirst ? 2 : 0.5, right: 2, bottom: isLast ? 2 : 0.5, left: 2 } },
    },
    {
      content: data2 && data2.value ? data2.value : "",
      styles: {
        halign: "left",
        font: "Calibri-bold",
        cellWidth: 47,
        cellPadding: { top: isFirst ? 2 : 0.5, right: 2, bottom: isLast ? 2 : 0.5, left: 2 },
      },
    },
  ];
}

////FUNCTION FOR MULTIFILES INPUT
function readmultifiles(input, files) {
  var reader = new FileReader();

  resultLabel.resetNewFailedFileStatus();
  loader.add(files);
  const pdfs = [];

  function readFile(index) {
    if (index >= files.length) return;

    var file = files[index];

    reader.onloadstart = function (e) {
      if (index === 0) {
        //loader.add(files);
      }
    };

    reader.onprogress = function (e) {};

    // IF CONVERT WORD REPORT TO EXCEL
    if ($(".upload-page--word").length > 0) {
      reader.onload = function (e) {
        var typedarray = new Uint8Array(this.result);

        const doc = PDFJS.getDocument(typedarray);

        const newDoc = new jsPDF();

        newDoc.addFileToVFS("Calibri.ttf", loadedFont.normal);
        newDoc.addFileToVFS("Calibri-bold.ttf", loadedFont.bold);
        newDoc.addFont("Calibri.ttf", "Calibri", "normal");
        newDoc.addFont("Calibri-bold.ttf", "Calibri-bold", "normal");
        newDoc.setFont("Calibri");

        doc.promise
          .then(function (doc) {
            const info = [];
            const data = {};
            data.titleBlock = {};
            data.cooling = { title: "Режим - охлаждение", rows: {} };
            data.unit = { title: "Данные блока", rows: {} };
            data.electricity = { title: "Данные эл. части", rows: {} };
            data.size = { title: "Физические характеристики", rows: {} };

            function getCurrentPage(i) {
              if (i > doc.numPages) return;

              doc.getPage(i).then(function (p) {
                p.getTextContent()
                  .then((text) => {
                    text.items.forEach((item, idx) => {
                      item.str && info.push(item.str);
                    });
                  })
                  .then(() => {
                    if (i === doc.numPages) {
                      info.forEach((item, idx) => {
                        if (idx < 20 && item.includes("Чиллер")) {
                          data.titleBlock.title = item;
                        }

                        if (item.includes("Компрессор:")) {
                          const newArr = info.slice(idx);
                          const id = newArr.indexOf("Тип");
                          const idAmount = newArr.indexOf("Количество компрессоров");
                          const idPower = newArr.indexOf("Источник питания");
                          const idLaunchA = newArr.indexOf("Пусковой ток компрессора");

                          data.titleBlock.compressor = info[idx + id + 2] + " Компрессор";

                          data.unit.rows.type = {};
                          data.unit.rows.type.title = "Тип компрессора";
                          data.unit.rows.type.value = info[idx + id + 2];

                          let amount = info[idx + idAmount + 4];
                          if (amount.split(" / ").length > 1) {
                            let newAmount = 0;

                            amount.split(" / ").forEach((item) => {
                              newAmount += +item;
                            });

                            amount = newAmount;
                          }
                          data.unit.rows.amount = {};
                          data.unit.rows.amount.title = "№ компрессоров";
                          data.unit.rows.amount.value = amount;

                          let powerArr = info[idx + idPower + 4].split("/");
                          let power = `${powerArr[0]} V / ${powerArr[2]} Hz / ${powerArr[1]} Ph`;

                          data.electricity.rows.power = {};
                          data.electricity.rows.power.title = "Эл-питание";
                          data.electricity.rows.power.value = power;

                          let launchA = info[idx + idLaunchA + 4];
                          data.electricity.rows.launchA = {};
                          data.electricity.rows.launchA.title = "Макс. пусковой ток";
                          data.electricity.rows.launchA.value = launchA;
                        }

                        if (item.includes("Входные данные:")) {
                          const newArr = info.slice(idx);
                          const idF = newArr.indexOf("Хладагент");
                          const idM = newArr.indexOf("Модель");
                          const idIn = newArr.indexOf("Температура входящей воды");
                          const idOut = newArr.indexOf("Температура выходящей воды");
                          const idCondence = newArr.indexOf("Температура конденсации");
                          const idFreonType = newArr.indexOf("Тип хладоносителя");
                          const idAntifreez = newArr.indexOf("Концентрация");

                          data.titleBlock.freon = info[idx + idF + 2] + " Хладагент";
                          data.model = refcool[info[idx + idM + 2]];

                          data.cooling.rows.evaporator = {};
                          data.cooling.rows.evaporator.title = "Испаритель, ВХОД/ВЫХОД";
                          data.cooling.rows.evaporator.value = `${info[idx + idIn + 2]} °C / ${info[idx + idOut + 2]} °C`;

                          data.cooling.rows.condence = {};
                          data.cooling.rows.condence.title = "Температура конденсации";
                          data.cooling.rows.condence.value = info[idx + idCondence + 2] + " °C";

                          const antifreezValue = +info[idx + idAntifreez + 2];
                          data.cooling.rows.freonType = {};
                          data.cooling.rows.freonType.title = "Жидк в испарителе";
                          data.cooling.rows.freonType.value = `${info[idx + idFreonType + 2]} ${
                            antifreezValue > 0 ? "," + antifreezValue + "%" : ""
                          }`;

                          data.unit.rows.freon = {};
                          data.unit.rows.freon.title = "Тип хладагента";
                          data.unit.rows.freon.value = info[idx + idF + 2];
                        }

                        if (item.includes("Расчётные данные:")) {
                          const newArr = info.slice(idx);
                          const idCap = newArr.indexOf("Холодопроизводительность");
                          const idPowerIn = newArr.indexOf("Потребляемая мощность компрессоров");
                          const idWaterRate = newArr.indexOf("Расход жидкости");
                          const idEER = newArr.indexOf("EER");
                          const idPressure = newArr.indexOf("Потери давления по жидкости");
                          const idSoundW = newArr.indexOf("Уровень звуковой мощности");
                          const idSoundP = newArr.indexOf("Уровень звукового давления (10m)");
                          const idControlType = newArr.indexOf("Тип регулирования");
                          const idRows = newArr.indexOf("Количество контуров");

                          data.cooling.rows.capacity = {};
                          data.cooling.rows.capacity.title = "Холодопроизв-ть";
                          data.cooling.rows.capacity.value = info[idx + idCap + 4] + " кВт";

                          data.cooling.rows.powerIn = {};
                          data.cooling.rows.powerIn.title = "Потр. мощн.";
                          data.cooling.rows.powerIn.value = info[idx + idPowerIn + 4] + " кВт";

                          data.cooling.rows.waterRate = {};
                          data.cooling.rows.waterRate.title = "Расх. воды ч/испар-ль";
                          data.cooling.rows.waterRate.value = info[idx + idWaterRate + 4] + " м³/ч";

                          data.cooling.rows.eer = {};
                          data.cooling.rows.eer.title = "Коэф. энергоэф-ти EER";
                          data.cooling.rows.eer.value = info[idx + idEER + 4] + " кВт/кВт";

                          data.cooling.rows.pressure = {};
                          data.cooling.rows.pressure.title = "Перепад давл. на испар-ле";
                          data.cooling.rows.pressure.value = info[idx + idPressure + 4] + " кПа";

                          data.cooling.rows.sound = {};
                          data.cooling.rows.sound.title = "Lw / Lp, 10 м";
                          data.cooling.rows.sound.value = `${info[idx + idSoundW + 4]} dB(A) / ${info[idx + idSoundP + 4]} dB(A)`;

                          data.unit.rows.controlType = {};
                          data.unit.rows.controlType.title = "Регул-ние произв-сти";
                          data.unit.rows.controlType.value = info[idx + idControlType + 2];

                          data.unit.rows.rows = {};
                          data.unit.rows.rows.title = "№ контуров";
                          data.unit.rows.rows.value = info[idx + idRows + 2];
                        }

                        if (item.includes("Испаритель:")) {
                          const newArr = info.slice(idx);
                          const id = newArr.indexOf("Тип");
                          const idVolume = newArr.indexOf("Объем хладагента");
                          const idInnerV = newArr.findIndex((item) => {
                            return item.includes("Внутренний объём");
                          });

                          data.unit.rows.evaporatorType = {};
                          data.unit.rows.evaporatorType.title = "Тип испарителя";
                          data.unit.rows.evaporatorType.value = info[idx + id + 2];

                          data.unit.rows.volume = {};
                          data.unit.rows.volume.title = "Объем хладагента";
                          data.unit.rows.volume.value = info[idx + idVolume + 4] + " л";

                          data.unit.rows.innerVolume = {};
                          data.unit.rows.innerVolume.title = "Внутренний объём (одна сторона)";
                          data.unit.rows.innerVolume.value = info[idx + idInnerV + 4] + " л";
                        }

                        if (item.includes("Габариты и вес:")) {
                          const newArr = info.slice(idx);
                          const idWaterD = newArr.indexOf("Диаметр линии жидкости");
                          const idWaterS = newArr.indexOf("Диаметр нагнетательной линии");
                          const idConnection = newArr.indexOf("Присоединительные размеры");
                          const idLength = newArr.indexOf("Длина");
                          const idWidth = newArr.indexOf("Ширина");
                          const idHeight = newArr.indexOf("Высота");
                          const idWeight = newArr.indexOf("Вес");

                          data.size.rows.waterD = {};
                          data.size.rows.waterD.title = "Диаметр линии жидкости";
                          data.size.rows.waterD.value = info[idx + idWaterD + 4] + " мм";

                          data.size.rows.waterS = {};
                          data.size.rows.waterS.title = "Диаметр нагнетательной линии";
                          data.size.rows.waterS.value = info[idx + idWaterS + 4] + " мм";

                          data.size.rows.connection = {};
                          data.size.rows.connection.title = "Присоединительные размеры";
                          data.size.rows.connection.value = info[idx + idConnection + 2];

                          data.size.rows.length = {};
                          data.size.rows.length.title = "Длина";
                          data.size.rows.length.value = info[idx + idLength + 4] + " мм";

                          data.size.rows.width = {};
                          data.size.rows.width.title = "Ширина";
                          data.size.rows.width.value = info[idx + idWidth + 4] + " мм";

                          data.size.rows.height = {};
                          data.size.rows.height.title = "Высота";
                          data.size.rows.height.value = info[idx + idHeight + 4] + " мм";

                          data.size.rows.weight = {};
                          data.size.rows.weight.title = "Вес";
                          data.size.rows.weight.value = info[idx + idWeight + 4] + " кг";
                        }
                      });

                      const table = {
                        styles: { font: "Calibri", fontSize: 9, cellPadding: { top: 0.5, right: 2, bottom: 0.5, left: 2 } },
                        getHead: function (name) {
                          return [
                            {
                              id: {
                                content: name,
                                colSpan: 2,
                                styles: { fillColor: [211, 211, 211], cellWidth: 50, font: "Calibri-bold" },
                              },
                              empty: { content: "", colSpan: 2 },
                            },
                          ];
                        },
                        makeLine: function (isEmpty) {
                          return function (data) {
                            const rows = data.table.body;

                            if (!isEmpty && data.row.index === 0 && data.row.section === "head") {
                              newDoc.setDrawColor(211, 211, 211); // set the border color
                              newDoc.setLineWidth(0.5); // set the border with

                              // draw bottom border
                              newDoc.line(
                                data.cell.x,
                                data.cell.y + data.cell.height,
                                data.cell.x + data.cell.width,
                                data.cell.y + data.cell.height
                              );
                            }

                            if (!isEmpty && data.row.index === rows.length - 1) {
                              newDoc.setDrawColor(211, 211, 211); // set the border color
                              newDoc.setLineWidth(0.5); // set the border with

                              // draw bottom border
                              newDoc.line(
                                data.cell.x,
                                data.cell.y + data.cell.height,
                                data.cell.x + data.cell.width,
                                data.cell.y + data.cell.height
                              );
                            }
                          };
                        },
                      };

                      ///PAGE 1
                      addColontitles(newDoc);
                      addTitleBlock(newDoc, data.model, true, data.titleBlock.title, data.titleBlock.compressor, data.titleBlock.freon);
                      //newDoc.text(refcoolNote[1], 15, 70, { maxWidth: "150", align: "justify", charSpace: "0" });
                      addRefcoolNote(newDoc);

                      ///PAGE 2
                      newDoc.addPage();
                      addColontitles(newDoc);
                      addTitleBlock(newDoc, data.model, false);

                      let finalY = 55;

                      autoTable(newDoc, {
                        styles: table.styles,
                        startY: finalY,
                        theme: "plain",
                        head: table.getHead(data.cooling.title),
                        body: [
                          makeRow(data.cooling.rows.capacity, data.cooling.rows.evaporator, true, false),
                          makeRow(data.cooling.rows.powerIn, data.cooling.rows.waterRate),
                          makeRow(data.cooling.rows.eer, data.cooling.rows.pressure),
                          makeRow(data.cooling.rows.condence, data.cooling.rows.sound),
                          makeRow("", data.cooling.rows.freonType, false, true),
                        ],
                        didDrawCell: table.makeLine(false),
                      });

                      finalY = newDoc.lastAutoTable.finalY + 7;

                      autoTable(newDoc, {
                        styles: table.styles,
                        startY: finalY,
                        theme: "plain",
                        head: table.getHead(data.unit.title),
                        body: [
                          makeRow(data.unit.rows.type, data.unit.rows.freon, true, false),
                          makeRow(data.unit.rows.controlType, ""),
                          makeRow(data.unit.rows.amount, ""),
                          makeRow(data.unit.rows.rows, ""),
                          makeRow(data.unit.rows.volume, ""),
                          makeRow("", data.unit.rows.evaporatorType),
                          makeRow("", data.unit.rows.innerVolume, false, true),
                        ],
                        didDrawCell: table.makeLine(false),
                      });

                      finalY = newDoc.lastAutoTable.finalY + 7;

                      autoTable(newDoc, {
                        styles: table.styles,
                        startY: finalY,
                        theme: "plain",
                        head: table.getHead(data.electricity.title),
                        body: [makeRow(data.electricity.rows.power, data.electricity.rows.launchA, true, false)],
                        didDrawCell: table.makeLine(false),
                      });

                      ///PAGE 3
                      newDoc.addPage();
                      addColontitles(newDoc);
                      addTitleBlock(newDoc, data.model, false);

                      finalY = 55;

                      autoTable(newDoc, {
                        styles: table.styles,
                        startY: finalY,
                        theme: "plain",
                        head: table.getHead(data.size.title),
                        body: [
                          makeRow(data.size.rows.waterD, data.size.rows.length, true, false),
                          makeRow(data.size.rows.waterS, data.size.rows.width),
                          makeRow(data.size.rows.connection, data.size.rows.height),
                          makeRow("", data.size.rows.weight, false, true),
                        ],
                        didDrawCell: table.makeLine(false),
                      });

                      finalY = newDoc.lastAutoTable.finalY + 7;

                      autoTable(newDoc, {
                        styles: table.styles,
                        startY: finalY,
                        theme: "plain",
                        head: table.getHead("Чертеж"),
                        body: [makeRow("", "")],
                        didDrawCell: table.makeLine(true),
                      });

                      let objs = [];

                      const model = data.model;

                      p.getOperatorList().then(function (ops) {
                        for (var k = 0; k < ops.fnArray.length; k++) {
                          if (ops.fnArray[k] == PDFJS.OPS.paintJpegXObject || ops.fnArray[k] == PDFJS.OPS.paintImageXObject) {
                            objs.push(p.objs.get(ops.argsArray[k][0]));
                          }
                        }

                        const img = objs[2];

                        if (img) {
                          var canvas = document.createElement("canvas");
                          canvas.width = img.width;
                          canvas.height = img.height;
                          var ctx = canvas.getContext("2d");
                          putBinaryImageData(ctx, img);
                          const imgData = canvas.toDataURL("image/jpeg", 1.0);

                          newDoc.addImage(imgData, "JPEG", 10, newDoc.lastAutoTable.finalY - 5);
                        }

                        //newDoc.output("save", "filename.pdf");
                        pdfs.push({ name: data.model, data: newDoc });

                        //render currently loading file name
                        if (index < files.length - 1) {
                          loader.setFileName(files[index + 1]);
                        }

                        //render files quantity progress
                        loader.setStage(index);

                        if (index === files.length - 1) {
                          onLastFileLoaded();
                          onFileClear();
                          pdfs.forEach((item) => {
                            //item.output("save", "filename.pdf");
                            //window.open(item.output("bloburl", "my.pdf"));

                            // const blob = item.output("bloburl");
                            // console.log(blob);

                            item.data.setProperties({
                              title: item.name || "unknown",
                              name: item.name || "unknown",
                            });
                            window.open(item.data.output("bloburl"));
                          });
                        }

                        readFile(index + 1);
                      });
                    }

                    getCurrentPage(i + 1);
                  });
              });
            }

            getCurrentPage(1);
          })
          .then(() => {})
          .catch((e) => {
            console.log("###ERROR ", e);

            //render currently loading file name
            if (index < files.length - 1) {
              loader.setFileName(files[index + 1]);
            }

            //render files quantity progress
            loader.setStage(index);

            if (index === files.length - 1) {
              onLastFileLoaded();
              onFileClear();
            }

            readFile(index + 1);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  }

  readFile(0);
}

////READ INPUT FILES
const readUrl = (input) => {
  if (input.files && input.files[0]) {
    readmultifiles(input, input.files);
  }
};

///FILE CHANGE HANDLER
const onFileChange = (e) => {
  readUrl(e.currentTarget);
};

////FILE DROP HANDLER
function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  const target = e.currentTarget;
  const input = target.querySelector("input");

  if (input.files && input.files[0]) {
    input.value = "";

    if (!/safari/i.test(navigator.userAgent)) {
      input.type = "";
      input.type = "file";
    }
  }

  input.files = files;
  readUrl(input);
}

////CLEAR ALL FIELDS HANDLER
function onFileClear(e) {
  const $input = $(".upload__label input");

  $input[0].value = "";

  if (!/safari/i.test(navigator.userAgent)) {
    $input[0].type = "";
    $input[0].type = "file";
  }

  quantityInputEventListeners.remove();

  resultLabel.hide();

  resultBlock.hide();

  $(".result__midea").hide();
  $(".result__another-excel-table table").empty();
  $(".result__midea-excel-table table").empty();

  // $(".result-block__radios button").attr("disabled", "true");
  // $(".result-block__radios button").first().removeClass("active");
  // $(".result-block__radios button").last().removeClass("active");
  // $(".result-info").hide();
  // $(".result-total-info").hide();
  // $(".result-block__accessories").hide();

  clearSeparateTable();
  clearTotalTable();
  ppd.clearResult();
  //$(".result-total table").html("");
  resetRefnetsCheckbox();
  resetControllers();

  // $(".upload__failed-files-block").hide();
  // $(".upload__failed-files").html("");

  totalSystems.reset();
}

////ALL EVENT LISTENERS
function addEventListeners($inputLabel, $result) {
  const input = $inputLabel.children("input")[0];
  const inputLabel = $inputLabel[0];
  //const fileClearBtn = $result.find(".upload__close")[0];

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.prevent, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    inputLabel.addEventListener(eventName, dropdownEvents.unhighlight, false);
  });

  inputLabel.addEventListener("drop", handleDrop, false);
  input.addEventListener("change", onFileChange);
  //fileClearBtn.addEventListener("click", onFileClear);
}

////ADD EVENT LISTENERS
uploads.forEach(function (upload) {
  const $inputLabel = $(upload).find(".upload__label");
  const $result = $(upload).find(".upload__result");

  if (!$(upload).hasClass("disabled")) {
    addEventListeners($inputLabel, $result);
  }
});
