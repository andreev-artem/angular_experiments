import {provide} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {Api} from "./_api";
import {UserApi} from "./userApi";
import {CONFIG} from '../../config';

export const API_PROVIDERS = [
    provide(Api, {
        useFactory: http => new Api(CONFIG.apiUrl, http),
        deps: [Http]
    }),
    UserApi
];