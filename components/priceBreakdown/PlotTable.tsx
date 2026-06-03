'use client';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  plotNumber: number,
  plotName: string,
  plotDesc: string,
  plotSize: number,
  plotUnit:string,
  plotAmount: number,
) {
  return { plotNumber, plotName, plotDesc, plotSize, plotUnit, plotAmount };
}

const rows = [
  createData(1, 'Plot A', 'Description for Plot A', 16, 'Aana', 4.0),
  createData(2, 'Plot B', 'Description for Plot B', 23, 'Dhur', 4.3),
  createData(3, 'Plot C', 'Description for Plot C', 21, 'sq ft', 6.0),
  createData(4, 'Plot D', 'Description for Plot D', 2, 'Ropani', 4.3),
  createData(5, 'Plot E', 'Description for Plot E', 3, 'sq ft', 3.9),
];

export default function PlotTable() {
  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
          boxShadow: "none",
          borderRadius: 3,
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Plot</StyledTableCell>
            <StyledTableCell>Plot Name</StyledTableCell>
            <StyledTableCell>Plot Description</StyledTableCell>
            <StyledTableCell align="right">Plot Size</StyledTableCell>
            <StyledTableCell align="right">Plot Unit</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.plotNumber}>
              <StyledTableCell component="th" scope="row">
                {row.plotNumber}
              </StyledTableCell>
              <StyledTableCell>{row.plotName}</StyledTableCell>
              <StyledTableCell>{row.plotDesc}</StyledTableCell>
              <StyledTableCell align="right">{row.plotSize}</StyledTableCell>
              <StyledTableCell align="right">{row.plotUnit}</StyledTableCell>
              <StyledTableCell align="right">{row.plotAmount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
