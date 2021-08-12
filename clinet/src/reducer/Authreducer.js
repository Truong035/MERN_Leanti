export const Authreducer=(state,action)=>{
const {type,payload:{isAuthenticated,user}}=action

switch(type){
case 'SET_AUTH':
    return {...state,
    authLoading:false,
    isAuthenticated:isAuthenticated,
    user
    }
    default :return state
}
}