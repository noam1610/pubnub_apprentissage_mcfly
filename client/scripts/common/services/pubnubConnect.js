'use strict';
var servicename = 'pubnubConnect';
var PubNub = require('pubnub');
var pubnub = new PubNub({
    publishKey: 'pub-c-be1db4b4-7bf9-44c5-bb7d-e96b1be7aa53',
    subscribeKey: 'sub-c-4126d708-5e31-11e6-b3ee-02ee2ddab7fe'
});

module.exports = function(app) {

    var dependencies = ['$window'];

    function service($window) {

        // console.log('---------window.cordova.plugins-------', window.cordova.plugins);

        var sendMessage = function(channel, message) {
            return pubnub.publish({
                channel: channel,
                message: message,
                callback: function(e) {
                    console.log("SUCCESS!", e);
                    return e;
                },
                error: function(e) {
                    console.log("FAILED! RETRY PUBLISH!", e);
                    return e;
                }
            });
        };

        var linkChannel = function(channel, callback) {
            pubnub.addListener({
                status: function(statusEvent) {
                    if (statusEvent != null) {
                        console.log(statusEvent);
                    }
                },
                message: function(message) {
                    console.log("New x!!", message);
                    callback(message);
                },
                presence: function(presenceEvent) {
                    // handle presence
                }
            });
            console.log("Subscribing..");
            pubnub.subscribe({
                channels: [channel]
            });
        };

        // var initNotification = function() {

        //     var options = {
        //         android: {
        //             'senderID': '454614644444',
        //             'icon': 'images/app/logo.png',
        //             'iconColor': 'yellow',
        //             'vibrate': true,
        //             'sound': true,
        //             'forceShow': true
        //         }
        //     };

        //     console.log('Test Entrée');
        //     var push = $window.PushNotification.init(options);

        //     console.log(push);

        //     push.on('registration', function(data) {
        //         console.log('In');
        //         console.log('data', data);
        //         console.log(data.registrationId);
        //     });
        //     console.log('Test Sortie');

        //     push.on('notification', function(data) {
        //         alert('pubnub test' + '\n' + data.message);
        //         console.log('--data notification--', data);
        //         console.log(data.message);
        //         console.log(data.title);
        //         console.log(data.count);
        //         console.log(data.sound);
        //         console.log(data.image);
        //         console.log(data.additionalData);
        //     });

        //     push.on('error', function(e) {
        //         console.log(e.message);
        //     });

        //     // function onNotificationGCM(e) {
        //     //     switch (e.event) {
        //     //         case 'registered':
        //     //             if (e.regid.length > 0) {
        //     //                 alert(e.regid);
        //     //             }
        //     //             break;

        //     //         case 'message':
        //     //             if (e.foreground) {
        //     //                 // When the app is running foreground.
        //     //                 alert('The room temperature is set too high');
        //     //             }
        //     //             break;

        //     //         case 'error':
        //     //             console.log('Error: ' + e.msg);
        //     //             break;

        //     //         default:
        //     //             console.log('An unknown event was received');
        //     //             break;
        //     //     }
        //     // }

        //     // function successHandler(result) {
        //     //     console.log('Success: ' + result);
        //     // }

        //     // function errorHandler(error) {
        //     //     console.log('Error: ' + error);
        //     // }

        //     // var PushNotification = $window.PushNotification.prototype;

        //     // PushNotification.register(
        //     //     successHandler,
        //     //     errorHandler, {
        //     //         senderID: '454614644444',
        //     //         ecb: onNotificationGCM
        //     //     }
        //     // );

        //     // PushNotification.on('registration', function(data) {
        //     //     pubnub.mobile_gw_provision({
        //     //         device_id: data.registrationId,
        //     //         op: 'add',
        //     //         gw_type: 'gcm',
        //     //         channel: 'user.xxx.messages',
        //     //         error: function() {
        //     //             console('ERR');
        //     //         }
        //     //     });
        //     // });

        // };

        return {
            sendMessage: sendMessage,
            linkChannel: linkChannel
                // initNotification: initNotification
        };
    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
