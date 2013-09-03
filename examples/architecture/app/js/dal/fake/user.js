'use strict';

angular.module('app.dal.fake.user', [])

.factory('UserFakeApi', function($q, UserFakeData){

    var UserFakeApi = {};

    UserFakeApi.get = function(id){
        var user = _.find(UserFakeData, {id: id});

        if (angular.isUndefined(user)) {
            return $q.reject('404');
        }

        return $q.when(user);
    };

    UserFakeApi.query = function(params){
        var page = params && params.page || 1;
        var limit = params && params.limit || 10;

        return $q.when({
            data: UserFakeData.slice((page - 1) * limit, page * limit),
            total: UserFakeData.length
        });
    };

    UserFakeApi.create = function(data){
        var newUser = angular.copy(data);
        newUser.id = _.last(UserFakeData).id + 1;
        UserFakeData.push(newUser);
        return $q.when(newUser);
    };

    UserFakeApi.update = function(data){
        var user = _.find(UserFakeData, {id: data.id});

        if (angular.isUndefined(user)) {
            return $q.reject('404');
        }

        angular.extend(user, data);

        return $q.when(user);
    };

    UserFakeApi.remove = function(id){
        UserFakeData.splice(_.findIndex(UserFakeData, {id: id}), 1);
    };


    return UserFakeApi;
})

.value('UserFakeData', [
    {"id": 1, extSync: true, "firstName": "Korey", "lastName": "Orn", "middleName": "R", "email": "anita.morar@mailinator.com"},
    {"id": 2, extSync: false, "firstName": "Kathryne", "lastName": "Rippin", "middleName": "U", "email": "ken@mailinator.com"},
    {"id": 3, extSync: false, "firstName": "Skylar", "lastName": "Schuster", "middleName": "M", "email": "adele_waters@mailinator.com"},
    {"id": 4, extSync: false, "firstName": "Bradly", "lastName": "Satterfield", "middleName": "S", "email": "cathrine@mailinator.com"},
    {"id": 5, extSync: true, "firstName": "Saige", "lastName": "Schaefer", "middleName": "I", "email": "mariano@mailinator.com"},
    {"id": 6, extSync: false, "firstName": "Bella", "lastName": "Keeling", "middleName": "C", "email": "leanne@mailinator.com"},
    {"id": 7, extSync: false, "firstName": "Camila", "lastName": "Gislason", "middleName": "A", "email": "alexane@mailinator.com"},
    {"id": 8, extSync: false, "firstName": "Adrain", "lastName": "Smith", "middleName": "B", "email": "faustino@mailinator.com"},
    {"id": 9, extSync: true, "firstName": "Kyla", "lastName": "Weber", "middleName": "Z", "email": "shaina.witting@mailinator.com"},
    {"id": 10, extSync: false, "firstName": "Alvena", "lastName": "Gleichner", "middleName": "N", "email": "makayla@mailinator.com"},
    {"id": 11, extSync: true, "firstName": "Jessyca", "lastName": "Mante", "middleName": "S", "email": "kaden@mailinator.com"},
    {"id": 12, extSync: false, "firstName": "Lincoln", "lastName": "Schuppe", "middleName": "X", "email": "demond.heidenreich@mailinator.com"},
    {"id": 13, extSync: false, "firstName": "Earnest", "lastName": "Feil", "middleName": "I", "email": "oma_hahn@mailinator.com"},
    {"id": 14, extSync: false, "firstName": "Cathy", "lastName": "Reichel", "middleName": "D", "email": "lysanne@mailinator.com"},
    {"id": 15, extSync: true, "firstName": "Laurie", "lastName": "Rippin", "middleName": "O", "email": "reymundo@mailinator.com"},
    {"id": 16, extSync: false, "firstName": "Lacey", "lastName": "Haley", "middleName": "W", "email": "nicolas@mailinator.com"},
    {"id": 17, extSync: false, "firstName": "Alfredo", "lastName": "McGlynn", "middleName": "K", "email": "marielle_graham@mailinator.com"},
    {"id": 18, extSync: false, "firstName": "Susie", "lastName": "Lowe", "middleName": "C", "email": "eula@mailinator.com"},
    {"id": 19, extSync: true, "firstName": "Maymie", "lastName": "Von", "middleName": "I", "email": "ralph@mailinator.com"},
    {"id": 20, extSync: false, "firstName": "Jazmin", "lastName": "Boyle", "middleName": "L", "email": "naomie_hintz@mailinator.com"},
    {"id": 21, extSync: true, "firstName": "Ruth", "lastName": "Kulas", "middleName": "Z", "email": "alexie@mailinator.com"},
    {"id": 22, extSync: false, "firstName": "Lonzo", "lastName": "Reynolds", "middleName": "Q", "email": "kim_predovic@mailinator.com"},
    {"id": 23, extSync: false, "firstName": "Chris", "lastName": "Price", "middleName": "J", "email": "laisha_stracke@mailinator.com"},
    {"id": 24, extSync: false, "firstName": "Kelvin", "lastName": "Heller", "middleName": "Pamela", "email": "angelo.parker@mailinator.com"},
    {"id": 25, extSync: true, "firstName": "Marcelino", "lastName": "Schimmel", "middleName": "H", "email": "ryley_lesch@mailinator.com"},
    {"id": 26, extSync: false, "firstName": "Chaim", "lastName": "Hand", "middleName": "E", "email": "haylee@mailinator.com"},
    {"id": 27, extSync: false, "firstName": "Enola", "lastName": "Breitenberg", "middleName": "N", "email": "isabella.lynch@mailinator.com"},
    {"id": 28, extSync: false, "firstName": "Amely", "lastName": "Wolff", "middleName": "J", "email": "erich@mailinator.com"},
    {"id": 29, extSync: true, "firstName": "Camron", "lastName": "VonRueden", "middleName": "D", "email": "oda_waters@mailinator.com"},
    {"id": 30, extSync: false, "firstName": "Ruben", "lastName": "Goyette", "middleName": "P", "email": "juanita_wilderman@mailinator.com"},
    {"id": 31, extSync: true, "firstName": "Patsy", "lastName": "Gleichner", "middleName": "F", "email": "cameron@mailinator.com"},
    {"id": 32, extSync: false, "firstName": "Eldridge", "lastName": "Cartwright", "middleName": "J", "email": "jeremy@mailinator.com"},
    {"id": 33, extSync: false, "firstName": "Keshawn", "lastName": "Ernser", "middleName": "D", "email": "walton_funk@mailinator.com"},
    {"id": 34, extSync: false, "firstName": "Bianka", "lastName": "Schiller", "middleName": "Z", "email": "leon.kreiger@mailinator.com"},
    {"id": 35, extSync: true, "firstName": "Ashtyn", "lastName": "Fisher", "middleName": "E", "email": "zack.kuhn@mailinator.com"},
    {"id": 36, extSync: false, "firstName": "Eileen", "lastName": "Hoppe", "middleName": "H", "email": "ariel@mailinator.com"},
    {"id": 37, extSync: false, "firstName": "Eda", "lastName": "Adams", "middleName": "P", "email": "herbert_balistreri@mailinator.com"},
    {"id": 38, extSync: false, "firstName": "Omari", "lastName": "Eichmann", "middleName": "Charley", "email": "jayson.lang@mailinator.com"},
    {"id": 39, extSync: true, "firstName": "Ernie", "lastName": "Wilderman", "middleName": "C", "email": "jacinthe@mailinator.com"},
    {"id": 40, extSync: false, "firstName": "Magali", "lastName": "Becker", "middleName": "Z", "email": "milton@mailinator.com"},
    {"id": 41, extSync: true, "firstName": "Misael", "lastName": "Eichmann", "middleName": "W", "email": "joesph@mailinator.com"},
    {"id": 42, extSync: false, "firstName": "Germaine", "lastName": "Bruen", "middleName": "Y", "email": "amira.schulist@mailinator.com"},
    {"id": 43, extSync: false, "firstName": "Jaclyn", "lastName": "Nolan", "middleName": "I", "email": "royce_runolfsson@mailinator.com"},
    {"id": 44, extSync: false, "firstName": "Mabel", "lastName": "Kozey", "middleName": "H", "email": "maddison@mailinator.com"},
    {"id": 45, extSync: true, "firstName": "Theresia", "lastName": "Renner", "middleName": "K", "email": "izabella_crooks@mailinator.com"},
    {"id": 46, extSync: false, "firstName": "Aida", "lastName": "Kuvalis", "middleName": "R", "email": "princess@mailinator.com"},
    {"id": 47, extSync: false, "firstName": "Amely", "lastName": "Johns", "middleName": "L", "email": "madisen@mailinator.com"},
    {"id": 48, extSync: false, "firstName": "Gaylord", "lastName": "Brown", "middleName": "P", "email": "elfrieda@mailinator.com"},
    {"id": 49, extSync: true, "firstName": "Camren", "lastName": "Willms", "middleName": "W", "email": "audie_west@mailinator.com"},
    {"id": 50, extSync: false, "firstName": "German", "lastName": "Waters", "middleName": "H", "email": "augustine@mailinator.com"},
    {"id": 51, extSync: true, "firstName": "Carlotta", "lastName": "Legros", "middleName": "P", "email": "joanny@mailinator.com"},
    {"id": 52, extSync: false, "firstName": "Micaela", "lastName": "McLaughlin", "middleName": "T", "email": "haylee.friesen@mailinator.com"},
    {"id": 53, extSync: false, "firstName": "Millie", "lastName": "Streich", "middleName": "G", "email": "herta@mailinator.com"},
    {"id": 54, extSync: false, "firstName": "Brandyn", "lastName": "Conroy", "middleName": "V", "email": "eliseo@mailinator.com"},
    {"id": 55, extSync: true, "firstName": "Weston", "lastName": "Bailey", "middleName": "A", "email": "meaghan_harann@mailinator.com"},
    {"id": 56, extSync: false, "firstName": "Estrella", "lastName": "Heaney", "middleName": "K", "email": "blanca@mailinator.com"},
    {"id": 57, extSync: false, "firstName": "Mina", "lastName": "Lehner", "middleName": "R", "email": "breanna@mailinator.com"},
    {"id": 58, extSync: false, "firstName": "Aleen", "lastName": "Schuster", "middleName": "B", "email": "katrina@mailinator.com"},
    {"id": 59, extSync: true, "firstName": "Lee", "lastName": "Rippin", "middleName": "R", "email": "cristian@mailinator.com"},
    {"id": 60, extSync: false, "firstName": "Justyn", "lastName": "Jast", "middleName": "Kassandra", "email": "jonas@mailinator.com"},
    {"id": 61, extSync: true, "firstName": "Rebeca", "lastName": "Tromp", "middleName": "S", "email": "janie@mailinator.com"},
    {"id": 62, extSync: false, "firstName": "Mable", "lastName": "Bauch", "middleName": "N", "email": "shawn@mailinator.com"},
    {"id": 63, extSync: false, "firstName": "Itzel", "lastName": "Orn", "middleName": "D", "email": "tracey_mosciski@mailinator.com"},
    {"id": 64, extSync: false, "firstName": "Joshua", "lastName": "Crooks", "middleName": "P", "email": "xzavier@mailinator.com"},
    {"id": 65, extSync: true, "firstName": "Jaylen", "lastName": "Flatley", "middleName": "G", "email": "filiberto.gaylord@mailinator.com"},
    {"id": 66, extSync: false, "firstName": "Demarco", "lastName": "Ferry", "middleName": "X", "email": "cora_oberbrunner@mailinator.com"},
    {"id": 67, extSync: false, "firstName": "Alan", "lastName": "DuBuque", "middleName": "T", "email": "delores@mailinator.com"},
    {"id": 68, extSync: false, "firstName": "Timmy", "lastName": "Tromp", "middleName": "X", "email": "salvador.leannon@mailinator.com"},
    {"id": 69, extSync: true, "firstName": "Herminio", "lastName": "Rowe", "middleName": "N", "email": "emmett_feil@mailinator.com"},
    {"id": 70, extSync: false, "firstName": "Tillman", "lastName": "Hilpert", "middleName": "J", "email": "kaia@mailinator.com"},
    {"id": 71, extSync: true, "firstName": "Dario", "lastName": "Waters", "middleName": "Toney", "email": "nigel.bednar@mailinator.com"},
    {"id": 72, extSync: false, "firstName": "Barry", "lastName": "Kilback", "middleName": "G", "email": "kendall.greenfelder@mailinator.com"},
    {"id": 73, extSync: false, "firstName": "Zakary", "lastName": "Kiehn", "middleName": "A", "email": "stephania.reynolds@mailinator.com"},
    {"id": 74, extSync: false, "firstName": "Harmon", "lastName": "Hyatt", "middleName": "T", "email": "marielle@mailinator.com"},
    {"id": 75, extSync: true, "firstName": "Brent", "lastName": "Pfeffer", "middleName": "T", "email": "sandra.champlin@mailinator.com"},
    {"id": 76, extSync: false, "firstName": "Hollie", "lastName": "Heidenreich", "middleName": "R", "email": "liam.sporer@mailinator.com"},
    {"id": 77, extSync: false, "firstName": "Angie", "lastName": "Jeter", "middleName": "S", "email": "albert@mailinator.com"},
    {"id": 78, extSync: false, "firstName": "Milo", "lastName": "Raynor", "middleName": "D", "email": "alysa_little@mailinator.com"},
    {"id": 79, extSync: true, "firstName": "Rickie", "lastName": "Paucek", "middleName": "U", "email": "madelynn.von@mailinator.com"},
    {"id": 80, extSync: false, "firstName": "Elizabeth", "lastName": "Balistreri", "middleName": "D", "email": "jodie@mailinator.com"},
    {"id": 81, extSync: true, "firstName": "Mustafa", "lastName": "Brekke", "middleName": "A", "email": "maxine_keebler@mailinator.com"},
    {"id": 82, extSync: false, "firstName": "Ivah", "lastName": "Wisoky", "middleName": "I", "email": "marco@mailinator.com"},
    {"id": 83, extSync: false, "firstName": "Eleazar", "lastName": "Lowe", "middleName": "C", "email": "jayce@mailinator.com"},
    {"id": 84, extSync: false, "firstName": "Geoffrey", "lastName": "Wilkinson", "middleName": "H", "email": "dasia.toy@mailinator.com"},
    {"id": 85, extSync: true, "firstName": "Una", "lastName": "Marks", "middleName": "S", "email": "virgie@mailinator.com"},
    {"id": 86, extSync: false, "firstName": "Willow", "lastName": "Rolfson", "middleName": "U", "email": "dave_mosciski@mailinator.com"},
    {"id": 87, extSync: false, "firstName": "Mariano", "lastName": "Labadie", "middleName": "L", "email": "frederic.rodriguez@mailinator.com"},
    {"id": 88, extSync: false, "firstName": "Maritza", "lastName": "Wiza", "middleName": "W", "email": "milan.hoeger@mailinator.com"},
    {"id": 89, extSync: true, "firstName": "Jeremie", "lastName": "Glover", "middleName": "G", "email": "mauricio@mailinator.com"},
    {"id": 90, extSync: false, "firstName": "Darby", "lastName": "Swift", "middleName": "R", "email": "remington.reilly@mailinator.com"},
    {"id": 91, extSync: true, "firstName": "Leila", "lastName": "Hodkiewicz", "middleName": "B", "email": "hyman_fritsch@mailinator.com"},
    {"id": 92, extSync: false, "firstName": "Toby", "lastName": "Senger", "middleName": "C", "email": "matilde@mailinator.com"},
    {"id": 93, extSync: false, "firstName": "Nickolas", "lastName": "Reynolds", "middleName": "C", "email": "kelvin_kuhic@mailinator.com"},
    {"id": 94, extSync: false, "firstName": "Maverick", "lastName": "Hilll", "middleName": "E", "email": "eryn@mailinator.com"},
    {"id": 95, extSync: true, "firstName": "Allie", "lastName": "Flatley", "middleName": "N", "email": "brent@mailinator.com"},
    {"id": 96, extSync: false, "firstName": "Irving", "lastName": "Rodriguez", "middleName": "W", "email": "alva.lubowitz@mailinator.com"},
    {"id": 97, extSync: false, "firstName": "Leonor", "lastName": "D'Amore", "middleName": "D", "email": "verla@mailinator.com"},
    {"id": 98, extSync: false, "firstName": "Randi", "lastName": "Rutherford", "middleName": "C", "email": "cory_kautzer@mailinator.com"},
]);