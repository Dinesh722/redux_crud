const intitalstate = {
    employees :[
        {id:1, employeeName:"Dinesh", employeeDepartment: "FrontEnd developer"},
        {id:2, employeeName:"Naresh", employeeDepartment: "Software developer"}
    ]
}

const reducer = (state=intitalstate,action) =>{
    switch (action.type) {  
        case 'GET_EMPLOYEE':  
            return {  
                ...state  
            }; 
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.concat(action.payload)
            } 
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter(item => item.id !== action.payload)
            }
        case 'EDIT_EMPLOYEE':    
            return {    
                ...state,    
                employees: state.employees.map(    
                    (content, i) => content.id === action.payload.id ? {...content, employeeName : action.payload.employeeName ,  employeeDepartment : action.payload.employeeDepartment }    
                                            : content)    
            }; 
        default:  
            return state;  
    }  
}

export default reducer;