import { stopSubmit } from "redux-form"
import { authAPI  } from "../api/api.js"
import { InferActionType, BaseThunkActionType } from './ReduxStore';

type ActionType = InferActionType<typeof actions>;
export type initionalStateType = typeof initionalState;
type ThunkActionType = BaseThunkActionType<
  ActionType | ReturnType<typeof stopSubmit>
>;

let initionalState = {
    client_id:null as string | null,
    invited_by:null as string | null,
    name:null as string | null,
    phone:null as string | null,
    surname:null as string | null,
    email:null as string | null,
    is_active:false,
    is_signup:false,
    isFetching:false,
    isAuth:false
}

const authReducer = (
  state = initionalState,
  action: ActionType
): initionalStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (
    client_id: string | null,
    invited_by: string | null,
    name: string | null,
    phone: string | null,
    surname: string | null,
    email: string | null,
    is_active: boolean,
    is_signup: boolean
  ) =>
    ({
      type: "SET_USER_DATA",
      payload: {
        client_id,
        invited_by,
        name,
        phone,
        surname,
        email,
        is_active,
        is_signup,
      },
    } as const),
};

/*export const setAuthUser = ():ThunkActionType => async (dispatch) =>{
    let respons= await  userAPI.getLogin()
    if(respons.resultCode === 200){
        let {id,login,email} = respons.data
        dispatch(actions.setAuthUserData(id,login,email, true))
    }
}*/
export const signupUser = (
  email: string,
  password: string,
  phone: string,
  name: string,
  surname: string
): ThunkActionType => async (dispatch, getState) => {
  const respons = await authAPI.getAuthCreate(
    email,
    password,
    phone,
    name,
    surname, 
    true
  );
  if (respons) {
    console.log(respons);
    alert(`${respons.data.name},вы успешно зарегестрированы!`);
    const { client_id, invited_by, name, phone, surname } = respons.data,
      { email, is_active } = respons.data.user;
    dispatch(
      actions.setAuthUserData(
        client_id,
        invited_by,
        name,
        phone,
        surname,
        email,
        is_active,
        true
      )
    );
  } else {
    dispatch(stopSubmit("signup", { _error: respons }));
  }
};
export const loginUser = (email:string ,password:string):ThunkActionType=> 
    async(dispatch,getState) =>{
        const respons = await authAPI.getAuthLogin( email,
            password,
            );
            console.log(respons)
           /* if(respons){
                alert("Всё збс!")
                //dispatch(setAuthUser());
            } else{
                
                //dispatch(stopSubmit('login',{_error:respons.messages[0]}));
            }*/
}

/*export const logOut = ():ThunkActionType =>async(dispatch,getState) =>{
    let data = await authAPI.logout();
    if(data.resultCode === 200){
        dispatch(actions.setAuthUserData(null,null,null,false));
    }
}*/
export default authReducer
