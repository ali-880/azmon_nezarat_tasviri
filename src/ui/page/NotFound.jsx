import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { Helmet } from 'react-helmet';
import Appbar from 'ui/component/Appbar';
const useStyle = makeStyles((theme) => {
    return {
        root: {
            width: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
            height: 400,
            marginTop: 20,
            [theme.breakpoints.only('sm')]: {
                width: '70%',
                height: 400,
            },
            [theme.breakpoints.only('xs')]: {
                width: '90%',
                height: 350,
            }
        }
    }
})
const NotFound = () => {
    const classes=useStyle()
    return (
        <div>
            <Helmet>
                <title>صفحه ی 404</title>
            </Helmet>
            <Appbar />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img alt='404 page' className={classes.root} src={process.env.PUBLIC_URL + '/img/404.png'} />
                <Typography variant='h6' style={{ textAlign: 'center', marginTop: 20 }}>
                    ممکن است صفحه ای که به دنبال آن میگردید حذف شده باشد و یا آدرس آن را به درستی وارد نکرده باشید
                </Typography>
            </div>
        </div>
    );
}
export default NotFound;