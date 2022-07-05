export const TestScore=(state=0,action)=>{
    switch (action.type) {
        case 'addTestCounter':return action.payload
        case 'minTestCounter':return action.payload
        case 'REsetTestScore':return 0
        default:return state
    }
}