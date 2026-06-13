function show(id){
  document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

/* SUBNET */
function calcSubnet(){
  let ip = document.getElementById("ip").value;
  let cidr = parseInt(document.getElementById("cidr").value);

  let hosts = Math.pow(2,32-cidr)-2;

  document.getElementById("subnetResult").innerHTML =
    `<b>IP:</b> ${ip}<br><b>Usable Hosts:</b> ${hosts}`;
}

/* BINARY */
function convertBinary(){
  let val = document.getElementById("binaryInput").value;

  if(/^[01]+$/.test(val)){
    document.getElementById("binaryResult").innerHTML =
      "Decimal: " + parseInt(val,2);
  } else {
    document.getElementById("binaryResult").innerHTML =
      "Binary: " + Number(val).toString(2);
  }
}

/* IP RANGE */
function calcIP(){
  let ip = document.getElementById("ipInput").value;
  let cidr = parseInt(document.getElementById("cidr2").value);

  let total = Math.pow(2,32-cidr);

  document.getElementById("ipResult").innerHTML =
    `<b>Network:</b> ${ip}/${cidr}<br><b>Total IPs:</b> ${total}`;
}

/* DBM */
function convertDbm(){
  let dbm = parseFloat(document.getElementById("dbmInput").value);
  let mw = Math.pow(10, dbm/10);

  document.getElementById("dbmResult").innerHTML =
    mw.toFixed(4) + " mW (0 dBm = 1 mW)";
}

/* BANDWIDTH */
function calcBandwidth(){
  let mbps = parseFloat(document.getElementById("mbps").value);
  let mbs = mbps/8;

  document.getElementById("bwResult").innerHTML =
    mbs.toFixed(2) + " MB/s";
}
