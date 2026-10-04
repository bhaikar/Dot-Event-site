function updateDate(){
    const now = new Date();
    const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"

    }).format(now);

    return date;
}

function updateFullDate(){
    const now = new Date();
    const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "short",
    day: "2-digit"

    }).format(now);

    return date;
}

function updateTime() {
    const now = new Date();
    const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: false

    }).format(now);

    return time;
}

export {updateDate,updateTime,updateFullDate}
