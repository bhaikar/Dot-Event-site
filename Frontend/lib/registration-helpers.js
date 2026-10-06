/**
 * Client & server helpers matching backend/script/Generate_uuid.js
 * and backend/script/Generate_dateTime.js exactly.
 */

// Port of Backend/script/Generate_uuid.js (generateTransactionId)
export function generateTransactionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Port of Backend/script/Generate_dateTime.js (updateDate - DD/MM/YY)
export function updateDate() {
  const now = new Date();
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

// Port of Backend/script/Generate_dateTime.js (updateTime - HH:MM)
export function updateTime() {
  const now = new Date();
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
}

/**
 * Port of Backend/script/Generate_uuid.js (generateTicketId)
 * Formula: "DOT" + date[0..2] + date[3..5] + event[0..2].toUpperCase() + "-" + uuid[0..3] + uuid.split("-")[2] + uuid[-3..]
 * Example output: "DOT0510HA-f474372479"
 */
export function generateTicketId(uuid, date, event) {
  const uuidStartId = uuid.substring(0, 3);
  const uuidEndId = uuid.substring(uuid.length - 3);
  const uuidMidId = uuid.split("-")[2] || "";

  return (
    "DOT" +
    date.substring(0, 2) +
    date.substring(3, 5) +
    event.substring(0, 2).toUpperCase() +
    "-" +
    uuidStartId +
    uuidMidId +
    uuidEndId
  );
}

/**
 * Official event pricing map.
 * Hackathon = "150", Gameathon (Gamethon) = "50".
 */
export const EVENT_PRICES = {
  Hackathon: "150",
  Gameathon: "50",
  Gamethon: "50",
};

export function getTicketPrice(eventName) {
  const price = EVENT_PRICES[eventName];
  if (!price) {
    throw new Error(`Unknown event name: ${eventName}`);
  }
  return String(price);
}

