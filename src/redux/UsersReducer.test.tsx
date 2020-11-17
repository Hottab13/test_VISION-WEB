import usersReducer, { InitionalStateType,action} from "./UsersReducer"

 let state: InitionalStateType

 beforeEach(()=>{
state={
    users:[ {
        id:0,name:"USER_01",followed:false,photos:{small:null,large:null},status:"sSt_01"
    },{
        id:1,name:"USER_02",followed:false,photos:{small:null,large:null},status:"sSt_02"
    },{
        id:2,name:"USER_03",followed:true,photos:{small:null,large:null},status:"sSt_03"
    },{
        id:3,name:"USER_04",followed:true,photos:{small:null,large:null},status:"sSt_04"
    }
],
    pageSaze:12,// country users page
    totalUsersCount:0,// country users
    currentPage: 1,// start users page
    isFetching:false ,//prelouder
    followingInProgress:[]
 } })

 test('unit_test_users_following',()=>{
 const newState = usersReducer(state,action.follow(1))

 expect(newState.users[0].followed).toBeFalsy()
 expect(newState.users[1].followed).toBeTruthy()
    }
)

test('unit_test_users_unfollowing',()=>{
    const newState = usersReducer(state,action.unfollow(3))
   
    expect(newState.users[3].followed).toBeFalsy()
    //expect(newState.users[1].unfollow).toBeTruthy()
       }
   )