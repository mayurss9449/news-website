import React, { useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'



const News  = (props) => {

    const [articles, setArticles] = useState([])  
      
    const [page, setPage] = useState(1)  
    const [totalResults, setTotalResults] = useState(0)  

    const capitalFirstletter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () =>{

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=07a565aee3b94dec94913ffb79d1010c&page=${page - 1}&pageSize=${props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json()    
   
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
    }

    useEffect(() => {

      document.title = `SMS News - ${capitalFirstletter(props.category)}`;
      updateNews();
      // eslint-disable-next-line
    }, [])


    const handlePrvClick = async()=>{
      setPage(page-1);
      updateNews();
    }
      const handleNextClick = async()=>{
        setPage(page+1)
        updateNews()
    }

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{fontfamily: "Playfair Display", marginTop:"75px"}}>SMS News - Top {capitalFirstletter(props.category)} Headlines</h1>
          <div className='row'>
            {articles.map((element)=>{
             return<div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title? element.title.slice(0,44):""} description={element.description? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} />
          </div>
          })}
         
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={page<=1} type="button" className="btn btn-primary" onClick={handlePrvClick}>&larr; Previous</button>
        
        <button disabled={page + 1 >Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    )
  
}


News.defaultProps ={
  country:"in",
  pageSize: 8,
  category:"general",

}
News.propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


export default News
