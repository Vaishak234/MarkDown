

export const initialState = {
    user :{}
}

const reducer = (state,action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state,user:action.user}
            break;
        case 'GET_USER':
            return {...state,user:action.user}
            break;
        case 'LOGOUT_USER':
            return {...state,user:action.user}
            break;
    
        default:
            break;
    }
}

export default reducer