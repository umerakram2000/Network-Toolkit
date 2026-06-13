function show(id){
document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function toggleDark(){
document.body.classList.toggle("dark");
}

/* ================= SUBNET ================= */

function calcSubnet(){

let ip=document.getElementById("ip").value;
let cidr=Number(document.getElementById("cidr").value);

if(!ip || cidr<0 || cidr>32){
document.getElementById("subnetResult").innerHTML="Invalid input";
return;
}

let total=Math.pow(2,32-cidr);
let usable=total>2?total-2:0;

document.getElementById("subnetResult").innerHTML=`
Total IPs: ${total}<br>
Usable Hosts: ${usable}
`;
}

/* ================= CONVERTER ================= */

function convertAll(){

let v=document.getElementById("convInput").value;

let num;

if(/^[01]+$/.test(v)) num=parseInt(v,2);
else if(/^[0-9]+$/.test(v)) num=parseInt(v,10);
else if(/^[0-9a-fA-F]+$/.test(v)) num=parseInt(v,16);
else{
document.getElementById("convResult").innerHTML="Invalid input";
return;
}

document.getElementById("convResult").innerHTML=`
Decimal: ${num}<br>
Binary: ${num.toString(2)}<br>
Hex: ${num.toString(16).toUpperCase()}<br>
Octal: ${num.toString(8)}
`;
}

/* ================= IP RANGE (FIXED REAL VERSION) ================= */

function calcIP(){

let ip=document.getElementById("ipInput").value;
let cidr=Number(document.getElementById("cidr2").value);

if(!ip || cidr<0 || cidr>32){
document.getElementById("ipResult").innerHTML="Invalid input";
return;
}

let p=ip.split(".").map(Number);

if(p.length!==4){
document.getElementById("ipResult").innerHTML="Invalid IP";
return;
}

let ipNum=(p[0]*256**3)+(p[1]*256**2)+(p[2]*256)+p[3];

let mask=cidr===0?0:(0xFFFFFFFF<<(32-cidr))>>>0;

let network=ipNum & mask;
let broadcast=network | (~mask>>>0);

function toIP(n){
return[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".");
}

let total=Math.pow(2,32-cidr);
let usable=total>2?total-2:0;

document.getElementById("ipResult").innerHTML=`
Network: ${toIP(network)}<br>
Broadcast: ${toIP(broadcast)}<br>
First Host: ${usable?toIP(network+1):"N/A"}<br>
Last Host: ${usable?toIP(broadcast-1):"N/A"}<br>
Usable Hosts: ${usable}
`;
}

/* ================= DBM ================= */

function convertDbm(){
let dbm=Number(document.getElementById("dbmInput").value);
let mw=Math.pow(10,dbm/10);

document.getElementById("dbmResult").innerHTML=`
Power: ${mw.toFixed(6)} mW
`;
}

/* ================= BANDWIDTH ================= */

function calcBW(){
let mbps=Number(document.getElementById("mbps").value);
let mb=mbps/8;
let real=mb*0.85;

document.getElementById("bwResult").innerHTML=`
Theoretical: ${mb.toFixed(2)} MB/s<br>
Real: ${real.toFixed(2)} MB/s
`;
}
