class StringService {
    static randomString(): string {
        return Date.now().toString() + (Math.trunc(Math.random() * 10000)).toString()
    }
}

export {StringService}