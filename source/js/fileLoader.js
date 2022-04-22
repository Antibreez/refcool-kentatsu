const $loader = $(".loader");
const $loaderBar = $loader.find(".loader__bar");
const $loaderCountCurrent = $loader.find(".loader__count-current");
const $loaderCountMax = $loader.find(".loader__count-max");
const $loaderCurrentName = $loader.find(".loader__filename span");

////LOADER INSTANCES
export function add(files) {
  for (let i = 0; i < files.length; i++) {
    $loaderBar.append($("<div></div>"));
  }
  $loaderCountCurrent.text(0);
  $loaderCountMax.text(files.length);
  setFileName(files[0]);
  $loader.addClass("shown");
}

export function setFileName(file) {
  $loaderCurrentName.text(file.name);
}

export function setStage(num) {
  $loaderBar.find("div").eq(num).addClass("active");
  $loaderCountCurrent.text(num + 1);
}

export function remove() {
  $loader.removeClass("shown");
  $loaderBar.html("");
  $loaderCountCurrent.text("");
  $loaderCountMax.text("");
  $loaderCurrentName.text("");
}

export const loader = {
  add,
  setFileName,
  setStage,
  remove,
};
