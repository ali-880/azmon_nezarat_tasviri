export const Questions=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetquestionsforExam':return [...action.payload];
        case 'handleSetQuestions':return [...action.payload];
        case 'handleDeleteQuestion':return [...action.payload];
        case 'handleAddTestQuestion':return [...action.payload];
        case 'handleAddTextQuestion':return [...action.payload];
        case 'handleAddFileQuestion':return[...action.payload]
        default:return state
    }
}