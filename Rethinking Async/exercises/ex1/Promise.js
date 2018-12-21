import { throwError } from "rxjs";

export default class _Promise {
    constructor(func) {
        this.func = func;
        this.status = 0;
        this.value = null;
        this.handlers = [];
        this.catcher = null;
        this.resolve = this.resolve.bind(this);
        this.then = this.then.bind(this);
        this.reject = this.reject.bind(this);
        this.catch = this.catch.bind(this);
        this.handleReject = this.handleReject.bind(this);
        try {
            setTimeout(() => func(this.resolve, this.reject), 0); 
        } catch (error) {
            this.handleReject(error);
        }j
    }

    resolve(params) {
        this.status = 1;
        this.value = params;
        if (this.handlers.length) {
            const [_, ...others] = this.handlers;
            if (params instanceof _Promise) {
                setTimeout(() => {
                    const nextChain = params;
                    this.handlers.forEach(func => nextChain.then(func));
                    return nextChain;

                }, 0);
            } else {
                setTimeout(() => {
                    const nextChain =  new _Promise((resolve) => {
                        resolve(this.handlers[0](this.value))
                    })
                    others.forEach(func => nextChain.then(func));
                    return nextChain

                }, 0);
            }
        }
    }

    reject(params) {
        this.status = 2;
        return this;
    }

    then(callback) {
        const cbType = typeof callback;
        if (cbType === 'function') {
            if (this.status === 0) {
                this.handlers.push(callback);
                return this;
            } else if (this.status === 1) {
                return new _Promise((resolve) => resolve(callback(this.value)));
            }
        }
    }

    catch(callback) {
        if (this.status === 0) {
            this.catcher = callback;
            return this;
        } else if (this.status === 2) {
            return new _Promise((_, reject) => reject(callback(this.value)));
        }
    }

    done() {
    }

    finnaly() {
    }

    handleReject(error) {
        if (this.catcher) {
            
        } else {
            // throw error
        }
    }
}