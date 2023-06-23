import { Redirect, Route, Switch } from 'react-router-dom';

/* Import Components */
import { NavBar, ProtectedRoute } from 'components';

/* Import Route Components */
import { Home } from './home/index.jsx';
import {Board} from './task/board.jsx'
import { Profile } from './profile';
import { AuthRoutes } from './auth';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/auth" component={AuthRoutes} />
      <Route>
        <div>
          <NavBar />
          <hr />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/board" component={Board} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Route>
    </Switch>
  );
};
