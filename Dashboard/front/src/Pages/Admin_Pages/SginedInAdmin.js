import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import DiningTables from './DiningTables'


export function SignedInAdmin(){
    return(<>
     <BrowserRouter>
      {/* Navbar component */}
     
      <div className='container'>
      <Switch>

        <Route path="/admin/dining-tables/list" component={DiningTables}/>
     


      </Switch>
      </div>

      </BrowserRouter>
    
    
    
    </>)}