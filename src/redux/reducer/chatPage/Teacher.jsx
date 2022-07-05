export const Teacher=(state={},action)=>{
    switch (action.type) {
        case 'handleGetTeacherForChatPage':return {...action.payload}
        default:return state
    }
}