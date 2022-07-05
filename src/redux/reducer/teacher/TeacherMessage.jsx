export const TeacherMessage=(state=[],action)=>{
    switch (action.type) {
        case 'handleGetTeacherMessageFromStudent':return [...action.payload]
        default:
            return state;
    }
}