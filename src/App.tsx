import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import aws_exports from "./aws-exports";
import { isAuthEnabled } from "./FeatureFlags";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AboutPage from "./pages/AboutPage";
import SongPage from "./pages/SongPage";
import PartyPage from "./pages/PartyPage";
import PartyLobbyPage from "./pages/PartyLobbyPage";
import DebugRouter from "./debug-pages/DebugRouter";
import PageNotFoundPage from "./pages/PageNotFoundPage";

Amplify.configure(aws_exports);

/**
 * The top-level App component is responsible for a few key things, including setting up
 * authentication, routing, and other global state required for the app.
 */
const App = () => {
  return (
    <Router>
      <div>
        <AppHeader />
        <Container>
          <Switch>
            <Route path="/about" exact>
              <AboutPage />
            </Route>
            <Route path="/song" exact>
              <SongPage />
            </Route>
            <Route path="/party/:partyId" exact>
              <PartyPage />
            </Route>
            <Route path="/" exact>
              <PartyLobbyPage />
            </Route>
            <Route path="/debug">
              <DebugRouter />
            </Route>
            <Route path="*">
              <PageNotFoundPage />
            </Route>
          </Switch>
          <AppFooter />
        </Container>
      </div>
    </Router>
  );
};

export default isAuthEnabled() ? withAuthenticator(App) : App;
