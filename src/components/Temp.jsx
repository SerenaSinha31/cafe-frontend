import react from 'react'

// export default function Temp (){
    // if (flag) return <h1>Flag is true</h1>;
    // else return <h1>Flag isFalse</h1>
    // return(
    //     <>
    //    Temp
    //     </>
    //)

    //return flag ? <h1>Flag is true</h1> : <h1>Flag is false</h1>

    // return flag && <h1>Flag is true</h1>
//     export default function Temp (){
//     const handleClick = ()=>{

//     alert("Hello World")
//     }

//     const handleSubmit = (name) =>{
//         alert(`Hello ${name}`)
//     }
//     return(
//         <>
//         <button onClick={handleClick}>Click</button>
//         <button onClick={()=>handleSubmit("John")}>Submit</button>
//         </>
//     )
// }
// page is not refreshing component is re rendering
import {useState} from 'react'
export default function Temp(){
    const[score, setscore]= useState(0);
    const updateScore=()=>{
        setscore(score + 1)
    }

    
    const decreasescore=()=>{
        setscore(score-1)
    }
    return(
        <>
        {score}
        <p>
            
            <button onClick={updateScore}>Update Score</button> 
            <button onClick={decreasescore}>Update Score</button>
             
            
        </p>
        </>
    )
    
    
}
