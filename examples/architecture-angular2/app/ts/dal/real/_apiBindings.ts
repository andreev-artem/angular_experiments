import {bind} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {Api} from "./_api";
import {UserApi} from "./userApi";
import {CONFIG} from '../../config';

export const API_BINDINGS = [
    bind(Api).toFactory(function (Http) {
        return new Api(CONFIG.apiUrl, Http);
    }, [Http]),
    UserApi
];