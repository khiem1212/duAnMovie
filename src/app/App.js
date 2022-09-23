//absolute path

import { fetchProfileAction } from "../features/authencation/action";
import styles from "./style.module.css";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute } from "./Guard";
import { Content } from "antd/lib/layout/layout";

import Headerr from "../common/componets/Header";

const Signup = lazy(() => import("../features/authencation/pages/Signup"));
const AddFilm = lazy(() => import("../features/Movie/pages/AddFilm"));
const Moviemanger = lazy(() => import("../features/Movie/pages/Moviemanger"));
const Managaer = lazy(() => import("../features/User/Pages/manager"));
const Updateaccount = lazy(() => import("../features/User/Pages/upadeacount"));
const ShowTime = lazy(() => import("../features/Movie/pages/ShowTime"));
const FilmEdit = lazy(() => import("../features/Movie/pages/FilmEdit"));
const AddUser = lazy(() => import("../features/User/Pages/addUser"));

function App() {
 


  return (
    <Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Switch className={styles.content}>
          <Route path="/" redirectPath="/" exact>
            <Headerr>
              <Signup />
            </Headerr>
          </Route>
          <Route path="/AddFilm">
            <Headerr>
              <AddFilm />
            </Headerr>
          </Route>
          <Route path="/FilmEdit/:id" redirectPath="/">
            <Headerr>
              <FilmEdit />
            </Headerr>
          </Route>
          <Route path="/Moviemanger" redirectPath="/">
            <Headerr>
              <Moviemanger />
            </Headerr>
          </Route>
          <Route path="/Managaer" redirectPath="/">
            <Headerr>
              <Managaer />
            </Headerr>
          </Route>
          <Route path="/Updateaccount/:taiKhoan" redirectPath="/">
            <Headerr>
              <Updateaccount />
            </Headerr>
          </Route>
          <Route path="/ShowTime/:id"  redirectPath="/">
            <Headerr>
              <ShowTime />
            </Headerr>
          </Route>
          <Route path="/AddUser"  redirectPath="/">
            <Headerr>
              <AddUser />
            </Headerr>
          </Route>

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

// optimize performance + redux toolkit + typescript
