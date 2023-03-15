import React from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

function Register() {
    const toastsuccess = () => {
        toast.success('Đăng ký thành công!', {
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
        toast.error('Đăng ký thất bại!', {
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
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    // const [error, setError] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };
    const nameHandler = (e) => {
        setName(e.target.value);
    };

    const addressHandler = (e) => {
        setAddress(e.target.value);
    };

    const phoneHandler = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async (e) => {
        const response = await axios.post("http://localhost:3001/users/register", {
            email: email,
            password: password,
            name: name,
            address: address,
            phone: phone,
        });
        // console.log(response.code);
        if (!response.data.error) {
            toastsuccess();
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);

            // window.location.href = "/login";

        } else {
            // alert(response.data.error);
            toasterror();
        }
    };


    const Title = styled.div`
        margin-top: 20px;
        float: left;
        
        // a:hover {
        //     font-weight: bold;
           
        //     color: pink;
            
            
        // }
    `;

    return (
        <body >
            <ToastContainer />

            <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: "bold", border: 50, borderColor: "white" }} href="/">
                <h1>Đăng Ký</h1>
            </Typography>
            <Grid spacing={3} sx={{ textAlign: "left", alignItems: "center", marginBottom: "100px" }}>
                {/* <Grid item xs={12} sm={12} md={12} sx={{float: "left" }} > */}
                <center>
                    {/* <form method="post" > */}
                    <div style={{ width: "30vw", height: "500px" }}>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label" style={{ float: "left" }} >Tên</label>
                            <input name="name" onChange={nameHandler} type="text" class="form-control" style={{ width: "30vw" }} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label text" style={{ float: "left" }}>Email</label>
                            <input name="email" onChange={emailHandler} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ width: "30vw" }} />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label" style={{ float: "left" }} >Password</label>
                            <input name="password" onChange={passwordHandler} type="password" class="form-control" style={{ width: "30vw" }} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label" style={{ float: "left" }} >Số điện thoại</label>
                            <input name="phone" onChange={phoneHandler} type="number" class="form-control" style={{ width: "30vw" }} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label" style={{ float: "left" }} >Địa chỉ</label>
                            <input name="address" onChange={addressHandler} type="text" class="form-control" id="" style={{ width: "30vw" }} />
                        </div>
                        {/* <a onClick={handleSubmit} class="btn btn-primary" style={{ float: "left" }}>Đăng ký</a> */}
                        <button onClick={handleSubmit} style={{ marginRight: "120px", float: "left", fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 }, width: 150, height: 50, background: "black", color: "white", marginTop: 20 }}>Đăng ký</button> <br />
                        <Title
                            id="emailHelp"
                            class="form-text mb-3"
                        >
                            Bạn đã có tài khoản? 
                            <a href="/login"> Đăng nhập</a>
                        </Title>
                        {/* <div style={{ marginTop: "20px", float: "left" }} id="emailHelp" class="form-text mb-3">Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></div> */}
                    </div>
                    {/* </form> */}
                </center>
                {/* </Grid> */}
            </Grid>
        </body >

    );


}
export default Register;