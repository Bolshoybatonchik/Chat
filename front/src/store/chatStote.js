import { makeAutoObservable } from "mobx";

class ChatStore {
    listMessage = []

    constructor() {
        makeAutoObservable(this)
    }

    updateMessage(data) {
        this.listMessage = data
    }
}

export default new ChatStore()
