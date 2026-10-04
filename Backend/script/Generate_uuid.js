// Generate Transaction ID
function generateTransactionId() {

    // Browser built-in UUID v4 generator
    return crypto.randomUUID();
}


// Generate Ticket ID
function generateTicketId(uuid,date,event) {

    // Generate UUID
    // const uuid = crypto.randomUUID();

    // Remove '-' and take first 8 characters
    const uuidStartId = uuid
        .substring(0, 3);
    const uuidEndId = uuid
        .substring(uuid.length - 3);
    const uuidMidId = uuid
        .split("-")[2];


    return "DOT"+ date.substring(0,2)+ date.substring(3,5) + event.substring(0,2).toUpperCase() +"-"+ uuidStartId + uuidMidId + uuidEndId;
}

export {generateTransactionId,generateTicketId};