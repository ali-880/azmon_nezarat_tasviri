import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import * as yup from 'yup';
import { Button, FormControl, FormLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { Formik } from "formik";
import axios from "axios";
import { configUrl } from '../../Costume/Url';
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleGetGroup } from './../../redux/action/Group/index';
import { Store } from './../../redux/store/index';
import Lodding from './../../components/loading/index';
import { Helmet } from "react-helmet";
const validator=yup.object({
  name:yup.string().min(3,'تعداد کاراکتر ورودی باید بیشتر از سه تا باشد').required('وارد کردن این فیلد الزامی است'),
  lastName:yup.string().min(2,'تعداد کاراکتر ورودی باید بیشتر از دو تا باشد').required('وارد کردن این فیلد الزامی است'),
  password:yup.string().min(6,'تعداد کاراکتر برای رمز عبور باید بیشتر از شش  تا باشد').max(20,'تعداد کاراکتر بیش تر از حد مجاز است').required('وارد کردن این فیلد الزامی است'),
  studentNumber:yup.string().min(9,'شماره دانشجویی باید دارای 9 کاراکتر باشد').max(9,'شماره دانشجویی باید دارای 9 کاراکتر باشد').required('وارد کردن این فیلد الزامی است'),
  role:yup.string().required('وارد کردن این فیلد الزامی است'),
  group:yup.string().required('وارد کردن این فیلد الزامی است'),
  enteringYear:yup.number().required('وارد کردن این فیلد الزامی است'),
  image:yup.mixed().required('وارد کردن این فیلد الزامی است')

})
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardAvatar:{
    backgroundColor:'#9b59b6',
    padding:10,
    height:250,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const useStyles = makeStyles(styles);

export default function UserProfile() {
  const load = useSelector(state => state.Lodding)
  const classes = useStyles();
  const dispatch=useDispatch()
  useEffect(()=>{
      if(!Store.getState().Group.length){
        dispatch(handleGetGroup())
      }
  },[dispatch])
  const Group=useSelector(state=>state.Group);
  const handleRegister=async(data)=>{
   try {
    await dispatch({type:'setLoddingTrue'})
    const form=new FormData();
    form.append('name',data.name)
    form.append('lastName',data.lastName)
    form.append('password',data.password)
    form.append('studentNumber',data.studentNumber)
    form.append('role',data.role)
    form.append('group',data.group)
    form.append('image',data.image)
    form.append('enteringYear',data.enteringYear)
    await axios.post(`${configUrl.url}register`,form,{headers:{
      'content-Type':'application/json',
      'Authorization': localStorage.getItem('token')
    }});
    await dispatch({type:'closeLodding'})
    toast.success('کاربر شما با موفقیت به سامانه اضافه شود',{position:'top-right'})
   } catch (e) {
      await dispatch({type:'closeLodding'})
      if (e.response.status === 500) {
        toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
      } else if (e.response.status === 403) {
          toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
      } else if (e.response.status === 401) {
          toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
      }
      if(e.response.status===409){
          toast.error('کاربری با این شماره دانشجویی قبلا در سامانه ثیت شده است',{position:'top-right'})
      }
    }
  }
  return (
    <div>
      <Helmet>
        <title>ایجاد دانشجو</title>
      </Helmet>
     {load?(
       <Lodding/>
     ):(
       <div>
       <GridContainer>
       <GridItem xs={12} sm={12} md={8}>
 
        <Formik
           initialValues={{image:null,name:'',lastName:'',group:'',enteringYear:'',password:'',role:'',studentNumber:''}}
           onSubmit={(values)=>{
             handleRegister(values)
           }}
           validationSchema={validator}
        >
          {({values,handleBlur,errors,handleChange,handleSubmit,touched,setTouched,setFieldValue})=>(
            <form>
             <Card>
               <CardHeader color="primary">
                 <h4 className={classes.cardTitleWhite} style={{fontFamily:'BYekan'}}>ایجاد کاربر جدید</h4>
                 <p className={classes.cardCategoryWhite} style={{fontFamily:'BYekan'}}>با وارد کردن اطلاعات زیر می توانید یک کاربر یا استاد یا ادمین را در سایت ثبت نام کنید</p>
               </CardHeader>
               <CardBody>
                 <GridContainer>
                   <GridItem xs={12} sm={12} md={6}>
                     <TextField
                       onBlur={handleBlur('name')}
                       value={values.name}
                       onChange={handleChange('name')}
                       label="نام"
                       name='name'
                       id="company-disabled"
                       variant='outlined'
                       style={{width:'95%',marginRight:'auto',marginLeft:'auto',marginTop:25}}
                     />
                     {errors.name  && touched.name?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.name}</i>):null}
                   </GridItem>
                   <GridItem xs={12} sm={12} md={6}>
                     <TextField
                       onBlur={handleBlur('lastName')}
                       value={values.lastName}
                       onChange={handleChange('lastName')}
                       variant='outlined'
                       style={{width:'95%',marginRight:'auto',marginLeft:'auto',marginTop:25}}
                       label='نام خانوادگی'
                       id="lastName"
                       name='lastName'
                     />
                     {errors.lastName  && touched.lastName?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.lastName}</i>):null}
                     
                   </GridItem>                      
                   <GridItem xs={12} sm={12} md={6}>
                     <FormControl  variant="outlined" className={classes.formControl} style={{width:'95%',marginTop:25}}>
                       <InputLabel id="demo-simple-select-filled-label">سال ورود</InputLabel>
                       <Select
                         labelId="demo-simple-select-filled-label"
                         id="demo-simple-select-filled"
                         onBlur={handleBlur('enteringYear')}
                         value={values.enteringYear}
                         onChange={handleChange('enteringYear')}
                         >
                           <MenuItem value={1396}>1396</MenuItem>
                           <MenuItem value={1397}>1397</MenuItem>
                           <MenuItem value={1398}>1398</MenuItem>
                           <MenuItem value={1399}>1399</MenuItem>
                           <MenuItem value={1400}>1400</MenuItem>
                       </Select>
                     </FormControl>
                     {errors.enteringYear  && touched.enteringYear?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.enteringYear}</i>):null}
                   </GridItem>
                   <GridItem xs={12} sm={12} md={6}>
                     <TextField
                     onBlur={handleBlur('password')}
                     value={values.password}
                     onChange={handleChange('password')}
                       variant='outlined'
                       style={{width:'95%',marginRight:'auto',marginLeft:'auto',marginTop:25}}
                       label='رمز عبور'
                       id="password"
                       name='password'
                     />
                     {errors.password  && touched.password?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.password}</i>):null}                    
                   </GridItem>
                   <GridItem xs={12} sm={12} md={6}>
                     <TextField
                     onBlur={handleBlur('studentNumber')}
                     value={values.studentNumber}
                     onChange={handleChange('studentNumber')}
                       variant='outlined'
                       style={{width:'95%',marginRight:'auto',marginLeft:'auto',marginTop:25}}
                       label="شماره دانشجویی"
                       id="studentNumber"
                     />
                     {errors.studentNumber  && touched.studentNumber?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.studentNumber}</i>):null}
                   </GridItem>
                   <GridItem xs={12} sm={12} md={6} style={{display:'flex',flexDirection:'column'}}>
                     <FormControl variant="outlined" className={classes.formControl} style={{width:'95%',marginTop:25}}>
                       <InputLabel id="demo-simple-select-filled-label">نقش کاربر</InputLabel>
                       <Select
                         labelId="demo-simple-select-filled-label"
                         id="demo-simple-select-filled"
                         value={values.role}
                         onChange={handleChange('role')}
                         onBlur={handleBlur('role')}                     
                         >
                           <MenuItem value={'admin'}>ادمین</MenuItem>
                           <MenuItem value={'user'}>دانشجو</MenuItem>
                           <MenuItem value={'teacher'}>استاد</MenuItem>
                       </Select>
                     </FormControl>
                     {errors.role  && touched.role?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.role}</i>):null}
                   </GridItem>
                   <GridItem xs={12} sm={12} md={6} style={{display:'flex',flexDirection:'column'}}>
                     <FormControl variant="outlined" className={classes.formControl} style={{width:'95%',marginTop:25}}>
                       <InputLabel id="demo-simple-select-filled-label">گروه درسی</InputLabel>
                       <Select
                         labelId="demo-simple-select-filled-label"
                         id="demo-simple-select-filled"
                         value={values.group}
                         onChange={handleChange('group')}
                         onBlur={handleBlur('group')}                     
                         >
                           {Group.map((item)=>(
                             <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                           ))}
 
                       </Select>
                     </FormControl>
                     {errors.group  && touched.group?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.group}</i>):null}
                   </GridItem>
                   <GridItem xs={12} sm={12} md={12} style={{display:'flex',flexDirection:'column'}}>
                     <FormLabel style={{marginTop:25,marginBottom:10}}>عکس دانشجو را انتخاب کنید</FormLabel>
                     <TextField 
                       type='file'
                       onBlur={handleBlur('image')}
                       onChange={(event)=>{setFieldValue('image',event.currentTarget.files[0])}}
                       variant='outlined'
                       style={{width:'95%',marginRight:'auto',marginLeft:'auto'}}
                       
                     />
                     {errors.image  && touched.image?(<i style={{fontFamily:'BYekan',color:'#e74c3c',fontStyle:'italic'}}>{errors.image}</i>):null}
                   </GridItem>
                 </GridContainer>
               </CardBody>
               <CardFooter>
                 <Button color='secondary' variant='contained' onClick={handleSubmit}>ایجاد کاربر</Button>
               </CardFooter>
             </Card>
           </form>
          )}
        </Formik>
        </GridItem>
 
         <GridItem xs={12} sm={12} md={4}>
           <Card profile>
             <CardAvatar profile className={classes.cardAvatar}>
                 <img src={process.env.PUBLIC_URL+'/img/WebBanner1.png'} alt="..." />
             </CardAvatar>
             <CardBody profile>
               <h4 className={classes.cardTitle}>اضافه کردن کاربر به سامانه</h4>
                 <p className={classes.description} style={{fontSize:16}}>
                     شما می توانید در این قسمت یک ادمین یا دانشجو یا استاد را تعریف کنید فقط دقت داشته باشید که شماره دانشجویی باید برای هر شخص یکتا باشد در غیر این صورت عملیات شما ناموفق خواهد بود
                 </p>
                 <p>دانشجو : دانشجوی فعال در دانشگاه که می توانید ان را در کلاس های مورد نطر ثبت نام کنید</p>
                 <p>استاد : اساتید دانشگاه را هم می توانید در این قسمت تعریف کنید و در تعریف درس در قسمت استاد قرار دهید</p>
                 <p>ادمین : ادمین سایت که به مانند شما اجازه ی تعریف درس , حذف درس و انتخاب واحد برای دانشجویان را دارد</p>
             </CardBody>
           </Card>
         </GridItem>
       </GridContainer>
       <ToastContainer/>
       </div>
     )}
    </div>
  );
}
