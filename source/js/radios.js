const $separateRadio = $("#separate-radio");
const $totalRadio = $("#total-radio");
const $ppdRadio = $("#ppd-radio");
const $result = $(".result-info");
const $totalResult = $(".result-total-info");
const $ppdResult = $(".result-ppd");

const showResult = () => {
  $result.show();
  $totalResult.hide();
  $ppdResult.hide();

  $separateRadio.addClass("active");
  $totalRadio.removeClass("active");
  $ppdRadio.removeClass("active");
};

const showTotalResult = () => {
  $result.hide();
  $ppdResult.hide();
  $totalResult.show();

  $totalRadio.addClass("active");
  $separateRadio.removeClass("active");
  $ppdRadio.removeClass("active");
};

const showPpdResult = () => {
  $result.hide();
  $ppdResult.show();
  $totalResult.hide();

  $totalRadio.removeClass("active");
  $separateRadio.removeClass("active");
  $ppdRadio.addClass("active");
};

$separateRadio.on("click", () => {
  if ($(this).hasClass("active")) return;

  showResult();
});

$totalRadio.on("click", () => {
  if ($(this).hasClass("active")) return;
  showTotalResult();
});

$ppdRadio.on("click", () => {
  if ($(this).hasClass("active")) return;
  showPpdResult();
});
