const questionsReducer = (state = {data:null}, actions) => {  
    switch(actions.type){
        case "POST_QUESTION":
            return { ...state };
        case "POST_ANSWER":
            return { ...state };
        case "FETCH_ALL_QUESTIONS":
            return { ...state, data: actions.payload };
        default:
            return state;
    }
}

export default questionsReducer;