import {
    TestComponentBuilder,
    describe,
    expect,
    inject,
    beforeEachProviders,
    it
} from 'angular2/testing';
import {provide} from 'angular2/angular2';
import {Http} from 'angular2/http';
import {Api} from "./_api";

export function main() {

    class MockHttp implements Http {

        get: Function;
        post: Function;

        constructor(){
            this.get = jasmine.createSpy('get');
            this.post = jasmine.createSpy('post');
        }

    }

    describe('get', () => {

        let http = new MockHttp();
        beforeEachProviders(() => [
            provide(Api, {useValue: new Api('http://test', http)})
        ]);

        it('should properly call Http.get', inject([Api], (api) => {
            api.get('/users', 'some params');

            expect(http.get).toHaveBeenCalledWith('http://test/users', {search: 'some params'});
        }));

    });

}