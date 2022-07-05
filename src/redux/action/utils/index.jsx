export const addTextCounter=()=>{
    return async(dispatch,getstate)=>{
        let y=getstate().TextScore
        await dispatch({type:'addTextCounter',payload:y+1})
    }
}
export const addTestCounter=()=>{
    return async(dispatch,getstate)=>{
        let y=getstate().TestScore
        await dispatch({type:'addTestCounter',payload:y+1})
    }
}
export const ResetFileCounter=()=>{
    return async(dispatch)=>{
        await dispatch({type:'ResetFileCounter'})
    }
}
export const addFileCounter=()=>{
    return async(dispatch,getstate)=>{
        let y=getstate().FileScore
        await dispatch({type:'addFileCounter',payload:y+1})
    }
}
export const minFileCounter=()=>{
    return async(dispatch,getstate)=>{
        if(getstate().FileScore!==0){
            await dispatch({type:'minFileCounter',payload:getstate().FileScore-1})
        }
    }
}
export const minTextCounter=()=>{
    return async(dispatch,getstate)=>{
        if(getstate().TextScore!==0){
            await dispatch({type:'minTextCounter',payload:getstate().TextScore-1})
        }
    }
}
export const minTestCounter=()=>{
    return async(dispatch,getstate)=>{
        if(getstate().TestScore!==0){
            await dispatch({type:'minTestCounter',payload:getstate().TestScore-1})
        }
    }
}