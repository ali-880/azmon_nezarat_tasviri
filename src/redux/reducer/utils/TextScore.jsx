export const TextScore=(state=0,action)=>{
    switch (action.type) {
        case 'addTextCounter':return action.payload
        case 'minTextCounter':return action.payload
        case 'ResetTextScore':return 0
        default:return state
    }
}