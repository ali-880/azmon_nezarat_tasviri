export const Time=(state={},action)=>{
    switch (action.type) {
        case 'handleGetStartTime':return {...action.payload}
        case 'handleTeacherExamChangeSetTime':return {...action.payload}
        case 'handleUpdateExamStartTime':return {...action.payload}
        default:return state
    }
}