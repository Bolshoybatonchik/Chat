import { makeAutoObservable } from "mobx";

class UserStore {
    user = {
        name: '',
        email: '',
        userId: '',
    }

    constructor() {
        makeAutoObservable(this)
    }

    update({name, email, id}) {
        this.user.name = name
        this.user.email = email
        this.user.userId = id
    }
}

export default new UserStore()
