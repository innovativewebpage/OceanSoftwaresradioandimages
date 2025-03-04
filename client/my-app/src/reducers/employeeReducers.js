import { employeeConstants } from "../constants";
export default function employeeReducer(state = [], action) {	
		switch(action.type) {
		case employeeConstants.EMPLOYEE_GET_SUCCESS:
		return action.payload;
		case employeeConstants.EMPLOYEE_INSERT_SUCCESS:
		return [...state, action.payload];
		case employeeConstants.EMPLOYEE_DELETE_SUCCESS:	
		return state.filter((stat) => stat._id !== action.payload._id);
		case employeeConstants.EMPLOYEE_UPDATE_SUCCESS:	
		return state.map((stat) => (stat._id === action.payload._id ? action.payload : stat));
   default:
		return state;

		}

}




