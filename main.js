// Variable
var ch, i, Link, res, data, dataLength, conName, conCode, conDial, allCode, pl;
var arrCode = [];
var resisound = new Audio("./WhatsappMessageReceived.mp3");
var sendsound = new Audio("./WhatsappMessageSent.mp3");
// Checking The Number
const check = ()=> {

  userMsg = $("#userMessage").val();
  userCode = $("#code").val();
  userPhn = $("#whNumber").val();
  pl = userPhn.length;
  console.log(userPhn, userCode, userMsg);
  for (i = 0; i <= 9; i++) {
    ch = userPhn.charAt(i);
    if (ch == "+") {
      resisound.play();
      $("#wrongDiv").css("display", "block");
      $('#wrong').text("Don't use the country code with the phone number.");
      $("#whNumber").val("");
      break;
    } else if (ch == '0' || ch == '1' || ch == '2' || ch == '3' || ch == '4' || ch == '5' || ch == '6' || ch == '7' || ch == '8' || ch == '9') {
      if (i == 9) {
        sendsound.play();
        $("#wrongDiv").css("display", "none");
        send(userMsg, userCode, userPhn);
      }
    } else {
      resisound.play();
      $("#wrongDiv").css("display", "block");
      $('#wrong').text("Don't use special character like '-', 'space', etc.");
      $("#whNumber").val("");
      break;
    }
  }

}

// Sending Data
const send = (um, uc, up)=> {
  $("#whNumber").val("");
  $("#userMessage").val("");
  Link = 'https://wa.me/'+uc+up+'%2F?text='+encodeURI(um);

  setInterval(() => {
    window.location.href = Link;
  }, 2000);
  console.log(Link);
}

// Filling Data By Js
const loadCountry = async() => {
  res = await fetch('./CountryCode.json');
  data = await res.json();
  dataLength = data.length;

  for (i = 0; i < dataLength; i++) {
    conName = data[i].name;
    conCode = data[i].code;
    conDial = data[i].dial_code;
    arrCode.unshift("+"+conDial);

    allCode += '<option data-countryCode="'+ conCode +'" value="'+ conDial +'">'+ conName +' (+'+ conDial +')</option>';
  }
  $('#code').append(allCode);
  $('#code option:eq(97)').prop('selected', true);
}

const checkDevice = ()=> {
  if (window.matchMedia("(max-width: 767px)").matches) {
    loadCountry();
  } else {
    window.location.href = "./WhatsAppweb.html";
  }
}
checkDevice();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=> {
    navigator.serviceWorker.register('./sw.js').then((reg)=> {
      // Registration was successful
      console.log('Registration successful with scope: ', reg.scope);
    }, (err)=> {
      // registration failed :(
      console.log('Registration failed: ', err);
    });
  });
}

let deferredPrompt;
$("#install").css("display", "none");
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#install").css("display", "block");
  $("#install").click((e) => {
    $("#install").css("display", "none");
    deferredPrompt.prompt();
    deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
