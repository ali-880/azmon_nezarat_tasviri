export const LssonsChatPage=(state={},action)=>{
    switch (action.type) {
        case 'handleGetLessonForChatPage':return {...action.payload}
        case 'handleGetSingleExamLesson':return {...action.payload}
        default:return state
    }
}