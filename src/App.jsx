// Main File For Client Side or Frontend 

// Import Files
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './auth/Login'
import AdminDashboard from './users/admin/AdminDashboard'
import Register from './auth/Register'
import { ToastContainer } from 'react-toastify'
import AdminProtected from './routes/AdminProtected'
import DepartmentList from './components/department/DepartmentLList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import EmployeeList from './components/employee/EmployeeList'
import AddEmployee from './components/employee/AddEmployee'
import AddSalary from './components/salary/AddSalary'
import Leave from './components/leave/Leave'
import PasswordReset from './components/settings/PasswordReset'
import ViewEmployee from './components/employee/ViewEmployee'
import EditEmployee from './components/employee/EditEmployee'
import { ViewSalary } from './components/salary/ViewSalary'
import UserProtected from './routes/UserProtected'
import EmployeeDashboard from './users/employees/EmployeeDashboard'
import EmployeeProfile from './users/employees/EmployeeProfile'
import EmployeeLeaves from './users/employees/EmployeeLeaves'
import EmployeeSalary from './users/employees/EmployeeSalary'
import EmployeeSettings from './users/employees/EmployeeSettings'
import AllLeaves from './users/employees/AllLeaves'
import LeaveDetails from './components/leave/LeaveDetails'
import { AllSalary } from './components/salary/AllSalary'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Protected Routes */}
          <Route path='/admin/' element={<AdminProtected />} >
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='department/list' element={<DepartmentList />} />
            <Route path='department/add' element={<AddDepartment />} />
            <Route path='department/edit/:_id' element={<EditDepartment />} />
            <Route path='employee/list' element={<EmployeeList />} />
            <Route path='employee/add' element={<AddEmployee />} />
            <Route path='employee/list' element={<EmployeeList />} />
            <Route path='employee/view/:_id' element={<ViewEmployee />} />
            <Route path='employee/edit/:_id' element={<EditEmployee />} />
            <Route path='employee/salary/add' element={<AddSalary/>}/>
            <Route path='employee/salary/view/:_id' element={<ViewSalary/>}/>
            <Route path='employee/salary/list' element={<AllSalary/>}/>
            <Route path='employee/leave' element={<Leave/>}/>
            <Route path='employee/leave/details/:_id' element={<LeaveDetails/>}/>
            <Route path='employee/reset/password' element={<PasswordReset/>}/>
          </Route>

          {/* Employee Protecred Routes */}
          <Route path='/employee/' element={<UserProtected/>}>
            <Route path='dashboard' element={<EmployeeDashboard/>} />
            <Route path='profile/:_id' element={<EmployeeProfile/>} />
            <Route path='leaves' element={<EmployeeLeaves/>} />
            <Route path='all/leaves' element={<AllLeaves/>} />
            <Route path='salary/:_id' element={<EmployeeSalary/>} />
            <Route path='settings' element={<EmployeeSettings/>} />

          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
