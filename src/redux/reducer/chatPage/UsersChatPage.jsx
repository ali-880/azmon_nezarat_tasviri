export const UserChatPage=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetUsersForChatPage':return [...action.payload];
        case 'usersOnline':return [...action.payload];
        case 'usersOfline':return [...action.payload];
        default:return state
    }
}