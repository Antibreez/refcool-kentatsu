const $modal = $("#error-modal");
const $blackout = $modal.find(".modal__blackout");
const $closeBtn = $modal.find(".modal__button");
const $failedFileBlock = $modal.find(".modal__failed-files");
const $failedFileList = $(".upload__failed-files");

$blackout.on("click", (e) => {
  const $target = $(e.target);

  if (
    $target.parents(".modal__content").length === 0 &&
    !$target.hasClass(".modal__content")
  ) {
    hide();
  }
});

$closeBtn.on("click", () => {
  hide();
});

function isNeededToShow() {
  return $failedFileList.find("div[data-new]").length > 0;
}

function show() {
  $failedFileBlock.html("");

  $failedFileList.find("div[data-new] span").each((index, item) => {
    const text = $(item).text();
    const $newItem = $(`<div class="modal__failed-files-item">${text}</div>`);
    $failedFileBlock.append($newItem);
  });

  $("body").addClass("js-no-scroll");
  $modal.addClass("shown");
}

function hide() {
  $("body").removeClass("js-no-scroll");
  $modal.removeClass("shown");
}

function addFilename(name) {}

export const modal = {
  show,
  hide,
  isNeededToShow,
};
