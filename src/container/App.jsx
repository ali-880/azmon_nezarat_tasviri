import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Admin from './../layouts/Admin';
import UserProfile from './../views/UserProfile/UserProfile';
import Dashboard from './../views/Dashboard/Dashboard';
import CreateCourse from './../views/Courses/Create';
import ShowCourse from './../views/Courses/Show';
import SelectLesson from './../views/SelectLesson/index';
import User from '../views/UserProfile/User'
import lodash from 'lodash'
import { useSelector } from 'react-redux';
import Login from './../ui/page/Login';
import Home from './../ui/page/Home';
import ChatPage from './../ui/page/chatPage/ChatPage';
import NotFound from './../ui/page/NotFound';
import TeacherSetting from 'ui/Teacher';
import Exam from 'ui/page/Exam';
import ExamChange from './../ui/page/ExamChange';
import CheckUserPicture from './../ui/page/CheckUserPicture';
import TeacherResponseMessages from './../ui/page/TeacherResponseMessage';
import LogOut from 'ui/page/LogOut';
const App = () => {

  const user = useSelector(state => state.User);
  return (
    <Switch>
      <Route path='/teacher/exam/:exam_id' exact render={() => (lodash(user).isEmpty() ? (<Redirect to='/login' />) : user.role === 'teacher' ? (<TeacherResponseMessages />) : (<Redirect to='/' />))} />
      <Route path='/user/checkPicture/:exam_id' exact render={() => (lodash(user).isEmpty() ? (<Redirect to='/login' />) : user.role === 'user' ? (<CheckUserPicture/>) : (<Redirect to='/' />))} />

      <Route path='/examPage/:exam_id' exact render={() => (lodash(user).isEmpty() ? (<Redirect to='/login' />) : (user.role === 'user' ? (<Exam />) : (<Redirect to='/' />)))} />
      <Route path='/exam/teacher/update/:exam_id' exact render={() => (lodash(user).isEmpty() ? (<Redirect to='/login' />) : (user.role === 'teacher' ? (<ExamChange />) : (<Redirect to='/' />)))} />
      <Route path='/teacher/setting' exact render={() => (lodash(user).isEmpty() ? (<Redirect to='/login' />) : (user.role === 'teacher' ? (<TeacherSetting />) : (<Redirect to='/' />)))} />
      <Route path={['/admin', '/admin/user/create', '/admin/course/create', '/admin/student/show', '/admin/selectLesson']}>
        <Admin>
          <Route exact path='/admin/user/create' render={() => (lodash(user).isEmpty() ? (<Redirect to='/' />) : user.role === 'admin' ? (<UserProfile />) : (<Redirect to='/' />))} />
          <Route exact path='/admin' render={() => (lodash(user).isEmpty() ? (<Redirect to='/' />) : user.role === 'admin' ? (<Dashboard />) : (<Redirect to='/' />))} />
          <Route exact path='/admin/course/create' render={() => (lodash(user).isEmpty() ? (<Redirect to='/' />) : user.role === 'admin' ? (<CreateCourse />) : (<Redirect to='/' />))} />
          <Route exact path='/admin/student/show' render={() => (lodash(user).isEmpty() ? (<Redirect to='/' />) : user.role === 'admin' ? (<User />) : (<Redirect to='/' />))} />
          <Route exact path='/admin/course/show' render={() => (lodash(user).isEmpty() ? (<Redirect to='/' />) : user.role === 'admin' ? (<ShowCourse />) : (<Redirect to='/' />))} />
          <Route exact path='/admin/selectLesson' render={() => (lodash(user).isEmpty() ? (<Redirect to='/' />) : user.role === 'admin' ? (<SelectLesson />) : (<Redirect to='/' />))} />
        </Admin>
      </Route>
      <Route exact path={['/login', '/', '/chatpage/:id']}>
        <Route exact path='/login' render={() => (lodash(user).isEmpty() ? (<Login />) : (<Redirect to='/' />))} />
        <Route exact path='/' render={() => (lodash(user).isEmpty() ? (<Redirect to='/login' />) :user.role==='admin'?(<Redirect to='/admin'/>):(<Home />))} />
        <Route exact path='/chatpage/:id' component={ChatPage} />
      </Route>
      <Route exact path='/logout' component={LogOut}/>
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;