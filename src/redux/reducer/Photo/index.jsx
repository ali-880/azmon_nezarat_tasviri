export const Photo=(state=[],action)=>{
    switch (action.type) {
        case 'removePhoto':return [...action.payload]
        case 'handleGetUserResponsePhoto':return [...action.payload]
        default:return state
    }
}