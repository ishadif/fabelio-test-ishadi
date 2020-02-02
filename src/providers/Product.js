import React, {useState, useEffect} from 'react';

export const ProductContext = React.createContext(null);

function Product(props) {
    const [products, setProducts] = useState([])
    const [deliveryTimes] = useState([
        {value: 7,text: '1 week'},
        {value: 14,text: '2 weeks'},
        {value: 30,text: '1 month'},
        {value: '>',text: '& more'}
    ])
    const [styleFilters, setStyleFilters] = useState([])
    const [timeFilters, setTimeFilters] = useState([])
    const [productStyles, setProductStyles] = useState([])
    const [productSearch, setProductSearch] = useState([])

    useEffect(() => {
        fetch('https://www.mocky.io/v2/5c9105cb330000112b649af8')
            .then(data => data.json())
            .then(data => {
                setProducts(data.products);
                const furnitureStyles = data.furniture_styles.reduce((accumulator, current) => {
                    return accumulator = [...accumulator, {value: current.toLowerCase(), text: current}]
                }, [])
                
                setProductStyles(furnitureStyles)
            })
    },[])

    function handleFiltersChange(data) {
        if (data.type === 'style') {
            setStyleFilters(data.data)
        } else {
            setTimeFilters(data.data)
        }
    }

    return (
        <ProductContext.Provider value={{
            products,
            productStyles,
            deliveryTimes,
            styleFilters,
            timeFilters,
            handleFiltersChange,
            productSearch,
            handleProductSearch: (value) => setProductSearch(value)
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default Product;
