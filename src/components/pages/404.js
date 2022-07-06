import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link, useNavigate   } from "react-router-dom"

export default function Page404() {
  const navigate = useNavigate();
  // console.log(navigate)
  return (
    <div>
        <ErrorMessage/>
        <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>404 Page doesn't exist</p>
            <button style={{'display': 'block', marginLeft: 'auto', marginRight: 'auto', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', color: '#9f0013'}} onClick={() => navigate(-1)}>Turn back </button>
    </div>
  )
}
