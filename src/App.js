import './App.css';
import { useState ,useEffect} from "react";

const buttons = [
  {
    id: "clear",
    value: "AC",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "divide",
    value: "/",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "multiply",
    value: "*",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "seven",
    value: "7",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "eight",
    value: "8",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "nine",
    value: "9",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "subtract",
    value: "-",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "four",
    value: "4",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "five",
    value: "5",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "six",
    value: "6",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "add",
    value: "+",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "one",
    value: "1",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "two",
    value: "2",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "three",
    value: "3",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "equals",
    value: "=",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "zero",
    value: "0",
    background: "rgb(255, 102, 0)",
    color: "white"
  },
  {
    id: "decimal",
    value: ".",
    background: "rgb(255, 102, 0)",
    color: "white"
  }









]







function App() {
    const [Currentvalue, setCurrentValue] = useState("0");
    const [Formula, setFormula] = useState("");

    useEffect(() => {
    document.addEventListener("keydown", handleKeyDown,false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    });
    function handleKeyDown(e) {
      let value = e.key;
      // all possible value of each key in one if statement
      if (value === "0" || value === "1" || value === "2" || value === "3" || value === "4" || 
      value === "5" || value === "6" || value === "7" || value === "8" || value === "9" ||
       value === "+" || value === "-" || value === "*" || value === "/" || value === "=" ||
       value === ".") {
        calculatorlogic(value);
      }
      if (value === "Enter") {
        if (Formula === "") {
          return;
        }
        calculatorlogic("=");
      }
      if (value === "Backspace" || value === "Delete" || value === "A" || value === "a" || value === "c" || value === "C") {
        calculatorlogic("AC");
      }
    }


    
    function handleClick(e) {
    let value = e.target.value;
    calculatorlogic(value);
    }
    function calculatorlogic(value){
    let localFormula = Formula;
    let localCurrentValue = Currentvalue;
    // checking double operand and replacing it with the new one for + * /
    function checkDoubleOperandexceptnegative() {
      if (value === "+" || value === "*" || value === "/") {
        if (localFormula[localFormula.length - 2] === "+" || localFormula[localFormula.length - 2] === "*" || localFormula[localFormula.length - 2] === "/") {
          localFormula = localFormula.slice(0, -2);
          localFormula += value;
        }
      }
    }
    // good to go for input + * /
    function inputoperandexceptnegative() {
      if (value === "+" || value === "*" || value === "/") {
        if (localCurrentValue === "0" && localFormula === "") {
          return;
        }
        if (localCurrentValue !== "0") {
          localFormula += localCurrentValue;
        }
        localFormula += value;
        localCurrentValue = "0";
      }
    }
    // good to go for input 0-9
    function input0to9plusdecimal() {
      if (value === "0" || value === "1" || value === "2" || value === "3" || value === "4" || value === "5" || value === "6" || value === "7" || value === "8" || value === "9") {
        if (localCurrentValue === "0") {
          localCurrentValue = value;
        }
        else {
          localCurrentValue += value;
        }
      }
      // good to go for checking .
        if (value === "." && !localCurrentValue.toString().includes(".")) {
          localCurrentValue += value;
        }

    }








    inputoperandexceptnegative();
    input0to9plusdecimal();
    checkDoubleOperandexceptnegative();

    // handling negative value
    if (value === "-") {
      if (localCurrentValue === "0" && localFormula === "") {
        localCurrentValue = "";
      }
      if (localCurrentValue !== "0") {
        localFormula += localCurrentValue;
      }

      localFormula += value;
      localCurrentValue = "0";
    }

    // if formula last 2 character are "-/" , "-*" , "--" , "-+" we need to replace it with the new one
    if (value === "+" || value === "*" || value === "/" || value === "-") {
      if (localFormula[localFormula.length - 2] === "-" && localFormula[localFormula.length - 1] === "-") {
        localFormula = localFormula.slice(0, -2);
        localFormula += value;
      }
      if (localFormula[localFormula.length - 2] === "-" && localFormula[localFormula.length - 1] === "+") {
        localFormula = localFormula.slice(0, -2);
        localFormula += value;
      }
      if (localFormula[localFormula.length - 2] === "-" && localFormula[localFormula.length - 1] === "*") {
        localFormula = localFormula.slice(0, -2);
        localFormula += value;
      }
      if (localFormula[localFormula.length - 2] === "-" && localFormula[localFormula.length - 1] === "/") {
        localFormula = localFormula.slice(0, -2);
        localFormula += value;
      }
    }

    // check the last 2 character of formula string if it is an operand and replace it with the new one
    // except for *- and /-
    // hardcoding for formula last 
    let last2char = localFormula.slice(-2);
    if (last2char === "+-" || last2char === "--" || last2char === "**" || last2char === "//" || last2char === "*+"
      || last2char === "*/" || last2char === "/*") {
      localFormula = localFormula.slice(0, -2);
      localFormula += value;
    }


    // error handling when people use mutiple by 0 resulting in 0 the next input become 0232 for example
    // check the first 2 character if it is 00 and replace it with 0
    try {
      let first2char = localCurrentValue.toString().slice(0, 2);
      if (first2char === "00" || first2char === "01" || first2char === "02" || first2char === "03"
        || first2char === "04" || first2char === "05" || first2char === "06" || first2char === "07"
        || first2char === "08" || first2char === "09") {
        localCurrentValue = localCurrentValue.toString().slice(1);
      }
    } catch (error) {
      console.log(error);
    }











    if (value === "=") {
      if (localFormula === "") {
        return;
      }
      localFormula += localCurrentValue;
      localCurrentValue = eval(localFormula);
      localFormula = "";
    }
    // good to go for checking AC
    if (value === "AC") {
      setCurrentValue("0");
      setFormula("");
      return;
    }


    setCurrentValue(localCurrentValue);
    setFormula(localFormula);

  }







    return (
      <div className="App">
        <h1>Calculator</h1>
        <div className="calculator">
          <h2 className="display">Formula</h2>
          <h2 className="display">{Formula}</h2>
          <h2 className="display">Current</h2>
          <h2 className="display" id="display">{Currentvalue}</h2>
          <div className="buttons">
            {buttons.map((button) => (
              <button
                onClick={handleClick}
                className="button"
                key={button.id}
                id={button.id}
                value={button.value}
                style={{ background: button.background, color: button.color }}
              >
                {button.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

export default App;
