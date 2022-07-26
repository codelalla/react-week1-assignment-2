/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
import { createElement, appRender, calculator } from './module.js';

const addNumberList = [1,2,3,4,5,6,7,8,9,0];
const operatorList = ['+','-','/','*','='];

function render({ count, addNumber, prevOperator }) {

  const handleClickButton = (e) => {
    addNumber += e.target.value;
    count = calculator({ count, addNumber: Number(addNumber) },  prevOperator);
    render({ count, addNumber, prevOperator});
  }

  const handleClickOperator = (e) => {
    render({ count, addNumber,  prevOperator: e.target.value });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>
        {addNumber > 0 ? addNumber : prevOperator === '=' ? '' : prevOperator}
        {prevOperator === '=' ? count : ''}
      </div>
      <div>
        {
          addNumberList.map(addNumber => {
            return(
              <button value={addNumber} onClick={handleClickButton}>{addNumber}</button>
            )
          })
        }
      </div>
      <div>
        {operatorList.map(operator => {
          return(
            <button value={operator} onClick={handleClickOperator}>{operator}</button>
          )
        })}
      </div>
    </div>
  );

  appRender(element);
}

render({ count: 0, addNumber: '', prevOperator: '' });
