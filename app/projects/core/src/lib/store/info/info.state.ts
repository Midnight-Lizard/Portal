import { Params } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';

import { notificationReducer } from './notification.reducer';

export const InfoFeature: keyof InfoRootState = 'INFO';

export interface InfoRootState
{
    readonly INFO: InfoFeatureState;
}

export interface InfoFeatureState
{
    readonly notification: NotificationState;
}

export interface NotificationState
{
    readonly messages: NotificationMessage[];
    readonly lastMessage?: NotificationMessage;
}

export interface NotificationMessage
{
    readonly id?: number;
    readonly level: NotificationLevel;
    readonly message: string;
    readonly isLocal: boolean;
    readonly data?: any;
    readonly actions?: NotificationAction[];
}

export interface NotificationAction
{
    readonly title: string;
    readonly description: string;
    readonly route: string;
    readonly routeParams?: Params;
}

export enum NotificationLevel
{
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}

export const infoReducers: ActionReducerMap<InfoFeatureState> = {
    notification: notificationReducer
};

export const infoInitialState: InfoFeatureState = {
    notification: {
        messages: []
    }
};
