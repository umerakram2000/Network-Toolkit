function show(id){
  document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

/* ================================
   HELPERS
================================ */
function validateIP(ip){
  let parts = ip.split(".");
  if(parts.length !== 4) return false;
  return parts.every(p => {
    let n = Number(p);
    return n >= 0 && n <= 255 && p !== "";
  });
}

/* ================================
   SUBNET ENGINE (REAL CCNA LOGIC)
================================ */
function calcSubnet(){

  let ip = document.getElementById("ip").value.trim();
  let cidr = Number(document.getElementById("cidr").value);

  if(!validateIP(ip) || cidr < 0 || cidr > 32){
    document.getElementById("subnetResult").innerHTML =
      "<b style='color:red'>Invalid IP or CIDR</b>";
    return;
  }

  let ipParts = ip.split(".").map(Number);

  let hostBits = 32 - cidr;
  let totalHosts = Math.pow(2, hostBits);
  let usableHosts = hostBits <= 1 ? 0 : totalHosts - 2;

  // subnet mask calculation
  let mask = [];
  for(let i=0;i<4;i++){
    let bits = Math.min(8, Math.max(0, cidr - i*8));
    mask.push(256 - Math.pow(2, 8-bits));
  }

  // wildcard mask
  let wildcard = mask.map(m => 255 - m);

  document.getElementById("subnetResult").innerHTML = `
    <b>IP:</b> ${ip}<br>
    <b>CIDR:</b> /${cidr}<br><br>

    <b>Subnet Mask:</b> ${mask.join(".")}<br>
    <b>Wildcard Mask:</b> ${wildcard.join(".")}<br><br>

    <b>Total IPs:</b> ${totalHosts}<br>
    <b>Usable Hosts:</b> ${usableHosts}<br><br>

    <b>Bits:</b> ${cidr} Network / ${hostBits} Host
  `;
}

/* ================================
   IP RANGE (REAL NETWORK LOGIC)
================================ */
function calcIP(){

  let ip = document.getElementById("ipInput").value.trim();
  let cidr = Number(document.getElementById("cidr2").value);

  if(!validateIP(ip) || cidr < 0 || cidr > 32){
    document.getElementById("ipResult").innerHTML =
      "<b style='color:red'>Invalid input</b>";
    return;
  }

  let ipNum = ip.split(".").reduce((acc,v)=>acc*256+Number(v),0);

  let mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;

  let network = ipNum & mask;
  let broadcast = network | (~mask >>> 0);

  function toIP(num){
    return [
      (num>>>24)&255,
      (num>>>16)&255,
      (num>>>8)&255,
      num&255
    ].join(".");
  }

  let total = Math.pow(2, 32-cidr);
  let usable = total > 2 ? total - 2 : 0;

  document.getElementById("ipResult").innerHTML = `
    <b>Network:</b> ${toIP(network)}<br>
    <b>Broadcast:</b> ${toIP(broadcast)}<br>
    <b>First Host:</b> ${toIP(network+1)}<br>
    <b>Last Host:</b> ${toIP(broadcast-1)}<br><br>

    <b>Total IPs:</b> ${total}<br>
    <b>Usable Hosts:</b> ${usable}
  `;
}

/* ================================
   UNIVERSAL CONVERTER (SAFE)
================================ */
function convertAll(){

  let input = document.getElementById("convInput").value.trim();

  if(input === ""){
    document.getElementById("convResult").innerHTML =
      "<b style='color:red'>Enter a value</b>";
    return;
  }

  let num;

  // detect input type
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
    <b>Binary:</b> ${num.toString(2)}</br>
    <b>Hex:</b> ${num.toString(16).toUpperCase()}<br>
    <b>Octal:</b> ${num.toString(8)}<br><br>

    <b>Bits used in networking:</b> ${num.toString(2).length}
  `;
}

/* ================================
   DBM (REAL CONTEXT)
================================ */
function convertDbm(){

  let dbm = Number(document.getElementById("dbmInput").value);

  if(isNaN(dbm)){
    document.getElementById("dbmResult").innerHTML =
      "<b style='color:red'>Invalid value</b>";
    return;
  }

  let mw = Math.pow(10, dbm/10);

  document.getElementById("dbmResult").innerHTML = `
    <b>dBm:</b> ${dbm}<br>
    <b>Power:</b> ${mw.toFixed(6)} mW<br><br>

    <b>Meaning:</b> Signal strength used in fiber & RF systems<br>
    <b>Reference:</b> 0 dBm = 1 mW
  `;
}

/* ================================
   BANDWIDTH (REALISTIC VIEW)
================================ */
function calcBandwidth(){

  let mbps = Number(document.getElementById("mbps").value);

  if(isNaN(mbps)){
    document.getElementById("bwResult").innerHTML =
      "<b style='color:red'>Invalid input</b>";
    return;
  }

  let mbs = mbps / 8;
  let real = mbs * 0.85; // realistic throughput

  document.getElementById("bwResult").innerHTML = `
    <b>Speed:</b> ${mbps} Mbps<br>
    <b>Theoretical:</b> ${mbs.toFixed(2)} MB/s<br>
    <b>Real World (~85%):</b> ${real.toFixed(2)} MB/s<br><br>

    <b>Note:</b> ISP overhead + latency reduces actual speed
  `;
}
