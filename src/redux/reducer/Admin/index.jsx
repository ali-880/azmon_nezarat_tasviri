export const Admin=(state=[],action)=>{
    switch (action.type) {
        case 'HandleAdmin':return [...action.payload];
        case 'handleDeleteAdmin':return [...action.payload]
        default:return state
    }
}