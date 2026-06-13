function show(id){
  document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

/* =========================
   VALIDATION HELPERS
========================= */

function isValidIP(ip){
  let parts = ip.split(".");
  if(parts.length !== 4) return false;

  return parts.every(p=>{
    if(p === "") return false;
    let n = Number(p);
    return n >= 0 && n <= 255 && Number.isInteger(n);
  });
}

/* =========================
   IP TO 32-BIT NUMBER
========================= */

function ipToInt(ip){
  return ip.split(".").reduce((acc,oct)=>{
    return (acc << 8) + Number(oct);
  },0) >>> 0;
}

/* =========================
   INT TO IP
========================= */

function intToIp(num){
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join(".");
}

/* =========================
   SUBNET ENGINE (ACCURATE)
========================= */

function calcSubnet(){

  let ip = document.getElementById("ip").value.trim();
  let cidr = Number(document.getElementById("cidr").value);

  if(!isValidIP(ip) || cidr < 0 || cidr > 32){
    document.getElementById("subnetResult").innerHTML =
      "<b style='color:red'>Invalid IP or CIDR</b>";
    return;
  }

  let ipInt = ipToInt(ip);

  // subnet mask
  let mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;

  let network = ipInt & mask;
  let broadcast = network | (~mask >>> 0);

  let hostBits = 32 - cidr;
  let totalIps = Math.pow(2, hostBits);
  let usable = hostBits <= 1 ? 0 : totalIps - 2;

  let wildcard = (~mask >>> 0);

  document.getElementById("subnetResult").innerHTML = `
    <b>INPUT:</b> ${ip}/${cidr}<br><br>

    <b>Subnet Mask:</b> ${intToIp(mask)}<br>
    <b>Wildcard Mask:</b> ${intToIp(wildcard)}<br><br>

    <b>Network Address:</b> ${intToIp(network)}<br>
    <b>Broadcast Address:</b> ${intToIp(broadcast)}<br><br>

    <b>Total IPs:</b> ${totalIps}<br>
    <b>Usable Hosts:</b> ${usable}<br><br>

    <b>Host Bits:</b> ${hostBits}<br>
    <b>Network Bits:</b> ${cidr}
  `;
}

/* =========================
   IP RANGE ENGINE (REAL)
========================= */

function calcIP(){

  let ip = document.getElementById("ipInput").value.trim();
  let cidr = Number(document.getElementById("cidr2").value);

  if(!isValidIP(ip) || cidr < 0 || cidr > 32){
    document.getElementById("ipResult").innerHTML =
      "<b style='color:red'>Invalid input</b>";
    return;
  }

  let ipInt = ipToInt(ip);

  let mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;

  let network = ipInt & mask;
  let broadcast = network | (~mask >>> 0);

  let total = Math.pow(2, 32 - cidr);
  let usable = total <= 2 ? 0 : total - 2;

  document.getElementById("ipResult").innerHTML = `
    <b>Network Address:</b> ${intToIp(network)}<br>
    <b>First Host:</b> ${usable ? intToIp(network + 1) : "N/A"}<br>
    <b>Last Host:</b> ${usable ? intToIp(broadcast - 1) : "N/A"}<br>
    <b>Broadcast:</b> ${intToIp(broadcast)}<br><br>

    <b>Total IPs:</b> ${total}<br>
    <b>Usable Hosts:</b> ${usable}
  `;
}

/* =========================
   UNIVERSAL CONVERTER
   (Binary / Decimal / Hex / Octal)
========================= */

function convertAll(){

  let input = document.getElementById("convInput").value.trim();

  if(input === ""){
    document.getElementById("convResult").innerHTML =
      "<b style='color:red'>Enter a value</b>";
    return;
  }

  let num;

  // detect format safely
  if(/^[01]+$/.test(input)){
    num = parseInt(input,2);
  }
  else if(/^[0-9]+$/.test(input)){
    num = parseInt(input,10);
  }
  else if(/^[0-9a-fA-F]+$/.test(input)){
    num = parseInt(input,16);
  }
  else{
    document.getElementById("convResult").innerHTML =
      "<b style='color:red'>Invalid format</b>";
    return;
  }

  document.getElementById("convResult").innerHTML = `
    <b>Decimal:</b> ${num}<br>
    <b>Binary:</b> ${num.toString(2)}<br>
    <b>Hex:</b> ${num.toString(16).toUpperCase()}<br>
    <b>Octal:</b> ${num.toString(8)}<br><br>

    <b>Bit Length:</b> ${num.toString(2).length}
  `;
}

/* =========================
   DBM CONVERTER
========================= */

function convertDbm(){

  let dbm = Number(document.getElementById("dbmInput").value);

  if(isNaN(dbm)){
    document.getElementById("dbmResult").innerHTML =
      "<b style='color:red'>Invalid input</b>";
    return;
  }

  let mw = Math.pow(10, dbm / 10);

  document.getElementById("dbmResult").innerHTML = `
    <b>dBm Input:</b> ${dbm}<br>
    <b>Power:</b> ${mw.toFixed(6)} mW<br><br>

    <b>Meaning:</b> Optical/RF signal strength level<br>
    <b>Reference:</b> 0 dBm = 1 milliwatt
  `;
}

/* =========================
   BANDWIDTH ENGINE
========================= */

function calcBandwidth(){

  let mbps = Number(document.getElementById("mbps").value);

  if(isNaN(mbps)){
    document.getElementById("bwResult").innerHTML =
      "<b style='color:red'>Invalid input</b>";
    return;
  }

  let theoretical = mbps / 8;
  let real = theoretical * 0.85;

  document.getElementById("bwResult").innerHTML = `
    <b>Input Speed:</b> ${mbps} Mbps<br>
    <b>Theoretical:</b> ${theoretical.toFixed(2)} MB/s<br>
    <b>Real World (~85%):</b> ${real.toFixed(2)} MB/s<br><br>

    <b>Note:</b> Protocol overhead reduces real throughput
  `;
}
