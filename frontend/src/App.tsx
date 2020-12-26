import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Header from "./Header";
import TaskListRoute from "./routes/TaskList";
import TaskItemRoute from "./routes/TaskItem";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
