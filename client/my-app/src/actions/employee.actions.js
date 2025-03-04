import axios from "axios";
import { employeeConstants } from "../constants";
export const getEmployeeInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get(`/api/employee/read`);
	//console.log('res==',res);
	if(res.status === 200){
	 dispatch({
                type:employeeConstants.EMPLOYEE_GET_SUCCESS,
                payload: res.data,
            });
	}

  };
};


export const employeeInsert = (formData) => async (dispatch) => {
const res = await axios.post(`/api/employee/create`,formData);
		if(res.status === 201){
			dispatch({
                type: employeeConstants.EMPLOYEE_INSERT_SUCCESS,
                payload: res.data.data
            })  
        }
}



/*export const employeeInsert = (user) => async (dispatch) => {
	
	
	  const res = await axios.post(`/api/employee/create`, {
            ...user
        });
		
		if(res.status === 201){
			dispatch({
                type: employeeConstants.EMPLOYEE_INSERT_SUCCESS,
                payload: res.data.data
            })  
        }
}
*/

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const {data} = await axios.delete(`/api/employee/${id}`);
	dispatch({ type:employeeConstants.EMPLOYEE_DELETE_SUCCESS, payload: data });  
  } catch (error) {
   console.log(error.message);
  }
};

/*
export const updateEmployee = (id,user) => async (dispatch) => {
  try {  
const {data} = await axios.put(`/api/employee/${id}`, {
            ...user
        });
		
  dispatch({ type: employeeConstants.EMPLOYEE_UPDATE_SUCCESS,payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
*/
export const updateEmployee = (id,formData) => async (dispatch) => {
  try {  
const {data} = await axios.put(`/api/employee/${id}`, formData);
  dispatch({ type: employeeConstants.EMPLOYEE_UPDATE_SUCCESS,payload: data });
  } catch (error) {
    console.log(error.message);
  }
};