const EQUIPMENT_GROUPS = {
  rx: 1,
  re: 1,
  rw: 1,
  er: 1,
  ry: 1,
  bs: 2,
  bp: 2,
  fx: 3,
  va: 4,
  vk: 4,
  kh: 5,
  dr: 5,
};

////CHANGE ROW OF DETAILED TABLE FOR TOTAL TABLE
function formatTotalRow($row) {
  const $td = $row.find("td");
  $td.eq(0).children().text("");
  $td.eq(4).remove();
  $td.eq(5).remove();

  let sortId =
    +EQUIPMENT_GROUPS[$td.eq(1).children().text().slice(0, 2).toLowerCase()];
  sortId = sortId ? sortId : 100;

  $row.attr("data-sort", sortId);

  return $row;
}

////MAKET TOTAL TABLE FROM DETAILED TABLE
export function makeTotalTable() {
  const $tableRows = $(".result table tr");

  if ($tableRows.length === 0) return;

  const $newTable = $("<table></table>");

  $tableRows.each((index, item) => {
    if (index === 0) {
      $newTable.append(formatTotalRow($(item).clone(false)));
      return;
    }

    let haveSameItems = false;

    const title = $(item).find("td").eq(1).children().text();
    const $amount = $(item).find("td").eq(3).children();
    const amount = +$amount.text();

    for (let i = 0; i < $newTable.find("tr").length; i++) {
      const $currentRow = $newTable.find("tr").eq(i);
      const currentTitle = $currentRow.find("td").eq(1).children().text();
      const $currentAmount = $currentRow.find("td").eq(3).children();
      const currentAmount = +$currentAmount.text();

      if (title === currentTitle) {
        $currentAmount.text(currentAmount + amount);
        haveSameItems = true;
      }
    }

    !haveSameItems && $newTable.append(formatTotalRow($(item).clone(false)));
  });

  const $newRows = $newTable.find("tr");

  let sortedRows = Array.from($newRows);

  sortedRows.sort((row1, row2) => {
    return +$(row1).attr("data-sort") > +$(row2).attr("data-sort") ? 1 : -1;
  });

  $newTable.html(sortedRows);

  $(".result-total").html($newTable);
}

export function clearTotalTable() {
  $(".result-total table").html("");
}
