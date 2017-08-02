import { Injectable, Inject } from '@angular/core';

export enum Side {
    Client,
    Server
}

@Injectable()
export class SideService {
    constructor( @Inject('SIDE') readonly side: Side) {
    }

    public get isServerSide() { return this.side === Side.Server }
    public get isClientSide() { return this.side === Side.Client }

    public on<TResult>(side: Side, execute: (...args: any[]) => TResult, ...args: any[]): TResult | undefined {
        if (side === this.side) {
            return execute && execute(...args);
        }
    }
}