
const createDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr)
    const [hours, minutes] = timeStr.split(':').map(Number)

    const combined = new Date(date)
    combined.setUTCHours(hours, minutes, 0, 0)
    return combined
}

module.exports = { createDateTime }
