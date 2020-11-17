export default class HttpRequestError extends Error {
    constructor (public status: number, public message: string) {
        super(message);   
        
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }

    getMesage = () => this.message;
    getStatus = () => this.status;
}
