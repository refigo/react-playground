import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AuthorDetail from './components/AuthorDetail';
import BookDetail from './components/BookDetail';
import BookChapters from './components/BookChapters';
import BookCharacters from './components/BookCharacters';
import Layout from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'author/:name',
        element: <AuthorDetail />,
        children: [
          {
            path: ':book',
            element: <BookDetail />,
            children: [
              {
                path: 'chapters',
                element: <BookChapters />,
              },
              {
                path: 'characters',
                element: <BookCharacters />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
