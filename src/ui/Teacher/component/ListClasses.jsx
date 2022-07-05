import React from 'react'
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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
const ListClasses = () => {
    const courses = useSelector(state => state.TeacherLessons)
    let i=1
    return (
        <>
            <Table style={{ marginTop: 10, padding: 10 }}>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>ردیف</StyledTableCell>
                        <StyledTableCell>نام درس</StyledTableCell>
                        <StyledTableCell>گروه درسی</StyledTableCell>
                        <StyledTableCell>کد درس</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {courses.map((item) => (
                        <StyledTableRow key={item._id}>
                            <StyledTableCell>{i++}</StyledTableCell>
                            <StyledTableCell>{item.name}</StyledTableCell>
                            <StyledTableCell>{item.group.name}</StyledTableCell>
                            <StyledTableCell>{item.code}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default ListClasses;