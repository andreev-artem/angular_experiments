# OUTDATED

# Example of AngularJS app architecture

It contains very limited amount of very simple code to illustrate the general approach to the building of multi-layered application. [Demo](http://andreev-artem.github.io/angular_experiments/examples/architecture/app/index_mock.html#/admin/users) - nothing interesting regarding to UI but it works.

Similar (but more complex) architecture was used in two real-life big applications.

It is not a silver bullet. Some names and directory hierarchy are debatable (we used slightly other names and structure).
You should consider such architecture as a starting point for your own architecture of your app.

**Credits**: we wouldn't have such architecture without our Head Javascript Developer [Artem Chivchalov](https://github.com/artch).

## Structure

* **app**
    * **css** - contains auto generated css-file for yor less styles
    * **fonts** - contains fonts for icons, etc
    * **images**
    * **js**
        * **dal** - Data Access Layer
            * **entities** - business objects of your app. Here you can add caching logic, translation from server-side models to client-side and back, validation logic, etc.
            * **fake** - replacement for REST API layer with fake data. For e2e tests, prof-of-concept implementations, etc.
            * **rest** - REST API layer which will be used by your business objects. Common rule: "one endpoint - one method". Here you can add parameters and responses preprocessing, common errors handling, etc. Also it can be seen as a documentation of API.
            * ***api.js*** - abstraction of the HTTP/AJAX calls. Here you can add raw-level errors handling, some common settings (withCredentials, apiUrl, etc), some common parameters (ex: rformat), additional methods that are not in $http (ex: postFile using XMLHttpRequest2) etc.
        * **lib** - common non-business logic of your app
            * **directives** - non-UI directives (without templates).
            * **filters**
            * **ui** - widgets/components with UI part.
                * **templates** - templates for widgets/components which will be processed using html2js Grunt task.
        * **pages** - business logic of your pages (controllers, specific services, directives, etc). Take a look deeper for organization of multi-layered pages using tree-like nested views and controllers hierarchies.
        * ***app.js*** - setup of base app with real API calls and mocked app with fake data.
    * **less**
    * **lib** - external libs and frameworks.
    * **views** - html templates for routes or segments.
* **config** - Karma config, app-specific configs (ex: dev and prod urls), etc.
* **test** - unit and e2e tests + libs and Jasmine helpers.
* ***Gruntfile.js*** - watch, html2js, karma and any other tasks which you want to use to automate your workflows.

## Simple diagram for the implemented example

![App diagram](https://raw.github.com/andreev-artem/angular_experiments/master/examples/architecture/docs/arch.png)