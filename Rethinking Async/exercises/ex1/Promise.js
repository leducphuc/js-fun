const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

export default class _Promise {
    constructor(func) {
        this.func = func;
        this.status = PENDING;
        this.value = null;
        this.handlers = [];
        this.resolve = this.resolve.bind(this);
        this.then = this.then.bind(this);
        this.reject = this.reject.bind(this);
        this.catch = this.catch.bind(this);
        func(this.resolve, this.reject);
    }

    resolve(params) {
        this.status = FULFILLED;
        this.value = params;
        return this;
    }

    reject(params) {
        this.status = REJECTED;
        return this;
    }

    then(callback) {
        console.log('inside then');
        const cbType = typeof callback;
        if (cbType === 'function') {
            if (this.status === PENDING) {
                this.value = callback(this.value);
                return this;
            } else if (this.status === FULFILLED) {
                this.value = callback(this.value);
                return this;
            }
        }
        return this;
    }

    catch(callback) {
        if (this.status = REJECTED) {
           this.value = callback(this.value);
           return this;
        }
        return this;
    }

    done() {
    }

    finnaly() {
    }

    doResolve() {
    }
}