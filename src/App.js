import './App.css';
import React, { useState } from 'react';

function App() {
  
    return (
        <div className="app">
            <h1>Калькулятор</h1>
            <Calculator />
        </div>
      );
}

export default App;

function Calculator(){
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const inputValue = (value) => {
        if (!Number.isFinite(Number(result))){
            clearValue();
        } else if (result !== ''){
            setInput(result);
            setResult('');
        }
        
        setInput((prevInput) => prevInput + value);
    }

    const clearValue = () => {
        setInput(() => '');
        setResult(() => '');
    } 

    const resultValue = () => {
        try{
            setResult(eval(input))}
        catch(error){
            setResult("Ошибка")
        }
    }
    
    const deleteSymbol = () => {
        inputValue();
        setInput(() => input.slice(0, input.length-1));
    }

    return (
        <div>
            <Display 
                input = {input}
                result = {result}
            />
            <Buttons 
                onInput = {inputValue}
                onClear = {clearValue}
                onResult = {resultValue}
                onDelete={deleteSymbol}
            />
        </div>
    )
}

function Display({input, result}){
    return(
        <>
            <div className='input'>{input}</div>
            <div className='result'>Ответ: {result}</div>
        </>
    )
}

function Buttons({onInput, onClear, onResult, onDelete}){

    const btn = 
        ['7', '8', '9', '+', 
         '4', '5', '6', '-', 
         '1', '2', '3', '*',
         '.', '0', '=', '/', 'C', '\u2190'];

    const inputValue = (value) => {
        if (value === 'C')
            onClear();
        else if (value === '\u2190')
            onDelete();
        else if (value === '=')
            onResult();
        else
            onInput(value);
    }
    
return(
    <>
    <div className="btn">
        {btn.map((item, index) => 
        <button 
        onClick = {() => inputValue(item)}
        key={index}
        className={!isNaN(item) ? 'number' : (item === 'C' || item ==='\u2190' ? 'clear' : 'operate')}
        >
            {item}
        </button>)}
    </div>
    </>
)
}