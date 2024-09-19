export const eventLogger = (() => {
    let eventQue = []

    setInterval(() => {
       if (eventQue.length > 0) {
        const nextEvent = eventQue.shift()
        console.log("Logged event:", nextEvent.message)
       } 
    }, 1000)

    return {
        logEvent: (e) => {
            eventQue.push(e)
        }
    }
})()