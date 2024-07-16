import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetails } from "./pages/trip-details";
import ToasterContext from "./context/ToastContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
]);

export const App = () => {
  return (
    <>
      <ToasterContext />
      <RouterProvider router={router} />
    </>
  );
};
