import React from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Login() {

    const toastsuccess = () => {
        toast.success('Đăng nhập thành công!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    };
    const toasterror = () => {
        toast.error('Đăng nhập thất bại!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = async (e) => {
        const users = await axios.post("http://localhost:3001/users/login", {
            email: email,
            password: password,
        });
        // console.log(users);
        if (!users.data.error) {
            toastsuccess();
            setTimeout(() => {
                Cookies.set('user_id', users.data.token);
                window.location.href = "/";
            }, 1500);

        } else {
            toasterror();
        }
    };

    return (
        <body >
            <ToastContainer />
            <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: "bold", border: 50, borderColor: "white" }} href="/">
                <h1>Đăng nhập</h1>
            </Typography>
            <Grid spacing={3} sx={{ textAlign: "left", alignItems: "center", marginBottom: "100px" }}>
                {/* <Grid item xs={12} sm={12} md={12} sx={{float: "left" }} > */}
                <center>

                    <div style={{ width: "30vw", height: "300px" }}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label text" style={{ float: "left" }}>Email</label>
                            <input onChange={emailHandler} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ width: "30vw" }} />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label" style={{ float: "left" }} >Password</label>
                            <input onChange={passwordHandler} type="password" class="form-control" id="exampleInputPassword1" style={{ width: "30vw" }} />
                        </div>
                        <button onClick={submitHandler} style={{ marginRight: "120px", float: "left", fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 }, width: 150, height: 50, background: "black", color: "white", marginTop: 20 }}>Đăng nhập</button> <br />
                        <div style={{ marginTop: "20px", float: "left" }} id="emailHelp" class="form-text mb-3">Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></div>
                    </div>
                </center>
                {/* </Grid> */}
            </Grid>
        </body >
    );
}
export default Login;