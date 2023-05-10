import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap');

html,
body {
  margin: 0;  
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  font-family: 'Instrument Serif', serif;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#root{
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
  height: 80vh;
  background-color: white;
  box-shadow: rgba(100,100,100,0.2) 0px 7px 29px 0px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.App{
  padding:0px 20px;
  width: 100%;
  height: 75vh;
  overflow-y: hidden;
}

`;
export default GlobalStyles;
