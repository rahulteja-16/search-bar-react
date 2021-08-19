import React from 'react'

interface item {
    result: string
}

const SearchItem = ({ result } : item) => {
    return <li>{ result}</li>
}
export default SearchItem;