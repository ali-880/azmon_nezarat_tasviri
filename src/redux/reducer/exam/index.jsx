export const Exam=(state={},action)=>{
    switch (action.type) {
        case 'handleCreateExam':return {...action.payload}
        case 'handleGetSingleExam':return {...action.payload}
        case 'handleGetOneExamForAddQues':return{...action.payload}
        case 'handleUpdateExam':return{...action.payload}
        case 'EmptyExam':return {...action.payload}
        default:return state
    }
}