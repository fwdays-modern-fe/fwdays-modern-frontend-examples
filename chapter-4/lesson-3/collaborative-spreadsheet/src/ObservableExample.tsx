import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Observable, of } from 'rxjs'
import { map, filter, take } from 'rxjs/operators';

const ObservableExampleComponent = () => {
    const [basicValues, setBasicValues] = useState([]);
    const [intervalValues, setIntervalValues] = useState([]);
    const [mappedValues, setMappedValues] = useState([]);
    const [firstValue, setFirstValue] = useState(null);

    // Приклад 1: Basic Observable
    const runBasicExample = () => {
        setBasicValues([]);

        const observable = new Observable((subscriber) => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            setTimeout(() => {
                subscriber.next(4);
                subscriber.complete();
            }, 1000)
        });

        observable.subscribe({
            next: (value) => setBasicValues(prev => [...prev, value]),
            complete: () => setBasicValues(prev => [...prev, 'COMPLETE'])
        });
    };


    // Приклад 2: Interval Observable
    const runIntervalExample = () => {
        setIntervalValues([])

        const observable = new Observable((subscriber) => {
            let count = 0;

            const interval = setInterval(() => {
                count++

                subscriber.next(`Value: ${count}`)

                if (count === 4) {
                    subscriber.complete();
                    clearInterval(interval);
                }

            }, 1000)
        })

        observable.subscribe({
            next: (value) => setIntervalValues(prev => [...prev, value]),
            complete: () => setIntervalValues(prev => [...prev, 'COMPLETE'])
        })

    };

    // Приклад 3: Map Operator
    const runMapExample = () => {
        setMappedValues([])

        of(1, 2, 3, 4, 5)
            .pipe(
                map((x) => x * x),
                filter((x) => x !== 25)
            )
            .subscribe((v) => setMappedValues(prev => [...prev, `values: ${v}`]));
    };


    // Приклад 4: First Operator
    const runFirstExample = () => {
        setFirstValue(null)

        of(1, 2, 3, 4, 5)
            .pipe(take(2))
            .subscribe((v) => setFirstValue(`values: ${v}`))

    };

    return (
        <div className="space-y-4 w-full max-w-2xl">
            {/* Basic Observable */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Basic Observable
                        <Button onClick={runBasicExample} className="ml-2">
                            <Play className="w-4 h-4 mr-2" />
                            Run
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="font-mono bg-slate-100 p-4 rounded">
                        {basicValues.map((value, index) => (
                            <div key={index} className="text-sm">
                                {value}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Interval Observable */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Interval Observable
                        <Button onClick={runIntervalExample} className="ml-2">
                            <Play className="w-4 h-4 mr-2" />
                            Run
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="font-mono bg-slate-100 p-4 rounded">
                        {intervalValues.map((value, index) => (
                            <div key={index} className="text-sm">
                                {value}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Map Operator */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Map Operator
                        <Button onClick={runMapExample} className="ml-2">
                            <Play className="w-4 h-4 mr-2" />
                            Run
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="font-mono bg-slate-100 p-4 rounded">
                        {mappedValues.map((value, index) => (
                            <div key={index} className="text-sm">
                                {value}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* First Operator */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        First Operator
                        <Button onClick={runFirstExample} className="ml-2">
                            <Play className="w-4 h-4 mr-2" />
                            Run
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="font-mono bg-slate-100 p-4 rounded">
                        {firstValue && <div className="text-sm">{firstValue}</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ObservableExampleComponent;