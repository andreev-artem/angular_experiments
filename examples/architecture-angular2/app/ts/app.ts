import {Component, bootstrap, CORE_DIRECTIVES, bind} from 'angular2/angular2';
import {HTTP_BINDINGS, Http} from 'angular2/http';
import {UserClient} from "./bl/userClient";
import {User} from "./bl/user";
import {API_BINDINGS} from './dal/real/_apiBindings';
import {BL_BINDINGS} from './bl/_blBindings';

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

export let ALL_BINDINGS = [
    HTTP_BINDINGS,
    API_BINDINGS,
    BL_BINDINGS
];
