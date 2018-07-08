import { ActionReducerMap } from '@ngrx/store';

import { notificationReducer } from './notification.reducer';

export const InfoFeature: keyof InfoRootState = 'INFO';

export interface InfoRootState
{
    INFO: InfoFeatureState;
}

export interface InfoFeatureState
{
    notification: NotificationState;
}

export interface NotificationState
{
    messages: NotificationMessage[];
}

export interface NotificationMessage
{
    level: NotificationLevel;
    message: string;
    data?: any;
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
