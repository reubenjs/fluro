

console.log('fluro v1.0.67')

//Import the pieces we need
import FluroCore from './api/fluro.core';
import FluroUtils from './api/fluro.utils';


//Add Utils as a static property
FluroCore.utils = FluroUtils;


////////////////////////////////////////////

export default FluroCore;

////////////////////////////////////////////

//Export the event dispatcher
import {EventDispatcher} from './api/fluro.utils';
export { EventDispatcher as EventDispatcher };
