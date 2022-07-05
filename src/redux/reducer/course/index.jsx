export const Course=(state=[],action)=>{
    switch (action.type) {
        case 'handleUserGetLessons':return [...action.payload]
        case 'removeLesson':return [...action.payload]
        default:return state
    }
}