import { useState, useCallback} from 'react'
import styled from 'styled-components';
import {debounce} from 'lodash'

interface Search {
    requests: any
}

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

const SearchBar = ({ requests }: Search) => {
    const [inputValue, setInputValue] = useState('');

    const debouncedSave = useCallback(debounce((newValue) => requests(newValue), 1000),[]);

    const updateSave = (newValue: string) => {
        setInputValue(newValue);
        debouncedSave(newValue);
    }

    return (
        <InputWrapper>
            <Input type="text" value={ inputValue } onChange={ (e) => updateSave(e.target.value) }/>
        </InputWrapper>
    );
    
}

export default SearchBar;