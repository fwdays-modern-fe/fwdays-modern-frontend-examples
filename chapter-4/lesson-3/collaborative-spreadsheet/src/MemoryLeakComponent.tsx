import { useEffect } from "react";
import { interval } from "rxjs";

const MemoryLeakComponent = () => {
    useEffect(() => {
        const subscription = interval(1000).subscribe(count => {
            console.log(`Memory Leak Example - Count: ${count}`)
        })

        return () => {
            subscription.unsubscribe() //✅ Правильна відписка для попередження memory leak'ів
        }
    }, [])

    return <div>Check Console!</div>
}

export default MemoryLeakComponent;