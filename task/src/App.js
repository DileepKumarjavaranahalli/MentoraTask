import Datetime from "./Components/Datetime";
import { Form } from "./Components/Form";

function App() {

  return (
    <div className="wrapper">
      <h1 className='texthead'>Welcom to Mentora</h1>
      <div className="form-and-add-userBox">
        <Form/>
        <Datetime />
      </div>
    </div>
  );
}

export default App;