'use strict';

module.exports = function(app) {
    // inject:start
    require('./pubnubConnect')(app);
    // inject:end
};