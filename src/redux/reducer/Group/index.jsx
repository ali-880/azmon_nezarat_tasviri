export const Group=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetGroup':return [...action.payload];
        default:return state
    }
}