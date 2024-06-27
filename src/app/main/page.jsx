"use client"

import { useParams, usePathname, useRouter } from "next/navigation";
import { Children, useContext, useEffect, useState } from "react";
import TopBar from "../topbar/page";
import Sidebar from "../sidebar/page";
import UserList from "../userList/page";
import GuestList from "../guestList/page";
import AdminList from "../adminList/page";
import { observer } from "mobx-react-lite";
import { MenuContext } from "@/stores/StoreContext";
import GuestDetail from "../guestDetail/page";


function Main(){

  // useContext 훅으로 MobX Store를 가져오기
  const menuStore = useContext(MenuContext)

    const router = useRouter();
    
    // 사이드바에서 메뉴 선택 상태관리 : 초기값 userlist
    // const [selectedMenu, setSelectedMenu] = useState("userlist")
    // MobX 에서 관리
    // 상단 바에 대한 상태관리 : 초기값 true(열림상태)
    // const [sidebarOpen, setSidebarOpen] = useState(true)
    
    useEffect(() => {
        menuStore.loadToken();
        if(!menuStore.isAuthenticated){
            router.push("/")
        }
    },[router, menuStore]);

    //  선택된 메뉴에 따라 다른 컴포넌트를 임포트해서 랜더링 하기 
    const renderContent = () => {
       switch(menuStore.selectedMenu){
          case "userlist" :
            return <UserList userList={menuStore.userList}/>;
          case "guestlist" :
              // GuestList 컴포넌트 렌더링
              return <GuestList guestList={menuStore.guestList} />;
          case "adminlist" :
            return <AdminList adminList={menuStore.adminList}/>;
          case "guestdetail":
            return <GuestDetail guestDetail={menuStore.guestDetail} />
          case "tradelist":
            return <GuestDetail tradeList={menuStore.tradeList} />
          case "public":
            return <GuestDetail guestDetail={menuStore.guestDetail} />
          default:
            return <UserList />
       }
    }


    return(
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                {/* menuStore 를 이용해서 가져오기, Sidebar 컴포넌트에는 prop를 전달할 필요가 없다. */}
                {menuStore.sidebarOpen  && <Sidebar />}
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', marginTop:"100px" }}>
                  {/* 선택된 메뉴에 따라 알맞는 컴포넌트를 랜더링 한다. */}
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}


export default observer(Main);