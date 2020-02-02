import React, {useState, useEffect, useRef} from 'react';

import './filter.css';

function Filter({filters, handleFiltersChange, placeholder}) {
    const [search, setSearch] = useState('')
    const [selectedFilters, setSelectedFilters] = useState([])
    const [inputFocus, setInputFocus] = useState(false)
    const [resultsHeight, setResultsHeight] = useState(0)
    const resultsEl = useRef(null);
    const wrapperEl = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    /* eslint-disable */
    useEffect(() => {
        handleFiltersChange(selectedFilters)
    }, [selectedFilters])

    useEffect(() => {
        if (inputFocus) {
            setResultsHeight(resultsEl.current.getBoundingClientRect().height)
        } else {
            setResultsHeight(0)
        }
    }, [inputFocus, search]);

    function handleClickOutside(e) {
        if (wrapperEl.current && !wrapperEl.current.contains(e.target)) {
            setInputFocus(false)
        }
    }

    function toggleSelect(value) {
        let editedFilters = [...selectedFilters];

        if (!selectedFilters.includes(value)) {
            editedFilters.push(value)
        } else {
            const filteredIndex = selectedFilters.findIndex(filter => filter === value);

            editedFilters.splice(filteredIndex, 1)
        }

        setSelectedFilters(editedFilters)
    }

    const filtered = 
            inputFocus ? 
                search ? filters.filter(style => style.text.toString().toLowerCase().includes(search.toLowerCase())) 
                : filters 
            : []

    return (
        <div 
            className="checkbox-container"
            ref={wrapperEl}
        >
            <input 
                placeholder={placeholder}
                className="checkbox-input"
                onChange={({target: {value}}) => setSearch(value)}
                onFocus={() => setInputFocus(true)}
            />
            <ul
                ref={resultsEl}
                className="results"
                style={{"--height": resultsHeight}}
            >
                {
                    filtered.map((filter, i) => (
                        <li 
                            key={filter.value} 
                            className="result" 
                            style={{"--i": i}}
                        >
                            <input
                                type="checkbox" 
                                name={filter.value} 
                                value={filter.value}
                                defaultChecked={selectedFilters.includes(filter.value)}
                            />
                            <div className="checkbox">
                                <label htmlFor="furniture-styles">
                                    {filter.text}
                                </label>
                                <div 
                                    className="checkbox-option" 
                                    data-checked={selectedFilters.includes(filter.value)}
                                    onClick={() => toggleSelect(filter.value)}
                                />
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Filter;