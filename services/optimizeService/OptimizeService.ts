function* isTimeDone(ms: number) {
    let canCallFunction = true
    while (true) {
        if (canCallFunction) {
            canCallFunction = false
            setTimeout(() => canCallFunction = true, ms)
            yield true
        } else {
            yield false
        }
    }
}

class OptimizeService {
    static throttle(callback: (...args: any[]) => any, ms: number) {
        const timer = isTimeDone(ms)
        return (...args:Array<any>) => timer.next().value ? callback(...args) : undefined
    }
}

export {OptimizeService}
