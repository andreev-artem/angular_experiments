global.e2e = {

    _wrap: function(parentElem, val){
        // css selector
        if(typeof val === 'string') {
            if(val.indexOf('$$') === 0) {
                val = val.replace('$$', '');
                if(parentElem) {
                    return parentElem.$$(val);
                }
                return element.all(by.css(val));
            }
            if(parentElem) {
                return parentElem.element(by.css(val));
            }
            return element(by.css(val));
        // locator
        } else if(val.using !== undefined || val.findElementsOverride !== undefined) {
            if(parentElem) {
                return parentElem.element(val);
            }
            return element(val);
        // element
        } else {
            return val;
        }
    },

    pageFactory: function(locators, parentElem){
        var page, parentMode = false;
        if(locators['__elem__'] !== undefined) {
            page = e2e._wrap(parentElem ? parentElem : null, locators['__elem__']);
            delete locators['__elem__'];
            parentMode = true;
        } else {
            page = {};
        }
        for(var key in locators){
            if( typeof locators[key] === 'object' &&
                // not a locator
                locators[key].findElementsOverride === undefined &&
                locators[key].using === undefined &&
                // not an element
                locators[key].ptor_ === undefined){

                page[key] = e2e.pageFactory(locators[key], parentMode ? page : parentElem);
            } else {
                page[key] = e2e._wrap(parentMode ? page : parentElem, locators[key]);
            }
        }
        return page;
    },

    addChildElements: function (elem, childDefinitions) {
        for(var key in childDefinitions) {
            elem[key] = e2e._wrap(elem, childDefinitions[key]);
        }
    }

};
