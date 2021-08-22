import { useState, useCallback} from 'react'
import styled from 'styled-components';
import { debounce } from 'lodash'
import { apiStatus } from '../constants'
import SearchItem from './SearchItem';
import { Loader } from '../styles/Loader';
import { Search } from '../types';



const InputWrapper = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
`;

const Input = styled.input`
    width: 80%;
    height: 24px;
    border-radius: 5px;
    border: 1.5px solid #000;
    font-size: 15px;
    padding-left: 10px;
`;

const MessageWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: row;
    padding-top: 20px;
`;

const ListWrapper = styled.div`
    padding-left: 10%;
    padding-top: 10px;
    width: 80%;
`;

const SearchBar = ({ data, request, status, placeholder, error }: Search) => {
    const [inputValue, setInputValue] = useState('');

    const debouncedSave = useCallback(debounce((newValue) => request(newValue), 1000),[]);

    const updateSave = (newValue: string) => {
        setInputValue(newValue);
        debouncedSave(newValue);
    }

    return (
        <>
        <InputWrapper>
            <Input type="text" value={inputValue} onChange={(e) => updateSave(e.target.value)} placeholder={ placeholder}/>
        </InputWrapper>
        {status === apiStatus.IDLE && <MessageWrapper>Search for a place.</MessageWrapper>}
            {status === apiStatus.LOADING && <MessageWrapper><Loader /></MessageWrapper>}
            {status === apiStatus.ERROR && error.length > 0 &&  <MessageWrapper>{ error}</MessageWrapper>}
            {status === apiStatus.FETCHED && data.length === 0 && <MessageWrapper>No Results found.</MessageWrapper>}
            {status === apiStatus.FETCHED && data.length !== 0  && <ListWrapper>
                {data.map((item: any) => {
                    return (
                        <SearchItem result={item.description} key={item.place_id} onSelect={updateSave}/>
                    )
                })}
            </ListWrapper>}   
        </>
    );
    
}

export default SearchBar;