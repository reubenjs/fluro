



console.log('fluro 2.0.10')


////////////////////////////////////////////

//Import the date library
import FluroDate from './api/fluro.date';
export { FluroDate as FluroDate };

//Import the Utils library
import FluroUtils from './api/fluro.utils';
export { FluroUtils as FluroUtils };

////////////////////////////////////////////

//Export the event dispatcher class
import {EventDispatcher} from './api/fluro.utils';
export { EventDispatcher as EventDispatcher };

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//Import the pieces we need
import FluroCore from './api/fluro.core';

//Add Utils as a static property
FluroCore.utils = FluroUtils;
FluroCore.date = FluroDate;


////////////////////////////////////////////

export default FluroCore;