// import {QRCode} from "./qrcode.min.js";

function generateQR(amount,uuid,ticketID) {

      const upiId = "7204442569-2@ibl";
      const payeeName = "Kishor";

      // const amount = document.getElementById("amount").value;
      // const note = document.getElementById("note").value;
      // const note = ticketID.substring(0,9);


      const upiUrl =
        "upi://pay" +
        "?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent(payeeName) +
        "&am=" + encodeURIComponent(amount) +
        "&cu=INR" +
        "&tn=" + encodeURIComponent(uuid.replace(/-/g, ""));
        // "&tr=" + encodeURIComponent(uuid.replace(/-/g, ""));

      // Clear previous QR
      document.getElementById("qrcode").innerHTML = "";

      // Generate QR
      new QRCode(document.getElementById("qrcode"), {
        text: upiUrl,
        width: 256,
        height: 256
      });

      // console.log(upiId,payeeName,note,upiUrl)
      // console.log("UPI URL:", upiUrl);
    }


function generateQRImg(text) {


      // Clear previous QR
      document.getElementById("qrCode").innerHTML = "";

      // Generate QR
      new QRCode(document.getElementById("qrCode"), {
        text: text,
        width: 190,
        height: 190
      });
      // console.log("text:", text);
    }

    export {generateQR,generateQRImg}