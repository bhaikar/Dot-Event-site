
/* =====================================================
   PAYMENT STATUS

   Change ONLY this value.

   Examples:

   "PAID"
   "PENDING"
   "UNDER_VERIFICATION"
   "AWAITING_PAYMENT"
   "FAILED"
   "DECLINED"
   "CANCELLED"
   "EXPIRED"
   "PARTIALLY_PAID"
   "REFUND_PENDING"
   "REFUNDED"
   "REVERSED"
   "DISPUTED"
   "ON_HOLD"

====================================================== */
import {updateFullDate} from "./Generate_dateTime.js"
import {generateQRImg} from "./Generate_qr.js";

const paymentStatus = "UNDER_VERIFICATION";
const teamData = JSON.parse(sessionStorage.getItem("teamData"));
console.log(teamData)
/* =====================================================
   RECEIPT INFORMATION
====================================================== */

const receiptNumber =
  teamData.receiptID;

const receiptDate =
  updateFullDate();

const transactionId =
  teamData.utr;

const paymentMethod =
  "UPI";

/* =====================================================
   Team Detail
====================================================== */

document.getElementById('teamName').textContent=teamData.teamName;
document.getElementById('leaderName').textContent=teamData.leaderName;
document.getElementById('member1').textContent=teamData.members[0];
document.getElementById('member2').textContent=teamData.members[1];
document.getElementById('member3').textContent=teamData.members[2];




/* =====================================================
   TICKET
====================================================== */

const ticket = {

  type:
    teamData.ticket,

  id:
    teamData.ticketId,

  price:
  parseInt(teamData.ticketPrice, 10)

};



/* =====================================================
   GST
====================================================== */

const GST_RATE =
  0;


const subtotal =
  ticket.price;


const tax =
  subtotal * GST_RATE;


const total =
  subtotal + tax;


/* =====================================================
   STATUS CONFIGURATION
====================================================== */

const statusConfig = {


  AWAITING_PAYMENT: {

    label:
      "PAID",

    color:
      "#92400e",

    light:
      "#fef3c7",

    border:
      "#fcd34d",

    icon:
      "!",

    title:
      "Payment Required",

    message:
      "Payment has not been received yet. Please complete the payment to confirm your ticket.",

    about:
      "This document is awaiting payment. Your ticket will be confirmed after successful payment.",

    footer:
      "Payment is required to confirm this ticket."

  },


  PENDING: {

    label:
      "PENDING / NOT VERIFIED",

    color:
      "#92400e",

    light:
      "#fef3c7",

    border:
      "#fcd34d",

    icon:
      "…",

    title:
      "Payment Pending",

    message:
      "Payment has not yet been verified. Please wait while the payment is checked.",

    about:
      "This document indicates that payment is pending or has not yet been verified.",

    footer:
      "Payment is pending verification."

  },


  UNDER_VERIFICATION: {

    label:
      "UNDER VERIFICATION",
      // "PAYMENT SUBMITTED / UNDER VERIFICATION",

    color:
      "#1e40af",

    light:
      "#dbeafe",

    border:
      "#93c5fd",

    icon:
      "i",

    title:
      "Payment Under Verification",

    message:
      "Your payment has been submitted and is currently being verified.",

    about:
      "Payment details have been received and are currently undergoing verification. Ticket confirmation will follow after successful verification.",

    footer:
      "Payment verification is in progress."

  },


  PAID: {

    label:
      "PAID / VERIFIED",

    color:
      "#166534",

    light:
      "#dcfce7",

    border:
      "#86efac",

    icon:
      "✓",

    title:
      "Payment Successfully Received",

    message:
      "This receipt confirms that the payment has been successfully received and verified.",

    about:
      "This document is an official payment receipt issued after successful receipt and verification of payment.",

    footer:
      "Payment has been received and verified."

  },


  FAILED: {

    label:
      "PAYMENT FAILED",

    color:
      "#991b1b",

    light:
      "#fee2e2",

    border:
      "#fca5a5",

    icon:
      "×",

    title:
      "Payment Failed",

    message:
      "The payment attempt was unsuccessful. No successful payment has been recorded.",

    about:
      "The payment associated with this transaction could not be completed successfully.",

    footer:
      "Payment was unsuccessful."

  },


  DECLINED: {

    label:
      "PAYMENT DECLINED",

    color:
      "#991b1b",

    light:
      "#fee2e2",

    border:
      "#fca5a5",

    icon:
      "×",

    title:
      "Payment Declined",

    message:
      "The payment was declined by the payment provider or bank.",

    about:
      "The payment attempt was declined and has not been recorded as a successful payment.",

    footer:
      "Payment was declined."

  },


  CANCELLED: {

    label:
      "PAYMENT CANCELLED",

    color:
      "#374151",

    light:
      "#e5e7eb",

    border:
      "#d1d5db",

    icon:
      "×",

    title:
      "Payment Cancelled",

    message:
      "The payment transaction was cancelled and has not been completed.",

    about:
      "This transaction was cancelled before successful completion of payment.",

    footer:
      "Payment transaction was cancelled."

  },


  EXPIRED: {

    label:
      "PAYMENT EXPIRED",

    color:
      "#374151",

    light:
      "#e5e7eb",

    border:
      "#d1d5db",

    icon:
      "⌛",

    title:
      "Payment Request Expired",

    message:
      "The payment request has expired. A new payment request may be required.",

    about:
      "The payment window associated with this transaction has expired.",

    footer:
      "Payment request has expired."

  },


  PARTIALLY_PAID: {

    label:
      "PARTIALLY PAID",

    color:
      "#9a3412",

    light:
      "#ffedd5",

    border:
      "#fdba74",

    icon:
      "½",

    title:
      "Partial Payment Received",

    message:
      "A partial payment has been received. The remaining amount is still due.",

    about:
      "Only part of the required payment has been received. The ticket will be fully confirmed after the remaining amount is paid.",

    footer:
      "A balance remains outstanding."

  },


  REFUND_PENDING: {

    label:
      "REFUND PENDING",

    color:
      "#9a3412",

    light:
      "#ffedd5",

    border:
      "#fdba74",

    icon:
      "↻",

    title:
      "Refund Being Processed",

    message:
      "A refund has been initiated and is currently being processed.",

    about:
      "The payment has entered the refund process. The refund will be completed according to the applicable payment provider's processing time.",

    footer:
      "Refund is currently being processed."

  },


  REFUNDED: {

    label:
      "REFUNDED",

    color:
      "#166534",

    light:
      "#dcfce7",

    border:
      "#86efac",

    icon:
      "✓",

    title:
      "Payment Refunded",

    message:
      "The payment has been successfully refunded.",

    about:
      "This transaction has been refunded. Please retain this document for your records.",

    footer:
      "Payment has been refunded."

  },


  REVERSED: {

    label:
      "PAYMENT REVERSED",

    color:
      "#991b1b",

    light:
      "#fee2e2",

    border:
      "#fca5a5",

    icon:
      "↶",

    title:
      "Payment Reversed",

    message:
      "The previously recorded payment has been reversed.",

    about:
      "The payment was previously recorded as successful but has subsequently been reversed.",

    footer:
      "Payment has been reversed."

  },


  DISPUTED: {

    label:
      "PAYMENT DISPUTED",

    color:
      "#991b1b",

    light:
      "#fee2e2",

    border:
      "#fca5a5",

    icon:
      "!",

    title:
      "Payment Under Dispute",

    message:
      "This payment has been disputed and is currently under review.",

    about:
      "The transaction is subject to a payment dispute and may require additional verification.",

    footer:
      "Payment is currently under dispute."

  },


  ON_HOLD: {

    label:
      "PAYMENT ON HOLD",

    color:
      "#92400e",

    light:
      "#fef3c7",

    border:
      "#fcd34d",

    icon:
      "‖",

    title:
      "Payment On Hold",

    message:
      "The payment is temporarily on hold pending additional verification.",

    about:
      "The payment has been placed on hold and is awaiting further verification or processing.",

    footer:
      "Payment is currently on hold."

  }

};


/* =====================================================
   GET CURRENT STATUS
====================================================== */

const currentStatus =
  statusConfig[paymentStatus];


/* =====================================================
   SAFETY CHECK
====================================================== */

if (!currentStatus) {

  console.error(
    "Invalid payment status:",
    paymentStatus
  );

  throw new Error(
    "Invalid payment status"
  );

}


/* =====================================================
   APPLY STATUS THEME
====================================================== */

const receipt =
  document.getElementById("receipt");


receipt.style.setProperty(
  "--status-color",
  currentStatus.color
);


receipt.style.setProperty(
  "--status-light",
  currentStatus.light
);


receipt.style.setProperty(
  "--status-border",
  currentStatus.border
);


/* =====================================================
   HEADER ICON
====================================================== */

document
  .getElementById("statusIcon")
  .textContent =
  currentStatus.icon;


/* =====================================================
   RECEIPT INFORMATION
====================================================== */

document
  .getElementById("receiptNumber")
  .textContent =
  receiptNumber;


document
  .getElementById("receiptDate")
  .textContent =
  receiptDate;


/* =====================================================
   TICKET
====================================================== */

document
  .getElementById("ticketType")
  .textContent =
  ticket.type;


document
  .getElementById("ticketId")
  .textContent =
  ticket.id;


document
  .getElementById("ticketPrice")
  .textContent =
  ticket.price.toFixed(2);


/* =====================================================
   TOTALS
====================================================== */

document
  .getElementById("subtotal")
  .textContent =
  subtotal.toFixed(2);


// document
//   .getElementById("tax")
//   .textContent =
//   tax.toFixed(2);


document
  .getElementById("total")
  .textContent =
  total.toFixed(2);


/* =====================================================
   PAYMENT
====================================================== */

document
  .getElementById("transactionId")
  .textContent =
  transactionId;


document
  .getElementById("paymentMethod")
  .textContent =
  paymentMethod;


/* =====================================================
   STATUS BADGE
====================================================== */

document
  .getElementById("paymentStatus")
  .textContent =
  currentStatus.label;


/* =====================================================
   CONFIRMATION
====================================================== */

document
  .getElementById("confirmationTitle")
  .textContent =
  currentStatus.title;


document
  .getElementById("confirmationMessage")
  .textContent =
  currentStatus.message;


/* =====================================================
   ABOUT
====================================================== */

document
  .getElementById("aboutMessage")
  .textContent =
  currentStatus.about;


/* =====================================================
   FOOTER
====================================================== */

document
  .getElementById("footerMessage")
  .textContent =
  currentStatus.footer;


/* =====================================================
   QR DATA
====================================================== */
//


const qrData = `
Name:${teamData.leaderName},
TicketId:${teamData.ticketId},
UUID:${teamData.uuid},
UTR:${teamData.utr},
ReceiptID:${teamData.receiptID}
`.trim();

generateQRImg(qrData)
// const qrURL =
//   "https://quickchart.io/qr?size=300&text=" +
//   encodeURIComponent(qrData);


// document
//   .getElementById("qrCode")
//   .src =
//   qrURL;


document
  .getElementById("qrReceiptNumber")
  .textContent =
  receiptNumber;


/* =====================================================
   QR DESCRIPTION
====================================================== */

if (
  paymentStatus === "PAID" ||
  paymentStatus === "REFUNDED"
) {

  document
    .getElementById("qrDescription")
    .textContent =
    "Scan the QR code to verify the receipt details.";

} else {

  document
    .getElementById("qrDescription")
    .textContent =
    "Scan the QR code to view the transaction details.";

}