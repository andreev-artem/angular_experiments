import {Injectable} from 'angular2/angular2';
import {Http, URLSearchParams} from 'angular2/http';

@Injectable()
export class Api {

    constructor(private _baseUrl: string, private _http: Http) {}

    private _getFullUrl(name: string): string {
        return this._baseUrl + name;
    }

    get(name: string, params?: URLSearchParams): any {
        return this._http.get(this._getFullUrl(name), {search: params});
    }

    post(name: string, data: Object): any {
        return this._http.post(this._getFullUrl(name), JSON.stringify(data));
    }

}