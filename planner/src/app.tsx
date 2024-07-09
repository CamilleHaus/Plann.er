import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetails } from "./pages/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/trips/trip123",
    element: <TripDetails />
  }
])

export const App = () => {
  return <RouterProvider router={router}/>
}