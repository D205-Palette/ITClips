import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  #root {
    background-color: white;
    width: 200px;
  }

  body {
    font-family: Pretendard, sans-serif;
    background-color: #f7f7f7;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: #333;
    text-align: center;
  }

  button {
    width: 100%;
    padding: 15px;
    margin-top: 15px;
    background-color: #80cee1;
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
  }

  button:not(:disabled):hover {
    background-color: #0056b3;
  }

  .bookmark-selector {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.bookmark-selector h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.bookmark-selector ul {
  list-style-type: none;
  padding: 0;
}

.bookmark-selector li {
  margin-bottom: 10px;
}

.bookmark-selector button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.bookmark-selector button:hover {
  background-color: #0056b3;
}
    
`;

export default GlobalStyle;
