export const chatWithTeacher=(state=[],action)=>{
    switch (action.type) {
        case 'setUserChatWithTeacher':return [...action.payload];
        case 'handleSendMessageForTeacher':return [...action.payload];
        case 'handleDeleteTeacherChat':return [...action.payload];
        default:return state
    }
}