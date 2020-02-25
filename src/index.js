import React, { Fragment, useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

function Results({ query, category }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25&lang=es&q=${query}&category=${category}`)
        .then((response) => response.json())
        .then(data => {
            setData(data.hits)
        });
    }, [query, category]);

    return (
        <ul className='result'>
            {data.length && data.map(item => (
                <li className='result__item' key={item.id}>
                    <img src={item.webformatURL} alt={item.tags} />
                </li>
            ))}
        </ul>
    )
};


function App() {
    const [ query, setQuery ] = useState('random')
    const [ category, setCategory ] = useState('')
    const refInput = useRef(null);
    
    function keyDown(event) {
        if(event.keyCode == 13) {
            setQuery(event.currentTarget.value)
        }
    }
    
    function onClick() {
        setQuery(refInput.current.value)
    }

    function clickSelect(event) {
        setCategory(event.currentTarget.value)
    }

    return (
        <Fragment>
            <section className="search">
                <input className="search__input" ref={refInput} type='search' onKeyDown={keyDown}></input>
                <button className="search__button" onClick={onClick}>Search</button>
                <select className="search__select" onChange={clickSelect}>
                    <option>Categories</option>
                    <option value="science">Science</option>
                    <option value="education">Education</option>
                    <option value="people">People</option>
                    <option value="feelings">Feelings</option>
                    <option value="computer">Computer</option>
                    <option value="buildings">Buildings</option>
                </select>
            </section>
            <section>
                <Results query={query} category={category} />
            </section>
        </Fragment>
    )
}

render(<App />, document.getElementById('app'));