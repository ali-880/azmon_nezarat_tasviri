export const StudentCourses=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetLessonForUser':return [...action.payload];
        case 'handleStudentGetLessons':return [...action.payload]
        case 'handleDeleteStudentCourse':return [...action.payload]
        default:return state
    }
}