import React, {useContext} from 'react'
import Card from './Card'
import { ProductContext } from '../providers/Product';

function ProductList() {
    const {products, styleFilters, timeFilters, productSearch} = useContext(ProductContext)

    let filteredProducts = []

    function filterByStyle(product) {
        return product.furniture_style.filter(style => styleFilters.includes(style.toLowerCase()))
    }

    function filterByDeliveryTime(product) {
        return timeFilters.filter(time => {
            if (typeof time !=='number') {
                return product.delivery_time > 30
            } else {
                return product.delivery_time <= time
            }
        })
    }

    function filterByName(product) {
        return product.name.toLowerCase().includes(productSearch.toLowerCase())
    }

    if (productSearch) {
        filteredProducts = products.filter(product => filterByName(product))
    } else if (styleFilters.length > 0 && timeFilters.length > 0) {
        filteredProducts = products.filter(product => filterByStyle(product).length > 0 && filterByDeliveryTime(product).length > 0)
    } else if (styleFilters.length > 0) {
        filteredProducts = products.filter(product => filterByStyle(product).length > 0)
    } else if (timeFilters.length > 0) {
        filteredProducts = products.filter(product => filterByDeliveryTime(product).length > 0)
    } else {
        filteredProducts = products
    }

    return (
        <div className="inner">
          <div className="container">
            {
                filteredProducts.map(product => <Card product={product} key={product.name}/>)
            }
          </div>
        </div>
    )
}

export default ProductList;