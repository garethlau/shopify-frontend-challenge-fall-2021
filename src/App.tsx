import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/search";
import { NominationsProvider } from "./contexts/nominations";
import { MovieDetailsModalProvider } from "./contexts/movie-details-modal";
import Nomination from "./pages/nomination";
import { QueryClient, QueryClientProvider } from "react-query";

import WithNavBar from "./components/layouts/with-nav-bar";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <NominationsProvider>
          <MovieDetailsModalProvider>
            <WithNavBar>
              <Router>
                <Switch>
                  <Route path="/" exact component={Nomination} />
                </Switch>
              </Router>
            </WithNavBar>
          </MovieDetailsModalProvider>
        </NominationsProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
