import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container } from '@mui/material';
import { Grid } from '@mui/material';
import Header from '../layout/header';
// import { margin, maxHeight } from '@mui/system';
// import { experimentalStyled as styled } from "@mui/material/styles";

import axios from 'axios';
import { useEffect, useState } from 'react';

// axios.get('http://localhost:3001/products/')
//     .then(function (response) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });


function Home() {
    // const itemData = [
    //     {   
    //         img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    //         title: 'Breakfast',
    //     },
    //     {
    //         img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    //         title: 'Burger',
    //     },
    //     {
    //         img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    //         title: 'Camera',
    //     },
    // ]
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products/').then((res) => {
            setProducts(res.data);
            console.log(res.data);
        })
    }, []);
    return (
        <body >
            {/* <Header/> */}
            {/* this is slide */}
            {/* <div
                id="carouselExampleCrossfade"
                class="carousel slide carousel-fade relative"
                data-bs-ride="carousel"
                sx={{ width: "100vw", height: "100vh" }}
            >
                <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCrossfade"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCrossfade"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCrossfade"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div class="carousel-inner relative w-full overflow-hidden">
                    <div class="carousel-item active float-left w-full">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                            class="block w-full"
                            alt="Wild Landscape"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div class="carousel-item float-left w-full">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                            class="block w-full"
                            alt="Camera"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div class="carousel-item float-left w-full">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                            class="block w-full"
                            alt="Exotic Fruits"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
                <button
                    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleCrossfade"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleCrossfade"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div> */}
            {/* <Grid container spacing={2}  >
                <Grid xs={6} sm={6} md={4} >
                    <img
                        src={itemData[0].img}
                        srcSet={itemData[0].img}
                        alt={itemData[0].title}
                        loading="lazy"
                        style={{ width: "30vw", height: "auto", objectFit: "cover" }}
                    />
                </Grid>
                <Grid xs={6} sm={6} md={4} >
                    <img
                        src={itemData[1].img}
                        srcSet={itemData[1].img}
                        alt={itemData[1].title}
                        loading="lazy"
                        style={{ width: "30vw", height: "auto", objectFit: "cover" }}
                    />
                </Grid>
                <Grid xs={11} sm={6} md={4} >
                    <img
                        src={itemData[2].img}
                        srcSet={itemData[2].img}
                        alt={itemData[2].title}
                        loading="lazy"
                        style={{ width: "30vw", height: "auto", objectFit: "cover" }}
                    />
                </Grid>


            </Grid> */}

            <div>
                <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: "bold", border: 50, borderColor: "white" }}>
                    <h1>Sản phẩm nổi bật</h1>
                </Typography>
            </div>
            {/* https://product.hstatic.net/1000306633/product/lelis_polo_45d6f610058b4e06bee739d681c58e62_large.jpg */}

            <Container style={{ overflow: "hidden" }}>
                <Grid container spacing={3}>
                    {products.map((product) => {
                        return (

                        <Grid item xs={6} sm={3} md={3} key={product._id} >
                            <Card sx={{ width: "100%" }} style={{ float: "left", display: "inline-block" }}>
                                <CardActionArea href={`/product/${product._id}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: { xs: 9.5, sm: 12, md: 16 } }}>
                                            {/* LELIS POLO */}
                                            {product.name}
                                        </Typography>
                                        <center>
                                            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 } }}>
                                                <div style={{ float: "left", display: "inline-block", textalign: "center", color: "white", background: "black", width: 45 }}>10%</div>
                                                <div style={{ color: "black" }}>{product.price}đ</div>
                                                <div style={{ float: "left", display: "inline-block", textalign: "center", textDecorationLine: "line-through" }}>100.000đ</div>
                                            </Typography>
                                        </center>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        )
                    })
                     }
                </Grid>
            </Container>

            <Container>
                <Typography sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: "bold", border: 50, borderColor: "white" }}>
                    <h1>Shop all</h1>
                </Typography>
            </Container>









        </body>

    );
}
export default Home;