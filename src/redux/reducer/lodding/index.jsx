export const Lodding=(state=false,action)=>{
    switch (action.type) {
        case 'setLoddingTrue':return true
        case 'closeLodding':return false
        default:return state
    }
}