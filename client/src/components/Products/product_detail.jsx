import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";

function ProductDetail({ productId }) {
    // const token = Cookies.get('user_id');
    const setproductid = useParams().id;
    const [productById, setProductById] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/products/' + setproductid).then((res) => {
            setProductById(res.data);
        })
        console.log(setproductid);
    }, []);

    const [quantity, setQuantity] = useState(1);

    
    const handleAddToCart = async (productId, quantity) => {
        const token = Cookies.get('user_id'); // Lấy token từ cookie bằng js-cookie
        
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
      
        try {
          const response = await axios.post(
            'http://localhost:3001/cart',
            { productId, quantity },
            config
          );
          console.log(response.data); // In kết quả trả về từ máy chủ
        } catch (error) {
          console.error(error.response.data); // In lỗi nếu có lỗi
        }
      }
    return (
        <body>
            <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: "bold", border: 50, borderColor: "white" }} href="/">
                <h1>Product Detail</h1>
            </Typography>
            {productById.map((product) => {

                return (
                    <Grid container spacing={3}>
                        <Grid xs={6} sm={6} md={6} >
                            <center>
                                <img src={product.image} alt='ao' style={{ width: "450px", height: "600px", objectFit: "cover" }} />
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} sx={{ borderLeft: 1, float: "left" }} >
                            <h1 style={{ fontWeight: "bold", margin: "50px", fontSize: 20 }}>{product.name}</h1>
                            <center>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 }, width: "250px" }}>
                                    <div style={{ float: "left", display: "inline-block", textalign: "center", color: "white", background: "black", width: 45 }}>20%</div>
                                    <div style={{ color: "black" }}>{product.price}đ</div>
                                    <div style={{ float: "left", display: "inline-block", textalign: "center", textDecorationLine: "line-through" }}>650.000đ</div>
                                </div>
                                <div style={{
                                    width: "400px", marginTop: 10, display: "flex",
                                    flexWrap: "wrap",
                                    flexDirection: "row",
                                }}>
                                    <p>
                                        {product.description}
                                    </p>
                                    <center>
                                        <div >
                                            <label style={{ fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 } }}>Size</label>
                                            <select style={{ width: 100, height: 30, marginLeft: 20 }}>
                                                <option value="volvo">S</option>
                                                <option value="saab">M</option>
                                                <option value="mercedes">L</option>
                                                <option value="audi">XL</option>
                                            </select>
                                        </div>
                                        <div >

                                            <label style={{ fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 }, marginLeft: 10 }}>Total</label>
                                            <input min="1" style={{ width: 100, height: 30, marginLeft: 20 }} 
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(event) => setQuantity(event.target.value)}
                                            />
                                        </div>
                                    </center>
                                </div>
                                <button style={{ fontWeight: "bold", fontSize: { xs: 9.5, sm: 14, md: 16 }, width: 200, height: 50, background: "black", color: "white", marginTop: 20 }}
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </button>
                            </center>
                        </Grid>
                    </Grid>
                )
            }
            )}

        </body >
    );
}
export default ProductDetail;