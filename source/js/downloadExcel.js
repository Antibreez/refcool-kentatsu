$("#button").on("click", function () {
  $(".result table").table2excel({
    name: "table",
  });
});

$("#button-total").on("click", function () {
  $(".result-total table").table2excel({
    name: "table",
  });
});

$("#button-ppd").on("click", function () {
  $(".result-ppd table").table2excel({
    name: "table",
  });
});

$("#button-midea").on("click", function () {
  $(".result__midea-excel-table table").table2excel({
    name: "table",
  });
});
