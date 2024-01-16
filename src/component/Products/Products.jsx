import React, { useEffect, useState } from 'react'
import Tbodycomp from './tbodycomp'


function Products() {
  const [Data,setData]=useState([])
  const [Categories,setCategories]=useState([])
  const [currentCategory, setCurrentCategory] = useState()
  const [searchvalue,setSearchvalue]=useState('')
 
  const FetchData=()=>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(res=>setData(res))}
  const fetchcategories=()=>{
              fetch('https://fakestoreapi.com/products/categories')
              .then(res=>res.json())
              .then(res=>setCategories(res))
            
             }
  useEffect(()=>{
              FetchData()
              fetchcategories()
             
             },[])
             
  const displayCategories = () => {
    return Categories.map((category, key) =>
        <button key={key}
                className="btn btn-outline-primary"
                onClick={(e) => {
                    e.preventDefault()
                    setCurrentCategory(category)
                }}>
            {category}
        </button>
    )
}
const resetFilters = () => {
  setSearchvalue('');
  setCurrentCategory(undefined);
};

 const handlesubmit=(e)=> {
  e.preventDefault()
  const inputvalue=document.getElementById('inputv').value
  setSearchvalue(inputvalue)
  }
  const displaytbody=()=>{
    let Datafilter =Data.filter(d=>{return d.id.toString().includes(searchvalue) || d.title.includes(searchvalue) || d.description.includes(searchvalue)} )
    if (currentCategory !== undefined) {
      Datafilter = Datafilter.filter(product => {
          return product.category === currentCategory
      })
  }
   if(Datafilter.length>0){return Datafilter.map((pr)=>{return <Tbodycomp data={pr} key={pr.id}/> })}
 
  
  }
  return (
    <>
            {/* search input */}
            <form onSubmit={handlesubmit}>
            <div className="input-group mb-3 mx-auto p-4">
            <span className="input-group-text" id="inputGroup-sizing-default">Search Zone</span>
             <input type="text" className="form-control" aria-label="Sizing example input" id='inputv' placeholder='Search product' aria-describedby="inputGroup-sizing-default"/>
             <div>
             <button type='submit' className="btn btn-primary">Search</button>
             <button type="button" className="btn-close btn btn-danger" aria-label="Close" onClick={resetFilters}></button>
             </div>
            </div></form>
           
            {/* categorys  */}
            <h1 className='d-flex justify-content-center border'>Categories</h1>
            <div className="btn-group  mx-auto p-4 d-flex justify-content-center" role="group" aria-label="Basic outlined example">
            
            {displayCategories()}
            </div>
            {/* table of product */}
            <h1 className='d-flex justify-content-center border'>Product</h1>
            <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">description</th>
                <th scope="col">Category</th>
                <th scope="col">Rating</th>
             
              </tr>
            </thead>
            {/* tbody used other compenent */}
            <tbody>
              
               {displaytbody()}
              
             
            </tbody>
          </table>
    </>
  )
}

export default Products