export const FileScore=(state=0,action)=>{
    switch (action.type) {
        case 'addFileCounter':return action.payload
        case 'minFileCounter':return action.payload
        case 'ResetFileCounter':return 0
        default:return state
    }
}