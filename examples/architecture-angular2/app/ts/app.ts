import {Component, bootstrap, CORE_DIRECTIVES, bind} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {UserClient} from "./bl/userClient";
import {User} from "./bl/user";
import {API_PROVIDERS} from './dal/real/_apiProviders';
import {BL_PROVIDERS} from './bl/_blProviders';

@Component({
    selector: 'app',
    templateUrl: '/js/app.html',
    directives: [CORE_DIRECTIVES]
})
export class App {

    name: string = 'World';
    users: User[];

    constructor(private _userClient: UserClient) {
        setTimeout(() => {
            this.name = 'NEW World'
        }, 2000);

        this._userClient.getAll().subscribe(data => this.users = data.users);
    }
}

export let ALL_PROVIDERS = [
    HTTP_PROVIDERS,
    API_PROVIDERS,
    BL_PROVIDERS
];
