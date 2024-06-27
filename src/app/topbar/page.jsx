"use client"

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MenuContext } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";

function TopBar({ setSidebarOpen, sidebarOpen }) {
    const menuStore = useContext(MenuContext);
    const router = useRouter();
     
    const handleLogout = async () => {
        await axios.post("/api/logout", {}, {
            headers: {
                "Authorization": `Bearer ${menuStore.token}`
            }
        });
        menuStore.setToken(null);
        router.push("/");
    };

    const handleDrawerToggle = () => {
        menuStore.setSidebarOpen();
    };

    return (
        <AppBar position="fixed" sx={{ width: `calc(100% - ${menuStore.sidebarOpen ? "240px" : 0})` }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/images/logo.png" alt="logo" style={{ marginRight: 8, height: '40px' }} />
                    <Typography variant="h6" noWrap component="div">
                        마을모아
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default observer(TopBar);
