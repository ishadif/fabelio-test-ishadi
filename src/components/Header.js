import React, {useContext, useState, useEffect} from 'react'

import './header.css'
import {ProductContext} from '../providers/Product'
import Filter from './Filter'

function Header() {
    const {productStyles, deliveryTimes, handleFiltersChange, handleProductSearch} = useContext(ProductContext)
    const [searchProduct, setSearchProduct] = useState('')

    useEffect(() => {
        handleProductSearch(searchProduct)
    },[handleProductSearch, searchProduct])

    return (
        <header className="header">
            <div className="inner">
                <div className="header-row">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="search furniture"
                        value={searchProduct}
                        onChange={({target: {value}}) => setSearchProduct(value)}
                    />
                </div>
                <div className="header-row">
                    <div className="header-col">
                        <Filter
                            placeholder="Furniture Style"
                            filters={productStyles}
                            handleFiltersChange={(data) => handleFiltersChange({type: 'style', data})}
                        />
                    </div>
                    <div className="header-col">
                        <Filter 
                            placeholder="Delivery Time"
                            filters={deliveryTimes}
                            handleFiltersChange={data => handleFiltersChange({type: 'time', data})}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;