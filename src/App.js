import logo from './logo.svg';
import './App.css';
import uxenglish from './uxenglish.png'
import dontmakemethink from './book1.png'
import sharepoint from './SharePoint.png'
import { Grid, Row, Col } from 'react-flexbox-grid';
import React , { useEffect,  useState } from 'react'
import axios from 'axios'
import reactmaterialui from './reactmaterial-ui.png'
import bookicon from './bookicon.png'
import carticon from './carticon.png'
function App() {

  const [book, setBook] = useState({
    name: '',
    author: '',
    desc: '',
    logo: '',
    price: '',
    quantity: '',
  })
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios.get('http://localhost:9090/bookstore/book/getlist').then((response) => {
      
      console.log(response);
        setBook(response.data)})
        return book;
        
    }

  const getImg = (name)=>{
    if (name=='uxenglish'){
       return (`${uxenglish}`)
    }
    if (name=='dontmakemethink'){
      return(`${dontmakemethink}`)
    }
    if (name=='reactmaterial-ui'){
      return(`${reactmaterialui}`)
    }
    if (name=='sharepoint'){
      return(`${sharepoint}`)
    }
  }

  return (




    <div className='main'>
      <div className="Appclass">
      <div><img src={bookicon}/></div>
      <div className='bookstoreheading'>BookStore</div>
      <div className='searchbar'><input className='ip' type='search' /></div>
      <div className='cartname'>Cart</div>
      <div className='cartlogo'><img src={carticon} /></div>
      </div>
      <div className='headings' ><div className='bookheading'>Books</div>
        <div className='count'>120items</div>
      </div>
      
      <div className='booksbody'>
      {Object.values(book).map((data) => (
      <Grid fluid>
        <Row around='xm'>
          <Col xm={3}>

              <div className='books'><div className='bookimg'>
                <img className='img' src={getImg(data.name)} />
              </div>
                <div className='base'>
                  <div className='title'>{data.name}</div>
                  <div className='author'>{data.author}</div>
                  <div className='price'>{data.price}</div>
                  <div ><button className='btn'>Add to cart</button></div>
                </div>
              </div>
          </Col>
        </Row>
      </Grid>
           ))} 
            </div>
    </div>
  );
}

export default App;
