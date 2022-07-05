import React from 'react'
import { Table, TableHead, Hidden, TableCell, TableRow, makeStyles, Paper, TableBody, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyle=makeStyles((theme)=>{return{
    paperTable: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        marginTop: 30,

    }
}})
const ListExam = () => {
    const exams = useSelector(state => state.Exams)
    const classes=useStyle()
    let i=1
    return (
        <>
            {exams.length ? (
                <Paper className={classes.paperTable}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>ردیف</StyledTableCell>
                                <StyledTableCell>نام</StyledTableCell>
                                <StyledTableCell>نام درس</StyledTableCell>
                                <Hidden smDown>
                                    <StyledTableCell>مشاهده نتایج و امتحان</StyledTableCell>
                                    <StyledTableCell>حذف امتحان</StyledTableCell>
                                </Hidden>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {exams.map((item) => (
                                <StyledTableRow key={item._id}>
                                    <StyledTableCell>{i++}</StyledTableCell>
                                    <StyledTableCell>{item.name}</StyledTableCell>
                                    <StyledTableCell>{item.course.name}</StyledTableCell>
                                    <Hidden smDown>
                                        <StyledTableCell>
                                            <NavLink to={`/exam/teacher/update/${item._id}`}>
                                                <Button variant='contained' color='primary'>صفحه امتحان</Button>
                                            </NavLink>
                                        </StyledTableCell>
                                        <StyledTableCell><Button variant='contained' color='primary'>حذف</Button></StyledTableCell>
                                    </Hidden>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ) : (
                <Alert severity="error">امتحانی برای هیچ کدام از درس های شما در سامانه ثبت نشده است</Alert>
            )}
        </>
    );
}

export default ListExam;