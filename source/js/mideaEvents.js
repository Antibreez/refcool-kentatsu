import { MIDEA_PANELS, MIDEA_OUTDOOR_JOINTS, MIDEA_INDOORS } from "./midea_data";
import { INDOORS } from "./midea";

let focusAmount = 0;

function onAmountFocus() {
  focusAmount = +$(this).val();
  $(this).trigger("select");
}

function onEnterPress(e) {
  if (e.which == 13) {
    $(e.currentTarget).trigger("blur");
  }
}

function getOneTypeRows($outdoorRow, name) {
  return $outdoorRow
    .nextAll(`tr[data-type="${name}"]`)
    .first()
    .nextUntil(function () {
      return $(this).attr("data-type") !== name;
    })
    .addBack();
}

function recalcPanels($outdoorRow, panels) {
  const $panelRows = getOneTypeRows($outdoorRow, "panel");

  $panelRows.each((idx, row) => {
    const name = $(row).find("[data-type='name']").text();
    const $amount = $(row).find("[data-type='amount']");

    const amount = panels[name];

    if (amount) {
      $amount.text(amount);
      $(row).removeClass("noExl");
      $(row).removeAttr("style");
    } else {
      $(row).addClass("noExl");
      $(row).css("display", "none");
    }
  });
}

function replaceOutdoorJoints($outdoorRow, outdoorJoints) {
  const $outdoorJointRow = getOneTypeRows($outdoorRow, "outdoorJoint");

  $outdoorJointRow.each((idx, row) => {
    const name = $(row).find("[data-type='name']").text();
    const $amount = $(row).find("[data-type='amount']");

    const amount = outdoorJoints[name];

    if (amount) {
      $amount.text(amount);
      $(row).removeClass("noExl");
      $(row).removeAttr("style");
    } else {
      $(row).addClass("noExl");
      $(row).css("display", "none");
    }
  });
}

function recalcCotrollers($outdoorRow, amount) {
  const $controllerRows = getOneTypeRows($outdoorRow, "controller");

  $controllerRows.each((idx, row) => {
    $(row).find('[data-type="amount"]').text(amount);

    if (idx > 0) {
      $(row).find('[dat-type="amount"]').text(0);
    }
  });
}

function onAmountBlur() {
  if ($(this).val() !== focusAmount) {
    const $row = $(this).parents("tr").first();
    const $outdoorRow = $row
      .prevAll('[data-type="outdoor"]')
      .first()
      .prevUntil(function () {
        return $(this).attr("data-type") !== "outdoor";
      })
      .addBack()
      .first();

    //const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
    //const $amountCell = $outdoorRow.find(".ODUstatus span:first-child b");
    const $loadAlarmCell = $outdoorRow.find(".maxLoadExceed b");
    const $indoorsAlarmCell = $outdoorRow.find(".maxIndoorsExceed b");

    const systemAmount = +$row.attr("data-systems");
    const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
    const maxIDU = +$outdoorRow.attr("data-outdoor-maxamount");

    let totalIndex = 0;
    let totalAmount = 0;
    const panels = {};

    MIDEA_PANELS.forEach((panel) => {
      panels[panel] = 0;
    });

    $(this)
      .parent()
      .prev('[data-type="amount"]')
      .text($(this).val() * systemAmount);

    const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

    $indoorRows.each((idx, row) => {
      const amount = +$(row).children('[data-type="amount"]').text();
      totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);
      totalAmount += amount / systemAmount;

      const panel = $(row).attr("data-indoor-panel");

      if (panel) panels[panel] += amount;
    });

    $outdoorRow.attr("data-total-indx", totalIndex);
    $outdoorRow.attr("data-total-amount", totalAmount);

    const newLoad = Math.round((totalIndex / maxIndx) * 130);
    $loadAlarmCell.text(`Загрузка ${newLoad}%`);
    //$loadCell.text(`${newLoad}%`);
    if (totalIndex > maxIndx) {
      $outdoorRow.addClass("maxLoadExceed");
      //$loadCell.parent().addClass("alarm");
    } else {
      //$loadCell.parent().removeClass("alarm");
      $outdoorRow.removeClass("maxLoadExceed");
    }

    //$amountCell.text(`${totalAmount} / ${maxIDU}`);
    if (totalAmount > maxIDU) {
      //$amountCell.parent().addClass("alarm");
      $outdoorRow.addClass("maxIndoorsExceed");
      $indoorsAlarmCell.text(`Макс. ВБ ${totalAmount}/${maxIDU}`);
    } else {
      //$amountCell.parent().removeClass("alarm");
      $outdoorRow.removeClass("maxIndoorsExceed");
      $indoorsAlarmCell.text(``);
    }

    recalcPanels($outdoorRow, panels);

    recalcCotrollers($outdoorRow, totalAmount * systemAmount);
  }
}

function onIndoorChange() {
  const $row = $(this).parents("tr").first();
  const $outdoorRow = $row
    .prevAll('[data-type="outdoor"]')
    .first()
    .prevUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .addBack()
    .first();

  //const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
  const $loadAlarmCell = $outdoorRow.find(".maxLoadExceed b");

  const systemAmount = +$row.attr("data-systems");
  const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
  let totalIndex = 0;
  const panels = {};

  MIDEA_PANELS.forEach((panel) => {
    panels[panel] = 0;
  });

  const $nameCell = $(this).parents("td").siblings('[data-type="name"]');
  $nameCell.text($(this).val());
  $row.attr("data-indoor-indx", $("option:selected", this).attr("data-indoor-indx"));
  $row.attr("data-indoor-type", $("option:selected", this).attr("data-indoor-type"));
  const panelAttr = $("option:selected", this).attr("data-indoor-panel");
  const indoorType = $row.attr("data-indoor-type");
  const indoorInitType = $row.attr("data-indoor-init-type");
  const indoorIndx = +$row.attr("data-indoor-indx");
  const indoorInitIndx = +$row.attr("data-indoor-init-indx");

  if (panelAttr) {
    $row.attr("data-indoor-panel", panelAttr);
  } else {
    $row.removeAttr("data-indoor-panel");
  }

  indoorType !== indoorInitType ? $row.addClass("wrongType") : $row.removeClass("wrongType");
  indoorIndx > indoorInitIndx ? $row.addClass("overload") : $row.removeClass("overload");
  indoorIndx < indoorInitIndx ? $row.addClass("underload") : $row.removeClass("underload");

  const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

  $indoorRows.each((idx, row) => {
    const amount = +$(row).children('[data-type="amount"]').text();
    totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);

    const panel = $(row).attr("data-indoor-panel");

    if (panel) panels[panel] += amount;
  });

  const newLoad = Math.round((totalIndex / maxIndx) * 130);

  $loadAlarmCell.text(`Загрузка ${newLoad}%`);
  //$loadCell.text(`${newLoad}%`);
  if (totalIndex > maxIndx) {
    //$loadCell.parent().addClass("alarm");
    $outdoorRow.addClass("maxLoadExceed");
  } else {
    //$loadCell.parent().removeClass("alarm");
    $outdoorRow.removeClass("maxLoadExceed");
  }

  recalcPanels($outdoorRow, panels);

  // const $panelRows = getOneTypeRows($outdoorRow, "panel");

  // $panelRows.each((idx, row) => {
  //   const name = $(row).find("[data-type='name']").text();
  //   const $amount = $(row).find("[data-type='amount']");

  //   const amount = panels[name];

  //   if (amount) {
  //     $amount.text(amount);
  //     $(row).removeClass("noExl");
  //     $(row).removeAttr("style");
  //   } else {
  //     $(row).addClass("noExl");
  //     $(row).css("display", "none");
  //   }
  // });
}

function onOutdoorChange() {
  const $outdoorRow = $(this).parents("tr").first();
  $outdoorRow
    .nextUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .each((idx, item) => {
      $(item).remove();
    });

  const systemAmount = +$outdoorRow.attr("data-systems");
  const modules = $(this).val().split(",");
  const outdoorJoint = $("option:selected", this).attr("data-outdoor-joint");

  const combinedModules = {};

  modules.forEach((module) => {
    if (!combinedModules[module]) {
      combinedModules[module] = systemAmount;
    } else {
      combinedModules[module] += systemAmount;
    }
  });

  const prevOutdoorType = $outdoorRow.attr("data-outdoor-type");

  const $nameCell = $(this).parents("td").siblings('[data-type="name"]');
  const $amountCell = $(this).parents("td").siblings('[data-type="amount"]');
  const newMaxIndx = $("option:selected", this).attr("data-outdoor-maxindx");
  const newMaxAmount = $("option:selected", this).attr("data-outdoor-amount");
  const newOutdoorType = $("option:selected", this).attr("data-outdoor-type");

  Object.keys(combinedModules).forEach((key, idx) => {
    if (idx === 0) {
      $nameCell.text(key);
      $amountCell.text(combinedModules[key]);
      $outdoorRow.attr("data-outdoor-maxindx", newMaxIndx);
      $outdoorRow.attr("data-outdoor-maxamount", newMaxAmount);
      $outdoorRow.attr("data-outdoor-fullname", $("option:selected", this).attr("data-outdoor-fullname"));
      $outdoorRow.attr("data-outdoor-type", newOutdoorType);
    } else {
      const $newRow = $outdoorRow.clone(false, false);
      $newRow.find("td.select").empty();
      $newRow.find("td").first().empty();
      $newRow.find("td.status").empty();
      $newRow.find("td.oldName").empty();
      $newRow.find('[data-type="name"]').text(key);
      $newRow.find('[data-type="amount"]').text(combinedModules[key]);
      $outdoorRow.after($newRow);
    }
  });

  const outdoorJoints = {};

  MIDEA_OUTDOOR_JOINTS.forEach((outdoorJoint) => {
    outdoorJoints[outdoorJoint] = 0;
  });

  outdoorJoints[outdoorJoint] = systemAmount;

  replaceOutdoorJoints($outdoorRow, outdoorJoints);

  let totalIndx = +$outdoorRow.attr("data-total-indx");
  let totalAmount = +$outdoorRow.attr("data-total-amount");

  if (newOutdoorType === "atom" && prevOutdoorType !== "atom") {
    let totalIndx = 0;
    const panels = {};

    MIDEA_PANELS.forEach((panel) => {
      panels[panel] = 0;
    });

    const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

    $indoorRows.each((idx, row) => {
      const initName = $(row).attr("data-indoor-init-name");
      const unit = INDOORS.atom[initName].unit;
      console.log(unit.name);
      $(row).children('[data-type="name"]').text(unit.name);
      $(row).attr("data-indoor-indx", unit.indx);
      $(row).attr("data-indoor-type", unit.type);

      const $selectInner = $(row).find(".select-indoor");
      const $selectInnerEl = $("<div></div>");
      $selectInner.empty();

      const indoors = MIDEA_INDOORS.atom;

      Object.keys(indoors).forEach((key) => {
        const $group = $(`<optgroup label='${indoors[key].title}'></optgroup>`);
        const units = indoors[key].units;
        Object.keys(units).forEach((elKey) => {
          const $option = $(`
            <option
              value='${units[elKey].name}' ${units[elKey].name === unit.name ? "selected" : ""}
              data-indoor-indx='${units[elKey].indx}'
              data-indoor-type='${units[elKey].type}'
            >${units[elKey].name}</option>
          `);

          units[elKey].panel && $option.attr("data-indoor-panel", units[elKey].panel);
          $group.append($option);
        });
        $selectInnerEl.append($group);
      });

      $selectInner.append($selectInnerEl.html());

      const amount = +$(row).children('[data-type="amount"]').text();
      totalIndx += +$(row).attr("data-indoor-indx") * (amount / systemAmount);

      const panel = $(row).attr("data-indoor-panel");

      if (panel) panels[panel] += amount;
    });

    recalcPanels($outdoorRow, panels);
  }

  if (newOutdoorType !== "atom" && prevOutdoorType === "atom") {
    let totalIndx = 0;
    const panels = {};

    MIDEA_PANELS.forEach((panel) => {
      panels[panel] = 0;
    });

    const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

    $indoorRows.each((idx, row) => {
      const initName = $(row).attr("data-indoor-init-name");
      const unit = INDOORS.general[initName].unit;
      $(row).children('[data-type="name"]').text(unit.name);
      $(row).attr("data-indoor-indx", unit.indx);
      $(row).attr("data-indoor-type", unit.type);

      const $selectInner = $(row).find(".select-indoor");
      const $selectInnerEl = $("<div></div>");
      $selectInner.empty();

      const indoors = MIDEA_INDOORS.general;

      Object.keys(indoors).forEach((key) => {
        const $group = $(`<optgroup label='${indoors[key].title}'></optgroup>`);
        const units = indoors[key].units;
        Object.keys(units).forEach((elKey) => {
          const $option = $(`
            <option
              value='${units[elKey].name}' ${units[elKey].name === unit.name ? "selected" : ""}
              data-indoor-indx='${units[elKey].indx}'
              data-indoor-type='${units[elKey].type}'
            >${units[elKey].name}</option>
          `);

          units[elKey].panel && $option.attr("data-indoor-panel", units[elKey].panel);
          $group.append($option);
        });
        $selectInnerEl.append($group);
      });

      $selectInner.append($selectInnerEl.html());

      const amount = +$(row).children('[data-type="amount"]').text();
      totalIndx += +$(row).attr("data-indoor-indx") * (amount / systemAmount);

      const panel = $(row).attr("data-indoor-panel");

      if (panel) panels[panel] += amount;
    });

    recalcPanels($outdoorRow, panels);
  }

  const load = Math.round((totalIndx / newMaxIndx) * 130);
  $outdoorRow.find(".maxLoadExceed b").text(`Загрузка ${load}%`);

  if (totalIndx > newMaxIndx) {
    $outdoorRow.addClass("maxLoadExceed");
  } else {
    $outdoorRow.removeClass("maxLoadExceed");
  }

  const amount = `${totalAmount}/${newMaxAmount}`;
  $outdoorRow.find(".maxIndoorsExceed b").text(`Макс. ВБ ${amount}`);

  if (totalAmount > newMaxAmount) {
    $outdoorRow.addClass("maxIndoorsExceed");
  } else {
    $outdoorRow.removeClass("maxIndoorsExceed");
  }
}

function onControllersChange(e) {
  const $target = $(e.currentTarget);
  const $name = $target.parents("td").siblings('td[data-type="name"]').first();
  $name.text($target.val());
}

function onAddNewRow() {
  const $row = $(this).parents("tr").first();
  const $newRow = $row.clone(true);

  const $delBtn = $(`<button>Удалить</button>`);
  $delBtn.on("click", onRemoveRow);

  $newRow.find("td.oldName").text("");
  $newRow.find("td.add-delete-block").empty();
  $newRow.find("td.add-delete-block").append($delBtn);
  $row.after($newRow);

  const $outdoorRow = $row
    .prevAll('[data-type="outdoor"]')
    .first()
    .prevUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .addBack()
    .first();

  const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
  const $amountCell = $outdoorRow.find(".ODUstatus span:first-child b");

  const systemAmount = +$row.attr("data-systems");
  const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
  const maxIDU = +$outdoorRow.attr("data-outdoor-maxamount");

  let totalIndex = 0;
  let totalAmount = 0;
  const panels = {};

  MIDEA_PANELS.forEach((panel) => {
    panels[panel] = 0;
  });

  const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

  $indoorRows.each((idx, row) => {
    const amount = +$(row).children('[data-type="amount"]').text();
    totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);
    totalAmount += amount / systemAmount;

    const panel = $(row).attr("data-indoor-panel");

    if (panel) panels[panel] += amount;
  });

  const newLoad = Math.round((totalIndex / maxIndx) * 130);
  $loadCell.text(`${newLoad}%`);
  if (totalIndex > maxIndx) {
    $loadCell.parent().addClass("alarm");
  } else {
    $loadCell.parent().removeClass("alarm");
  }

  $amountCell.text(`${totalAmount} / ${maxIDU}`);
  if (totalAmount > maxIDU) {
    $amountCell.parent().addClass("alarm");
  } else {
    $amountCell.parent().removeClass("alarm");
  }

  recalcPanels($outdoorRow, panels);
  recalcCotrollers($outdoorRow, totalAmount * systemAmount);
}

function onRemoveRow() {
  const $row = $(this).parents("tr").first();

  const $outdoorRow = $row
    .prevAll('[data-type="outdoor"]')
    .first()
    .prevUntil(function () {
      return $(this).attr("data-type") !== "outdoor";
    })
    .addBack()
    .first();

  $row.empty();
  $row.remove();

  const $loadCell = $outdoorRow.find(".ODUstatus span:last-child b");
  const $amountCell = $outdoorRow.find(".ODUstatus span:first-child b");

  const systemAmount = +$row.attr("data-systems");
  const maxIndx = +$outdoorRow.attr("data-outdoor-maxindx");
  const maxIDU = +$outdoorRow.attr("data-outdoor-maxamount");

  let totalIndex = 0;
  let totalAmount = 0;
  const panels = {};

  MIDEA_PANELS.forEach((panel) => {
    panels[panel] = 0;
  });

  const $indoorRows = getOneTypeRows($outdoorRow, "indoor");

  $indoorRows.each((idx, row) => {
    const amount = +$(row).children('[data-type="amount"]').text();
    totalIndex += +$(row).attr("data-indoor-indx") * (amount / systemAmount);
    totalAmount += amount / systemAmount;

    const panel = $(row).attr("data-indoor-panel");

    if (panel) panels[panel] += amount;
  });

  const newLoad = Math.round((totalIndex / maxIndx) * 130);
  $loadCell.text(`${newLoad}%`);
  if (totalIndex > maxIndx) {
    $loadCell.parent().addClass("alarm");
  } else {
    $loadCell.parent().removeClass("alarm");
  }

  $amountCell.text(`${totalAmount} / ${maxIDU}`);
  if (totalAmount > maxIDU) {
    $amountCell.parent().addClass("alarm");
  } else {
    $amountCell.parent().removeClass("alarm");
  }

  recalcPanels($outdoorRow, panels);
  recalcCotrollers($outdoorRow, totalAmount * systemAmount);
}

function addEventListeners() {
  const $selectIndoor = $(".result__midea-excel-table table .select-indoor");
  const $selectOutdoor = $(".result__midea-excel-table table .select-outdoor");
  const $selectController = $(".result__midea-excel-table table .select-controller");
  const $amountInput = $(".result__midea-excel-table table .input-amount");
  const $addBtn = $(".result__midea-excel-table table .add-new");

  $selectIndoor.on("change", onIndoorChange);
  $amountInput.on("focus", onAmountFocus);
  $selectController.on("change", onControllersChange);
  $amountInput.on("blur", onAmountBlur);
  $amountInput.on("keypress", onEnterPress);
  $selectOutdoor.on("change", onOutdoorChange);
  $addBtn.on("click", onAddNewRow);
}

const mideaEvents = {
  add: addEventListeners,
};

export default mideaEvents;
