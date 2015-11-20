import {bootstrap} from 'angular2/angular2';
import {App, ALL_PROVIDERS} from "./app";
import {API_PROVIDERS} from './dal/real/_apiProviders';
import {FAKE_API_PROVIDERS} from './dal/fake/_fakeApiProviders';

ALL_PROVIDERS.push(FAKE_API_PROVIDERS);

bootstrap(App, ALL_PROVIDERS);