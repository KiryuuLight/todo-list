function PubSub() {
    const events = {};

    function subscribe(eventName, func) {
        if (!events[eventName]) {
            events[eventName] = [];
        }
        events[eventName].push(func);

        // console.log(`${func.name} has subscribed to ${eventName} topic!`);
    }

    function unsubscribe(eventName, func) {
        if (events[eventName]) {
            events[eventName] = events[eventName].filter((f) => f !== func);

            // console.log(
            //     `${func.name} has unsubscribed from ${eventName} topic!`
            // );
        }
    }

    function publish(eventName, ...args) {
        const funcs = events[eventName];
        if (funcs) {
            funcs.forEach((func) => {
                func(...args);
            });
        }
    }

    return {
        subscribe,
        unsubscribe,
        publish,
    };
}

const pubsubInstance = PubSub();

export default pubsubInstance;
