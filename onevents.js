import { showToast } from "https://surajit-singha-sisir.github.io/mastorsCDN/JS/showtoast.js";

document.addEventListener("DOMContentLoaded", () => {
  let rowCounter = 1;
  function inputTable() {
    const grillInputBox = document.getElementById("grillInputBox");

    // ADD BUTTON CLICKED
    grillInputBox.addEventListener("click", (event) => {
      if (event.target.id === "addGrillItem") {
        const getWidth = document.getElementById("grillWidthInput").value;
        const getHeight = document.getElementById("grillHeightInput").value;

        if (getWidth && getHeight) {
          let table1 = document.querySelector(".getUserTable");
          let tbody = table1.querySelector("tbody");

          let widthDecimal, width, heightDecimal, height;
          const wDecimals = getWidth.toString().split(".");
          const hDecimals = getHeight.toString().split(".");

          if (wDecimals[1]) {
            widthDecimal =
              parseFloat(wDecimals[1]) / 12 + parseFloat(wDecimals[0]);
            width = widthDecimal.toFixed(2);
          } else {
            widthDecimal = getWidth;
            width = getWidth;
          }

          if (hDecimals[1]) {
            heightDecimal =
              parseFloat(hDecimals[1]) / 12 + parseFloat(hDecimals[0]);
            height = heightDecimal.toFixed(2);
          } else {
            heightDecimal = getHeight;
            height = getHeight;
          }

          const row = `
            <tr class="inputTrs-${rowCounter}">
                <td class="inputWidth oninput="validDecimal(this)">${getWidth}</td>
                <td class="actualWidth" title="Decimal Result : ${widthDecimal}">${width}</td>
                <td class="inputHeight oninput="validDecimal(this)">${getHeight}</td>
                <td class="actualHeight" title="Decimal Result : ${heightDecimal}">${height}</td>
                <td class="deletedAction"><i class="m-trash btn btn-error"></i></td>
            </tr>
            `;
          tbody.insertAdjacentHTML("beforeend", row);
          //   EMPTY INPUT BOX
          document.getElementById("grillWidthInput").value = "";
          document.getElementById("grillHeightInput").value = "";
          showToast("New Data Added");

          table2(width, height, rowCounter);

          deletedAction(tbody);
          checkTbody(tbody);
          rowCounter++;
        }
      }
    });

    function table2(width, height, rowCounter) {
      const table2 = document.querySelector(".table2");
      const tbody = table2.querySelector("tbody");

      let area = (width * height).toFixed(2);
      const perimeter = (2 * width + 2 * height).toFixed(2);
      let frameLength = (0.41 * perimeter).toFixed(2);

      const row = `
      <tr class="inputTrs-${rowCounter}">
        <td class="uppercase code">SWL-${rowCounter}</td>
        <td class="width">${width}</td>
        <td class="height">${height}</td>
        <td class="area">${area}</td>
        <td class="perimeter">${perimeter}</td>
        <td class="frame-length">${frameLength}</td>
        <td id="quantity" class="quantity contenteditable" contenteditable="true" oninput="validDecimal(this)">
        </td>
        <td class="total-frame-length"></td>
        <td class="total-glass"></td>
       </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
      quantity(tbody);
    }
  }
  function deletedAction(tbody) {
    // DELETE FUNCTIONALITIES
    tbody.addEventListener("click", (event) => {
      if (event.target.classList.contains("m-trash")) {
        const row = event.target.closest("tr");

        if (row) {
          row.remove();
          const row2s = document.querySelectorAll(".table2 tbody tr");
          row2s.forEach((row2) => {
            if (row.className === row2.className) {
              row2.remove();
              showToast("Row has been removed", "warning");
            }
          });
        }
      }
    });
  }

  function quantity(tbody) {
    tbody.addEventListener("click", (event) => {
      if (event.target.classList.contains("quantity")) {
        const quantity = event.target;

        quantity.addEventListener("blur", () => {
          if (quantity.textContent.trim() !== "") {
            let totalFrame = quantity.nextElementSibling;
            let totalGlass = totalFrame.nextElementSibling;
            const frameLength = quantity.previousElementSibling;
            const perimeter = frameLength.previousElementSibling;
            const area = perimeter.previousElementSibling;

            totalFrame.innerHTML =
              Math.round(
                parseInt(quantity.textContent, 10) *
                  parseFloat(frameLength.textContent)
              ) + " ft";

            totalGlass.innerHTML =
              Math.round(
                parseInt(quantity.textContent, 10) *
                  parseFloat(area.textContent)
              ) + " SFT";
          }
        });
      }
    });
    return {};
  }

  function checkTbody(tbody) {
    const table1 = tbody.closest("table");
    const table2 = document.querySelector(".table2");

    if (table1.classList.contains("hide")) {
      table1.classList.remove("hide");
      table2.classList.remove("hide");
    }

    tbody.addEventListener("click", () => {
      if (tbody.textContent.trim() === "") {
        table1.classList.add("hide");
        table2.classList.add("hide");
        setTimeout(() => {
          showToast("There is no data to Calculate", "error");
        }, 1000);
      } else {
        table1.classList.remove("hide");
        table2.classList.remove("hide");
      }
    });
  }

  inputTable();
});
