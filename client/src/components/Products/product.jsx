import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container } from '@mui/material';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from "react-router-dom";
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';


function Product() {
    // const [value, setValue] = React.useState('one');

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    // const pages = ['All', 'Top', 'Bottoms'];
    const categoryId = useParams().id;
    const [productsbycategory, setProductByCategorys] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products/category/' + categoryId).then((res) => {
            setProductByCategorys(res.data);
            console.log(res.data);
        })
        console.log(categoryId);
    }, [categoryId]);
    return (

        <body>
            <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: "bold", border: 50, borderColor: "white" }} href="/">
                <h1>Product</h1>
            </Typography>

            <Container style={{ overflow: "hidden" }}>
                {/* <Box sx={{ width: '100%', border: 10, borderColor: "white" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Item One" href="Products/1" />             
                        <Tab value="two" label="Item Two" href="Products/2" />
                        <Tab value="three" label="Item Three" href="Products/3" />
                    </Tabs>

                </Box> */}
                <Grid container spacing={3}>
                    {productsbycategory.map((product) => {
                        return (
                            <Grid item xs={6} sm={3} md={3}>
                                <Card sx={{ width: "100%" }} style={{ float: "left", display: "inline-block" }}>
                                    <CardActionArea href={`/product/${product._id}`}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={product.image}
                                            alt="green iguana"

                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: { xs: 9.5, sm: 12, md: 16 }  }}>
                                                {product.name}
                                            </Typography>
                                            <center>
                                                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 } }}>
                                                    <div style={{ float: "left", display: "inline-block", textalign: "center", color: "white", background: "black", width: 45 }}>20%</div>
                                                    <div style={{ color: "black" }}>{product.price}đ</div>
                                                    <div style={{ float: "left", display: "inline-block", textalign: "center", textDecorationLine: "line-through" }}>650.000đ</div>
                                                </Typography>
                                            </center>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}


                </Grid>
            </Container>

            <Stack spacing={2}>
                <Pagination
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 3 }}
                    count={10}
                    renderItem={(item) => (
                        <PaginationItem

                            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
            </Stack>


        </body>
    );
}
export default Product;