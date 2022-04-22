function prevent(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  e.currentTarget.classList.add("highlight");
}

function unhighlight(e) {
  e.currentTarget.classList.remove("highlight");
}

export const dropdownEvents = {
  prevent,
  highlight,
  unhighlight,
};
