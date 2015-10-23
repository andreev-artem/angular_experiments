import {
    TestComponentBuilder,
    describe,
    expect,
    inject,
    beforeEachProviders,
    it
} from 'angular2/testing';
import {provide} from 'angular2/angular2';
import {Observable} from 'rx';
import {UserClient} from "./userClient";
import {UserApi} from "../dal/real/userApi";
import {Api} from "../dal/real/_api";

export function main() {

    var result;
    class MockUserApi extends UserApi {

        getAll(){
            return Observable.just(result);
        }

    }

    describe('getAll', () => {

        beforeEachProviders(() => [
            provide(Api, {useValue: {}}),
            provide(UserApi, {useClass: MockUserApi}),
            UserClient
        ]);

        it('should return properly constructed result', inject([UserClient], (uc) => {
            result = {
                data: [],
                total: 0
            };

            uc.getAll().subscribe(result => {
                expect(result.users).toEqual([]);
                expect(result.total).toBe(0);
            });
        }));

    });

}