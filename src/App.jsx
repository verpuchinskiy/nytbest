import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BestsellersPage } from "./pages/BestsellersPage";
import { BookPage } from "./pages/BookPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Homepage } from "./pages/Homepage";
import { SearchPage } from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/nytbest",
    element: <Homepage />,
  },
  {
    path: "/nytbest/:categoryId",
    element: <CategoryPage />,
  },
  {
    path: "/nytbest/:categoryId/:bookId",
    element: <BookPage />,
  },
  {
    path: "/nytbest/bestsellers",
    element: <BestsellersPage />,
  },
  {
    path: "/nytbest/search",
    element: <SearchPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
