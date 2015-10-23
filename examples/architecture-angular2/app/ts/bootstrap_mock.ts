import {bootstrap} from 'angular2/angular2';
import {App, ALL_BINDINGS} from "./app";
import {API_BINDINGS} from './dal/real/_apiBindings';
import {FAKE_API_BINDINGS} from './dal/fake/_fakeApiBindings';

ALL_BINDINGS.push(FAKE_API_BINDINGS);

bootstrap(App, ALL_BINDINGS);