const $radioBtn = $(".result-block__radios button");
const $resultInfo = $(".result-info");
const $resultTotalInfo = $(".result-total-info");
const $ppdResult = $(".result-ppd");
const $accessories = $(".result-block__accessories");

function show() {
  $radioBtn.removeAttr("disabled");
  $radioBtn.removeClass("active");
  $radioBtn.first().addClass("active");
  $resultInfo.show();
  $resultTotalInfo.hide();
  $ppdResult.hide();
  $accessories.show();
}

function hide() {
  $radioBtn.attr("disabled", "true");
  $radioBtn.removeClass("active");
  $resultInfo.hide();
  $resultTotalInfo.hide();
  $ppdResult.hide();
  $accessories.hide();
}

export const resultBlock = {
  show,
  hide,
};
