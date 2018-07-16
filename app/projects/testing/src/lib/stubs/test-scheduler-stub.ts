import { TestScheduler } from 'rxjs/testing';
import { Type } from '@angular/core';
import { Observable, Operator, of } from 'rxjs';
import { getTestScheduler } from 'jasmine-marbles';
import * as operators from 'rxjs/operators/';

export abstract class TestSchedulerStub
{
    private static scheduler?: TestScheduler = undefined;

    static init(maxFrames: number = 1000)
    {
        $this.scheduler = getTestScheduler();
        $this.scheduler.maxFrames = maxFrames;
        $this.inject($this.scheduler);
    }

    static flush()
    {
        $this.scheduler!.flush();
    }

    static inject(scheduler: TestScheduler, ...methods: (keyof typeof operators | 'all')[])
    {
        methods = methods || ['all'];
        if (methods.length === 0) { methods.push('all'); }

        for (const method of methods)
        {
            switch (method)
            {
                case 'all':
                    $this.injectIntoSampleTime(scheduler);
                    $this.injectIntoDebounceTime(scheduler);
                    $this.injectIntoThrottleTime(scheduler);
                    $this.injectIntoDelay(scheduler);
                    break;

                case 'debounceTime':
                    $this.injectIntoDebounceTime(scheduler);
                    break;

                case 'throttleTime':
                    $this.injectIntoThrottleTime(scheduler);
                    break;

                case 'delay':
                    $this.injectIntoDelay(scheduler);
                    break;

                case 'sampleTime':
                    $this.injectIntoSampleTime(scheduler);
                    break;

                default:
                    throw new Error(`Method [${method}] is not supported for injection yet.`);
            }
        }
    }

    static injectIntoSampleTime(scheduler: TestScheduler)
    {
        operators.sampleTime(0)(new Lifter(scheduler));
    }

    static injectIntoDebounceTime(scheduler: TestScheduler)
    {
        operators.debounceTime(0)(new Lifter(scheduler));
    }

    static injectIntoThrottleTime(scheduler: TestScheduler)
    {
        operators.throttleTime(0)(new Lifter(scheduler));
    }

    static injectIntoDelay(scheduler: TestScheduler)
    {
        operators.delay(0)(new Lifter(scheduler));
    }
}

class Lifter extends Observable<any>
{
    constructor(readonly scheduler: TestScheduler)
    {
        super();
    }
    lift(operator: Type<Operator<any, any>>): Observable<any>
    {
        Object.defineProperty((operator as any).__proto__,
            'scheduler', {
                get: () => this.scheduler,
                set: (x) => { }
            });
        return of();
    }
}

const $this = TestSchedulerStub;
