export const Dashbord=(state={},action)=>{
    switch (action.type) {
        case 'handleGetInfoSystem':return {...action.payload};
        default:return state
    }
}