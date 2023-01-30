let dnumber, pnumber, phn, mess, finaltext, enc, phto, link, note;
let dtype = "D - ";
let bank = "Dr.Abdun Nur\nPunjab National Bank\nBranch Choki\nA/C No. 1250010101531\nIFSC Code : PUNB0125020\n \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t OR \n Pay using upi - 8346051322";
note = " \n_***KINDLY SEND THE SCREENSORT OF THE PAYMENT. SO THAT I CAN SEND YOUR MEDICINE NAME.\n***_";

function PatienceM() {
  document.getElementById("dn").innerHTML = "D-";
  dtype = "D - ";
}
function PatienceK() {
  া
  document.getElementById("dn").innerHTML = "K-";
  dtype = "K - ";
}
function Message() {
  document.getElementById("Message").style.display = "block";
  bank = "";
}
function Pnb() {
  document.getElementById("Message").style.display = "none";
  bank = "Dr.Abdun Nur\nPunjab National Bank\nBranch Choki\nA/C No. 1250010101531\nIFSC Code : PUNB0125020\n \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t OR \n Pay using upi - 8346051322 \n";
}
function Axis() {
  document.getElementById("Message").style.display = "none";
  bank = "Account Holder Name: DR. ABDUN NUR\nBank : Axis Bank\nAccount number: 912010063125312\nIFSC Code: UTIB0001871\n \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t OR \n Pay using upi - 8346051322 ";
}
function Sent() {
  dnumber = document.getElementById("dnum").value;
  pnumber = document.getElementById("pnum").value;
  phn = document.getElementById("phnumber").value;
  mess = document.getElementById("texting").value;
  if (bank != "") {
    finaltext = 'Patient Info : '+dtype+dnumber+'/'+pnumber+'\n'+bank+'\n'+note;
  } else {
    finaltext = 'Patient Info : '+dtype+dnumber+'/'+pnumber+'\n'+mess;
  }
  enc = encodeURI(finaltext);
  phto = '91'+phn;
  console.log(enc);
  document.getElementById("mus").checked = true;
  document.getElementById("pnb").checked = true;
  document.getElementById("dnum").value = "";
  document.getElementById("pnum").value = "";
  document.getElementById("phnumber").value = "";
  document.getElementById("texting").value = "";
  document.getElementById("dn").innerHTML = "D - ";
  link = 'https://wa.me/'+phto+'?text='+enc;
  return link;
}