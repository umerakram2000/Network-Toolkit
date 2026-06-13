function show(id){
  document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

/* ---------------- SUBNET ---------------- */
function calcSubnet(){
  let ip = document.getElementById("ip").value;
  let cidr = parseInt(document.getElementById("cidr").value);

  if(!ip || isNaN(cidr)){
    document.getElementById("subnetResult").innerHTML = "Enter valid IP and CIDR";
    return;
  }

  let hosts = Math.pow(2,32-cidr)-2;

  document.getElementById("subnetResult").innerHTML =
    `
    <b>IP:</b> ${ip}<br>
    <b>CIDR:</b> /${cidr}<br>
    <b>Usable Hosts:</b> ${hosts}
    `;
}

/* ---------------- IP RANGE ---------------- */
function calcIP(){
  let ip = document.getElementById("ip2").value;
  let cidr = parseInt(document.getElementById("cidr2").value);

  if(!ip || isNaN(cidr)){
    document.getElementById("ipResult").innerHTML = "Enter valid values";
    return;
  }

  let total = Math.pow(2,32-cidr);

  document.getElementById("ipResult").innerHTML =
    `
    <b>Network:</b> ${ip}/${cidr}<br>
    <b>Total IPs:</b> ${total}<br>
    <b>Note:</b> First = Network, Last = Broadcast
    `;
}

/* ---------------- FIBER ---------------- */
function calcFiber(){
  let d = parseFloat(document.getElementById("distance").value);
  let a = parseFloat(document.getElementById("attenuation").value);
  let c = parseFloat(document.getElementById("connector").value);
  let s = parseFloat(document.getElementById("splice").value);

  if(isNaN(d)||isNaN(a)||isNaN(c)||isNaN(s)){
    document.getElementById("fiberResult").innerHTML = "Enter all values";
    return;
  }

  let loss = (d*a) + c + s;

  document.getElementById("fiberResult").innerHTML =
    `
    <b>Total Loss:</b> ${loss.toFixed(2)} dB<br>
    <b>Status:</b> ${loss < 20 ? "Good Link" : "Weak Signal"}
    `;
}

/* ---------------- BANDWIDTH ---------------- */
function calcBandwidth(){
  let mbps = parseFloat(document.getElementById("mbps").value);

  if(isNaN(mbps)){
    document.getElementById("bwResult").innerHTML = "Enter speed";
    return;
  }

  let mbs = mbps / 8;

  document.getElementById("bwResult").innerHTML =
    `
    <b>Download Speed:</b> ${mbs.toFixed(2)} MB/s<br>
    <b>Tip:</b> 100 Mbps ≈ 12.5 MB/s
    `;
}
