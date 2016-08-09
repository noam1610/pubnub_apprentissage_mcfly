'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.pubnubConnect', '$scope', '$window'];

    function controller(pubnubConnect, $scope, $window) {
        var vm = this;
        vm.controllername = fullname;

        vm.listMessage = [];

        // onNotificationGCM = function(e) {
        //     switch (e.event) {
        //         case 'registered':
        //             if (e.regid.length > 0) {
        //                 alert(e.regid);
        //             }
        //             break;

        //         case 'message':
        //             if (e.foreground) {
        //                 // When the app is running foreground.
        //                 alert('The room temperature is set too high');
        //             }
        //             break;

        //         case 'error':
        //             console.log('Error: ' + e.msg);
        //             break;

        //         default:
        //             console.log('An unknown event was received');
        //             break;
        //     }
        // };

        console.log('-----window----', window);
        console.log('----$window-----', $window);
        //console.log('$window.PushNotification', $window.PushNotification);

        // var PushNotification = $window.PushNotification.prototype;

        // PushNotification.register(
        //     successHandler,
        //     errorHandler, {
        //         'senderID': '454614644444',
        //         'ecb': 'vm.onNotificationGCM' // callback function
        //     }
        // );

        // function successHandler(result) {
        //     console.log('Success: ' + result);
        // }

        // function errorHandler(error) {
        //     console.log('Error: ' + error);
        // }

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

        //pubnubConnect.initNotification();
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
