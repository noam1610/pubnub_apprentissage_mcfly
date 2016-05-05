'use strict';
var servicename = 'pubnubConnect';
var pubnub = require('pubnub')({
    ssl: true,
    publish_key: "pub-c-c0d28955-fc3e-4ef2-bbee-ef5f9a594156",
    subscribe_key: "sub-c-087a270a-11fd-11e6-858f-02ee2ddab7fe"
});

module.exports = function(app) {

    var dependencies = [];

    function service() {

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

        var linkChannel = function(channel,callback) {
             pubnub.subscribe({
                channel: channel,
                message: function(message) {

                    console.log(" > ", message);
                    callback(message);
                }
            });
        };

        return {
            sendMessage: sendMessage,
            linkChannel: linkChannel
        };
    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
