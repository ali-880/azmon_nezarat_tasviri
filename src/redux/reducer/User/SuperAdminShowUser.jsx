export const SuperAdminShowUser=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetUserForAdmin':return [...action.payload];
        case 'handleDeleteUser':return [...action.payload];
        default:return state
    }
}