import postPageReducer, { AddPostActionCreator } from "./PostPageReducer.ts";
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
    let action = AddPostActionCreator("Тестируем добавление поста");
    let newState = postPageReducer(state,action);
    expect(newState.posts.length).toBe(7);
});

it("Тестирование добавления текстов постов",()=>{
    let action = AddPostActionCreator("Тестируем добавление поста");
    let newState = postPageReducer(state,action);
    expect(newState.posts[6].messen).toBe("Тестируем добавление поста")
});

