import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from '../pages/Index';

import Detail from '../pages/Professional/Detail'
import New from '../pages/Professional/New';
import Edit from '../pages/Professional/Edit';

import TypeDetail from '../pages/Type/Detail'
import TypeNew from '../pages/Type/New';
import TypeEdit from '../pages/Type/Edit';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/new" component={New} />
        <Route path="/detail/:id+" component={Detail} />
        <Route path="/edit/:id+" component={Edit} />

        <Route path="/type/new" component={TypeNew} />
        <Route path="/type/detail/:id+" component={TypeDetail} />
        <Route path="/type/edit/:id+" component={TypeEdit} />
    </Switch>
)

export default Routes;