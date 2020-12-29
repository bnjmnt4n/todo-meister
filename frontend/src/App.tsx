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
import { FilterProvider } from "./state/Filter";
import { SortSettingsProvider } from "./state/SortSettings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <FilterProvider>
          <SortSettingsProvider>
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
          </SortSettingsProvider>
        </FilterProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
