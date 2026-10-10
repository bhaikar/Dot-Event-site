const RECEIPT_URL = "Provisional_receipt.html"; // path relative to Payment_gate.html
const PAGE_W_MM = 210;
const PAGE_H_MM = 297;
const MARGIN_MM = 10;
const SCALE = 3;

/* ---------- helpers ---------- */

function loadReceiptFrame() {
  return new Promise((resolve, reject) => {
    const frame = document.createElement("iframe");
    frame.style.cssText =
      "position:fixed;left:-10000px;top:0;width:900px;height:1400px;border:0;visibility:hidden;";
    frame.onload = () => resolve(frame);
    frame.onerror = () => reject(new Error("Could not load receipt page"));
    frame.src = RECEIPT_URL;
    document.body.appendChild(frame);
  });
}

function waitFor(test, timeout = 5000, step = 50) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      if (test()) return resolve();
      if (Date.now() - start > timeout) return reject(new Error("Receipt did not finish rendering"));
      setTimeout(check, step);
    })();
  });
}

/* Choose page cut positions (canvas px) that fall on section boundaries */
function computeCuts(totalH, pageH, boundaries) {
  const cuts = [0];
  let start = 0;
  while (totalH - start > pageH) {
    const limit = start + pageH;
    // largest section top that is inside this page
    const candidates = boundaries.filter((b) => b > start + 1 && b <= limit);
    const cut = candidates.length ? Math.max(...candidates) : limit;
    cuts.push(cut);
    start = cut;
  }
  cuts.push(totalH);
  return cuts;
}

/* ---------- main ---------- */

async function downloadReceiptPdf() {
  if (!sessionStorage.getItem("teamData")) {
    throw new Error("teamData missing in sessionStorage");
  }
  if (!window.html2canvas || !window.jspdf) {
    throw new Error("html2canvas / jsPDF not loaded");
  }

  const frame = await loadReceiptFrame();

  try {
    const doc = frame.contentDocument;
    const receipt = doc.getElementById("receipt");

    // wait until receipt script has filled data and QR is drawn
    await waitFor(() => {
      const num = doc.getElementById("receiptNumber");
      const qr = doc.getElementById("qrCode");
      return num && num.textContent.trim() && qr && qr.querySelector("canvas, img");
    });
    if (doc.fonts && doc.fonts.ready) await doc.fonts.ready;
    await new Promise((r) => setTimeout(r, 150)); // let QR <img> finish

    // hide print button, fixed width for consistent output
    doc.querySelector(".print-btn").style.display = "none";
    receipt.style.boxShadow = "none";
    receipt.style.margin = "0";
    receipt.style.width = "800px";

    const canvas = await window.html2canvas(receipt, {
      scale: SCALE,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    // section boundaries (top of each direct child) in canvas px
    const rTop = receipt.getBoundingClientRect().top;
    const boundaries = Array.from(receipt.children).map(
      (el) => Math.round((el.getBoundingClientRect().top - rTop) * SCALE)
    );

    const contentW = PAGE_W_MM - MARGIN_MM * 2;
    const contentH = PAGE_H_MM - MARGIN_MM * 2;
    const pxPerMm = canvas.width / contentW;
    const pageHpx = Math.floor(contentH * pxPerMm);

    const cuts = computeCuts(canvas.height, pageHpx, boundaries);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    for (let i = 0; i < cuts.length - 1; i++) {
      const sy = cuts[i];
      const sh = cuts[i + 1] - cuts[i];

      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = sh;
      const ctx = slice.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);

      if (i > 0) pdf.addPage();
      pdf.addImage(
        slice.toDataURL("image/jpeg", 0.95),
        "JPEG",
        MARGIN_MM,
        MARGIN_MM,
        contentW,
        sh / pxPerMm
      );
    }

    const id = doc.getElementById("receiptNumber").textContent.trim() || "receipt";
    pdf.save(`DOT_Provisional_Receipt.pdf`);
  } finally {
    frame.remove();
  }
}



export {downloadReceiptPdf}

// User clicks "Download PDF"
//              │
//              ▼
// downloadReceiptPdf()
//              │
//              ├── Is teamData available?
//              │       │
//              │       └── No → Error
//              │
//              ├── Are html2canvas/jsPDF loaded?
//              │       │
//              │       └── No → Error
//              │
//              ▼
//    Load Provisional_receipt.html
//        in hidden iframe
//              │
//              ▼
//    Wait for receipt number
//        and QR code
//              │
//              ▼
//      Wait for fonts/QR
//              │
//              ▼
//       Hide print button
//              │
//              ▼
//        html2canvas()
//              │
//              ▼
//        Full receipt canvas
//              │
//              ▼
//    Find section boundaries
//              │
//              ▼
//       Calculate A4 pages
//              │
//              ▼
//     Split canvas into slices
//              │
//              ▼
//         jsPDF.addImage()
//              │
//              ▼
//           PDF created
//              │
//              ▼
//            Download
//              │
//              ▼
//      Remove hidden iframe
