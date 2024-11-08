class StringService {
    static randomString(): string {
        return Date.now().toString() + (Math.trunc(Math.random() * 10000)).toString()
    }

    static formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60 / 1000)
        const seconds = Math.floor(time / 1000) % 60;
        const minutesStr = minutes.toString().padStart(2, '0')
        const secondsStr = seconds.toString().padStart(2, '0')
        return `${minutesStr}:${secondsStr}`;
    }

    static fileExtension(path: string): string | undefined {
        return path.split('.').at(-1)
    }
}

export {StringService}