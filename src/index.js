



console.log('fluro 2.0.61')


////////////////////////////////////////////

//Import the date library
import FluroDate from './api/fluro.date';
export { FluroDate as FluroDate };

//Import the Utils library
import FluroUtils from './api/fluro.utils';
export { FluroUtils as FluroUtils };


//Import the Utils library
import FluroVideo from './api/fluro.video';
export { FluroVideo as FluroVideo };

////////////////////////////////////////////

//Export the event dispatcher class
import {EventDispatcher} from './api/fluro.utils';
export { EventDispatcher as EventDispatcher };


////////////////////////////////////////////

//Export the event dispatcher class
import FilterService from './services/FilterService';
export { FilterService as FilterService };

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
FluroCore.video = FluroVideo;

//Export like this for now 
FluroCore.FilterService = FilterService;
FluroCore.FluroDate = FluroDate;
FluroCore.FluroUtils = FluroUtils;
FluroCore.EventDispatcher = EventDispatcher;


////////////////////////////////////////////

export default FluroCore;