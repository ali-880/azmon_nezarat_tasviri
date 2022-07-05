export const Response=(state=[],action)=>{
    switch (action.type) {
        case 'EmptyResponse':return [...action.payload]
        case 'handleGetUserResponse':return [...action.payload];
        default:return state
    }
}