import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

export default function Page404() {
  return (
    <div>
        <ErrorMessage/>
        <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>404 Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', color: '#9f0013'}} to="/">Back to main page</Link>
    </div>
  )
}
