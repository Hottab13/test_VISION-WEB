import { userAPI } from "../api/api"
import usersReducer, { InitionalStateType,action, following,getUsersThunkCreator} from "./UsersReducer"
jest.mock("../api/api")
userAPI



 test('unit_test_users_thunk_following',()=>{
 const thunk =getUsersThunkCreator(1)
 const dispatchThunk = jest.fn()
 //@ts-ignore
 thunk(dispatchThunk)

 expect(dispatchThunk).toBeCalledTimes(2)
 })

/*test('unit_test_users_unfollowing',()=>{
    const newState = usersReducer(state,action.unfollow(3))
   
    expect(newState.users[3].followed).toBeFalsy()
    //expect(newState.users[1].unfollow).toBeTruthy()
       }
   )*/