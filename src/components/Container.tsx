import React, { useState} from 'react'
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';
import constants from '../constants'
import SearchItem from './SearchItem';


const Wrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-flow: column;
    justify-content:center;
`;


const Container = () => {
    const [searchKey, setSearchKey] = useState('');
    const url = searchKey && `${constants.BASE_URL}?input=${searchKey}${constants.API_KEY}`;
    const { status, data } = useFetch(url);
    console.log(data);

    const onSearchValue = (val: string) => {
        setSearchKey(val);
    }

    return(
        <Wrapper>
            <SearchBar value={searchKey} onSearch={onSearchValue} />
            {status === 'fetched' && <div>
                {data.map((item: any) => {
                    return (
                        <SearchItem result={item.description} key={ item.place_id}/>
                    )
                })}
            </div>}
        </Wrapper>
    )

}

export default Container;