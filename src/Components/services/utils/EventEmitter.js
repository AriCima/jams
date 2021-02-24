const EventEmitter = {
  events: {},
  on(event, cb) {
    (this.events[event] || (this.events[event] = [])).push(cb);
  },
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  },
  removeListener(event) {
    if (this.events[event]) delete this.events[event];
  }
};

export { EventEmitter };
