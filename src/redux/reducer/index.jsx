import { combineReducers } from "redux";
import { Group } from './Group/index';
import { SuperAdminShowUser } from './User/SuperAdminShowUser';
import { SuperAdminCourseShow } from './course/SuperAdminCourseShow';
import { StudentCourses } from './Student/index';
import { User } from './User/index';
import { Course } from './course/index';
import { msgChatPage } from './chatPage/msgChatPage';
import { UserChatPage } from './chatPage/UsersChatPage';
import { LssonsChatPage } from './chatPage/LessonsChatPage';
import { Teacher } from './chatPage/Teacher';
import { Dashbord } from './Dashbord/index';
import { Admin } from './Admin/index';
import { Lodding } from './lodding/index';
import { chatWithTeacher } from './chatWithTeacher/index';
import { TeacherLessons } from './teacher/index';
import { Exam } from './exam/index';
import { Exams } from './exam/Exams';
import { Questions } from './Questions/index';
import { Time } from './time/index';
import { Response } from './response/index';
import { FileScore } from './utils/FileScore';
import { TestScore } from './utils/TestScore';
import { TextScore } from './utils/TextScore';
import { Question } from './Questions/Question';
import { Photo } from './Photo/index';
import { UserSelect } from './teacher/UserSelect';
import { TeacherMessage } from './teacher/TeacherMessage';

export const ComReducer=combineReducers({
    Group,
    AdminCourses:SuperAdminCourseShow,
    AdminUsers:SuperAdminShowUser,
    StudentCourses,
    User,
    Course,
    msgChatPage,
    UserChatPage,
    LssonsChatPage,
    Teacher,
    Dashbord,
    Admin,
    Lodding,
    chatWithTeacher,
    TeacherLessons,
    Exam,
    Exams,
    Questions,
    Time,
    Response,
    TestScore,
    TextScore,
    FileScore,
    Question,
    Photo,
    UserSelect,
    TeacherMessage
})