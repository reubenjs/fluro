import _ from 'lodash';

///////////////////////////////////////////////////////////////////////////////

/**
 * @classdesc A static service that provides useful helper functions and tools for other Fluro services
 * @class
 * @hideconstructor
 */
var FluroUtils = {};

///////////////////////////////////////////////////////////////////////////////

/**
 * A helpful function that can take a keyed object literal and map it to url query string parameters
 * @alias FluroUtils.mapParameters
 * @param  {Object} parameters The object you want to transalte
 * @return {String}            The query string
 * @example 
 * //Returns &this=that&hello=world
 * FluroUtils.mapParameters({"this":"that", "hello":"world"})
 */
FluroUtils.mapParameters = function(parameters) {
    return _.map(parameters, function(v, k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }).join('&');
}


///////////////////////////////////////////////////////////////////////////////

/**
 * A helpful class that can take an array of values and return them as a comma seperated
 * string, If the values are objects, then a property to use as the string representation can be specified
 * @alias FluroUtils.comma
 * @param  {Array} array The array of values to translate
 * @param  {String} path  An optional property key to use for each value
 * @return {String}       The resulting comma seperated string
 * @example
 * //Returns 'cat, dog, bird'
 * FluroUtils.comma(['cat', 'dog', 'bird']);
 * 
 * //Returns 'cat, dog, bird'
 * FluroUtils.comma([{title:'cat'}, {title:'dog'}, {title:'bird'}], 'title');
 */
FluroUtils.comma = function(array, path) {

    return _.chain(array)
    .compact()
    .map(function(item) {
        if(path) {
            return _.get(item, path);
        }

        return item;
    })
    .value()
    .join(', ');
    
}

///////////////////////////////////////////////////////////////////////////////

//Helper function to get an id of an object

/**
 * Returns a specified _id for an object
 * @alias FluroUtils.getStringID
 * @param  {Object} input      An object that is or has an _id property
 * @param  {Boolean} asObjectID Whether to convert to a Mongo ObjectId
 * @return {String}            Will return either a string or a Mongo ObjectId
 *
 * @example
 *
 * //Returns '5cb3d8b3a2219970e6f86927'
 * FluroUtils.getStringID('5cb3d8b3a2219970e6f86927')
 *
 * //Returns true
 * typeof FluroUtils.getStringID({_id:'5cb3d8b3a2219970e6f86927', title, ...}) == 'string';

 * //Returns true
 * typeof FluroUtils.getStringID({_id:'5cb3d8b3a2219970e6f86927'}, true) == 'object';
 */
FluroUtils.getStringID = function(input, asObjectID) {

    if (!input) {
        return input;
    }

    /////////////////////////////////

    var output;

    if (input._id) {
        output = String(input._id);
    } else {
        output = String(input);
    }

    if (!asObjectID) {
        return output;
    }

    return output;
    // var mongoose = require('mongoose');
    // var ObjectId = mongoose.Types.ObjectId;

    // var isValid = ObjectId.isValid(String(output));
    // if(!isValid) {
    // return;
    // }

    // return new ObjectId(output);

}

///////////////////////////////////////////////////////////////////////////////

/**
 * Cleans and maps an array of objects to an array of IDs  
 * @alias FluroUtils.arrayIDs      
 * @param  {Array} array      An array of objects or object ids
 * @param  {Boolean} asObjectID Whether or not to map the ids as Mongo ObjectIds
 * @return {Array}            An array of Ids
 *
 * @example
 * //Returns ['5cb3d8b3a2219970e6f86927', '5cb3d8b3a2219970e6f86927', '5cb3d8b3a2219970e6f86927']
 * FluroUtils.arrayIDs([{_id:'5cb3d8b3a2219970e6f86927'}, {_id:'5cb3d8b3a2219970e6f86927'}, null, '5cb3d8b3a2219970e6f86927'])
 */
FluroUtils.arrayIDs = function(array, asObjectID) {

    if (!array) {
        return array;
    }

    return _.chain(array)
        .compact()
        .map(function(input) {
            return FluroUtils.getStringID(input, asObjectID);
        })
        .compact()
        .uniq()
        .value();

}

///////////////////////////////////////////////////////////////////////////////

/**
 * Helper function for retrieving a human readable error message from server error response objects
 * @alias FluroUtils.errorMessage
 * @param  {Object} error The error object to translate    
 * @return {String}     The resulting human readable error message
 */
FluroUtils.errorMessage = function(err) {


    var candidates = [
        'response.data.message',
        'response.data',
        'message',
    ]

    ////////////////////////////////////

    var message = _.chain(candidates)
        .map(function(path) {
            return _.get(err, path);
        })
        .compact()
        .first()
        .value();

    ////////////////////////////////////
    
    if (!message || !message.length) {
        return String(err);
    }

    ////////////////////////////////////

    return message;
}





export default FluroUtils;


/////////////////////////////////////////////

//Export the event dispatcher
export function EventDispatcher() {

    var listeners = {};

    /////////////////////////////////////////////

    var dispatcher = {}

    /////////////////////////////////////////////

    //Remove all listeners
    dispatcher.removeAllListeners = function() {
        listeners = {};
    }

    /////////////////////////////////////////////

    dispatcher.dispatch = function(event, details) {

        if(listeners[event]) {

            // console.log('Listeners', event, listeners[event]);
            //For each listener
            listeners[event].forEach(function(callback) {
                //Fire the callback
                // console.log('Fire listener', event, details);
                return callback(details);
            });
        }
    } 

    /////////////////////////////////////////////
    
    dispatcher.addEventListener = function(event, callback) {

        if(!listeners[event]) {
            listeners[event] = [];
        }

        if(listeners[event].indexOf(callback) == -1) {
            //Add to the listeners
            listeners[event].push(callback)
        } else {
            //Already listening
        }
    }

    /////////////////////////////////////////////
    
    dispatcher.removeEventListener = function(event, callback) {

        if(!listeners[event]) {
            listeners[event] = [];
        }

        //Get the index of the listener
        var index = listeners[event].indexOf(callback);

        if(index != -1) {
            //Remove from the listeners
            listeners[event].splice(index,1);
        }
    }


    /////////////////////////////////////////////

    //Wrap the event listener functionality
    dispatcher.bootstrap = function(service) {
        if(!service) {
            // console.log('No service to bootstrap to')
            return;
        }

       service.dispatch = dispatcher.dispatch;
       service.addEventListener = dispatcher.addEventListener;
       service.removeEventListener = dispatcher.removeEventListener;
       service.removeAllListeners = dispatcher.removeAllListeners;
    }
    
    /////////////////////////////////////////////

    return dispatcher;
}