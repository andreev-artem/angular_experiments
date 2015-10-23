import {bind} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {UserApi} from "../real/userApi";
import {UserFakeApi} from "./userApi";

export const FAKE_API_BINDINGS = [
    bind(UserApi).toClass(UserFakeApi)
];