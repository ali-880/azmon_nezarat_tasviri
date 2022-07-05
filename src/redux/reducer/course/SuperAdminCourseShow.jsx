export const SuperAdminCourseShow=(state=[],action)=>{
    switch (action.type) {
        case 'handleAdminGetCourses':return [...action.payload]
        case 'handleDeleteCourse':return [...action.payload]
        default:return state
    }
}