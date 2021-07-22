let reDirect = (url) => {
  window.location.href = url;
};
let DSAS = "DontShowAtStartup";
if(!localStorage.getItem(DSAS)) localStorage.setItem(DSAS, 0);
let DSAS_OFF = () => localStorage.setItem(DSAS, 0);

let animationElements = document.querySelectorAll(".anim");
let checkNumber = (elem) => {
  elem.value = elem.value.replace(/[^0-9,.]/g, "");
};
if (animationElements.length > 0) {
  animationElements.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      item.setAttribute("disabled", "true");
      item.classList.add(item.getAttribute("data-anim"));
    });
  });
}

let selectItem = document.querySelectorAll(".selectItem");
let selectValid = (element) => {
  if (element.value != 0) {
    element.classList.add("select-enabled");
  }
};

if (selectItem.length > 0) {
  selectItem.forEach((item) => {
    selectValid(item);
  });
}

let displaySolution = (dataArr, methodThis, xVal, dVal) => {
  let mainElement = document.getElementById("mainOutput");
  let methodName = "";
  if (methodThis == 1) methodName = "Newton Forward Method";
  else if (methodThis == 2) methodName = "Newton Backward Method";
  let dpOP = `<h3 class="border-bottom b-dash">${methodName} :</h3>
                <br />`;
  dpOP += `
  <div class="opContainer">
    <div class="opRow">
      <div class="opCol">
        <p class="sm-title"><strong>X </strong></p>
  `;
  xVal.forEach(
    (item) =>
      (dpOP += `
        <p class="item-placeholder">${item.toFixed(4)}</p>
        `)
  );
  dpOP += `
      </div>
  `;
  let deltaFxCount = 0;
  dataArr[0].forEach((item) => {
    dpOP += `
      <div class="opCol">
        <p class="sm-title"><strong>
      `;
    if (deltaFxCount >= 2) dpOP += `Δ<sup>${deltaFxCount}</sup>f(x)`;
    else if (deltaFxCount == 1) dpOP += `Δf(x)`;
    else dpOP += `Y`;
    dpOP += `
        </strong></p>
      `;
    /*for (let localCountD = deltaFxCount; localCountD != 0; localCountD--) {
      dpOP += `
            <p style="color: transparent; opacity: 0;">.</p>
        `;
        let fll = 2.50523;
        fll.toFixed(4).replace(/\.0+$/,''); // 2.5
    }*/
    item.forEach((item_i) => {
      dpOP += `
            <p class="item-placeholder">${item_i.toFixed(4)}</p>
        `;
    });
    dpOP += `
      </div>
      `;
    deltaFxCount++;
  });
  dpOP += `   
      <br />
    </div>
  </div>
  `;
  dpOP += `
  <div class="opContainer">
    <div class="opRow">
      <div class="opCol">
        <p>
          So, <strong>U</strong>
          = (x-x<sub>n</sub>)/h = (${dVal} - ${deltaFxCount - 1})/1
          <strong> = ${dataArr[1]}</strong> 
        </p>
      </div>
      <div class="opCol border-bottom b-dot">
        <p>
          <strong> ∴ f(x) =
          ${dataArr[2].toFixed(6).replace(/\.0+$/,'')}</strong>
        </p>
      </div>
      <div class="opCol">
        <p>
          or,<strong> f(x) =
          ${dataArr[2].toFixed(6).replace(/\.0+$/,'')}</strong>
        </p>
      </div>
    </div>
  </div>
  <br />
  `;
  mainElement.innerHTML = dpOP;
};

let sendData = (xVal, yVal, dVal, calcMethod) => {
  let send_x_val = new Array();
  let send_y_val = new Array();
  xVal.forEach((item, count) => (send_x_val[count] = parseFloat(item)));
  yVal.forEach((item, count) => (send_y_val[count] = parseFloat(item)));
  dVal = parseFloat(dVal);
  if (calcMethod == 1)
    displaySolution(
      Newton_interpolation_forward(send_x_val, send_y_val, dVal),
      calcMethod,
      send_x_val,
      dVal
    );
  else if (calcMethod == 2)
    displaySolution(
      Newton_interpolation_backward(send_x_val, send_y_val, dVal),
      calcMethod,
      send_x_val,
      dVal
    );
  else alert("Please Select the proper Method");
};
