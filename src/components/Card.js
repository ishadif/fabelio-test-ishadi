import React from 'react'

import './card.css';

function Card({product}) {
    const formattedPrice = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(product.price)
    return (
        <div className="card">
            <div className="card-header">
                <h1 className="product-title">{product.name}</h1>
                <span className="product-price">{formattedPrice}</span>
            </div>
            <div className="card-content">
                <p className="product-description">{product.description.slice(0, 113)}</p>
                <div className="product-styles">
                    {
                        product.furniture_style.map(style => <span>{style}</span>)
                    }
                </div>
                <p className="product-delivery-time">{product.delivery_time} Day</p>
            </div>
        </div>
    )
}

export default Card;