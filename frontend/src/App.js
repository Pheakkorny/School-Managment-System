import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './page/home/HomePage';
import AboutPage from './page/about/AboutPage';
import StudentPage from './page/student/StudentPage';
import MainLayout from './component/layout/MainLayout';
import MainLayoutLogin from './component/layout/MainLayoutLogin';
import LoginPage from './page/auth/LoginPage';
import RegisterPage from './page/auth/RegisterPage';
import MainLayoutAdmin from "./component/layout/MainLayoutAdmin"
import AdminTeacherPage from './page-admin/teacher/AdminTeacherPage';
import AdminStudentPage from './page-admin/student/AdminStudentPage';
import AdminHomePage from './page-admin/home/AdminHomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage / >} />
            <Route path='/about' element={<AboutPage / >} />
            <Route path='/student' element={<StudentPage / >} />
            <Route path='*' element={<h1>Route Not Found!</h1>} />
          </Route>
          <Route element={<MainLayoutAdmin />} path="admin">
            <Route path='' element={<AdminHomePage / >} />
            <Route path='teacher' element={<AdminTeacherPage / >} />
            <Route path='student' element={<AdminStudentPage / >} />
            <Route path='*' element={<h1>Route Not Found!</h1>} />
          </Route>
          <Route element={<MainLayoutLogin/>}>
            <Route path='/Login' element={<LoginPage / >} />
            <Route path='/register' element={<RegisterPage / >} />
            <Route path='*' element={<LoginPage / >} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


