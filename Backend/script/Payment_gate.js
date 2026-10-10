import {generateQR} from "./utility/Generate_qr.js";
import {updateTime} from "./utility/Generate_dateTime.js"
import {addTicket} from "./utility/Firebase.js"
import {downloadReceiptPdf} from "./utility/Generate_pdf.js"

// inside your submit handler, after sessionStorage.setItem("teamData", ...)



const utrInput = document.getElementById("utr");
const submitBtn = document.getElementById("submitBtn");
const downloadBtn = document.getElementById("downloadBtn");
const form = document.getElementById("paymentForm");
const message = document.getElementById("message");
const ticketAmt = document.getElementById("ticketAmt");
const teamData = JSON.parse(sessionStorage.getItem("teamData"));


/*
  ONLY NUMBERS
  EXACTLY 12 DIGITS
  https://razorpay.com/learn/what-is-upi-reference-number/#What-is-the-UPI-Reference-Number
*/


/*
  QR GENERATION
*/
generateQR(teamData.ticketPrice,teamData.uuid,teamData.ticketId);

// display ticket and event detail above qr code
// temp
// todo remove
ticketAmt.textContent=teamData.ticket + " : "+'₹' + teamData.ticketPrice;


/*
  VALIDATION OF INPUT URT
*/

utrInput.addEventListener("input", function () {

  // Remove everything except numbers
  this.value = this.value.replace(/\D/g, "");

  // Maximum 12 digits
  this.value = this.value.substring(0, 12);

  // Check exactly 12 digits
  const valid = /^\d{12}$/.test(this.value);

  // Enable only when exactly 12 digits
  submitBtn.disabled = !valid;

  if (this.value.length === 0) {

    this.classList.remove("valid");
    this.classList.remove("invalid");

  } else if (valid) {

    this.classList.add("valid");
    this.classList.remove("invalid");

  } else {

    this.classList.add("invalid");
    this.classList.remove("valid");

  }

  message.textContent = "";

});


/*
  FINAL SUBMIT VALIDATION
*/

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const utr = utrInput.value.trim();

  // Must contain exactly 12 digits
  if (!/^\d{12}$/.test(utr)) {

    message.textContent =
      "Please enter exactly 12 digits.";

    message.className = "message error";

    submitBtn.disabled = true;


    return;
  }
    // msg to display
    message.textContent = "UTR / Ref ID submitted successfully.";

  message.className = "message success";


  downloadBtn.disabled = false;
  submitBtn.disabled = true;
  addTicket(utr);
  downloadReceiptPdf();


});
  // linking the receipt sheet
  downloadBtn.addEventListener("click", function () {
  window.location.href = "Provisional_receipt.html";
});



