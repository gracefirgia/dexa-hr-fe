import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import Layout from "./layout";
import LoginPage from "./pages/auth/login";
import ProfilePage from "./pages/profile";
import AttendancePage from "./pages/attendance";
import EmployeePage from "./pages/employee";
import EmployeeAttendancePage from "./pages/employee_attendance";
import DepartmentPage from "./pages/master_data/departments";
import { useCookies } from "react-cookie";
import RolePage from "./pages/master_data/roles";
import ChangeRequestPage from "./pages/change_request";

const App = () => {
  const [cookies] = useCookies(["user_details"]);
  const isAuth = cookies.user_details
  && cookies.user_details !== "undefined"
  && cookies.user_details !== "null";


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="employee-attendance" element={<EmployeeAttendancePage />} />
            <Route path="master-data/departments" element={<DepartmentPage />} />
            <Route path="master-data/roles" element={<RolePage />} />
            <Route path="employee-change-request" element={<ChangeRequestPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isAuth }) => {
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default App;
