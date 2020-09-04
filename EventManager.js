class EventManager {
    constructor() {
        this.listeners = {};
    }
    addListener(event, handler) {
        const id = Math.random().toString(36).slice(2);

        if (!this.listeners[event])
            this.listeners[event] = [];

        this.listeners[event].push({ id, handler });

        return {
            remove: () => {
                for (let i = this.listeners[event].length - 1; i >= 0; i--) {
                    if (this.listeners[event][i].id === id)
                        this.listeners[event].splice(i, 1);
                }
            }
        };
    }
    dispatch(event, payload) {
        if (!this.listeners[event])
            return;

        for (let i = 0, n = this.listeners[event].length; i < n; i++)
            this.listeners[event][i].handler({ type: event, payload });
    }
}

export default EventManager;

/*
@test
let e = new EventManager(), x = 0;
let listener = e.addListener('update', event => {
    expect(event.type).toEqual('update');
    x += event.payload;
});
expect(x).toEqual(0);

e.dispatch('update', +1);
expect(x).toEqual(1);

e.dispatch('update', +1);
expect(x).toEqual(2);

e.dispatch('update', -2);
expect(x).toEqual(0);

listener.remove();
e.dispatch('update', +5);
expect(x).toEqual(0);
*/
