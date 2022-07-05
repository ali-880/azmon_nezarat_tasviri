export const TeacherLessons=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetLessonsForTeacher':return [...action.payload]
        default:return state
    }
}