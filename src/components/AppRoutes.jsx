import React, {lazy, Suspense} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./CityList";
import CountriesList from "./CountriesList";
import City from "./City";
import Form from "./Form";
import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "../pages/ProtectedRoute";
import SpinnerFullPage from "./SpinnerFullPage";
// import Homepage from "../pages/Homepage";
// import Product from "../pages/Product";
// import Pricing from "../pages/Pricing";
// import Login from "../pages/Login";
// import AppLayout from "../pages/AppLayout";
// import PageNotFound from "../pages/PageNotFound";
const Homepage = lazy(() => import("../pages/Homepage"));
const Product = lazy(() => import("../pages/Product"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Login = lazy(() => import("../pages/Login"));
const AppLayout = lazy(() => import("../pages/AppLayout"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

//dist/assets/index-382215d6.css   30.15 kB │ gzip:   5.06 kB
//dist/assets/index-bb81d261.js   524.56 kB │ gzip: 148.70 kB




export default function AppRoutes() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            </Routes>
            </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
