export const Question=(state={},action)=>{
    switch (action.type) {
        case 'handleSetOneQuestion':return {...action.payload};
        default:return state
    }
}