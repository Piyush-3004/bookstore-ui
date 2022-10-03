import uxenglish from '../uxenglish.png'
import dontmakemethink from '../book1.png'
import sharepoint from '../SharePoint.png'
import { Grid, Row, Col } from 'react-flexbox-grid';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import reactmaterialui from '../reactmaterial-ui.png'
import bookicon from '../bookicon.png'
import carticon from '../carticon.png'
import './Dashboard.css'
import { useNavigate } from "react-router-dom";
import Dummies from './Dummies.png'


function Dashboard() {
    const navigate = useNavigate();
    const [token, setToken] = useState('')
    // const getToken = () => {
    //     axios.get('http://localhost:9090/bookstore/login/piyushp0541@gmail.com/12345')
    //         .then((res) => {
    //             setToken(res)
    //         })
    // }

    useEffect(() => {
        getBooks();
        getCount();
        // getToken();
        getBookCount();
    }, []);

    const [book, setBook] = useState({
        name: '',
        author: '',
        desc: '',
        logo: '',
        price: '',
        quantity: '',
    })
    const getBooks = () => {
        axios.get('http://localhost:9090/bookstore/book/getlist').then((response) => {
            setBook(response.data)
        })
        return book;

    }

    const [cartcount, setCartCount] = useState(0);
    const getCount = () => {
        axios.get('http://localhost:9090/bookstore/cart/getcartcount').then((response) => {
            setCartCount(response.data)
        })
        return cartcount;

    }

    const [bookcount, setBookCount] = useState(0);
    const getBookCount = () => {
        axios.get('http://localhost:9090/bookstore/book/getbookscount').then((response) => {
            setBookCount(response.data)
        })
        return cartcount;

    }

    const addToCart = data => {
        axios.post('http://localhost:9090/bookstore/cart/create',
            {
                "bookID": data.bookId,
                "quantity": 1,
                "userID": 1
            }
        ).then(() => {
            navigate("/cart")
        })
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
        <div className='main'>
            <div className="Appclass">
                <div className='logoandtitle'><img src={bookicon} />
                    <div className='bookstoreheading'>BookStore</div></div>
                <div className='searchbar'><input className='ip' type='search' /></div>
                <div className='logoandtitle'>
                    <div className='cartlogo'>
                        <div className='cartname'>Cart</div>
                        <Link to='/cart'>
                            <div><img src={carticon} />
                                {cartcount > 0 && (
                                    <div className='cartcount'>{cartcount}</div>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='mainbody'>
                <div className='headings' ><div className='bookheading'>Books</div>
                    <div className='count'>{bookcount} Items</div>
                </div>

                <div className='booksbody'>
                    {/* <form className='form' method='post' onSubmit={addToCart}> */}
                    {Object.values(book).map((data) => (
                        <div className='books'>
                            <div className='bookimg' key={data.bookId}>
                                <img src={getImg(data.name)} className='img' />
                                {data.quantity == 0 && (
                                    <div className='outstock'>OUT OF STOCK</div>
                                )}
                            </div>
                            <div className='base'>
                                <div className='title' key={data.bookId}>{data.name}</div>
                                <div className='author' key={data.bookId}>{data.author}</div>
                                <div className='price' key={data.bookId}>{data.price}</div>
                                <div ><button type='submit' onClick={() => addToCart(data)} className='btn'>Add to cart</button>&nbsp;&nbsp;
                                    <button className='wishlistbtn'>Wishlist</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Dashboard