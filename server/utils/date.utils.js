const createDateTime = (dateStr, timeStr) => {
    // Construct an ISO string assuming the input is in IST (+05:30)
    // e.g. "2026-07-22T09:00:00+05:30"
    return new Date(`${dateStr}T${timeStr}:00+05:30`)
}

module.exports = { createDateTime }
