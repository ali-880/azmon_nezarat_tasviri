export const Exams=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetExamForCourse':return [...action.payload]
        case 'handleUserGetExams':return [...action.payload]
        case 'handleAddExamToExams':return [...action.payload]
        case 'handleUpdateExams':return [...action.payload]
        case 'removeExams':return [...action.payload]
        default:return state
    }
}