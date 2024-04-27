export default class StatusError extends Error {
    constructor(status) {
        super(status);
    }
}
