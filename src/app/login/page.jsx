"use client"

import { MenuContext } from "@/stores/StoreContext";
import { Avatar, Button, FormControl, Stack, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Login = observer(() => {
    // useContext 훅으로 MobX Store 가져오기 
    const menuStore = useContext(MenuContext)  

    const API_URL = "/api/login"
    const [avo, setAvo] = useState({
        id : '',
        pw : ''
    });

    const router = useRouter();

    useEffect(() => {
       menuStore.loadToken();
        if (menuStore.isAuthenticated) {
            // 로그인이 되어 있다면 메인 페이지로 리다이렉트
            router.push("/main");
        }
    }, [router, menuStore]);

    async function login(){
        try{
            console.log("ccccc",avo.id)
            // axios 서버로 정보 보내기
            const response =  await axios.post(API_URL,{
                                  id : avo.id,
                                  pw : avo.pw
                               });
            // token 을 로컬 스토리지에 저장
            if(response.data.token){
                menuStore.setToken(response.data.token)
                // 성공 후 메인 페이지로 리다이렉트
                router.push("/main");
            }
        }catch(error){
            alert("로그인 실패")
            setAvo({
                id : "",
                pw : ""
            })
        }
    }
    function changeUvo(e){
        setAvo({
            ...avo,
            [e.target.name] : e.target.value
        })
    }
    return(
        <div style={{width: '80%', margin: '100px auto', paddingTop: '20px', textAlign: 'center'}}>
            <FormControl>
                <Stack direction="column" spacing={1} alignItems='center'>
                    <Avatar sx={{ bgcolor: green[500], marginBottom:'20px'}} />
                    <TextField type='text' label='ID' name='id' fullWidth  autoComplete="off" onChange={changeUvo} />
                    <TextField type='password' label='PW' name='pw' fullWidth autoComplete="off" onChange={changeUvo} />
                    <Button fullWidth variant='contained' onClick={login} >Sign in</Button>
                </Stack>
            </FormControl>
        </div>
    )
});
export default Login ;
