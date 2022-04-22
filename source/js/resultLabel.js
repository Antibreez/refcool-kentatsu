function show() {
  $(".upload__result").show();
}

function hide() {
  $(".upload__result").hide();

  $(".upload__failed-files-block").hide();
  $(".upload__failed-files").html("");
}

function addFailedFilename(name) {
  $(".upload__failed-files-block").show();
  $(".upload__failed-files").append(
    `<div class='upload__failed-files-item' data-new><span>${name}</span></div>`
  );
}

function resetNewFailedFileStatus() {
  $(".upload__failed-files div").removeAttr("data-new");
}

export const resultLabel = {
  show,
  hide,
  addFailedFilename,
  resetNewFailedFileStatus,
};
