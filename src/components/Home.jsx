
import "./Home.css"
export default function Home ({name,age}){
  let id = 34533566
  return(
  <>
<h1 style={{backgroundColor:"orange"}}>Hello {name}. You are {age} years old</h1>
<h2 className="App-Home-Header">Your Student ID is {id}</h2>
<p>This is Paragraph</p>
  </>
  )  
}