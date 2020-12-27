import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Header from "./Header";
import TaskItemRoute from "./routes/TaskItem";
import TaskListRoute from "./routes/TaskList";

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
