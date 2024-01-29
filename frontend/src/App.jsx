import axios from 'axios';

function App() {
  function axiosTest () {
    axios.get("http://localhost:8080/api/test")
      .then(function (response) {
        console.log(response.data);
      })
  };


  return (
    <>
      <h1>Test for Frontend</h1>
      <button onClick={axiosTest}>Axios Test</button>
    </>
  )
}

export default App
