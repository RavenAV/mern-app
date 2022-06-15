import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email:'', password:''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            console.log('Data', data)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            //console.log('Data', data)
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сокращение ссылок</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Enter your email..."
                                       id="email"
                                       type="text"
                                       name="email"
                                       value={form.email}
                                       onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Enter your password..."
                                       id="password"
                                       type="password"
                                       name="password"
                                       value={form.password}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn cyan darken-2"
                            onClick={loginHandler}
                            style={{marginRight: 10}}
                            disabled={loading}
                        >Войти
                        </button>
                        <button
                            className="btn  green accent-3"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}