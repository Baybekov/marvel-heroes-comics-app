import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";



const Page404 = () => {
  return (
    <div style={{'display': 'flex', 
        'justify-content' : 'center',
        'align-items' : 'center',
        'flex-direction' : 'column'}}>
        <ErrorMessage/>
        <h1>
            404 Page not found
        </h1>
        <br />
        
        <Link to="/" style={{'color' : 'red'}}>Back to main page</Link>
    </div>
  );
};

export default Page404;
