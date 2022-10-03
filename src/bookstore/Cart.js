import React, { useEffect, useState } from 'react'
import './Cart.css'
import dontmakemethink from '../book1.png'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'
import bookicon from '../bookicon.png'
import carticon from '../carticon.png'
import deleteicon from './delete.png'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import reactmaterialui from '../reactmaterial-ui.png'
import uxenglish from '../uxenglish.png'
import sharepoint from '../SharePoint.png'
import Dummies from './Dummies.png'

function Cart() {

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        getCart();
        getCount();
    }, [])
    const navigate = useNavigate();
    const [token, setToken] = useState('')

    // const getToken = () => {
    //     axios.get('http://localhost:9090/bookstore/login/piyushp0541@gmail.com/12345')
    //         .then((res) => {
    //             // console.log(res)
    //             setToken(res.data)
    //         })
    // }
    const [cart, setCart] = useState('')
    const getCart = () => {
        axios.get('http://localhost:9090/bookstore/cart/getcartforuser/1').then((res) => {
            setCart(res.data)
        })
    }

    const updateQuantity = async (d, cartid) => {
        console.log(d)
        axios.put(`http://localhost:9090/bookstore/cart/updatequantity/${cartid}/${d}`, {
            header: {
                token: token
            }
        }).then(() => { getCart(); })
    }

    const [cartcount, setCartCount] = useState(0);
    const getCount = () => {
        axios.get('http://localhost:9090/bookstore/cart/getcartcount').then((response) => {
            setCartCount(response.data)
        })
        return cartcount;
    }

    const [placeOrderBtn, setPlaceOrderBtn] = useState(false)
    const [address, setAddress] = useState('')
    const onInputChange = (e) => { setAddress(e.target.value) }

    const placeOrder = (data) => {
        console.log('hello')
        console.log(data)
        axios.post('http://localhost:9090/bookstore/order/create',
            {
                "address": address,
                "bookID": data.book.bookId,
                "email": data.user.email,
                "price": data.totalPrice,
                "quantity": data.quantity,
                "userID": data.user.id
            }
        ).then((res) => { console.log(res.data); }
        );
        deleteFromCart(data.id);
        navigate("/order");
    }

    const deleteFromCart = (id) => {
        axios.delete(`http://localhost:9090/bookstore/cart/delete/${id}`).then(() => getCart())
    }

    const getImg = (name) => {
        if (name == 'uxenglish') {
            return (`${uxenglish}`)
        }
        if (name == 'dontmakemethink') {
            return (`${dontmakemethink}`)
        }
        if (name == 'reactmaterial-ui') {
            return (`${reactmaterialui}`)
        }
        if (name == 'sharepoint') {
            return (`${sharepoint}`)
        }
        if (name == 'Dummies') {
            return (`${Dummies}`)
        }
    }

    return (
        <>
            <div className="Appclass">
                <Link to='/' ><div className='logoandtitle'><img src={bookicon} />
                    <div className='bookstoreheading'>BookStore</div></div></Link>
                <div className='searchbar'><input className='ip' type='search' /></div>
                <div className='logoandtitle'>
                    <div className='cartlogo'>
                        <div className='cartname'>Cart</div>
                        <div><img src={carticon} />
                            {cartcount > 0 && (
                                <div className='cartcount'>{cartcount}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='heading'><strong>My Cart {` ( ${cartcount} )`}</strong>  </div>
                {Object.values(cart).map((data) => (
                    <div className='box'>
                        <div> <img className='imgcart' src={getImg(data.book.name)} /></div>
                        <div className='innerbox'>
                            <div className='booktitle'>{data.book.name}</div>
                            <div className='author'>{data.book.author}</div>
                            <div className='price'> {data.totalPrice}</div>
                            <div className='quantitychanger'>
                                <div className='decbtn' onClick={() => updateQuantity(data.quantity -= 1, data.id)}><b>-</b></div>
                                <div className='quantity'>{data.quantity}</div>
                                <div className='incrementquantity' onClick={() => updateQuantity(data.quantity += 1, data.id)}>+</div>
                                <div className='remove'><img className='deleteicon' onClick={() => deleteFromCart(data.id)} src={deleteicon} /></div>
                            </div>
                        </div>
                        <div className='orderbtn'><button className='placeorderbtn' onClick={() => setPlaceOrderBtn(true)}>Place Order</button></div>

                    </div>
                ))}
                {placeOrderBtn ?
                    <div className='container1'><label for='address'><b>Address</b></label><textarea id='address' name='address' onChange={(a) => onInputChange(a)} />
                        <div className='continue'><button className='placeorderbtn' type='submit' onClick={() => placeOrder(Object.values(cart)[0])}>Continue</button></div>
                    </div>
                    : null}
            </div>
        </>
    )
}

export default Cart