import {
    TestComponentBuilder,
    describe,
    expect,
    injectAsync,
    it
} from 'angular2/testing';
import {User} from "./user";

export function main() {

    describe('getFullName', () => {

        it('should return properly constructed full name if all parts are specified', () => {
            let user = User.fromJson({firstName: 'someFirstName', lastName: 'someLastName', middleName: 'M'});

            let res = user.getFullName();

            expect(res).toBe('someFirstName M someLastName');
        });

    });

}