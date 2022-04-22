import { makeTotalTable } from "./totalTable";
import ppd from "./ppd";

let focusedInputValue = 0;

////QUANTITY INPUT BLUR HANDLER
function onAmoutInputBlur(e) {
  const input = e.currentTarget;
  const multiplier = +input.value;

  if (multiplier !== focusedInputValue) {
    const $row = $(input).parents("tr").first();
    $row.attr("data-units", multiplier);

    const idx = +$row.attr("data-idx");

    const $rows = $row.nextAll(`tr[data-idx="${idx}"]`).addBack();

    $rows.each((index, item) => {
      const $cell = $(item).children().eq(3).children();
      const initAmout = +$(item).children().eq(5).children().text();

      $cell.text(initAmout * multiplier);
    });

    makeTotalTable();
    ppd.renderOptions();
  }
}

////QUANTITY INPUT FOCUS HANDLER
function onAmoutInputFocus(e) {
  const input = e.currentTarget;
  focusedInputValue = +input.value;
  $(input).select();
}

function onEnterPress(e) {
  if (e.which == 13) {
    $(e.currentTarget).trigger("blur");
  }
}

const QuantityInputEventListeners = {
  add: () => {
    $(".result input").on("blur", onAmoutInputBlur);
    $(".result input").on("focus", onAmoutInputFocus);
    $(".result input").on("keypress", onEnterPress);
  },
  remove: () => {
    $(".result input").off("blur", onAmoutInputBlur);
    $(".result input").off("focus", onAmoutInputFocus);
    $(".result input").off("keypress", onEnterPress);
  },
};

// $(document).on("keypress", (e) => {
//   const $target = $(e.target);

//   if (e.which == 13) {
//     console.log($target);
//   }
// });

export default QuantityInputEventListeners;
