import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  Username,
  Password,
  Reset,
  Register,
  Profile,
  Recovery,
  PageNotFound,
} from './components';

import { AuthorizeUser, ProtectRoute } from './middleware/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '/password',
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
  {
    path: '/profile',
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
