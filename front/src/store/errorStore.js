import { makeAutoObservable } from "mobx";


class ErrorStore {
    registrationError = ''
    loginError = ''

    constructor() {
        makeAutoObservable(this)
    }

    getLoginError(error) {
        this.loginError = error
    }

    resetLoginError() {
        this.loginError = false
    }

    getRegistrationError(error) {
        this.registrationError = error
    }
    resetRegistrationError() {
        this.registrationError = false
    }
}

export default new ErrorStore()
