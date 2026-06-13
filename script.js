function showTool(id){
  document.querySelectorAll(".tool").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* SUBNET */
function calcSubnet(){
  let p = parseInt(document.getElementById("prefix").value);
  let hosts = Math.pow(2,32-p)-2;
  document.getElementById("subnetResult").innerHTML =
    "Usable Hosts: " + hosts;
}

/* DBM */
function convertDbm(){
  let dbm = parseFloat(document.getElementById("dbmInput").value);
  let mw = Math.pow(10, dbm/10);
  document.getElementById("dbmResult").innerHTML =
    mw.toFixed(4) + " mW";
}

/* FIBER */
function calcFiber(){
  let d = parseFloat(document.getElementById("distance").value);
  let l = parseFloat(document.getElementById("loss").value);
  document.getElementById("fiberResult").innerHTML =
    "Loss: " + (d*l).toFixed(2) + " dB";
}

/* BMI */
function calcBMI(){
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value)/100;
  let bmi = w/(h*h);

  let status =
    bmi<18.5?"Underweight":
    bmi<25?"Normal":
    bmi<30?"Overweight":"Obese";

  document.getElementById("bmiResult").innerHTML =
    bmi.toFixed(2)+" ("+status+")";
}

/* SOLAR */
function calcSolar(){
  let bill = parseFloat(document.getElementById("bill").value);
  let sun = parseFloat(document.getElementById("sunHours").value);

  let units = bill/50;
  let size = (units/30)/sun;

  document.getElementById("solarResult").innerHTML =
    size.toFixed(2)+" kW required";
}

/* DARK MODE */
function toggleDarkMode(){
  document.body.classList.toggle("dark");
}
