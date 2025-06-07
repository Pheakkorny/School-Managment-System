import styles from "./HomePage.module.css";
import "./HomePage1.css";
// import state in react
import { useState } from "react";

const HomePage = () =>{
    // const box = {width:200, height:200, borderStyle:"dotted", backgroundColor: "green"};
    // const s = {color: "blue", };
    // const t = {backgroundColor: "gray"}
    // declare state
    // const [value1, setValue1] = useState(0);
    // const [value2, setValue2] = useState(10);
    const [value3, setValue3] = useState("Pheak");
    // object
    const [state, setState] = useState({
        x: 10,
        y: 20,
        loading: false,
        value1: "Sok",
        value2: "Sa",
        valueCount: 0,
        currentStep: 1,
    });
    const onClickBtn1 = () =>{
        // body function
        // alert("Click btn1");
        // setValue1(1000); // change value
        // setValue3("Nii");
        setState({
            ...state, // រក្សា​state ចាស់
            value1: "Mr Sok",
        });
    }
    const onClickBtn2 = () =>{
        // body function
        // setValue2(2000); // change value
        // alert("Click btn2");
        // setValue3("Nii2");
        setState({
            ...state, // រក្សា​state ចាស់
            value2: "Mr Sa"
        });
    }
    const onClickReset =() =>{
        // body function
        // setValue1(0);
        // setValue2(10); // change value
        // setValue3("Born");
        setState({
            ...state,
            value1: "Sok",
            value2: "Sa"
        });
    }
    const onClickLoading =()=>{
        setState({
            ...state,
            loading: !state.loading,
        })
    }
    const onClickDescrease = () => {
        setState({
            ...state,
            valueCount: state.valueCount - state.currentStep,
        });
    }
    const onClickIncrease = () => {
        setState({
            ...state,
            valueCount: state.valueCount + state.currentStep,
        });
    }
    return (    
        <div className={{...styles.container, ...styles.container1}}>
           {/* <div id={styles.myId}>AAAAA</div>
           <div className={"txtMain bgBlack"}>BBB</div>
           <h1 style={{color: "red", borderStyle: "dotted", marginTop: 100, marginLeft: 100}}>HomePage</h1>  {/*  inline styles */}
           {/* <div style={box}></div>  internal styles */}
           {/* <h1 style={{...s,...t}}>internal styles</h1> conbine internal styles  */}
           <h1>{state.value1}</h1>
           <h1>{state.value2}</h1>
           <h2>{value3}</h2>
           <h2>{state.loading ? "Loading..." : ""}</h2>
           <button onClick={onClickLoading}>{state.loading == false ? "Set Loading" : "Stop Loading"}</button>
           <button onClick={onClickBtn1}>Btn1</button>
           <button onClick={onClickBtn2}>Btn2</button>
           <button onClick={onClickReset}>Reset</button>
           {/* ------------------------------------------ */}
           <h1>valueCount : {state.valueCount}</h1>
           <span>currentStep </span>
           <input value={state.currentStep}
           onChange={(e)=>{
            setState({
                ...state,
                currentStep: Number(e.target.value),
            });
           }}></input>
           <br />
           <button onClick={onClickDescrease}>-</button>
           <button onClick={onClickIncrease}>+</button>
        </div>
    );
};
export default HomePage;
