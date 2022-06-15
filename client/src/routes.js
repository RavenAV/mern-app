import React from "react";
import {Route,Routes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";


export const useRoutes = isAuthenticated => {
    //let navigate = useNavigate()
    if(isAuthenticated){
        return (
            <Routes>
                <Route path = "/links" element = {<LinksPage/>} exact/>
                <Route path = "/create" element = {<CreatePage/>} exact/>
                <Route path = "/detail/:id" element = {<DetailPage/>}/>
                {/*<Redirect to="/create"/>*/}
                <Route path="*" element={<CreatePage/>}/>
                {/*<Route path="*" element={navigate('/create',{replace: true})}/>*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path = "/" element = {<AuthPage/>} exact/>
            <Route path="*" element={<AuthPage/>}/>
            {/*<Route path="*" element={navigate('/',{replace: true})}/>*/}
        </Routes>
    )
}