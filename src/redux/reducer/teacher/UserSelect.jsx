export const UserSelect=(state={},action)=>{
    switch (action.type) {
        case 'handleGetUserForTeacher':return {...action.payload}
        case 'removeUserSelect':return {...action.payload}
        default:return state
    }
}