'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.pubnubConnect', '$scope'];

    function controller(pubnubConnect, $scope) {
        var vm = this;
        vm.controllername = fullname;

        vm.listMessage = [];

        vm.sendMessage = function() {
            console.log('vm.channel', vm.channel);
            console.log('vm.message', vm.message);
            pubnubConnect.sendMessage(vm.channel, vm.message);
        };

        vm.linkChannel = function(channel) {
            console.log('link channel', channel);
            pubnubConnect.linkChannel(channel, function(result) {
                console.log('result', result);
                var tmp = {
                    message: result
                };
                (vm.listMessage).push(tmp);

                console.log('vm.listMessage', vm.listMessage);
                $scope.$apply();
            });
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
