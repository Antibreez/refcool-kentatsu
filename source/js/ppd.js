const PPD = [
  "DCM-BMS-01",
  "DCM-L1L2-DK",
  "WB-MAP-3E",
  "KCT-10",
  "Wiren Board 6",
];

let tableGroups = 1;
let lastCheckedIdx = null;
let colorNumber = 0;
const colors = ["hsl(240, 100%, 95%)", "hsl(350, 100%, 95%)"];

const $resultPpdOptions = $(".result-ppd__options");
const $makeGroupBtn = $("#make-ppd-group");
const $clearGroupBtn = $("#clear-ppd-group");
const $checkAllBtn = $("#ppd-check-all");
const $table = $(".result-ppd__table table");

function getColor() {
  colorNumber++;
  return colorNumber % 2 ? colors[0] : colors[1];
}

function renderOptions() {
  clearResult();

  const $rows = $(".result tr[data-units]");

  const $options = $("<div></div>");

  let addition = 0;

  $rows.each((idx, row) => {
    const units = +$(row).attr("data-units");
    const amount = +$(row).attr("data-amount");
    const title = $(row).find("td").eq(0).children().text();

    if (units > 1) {
      const currentColor = getColor();

      for (let i = 1; i <= units; i++) {
        $options.append(`
          <label
            class="group ${
              i === 1 ? "group-first" : i === units ? "group-last" : ""
            }"
            style="background-color: ${currentColor}"
            data-idx="${idx + addition + i}"
          >
            <input
              type="checkbox"
              data-amount="${amount}" data-idx="${idx + addition + i}"
            >
            <span>${title} ---- <b>${amount}</b> в/б</span>
          </label>
        `);
      }
      addition += units - 1;
    } else {
      $options.append(`
        <label
          data-idx="${idx + addition + 1}"
        >
          <input
            type="checkbox"
            data-amount="${amount}"
            data-idx="${idx + addition + 1}"
          >
          <span>${title} ---- <b>${amount}</b> в/б</span>
        </label>
      `);
    }
  });

  $resultPpdOptions.html($options.html());
  addEventListeners();
}

function onMultipleCheck(e) {
  if (e.shiftKey) {
    e.preventDefault();
    const $label = $(e.currentTarget);
    const currentIdx = +$label.attr("data-idx");

    if ($label.children("input").is(":checked")) return;

    const $block = $label.parent();

    if (lastCheckedIdx === null) {
      $block
        .find("input")
        .filter((idx, el) => {
          const id = +$(el).attr("data-idx");
          return id <= currentIdx;
        })
        .prop("checked", true);
    } else if (lastCheckedIdx < currentIdx) {
      $block
        .find("input")
        .filter((idx, el) => {
          const id = +$(el).attr("data-idx");
          return id <= currentIdx && id > lastCheckedIdx;
        })
        .prop("checked", true);
    } else if (lastCheckedIdx > currentIdx) {
      $block
        .find("input")
        .filter((idx, el) => {
          const id = +$(el).attr("data-idx");
          return id >= currentIdx && id < lastCheckedIdx;
        })
        .prop("checked", true);
    }

    // const $checkedLabel = $block.find("input:checked").first().parent();

    // if ($checkedLabel.length === 0) {
    //   $block
    //     .find("input")
    //     .filter((idx, el) => {
    //       const id = +$(el).attr("data-idx");
    //       return id <= currentIdx;
    //     })
    //     .prop("checked", true);
    // } else {
    //   const checkedIdx = +$checkedLabel.attr("data-idx");

    //   if (checkedIdx > currentIdx) {
    //     $block
    //       .find("input")
    //       .filter((idx, el) => {
    //         const id = +$(el).attr("data-idx");
    //         return id >= currentIdx && id < checkedIdx;
    //       })
    //       .prop("checked", true);
    //   }

    //   if (checkedIdx < currentIdx) {
    //     $block
    //       .find("input")
    //       .filter((idx, el) => {
    //         const id = +$(el).attr("data-idx");
    //         return id <= currentIdx && id > checkedIdx;
    //       })
    //       .prop("checked", true);
    //   }
    // }
  }
}

function onInputChange(e) {
  if (e.shiftKey) {
    e.preventDefault();
  } else {
    if ($(e.currentTarget).is(":checked")) {
      lastCheckedIdx = +$(e.currentTarget).attr("data-idx");
    }
  }
}

function addEventListeners() {
  const $labels = $($resultPpdOptions.find("label"));

  $labels.on("mousedown", onMultipleCheck);
  $labels.children("input").on("click", onInputChange);
}

function removeEventListeners() {
  const $labels = $($resultPpdOptions.find("label"));

  $labels.off("mousedown", onMultipleCheck);
  $labels.children("input").off("click", onInputChange);
}

function makeRow(title, item, amount) {
  return $(`
    <tr>
      <td><p>${title ? title : ""}</p></td>
      <td><p>${item}</p></td>
      <td><p></p></td>
      <td><p>${amount}</p></td>
    </tr>
  `);
}

function renderGroup(amounts) {
  const group = [];
  let groupAmount = 0;

  amounts.forEach((amount, idx) => {
    if (groupAmount + amount > 64) {
      group.push(groupAmount);
      groupAmount = amount;
      idx === amounts.length - 1 && group.push(groupAmount);
    } else {
      groupAmount += amount;
      idx === amounts.length - 1 && group.push(groupAmount);
    }
  });

  const systems = amounts.length;
  let controllers = 1;
  let extensions = 0;

  if (group.length > 1) {
    controllers = Math.floor(group.length / 2);
    extensions = controllers;
    group.length % 2 === 0 ? null : controllers++;
  }

  const $items = $("<div></div>");

  $items.append(makeRow("Группа " + tableGroups, PPD[0], controllers));

  if (extensions) {
    $items.append(makeRow(null, PPD[1], extensions));
  }

  $items.append(makeRow(null, PPD[2], systems));

  $items.append(makeRow(null, PPD[3], systems * 3));

  $items.append(makeRow(null, PPD[4], 1));

  if (tableGroups === 1) {
    $table.append("<tbody></tbody>").append($items.html());
  } else {
    $table.find("tbody").append($items.html());
  }

  tableGroups++;
}

function clearResult() {
  $table.html("");
  tableGroups = 1;
  lastCheckedIdx = null;
  removeEventListeners();
}

$makeGroupBtn.on("click", () => {
  const $inputs = $($resultPpdOptions.find("input:checkbox:checked"));

  if ($inputs.length === 0) return;

  const amounts = [];

  $inputs.each((idx, el) => {
    if ($(el).attr("disabled")) return;

    amounts.push(+$(el).attr("data-amount"));
    $(el).attr("disabled", true);
  });

  renderGroup(amounts);
});

$clearGroupBtn.on("click", () => {
  renderOptions();
});

$checkAllBtn.on("click", () => {
  const $inputs = $($resultPpdOptions.find("input"));
  $inputs.prop("checked", true);
});

const ppd = {
  renderOptions,
  clearResult,
};

export default ppd;
