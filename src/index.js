import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App.tsx';

ReactDOM.render(<MainApp/>,document.getElementById('root'));
//rerenderEntireTree();
//rerenderEntireTree(store.getState());

/*store.subscribe(()=>{
  rerenderEntireTree(store.getState())
});*/

 /*<BrowserRouter>
      /*<StoreContext.Provider value={store}>
      <Provider store={store}>
        <App />
      </Provider>
      {/*</StoreContext.Provider>
      </BrowserRouter>,*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
