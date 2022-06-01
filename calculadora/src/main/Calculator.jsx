import react, {Component} from "react";
import './Calculator.css'

import Button from '../components/Button'
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operator: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{

    state = {...initialState}

    clearMemory(){
        this.setState({...initialState})
    }

    setOperator(operator){
        if (this.state.current === 0){
            this.setState({ operator, current: 1, clearDisplay: true})
        }
        else{
            const equals = operator === "="
            const currentOperator = this.state.operator

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperator} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operator: equals ? null : operator,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(digit){
        if (digit === "." && this.state.displayValue.includes('.')){
            return
        }
        
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({displayValue, clearDisplay: false})

        if (digit !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }
    
    render(){
        const addDigit = d => this.addDigit(d)
        const setOperator = operator => this.setOperator(operator)

        return(
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={() => this.clearMemory()} triple/>
                <Button label="/" click={setOperator} operator/>                
                <Button label="7" click={addDigit}/>
                <Button label="8" click={addDigit}/>
                <Button label="9" click={addDigit}/>
                <Button label="*" click={setOperator} operator/>
                <Button label="4" click={addDigit}/>
                <Button label="5" click={addDigit}/>
                <Button label="6" click={addDigit}/>
                <Button label="-" click={setOperator} operator/>
                <Button label="1" click={addDigit}/>
                <Button label="2" click={addDigit}/>
                <Button label="3" click={addDigit}/>
                <Button label= "+" click={setOperator} operator/>
                <Button label="0" click={addDigit} double/>
                <Button label="." click={addDigit}/>
                <Button label="=" click={setOperator} operator/>
            </div>
        )
    }
}