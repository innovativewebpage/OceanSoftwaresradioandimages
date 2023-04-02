
import { combineReducers } from 'redux';

import  employeeReducer from './employeeReducers';



const reducer = combineReducers({	
	employee:employeeReducer
});

 
 
 export default reducer;