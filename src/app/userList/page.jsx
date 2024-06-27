import React, { useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

export default function UserList({ userList }) {
    const [penalties, setPenalties] = useState({});

    const handleChange = (idx, e) => {
        setPenalties({
            ...penalties,
            [idx]: e.target.value
        });
    };

    const handleConfirm = () => {
        console.log('패널티:', penalties);
        // 로직
        alert('페널티가 적용되었습니다.');
        setPenalties({});
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                유저 리스트
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#87CEEB', color: 'white' }}>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>가입일</TableCell>
                            <TableCell>수정일</TableCell>
                            <TableCell>마지막로그인</TableCell>
                            <TableCell>활성화</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList && userList.map((k) => (
                            <TableRow key={k.id}>
                                <TableCell>{k.name}</TableCell>
                                <TableCell>{k.email}</TableCell>
                                <TableCell>{k.created_at.substring(0, 10)}</TableCell>
                                <TableCell>{k.updated_at.substring(0, 10)}</TableCell>
                                <TableCell>{k.last_login.substring(0, 10)}</TableCell>
                                <TableCell>{k.is_activated}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleConfirm}>
                    확인
                </Button>
            </Box>
        </Container>
    );
}
