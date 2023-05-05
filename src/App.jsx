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
    path: "/:categoryId",
    element: <CategoryPage />,
  },
  {
    path: "/:categoryId/:bookId",
    element: <BookPage />,
  },
  {
    path: "/bestsellers",
    element: <BestsellersPage />,
  },
  {
    path: "/search",
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
