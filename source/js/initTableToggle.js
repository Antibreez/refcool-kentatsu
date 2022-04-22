const $btn = $(".result__another-excel-table button");
const $block = $btn.next();

$btn.on("click", function () {
  $block.slideToggle();
  $(this).toggleClass("opened");
});
