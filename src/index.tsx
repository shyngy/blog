import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FullPost from './components/FullPost';
import Template from './template';
import Frame from './components/Auth/Frame';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Profile from './components/Auth/Profile';
import Article from './components/Article';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Template>
        <App />
      </Template>
    ),
  },
  {
    path: '/articles',
    element: (
      <Template>
        <App />
      </Template>
    ),
  },
  {
    path: 'articles/:slug',
    element: (
      <Template>
        <FullPost />
      </Template>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <Template>
        <Frame title="Create new account" Component={SignUp} />
      </Template>
    ),
  },
  {
    path: 'sign-in',
    element: (
      <Template>
        <Frame title="Sign in" Component={SignIn} />
      </Template>
    ),
  },
  {
    path: 'profile',
    element: (
      <Template>
        <Frame title="edit profile" Component={Profile} />
      </Template>
    ),
  },
  {
    path: 'article',
    element: (
      <Template>
        <Frame title="edit profile" Component={Profile} />
      </Template>
    ),
  },
  {
    path: 'new-article',
    element: (
      <Template>
        <Article articleTitle="Create new article" />
      </Template>
    ),
  },
  {
    path: 'articles/:slug/edit',
    element: (
      <Template>
        <Article articleTitle="Edit article" />
      </Template>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
