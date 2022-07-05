export const User=(state={},action)=>{
    switch (action.type) {
        case 'handleLogin':return {...action.payload}
        case 'removeUser':return {...action.payload}
        case 'Auth':return {...action.payload}
        default:return state
    }
}