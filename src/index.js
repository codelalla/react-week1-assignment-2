/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

// 엘리먼트
const app = document.getElementById('app');

const operators = ['+', '-', '*', '/', '='];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

/**
 * 입력한 값을 추가할 배열
 *
 * @type {string[]}
 */
const inputValues = [];

function getLastInput() {
  return inputValues[inputValues.length - 1] ?? null;
}

// 입력된 값이 연산자인지 판단
function isOperator(value) {
  return value && operators.includes(value);
}

// 입력한 값이 없는지 판단
function isEmpty() {
  return inputValues.length === 0;
}

// 입력 값 비우기
function clearInputValues() {
  inputValues.splice(0, inputValues.length);
}

function calculate() {
  const operatorMaps = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
  };

  const [num1, opt, num2] = inputValues;

  return operatorMaps[opt](parseInt(num1, 10), parseInt(num2, 10)).toString();
}

function render(result = '') {
  // 버튼 클릭 이벤트 핸들러
  function handleClick(value) {
    // 숫자일 경우
    if (!isOperator(value)) {
      // 이전에 입력된 값이 없을 경우
      if (isEmpty()) {
        inputValues.push(value);
        render(value);
        return;
      }

      // 있을 경우
      const lastInput = getLastInput();

      // 숫자가 아닌 경우
      if (isOperator(lastInput)) {
        inputValues.push(value);
        render(value);
      } else {
        // 이전 값이 숫자인 경우
        const newInput = lastInput + value;
        inputValues.pop();
        inputValues.push(newInput);
        render(newInput);
      }
    } else {
      // 숫자가 아닐 경우
      if (isEmpty()) return;

      const lastInput = getLastInput();

      if (isOperator(lastInput)) return;

      if (inputValues.length === 3) {
        // 숫자, 연산자, 숫자가 있을 경우 입력했던 값 모두 계산
        const resultValue = calculate();
        clearInputValues();
        inputValues.push(resultValue);
        render(resultValue);

        if (value !== '=') inputValues.push(value);
      } else {
        inputValues.push(value);
      }
    }
  }

  const element = (
    <div className="calculator">
      <p>간단 계산기</p>

      <div className="calculator__result">
        { result }
      </div>

      <div className="calculator__buttons">
        {/* 숫자 키 */}
        {
          numbers.map((num) => (
            <button type="button" onClick={() => handleClick(num)}>
              {num}
            </button>
          ))
        }
        {/* 연산자 키 */}
        {
          operators.map((o) => (
            <button type="button" onClick={() => handleClick(o)}>
              {o}
            </button>
          ))
        }
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render();
