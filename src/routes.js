/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";




const dashboardRoutes = [
  {
    path: "",
    name: "داشبورد",
    icon: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user/create",
    name: "افزودن کاربر",
    icon: Person,
    layout: "/admin"
  },
  {
    path: "/student/show",
    name: "نمایش کاربران",
    icon: "content_paste",
    layout: "/admin"
  },
  {
    path: "/course/create",
    name: "تعریف درس",
    icon: LibraryBooks,
    layout: "/admin"
  },
  {
    path: "/course/show",
    name: "نمایش دروس",
    icon: BubbleChart,
    layout: "/admin"
  },
  {
    path: "/selectLesson",
    name: "انتخاب واحد",
    icon: LocationOn,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
