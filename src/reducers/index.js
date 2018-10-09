import { combineReducers } from 'redux';

import currencies from './currencies';
import browserreducer from './browsereducer' ;
import settingreducer from './setting' ;
import pickerbtc from './pickerbtc';

export default combineReducers({
  currencies,
  browseReducer : browserreducer,
  settingReducer : settingreducer,
  pickerBtcReducer : pickerbtc
});