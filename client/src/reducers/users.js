const usersReducer = (states = [], actions) => {  
    switch(actions.type){
        case "FETCH_USERS":
            return actions.payload;
        case "UPDATE_CURRENT_USER":
            return states.map((state)=> state._id === actions.payload._id ? actions.payload : states);
        default:
            return states;
    }
}

export default usersReducer;