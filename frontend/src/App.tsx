import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
import TaskListRoute from "./routes/TaskList";
import TaskItemRoute from "./routes/TaskItem";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/tasks/:taskId">
            <TaskItemRoute />
          </Route>
          <Route exact path="/">
            <TaskListRoute />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
