import React from 'react'

const NewsItem = (props) => {
   
        let {title, description,imageUrl,newsUrl, date} = props;
        
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageUrl?imageUrl:'https://c.ndtvimg.com/2022-09/qm2ibv6o_foreign-minister-s-jaishankar-afp-650_650x400_27_September_22.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl}  className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
