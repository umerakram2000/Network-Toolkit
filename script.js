function showTool(toolId) {
  document.querySelectorAll(".tool").forEach(t => {
    t.classList.remove("active");
  });
  document.getElementById(toolId).classList.add("active");
}

/* DARK MODE */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* SUBNET CALCULATOR */
function calcSubnet() {
  let prefix = parseInt(document.getElementById("prefix").value);

  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    document.getElementById("subnetResult").innerHTML = "Invalid prefix";
    return;
  }

  let hosts = Math.pow(2, 32 - prefix) - 2;

  document.getElementById("subnetResult").innerHTML =
    "Usable Hosts: " + hosts;
}

/* dBm to mW */
function convertDbm() {
  let dbm = parseFloat(document.getElementById("dbmInput").value);

  if (isNaN(dbm)) {
    document.getElementById("dbmResult").innerHTML = "Invalid input";
    return;
  }

  let mw = Math.pow(10, dbm / 10);

  document.getElementById("dbmResult").innerHTML =
    mw.toFixed(4) + " mW";
}

/* FIBER LOSS */
function calcFiber() {
  let distance = parseFloat(document.getElementById("distance").value);
  let lossPerKm = parseFloat(document.getElementById("lossPerKm").value);
  let splice = parseFloat(document.getElementById("spliceLoss").value);

  if (isNaN(distance) || isNaN(lossPerKm) || isNaN(splice)) {
    document.getElementById("fiberResult").innerHTML = "Invalid input";
    return;
  }

  let totalLoss = (distance * lossPerKm) + splice;

  document.getElementById("fiberResult").innerHTML =
    "Total Loss: " + totalLoss.toFixed(2) + " dB";
}