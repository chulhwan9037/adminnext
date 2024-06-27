import React, { useState } from 'react';
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Modal, Backdrop, Fade, TextField } from '@mui/material';
import axios from 'axios'; // axios import
import "./adminList.css"

export default function AdminList({ adminList, handleCreate, handleDelete }) {
    const [open, setOpen] = useState(false);
    const API_URL = "/api/add"
    const API_URL2 = "/api/delete"
    const [admin, setAdmin] = useState({
        a_id: '',
        a_email: '',
        a_pw: ''
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateButtonClick = () => {
        handleOpen(); // '생성' 버튼 클릭 시 모달 열기
    };

    async function aCreate() {
        try {
            const response = await axios.post(API_URL, {
                id: admin.a_id,
                email: admin.a_email,
                password: admin.a_pw
            });
    
            if (response.status !== 200) {
                throw new Error(`HTTP status code ${response.status}`);
            }
    
            if (response.data.token) {
                menuStore.setToken(response.data.token);
                alert('토큰이 설정되었습니다.');
            } else if (response.data.data) {
                alert('관리자 생성');
            } else {
                alert('관리자 생성else');
            }
        } catch (error) {
            console.error("Error details:", error);
            alert('catch');
        } finally {
            setAdmin({
                a_id: '',
                a_email: '',
                a_pw: ''
            });
        }
    }
    
    
    function changeAdmin(e) {
        setAdmin({
            ...admin,
            [e.target.name] : e.target.value
        })
    }

    async function aDelete() {
        try {
            const response = await axios.post(
                API_URL2, null, { params: { id: admin.a_id } }
            );
            if (response.data.token) {
                menuStore.setToken(response.data.token);
                alert('토큰이 설정되었습니다.');
            console.log(response.data);
            }
            if (response.status === 200) {
                alert(response.data);
            } else {
                alert('엘스 관리자 삭제 실패');
            }
        } catch (error) {
            alert('캐치 삭제 실패');
        }
    }

    return (
        <Container>
            <Box className="admin-list-header"> {/* Use className for styling */}
                <Typography variant="h4" gutterBottom>
                    관리자 리스트
                </Typography>
                <Button variant="contained" color="primary" onClick={handleCreateButtonClick}>
                    생성
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead className="admin-table-head">
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>생성일</TableCell>
                            <TableCell>마지막로그인</TableCell>
                            <TableCell>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminList.map((k) => (
                            <TableRow key={k.idx}>
                                <TableCell>{k.id}</TableCell>
                                <TableCell>{k.email}</TableCell>
                                <TableCell>{k.created_at.substring(0, 10)}</TableCell>
                                <TableCell>{k.last_login.substring(0, 10)}</TableCell>
                                <TableCell>
                                    <Button fullWidth variant='contained' onClick={aDelete}>삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 가입 폼을 위한 모달 */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-admin-modal-title"
                aria-describedby="create-admin-modal-description"
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box className="modal-box"> {/* Use className for styling */}
                        <Typography variant="h6" id="create-admin-modal-title" gutterBottom>
                            관리자 생성
                        </Typography>
                        <form onSubmit={changeAdmin}>
                            <TextField type="text" label="아이디" name="a_id" fullWidth required onChange={changeAdmin}/>
                            <TextField type="text" label="이메일" name="a_email" fullWidth required onChange={changeAdmin}/>
                            <TextField type="password" label="비밀번호" name="a_pw" fullWidth required onChange={changeAdmin}/>
                            <Button fullWidth variant='contained' onClick={aCreate}>생성</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
}
