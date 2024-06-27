import { makeAutoObservable } from "mobx";


class MenuStore{
    selectedMenu = "userlist" ;  // 선택된 메뉴
    sidebarOpen = true ;         // 사이드바 열림/닫힘 상태   
    isAuthenticated = false;     // 사용자 인증상태
    token = null  ;              // 사용자 토큰
    guestList = [] ;             // 서버에서 가져온 Guest List
    adminList = [] ;              // 서버에서 가져온 admin List
    userList = [] ;              // 서버에서 가져온 user List
    guestDetail = {
        idx : '' ,
        id : '',
        subject : '' ,
        content : '',
        email : '',
        created_at : '' 
    };           // 선택된 게스트의 상세 정보
    tradeList = [];
    detailTrade = {
        idx : '',
        id : '',
        title : '' ,
        content : '',
        image : '',
        image_size : '',
        image_format : '',
        created_at : '',
        updated_at : ''
    };

    
    constructor(){
        // MobX 스토어를 자동으로 관찰 가능하게 설정
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu){
        this.selectedMenu = menu;
    }

    // 상단 바 열림/닫힘 변경 (toggle)
    setSidebarOpen(){
        this.sidebarOpen = !this.sidebarOpen;
    }

    // 인증상태 변경 액션 
    setAuthenticated(authenticated){
        this.isAuthenticated = authenticated;
    }

    // 토큰 설정 액션 
    setToken(token){
        this.token = token
        if(token){
            localStorage.setItem("token", token);
            this.setAuthenticated(true);
        }else{
            localStorage.removeItem("token");
            this.setAuthenticated(false);
        }
    }

    // 로컬 스토리지에서토큰 가져오기 
    loadToken(){
        const token = localStorage.getItem("token")
        this.setToken(token)
    }

    setGuestList(guestList){
        this.guestList = guestList;
    }
    setGuestDetail(guestDetail){
        this.guestDetail = guestDetail;
    }
    setAdminList(adminList){
        this.adminList = adminList;
    }
    setUserList(userList){
        this.userList = userList;
    }

    setTradeList(tradeList){
        this.tradeList = tradeList;
    }
    setPublicInfo(detailTrade){
        this.detailTrade = detailTrade;
    }
  
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore ;