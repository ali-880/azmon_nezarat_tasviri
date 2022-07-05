export const msgChatPage=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetMsgForChatPage':return [...action.payload]
        case 'newMsg':return [...action.payload]
        case 'DeleteMsg':return [...action.payload];
        default:return state
    }
}