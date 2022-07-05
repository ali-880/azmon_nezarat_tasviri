import { AppBar, Button, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash'
import { NavLink, withRouter } from 'react-router-dom';
const useStyle = makeStyles((theme) => {
    return {
        root: {
            backgroundColor: '#2f3542',
            padding: 10
        },
        toolbar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        btn: {
            [theme.breakpoints.down('sm')]: {
                marginBottom:10,
                marginLeft:35,
                marginTop:10
            },
            color: 'white',
            borderColor: 'white'
        },
        header: {
            fontWeight: 'bold'
        }
    }
})
const AppbarPage = (props) => {
    const user = useSelector(state => state.User);
    const classes = useStyle();
    const dispatch = useDispatch()
    return (
        <AppBar position='sticky' className={classes.root} >
            <Toolbar className={classes.toolbar}>
                <div className={classes.toolbar}>
                    <img alt='univercity shahrekord' src={process.env.PUBLIC_URL + '/img/WebBanner1.png'} style={{ width: 160, height: 40 }} />
                </div>
                <Hidden smDown>
                    <Typography className={classes.header} variant='h6'> سامانه انلاین امتحان دانشگاه شهرکرد</Typography>
                </Hidden>
                <div>
                    {lodash(user).isEmpty() ? (
                        <NavLink to='/login'><Button variant='outlined' className={classes.btn}><Typography variant='subtitle1'>عضویت در سایت</Typography></Button></NavLink>
                    ) : (
                        <Button onClick={async () => {
                            localStorage.removeItem('token');
                            await dispatch({ type: 'removeUser', payload: {} })
                            await dispatch({type:'removeLesson',payload:[]})
                            await dispatch({type:'removeExams',payload:[]})
                            props.history.replace('/login')
                        }} variant='outlined' className={classes.btn}><Typography variant='subtitle1'>خروج از حساب کاربری</Typography></Button>
                    )}
                    {user.role === 'admin' ? (
                        <NavLink style={{ marginRight: 10 }} to='/admin'><Button variant='outlined' className={classes.btn}><Typography variant='subtitle1'>رفتن به پنل مدیریت</Typography></Button></NavLink>
                    ) : user.role === 'teacher' ? (
                        <NavLink style={{ marginRight: 10 }} to='/teacher/setting'><Button variant='outlined' className={classes.btn}><Typography variant='subtitle1'>رفتن به پنل استاد</Typography></Button></NavLink>
                    ) : null}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(AppbarPage);