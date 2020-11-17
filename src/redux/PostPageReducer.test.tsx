import postPageReducer, { action } from "./PostPageReducer";
import React from 'react';

let state = {
    posts:[
        {id:1,messen:"Тестируем первый пост",like:"15"},
        {id:2,messen:"Как дела юзер?",like:"0"},
        {id:3,messen:"js сложный язык",like:"432"},
        {id:4,messen:"тут может быьб юольшой текст",like:"232"},
        {id:5,messen:"отличия UL от BLL",like:"23423"},
        {id:6,messen:"UL - Rect, BLL - Redux",like:"19"}
      ]
};
it("Тестирование добавления постов",()=>{
    let actions = action.AddPostActionCreator("Тестируем добавление поста");
    let newState = postPageReducer(state,actions);
    expect(newState.posts.length).toBe(7);
});

it("Тестирование добавления текстов постов",()=>{
    let actions = action.AddPostActionCreator("Тестируем добавление поста");
    let newState = postPageReducer(state,actions);
    expect(newState.posts[6].messen).toBe("Тестируем добавление поста")
});

