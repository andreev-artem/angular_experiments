'use strict';

describe('home', () => {

    var page = e2e.pageFactory({
        users: '$$.m-users li',
        getUser: function (index) {
            var user = this.users.get(index);

            e2e.addChildElements(user, {
                fullName: '.m-user-full-name',
                email: '.m-user-email'
            });

            return user;
        }
    });

    it('should display 10 users', () => {
        browser.get('/mocked/');

        expect(page.users.count()).toBe(10);
    });

    it('should display user info', () => {
        expect(page.getUser(0).fullName.getText()).toBe('FAKE Korey R Orn');
        expect(page.getUser(0).email.getText()).toBe('anita.morar@mailinator.com');
    });

});