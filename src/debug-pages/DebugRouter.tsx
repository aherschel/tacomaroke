import React from "react";
import { Switch, Route, useRouteMatch, Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { isDebugEnabled } from "../FeatureFlags";
import SpotifyIntegrationDebugPage from "./SpotifyIntegrationDebugPage";
import YoutubeMusicIntegrationDebugPage from "./YoutubeMusicIntegrationDebugPage";

const DebugHeader = () => {
  return (
    <Navbar bg="light" variant="light" expand="md">
      <Navbar.Brand>Debug Links</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/debug/spotify-integration">
            Spotify Integration
          </Link>
          <Link className="nav-link" to="/debug/youtube-music-integration">
            Youtube Music Integration
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const DebugRouter = () => {
  const { path } = useRouteMatch();

  if (!isDebugEnabled()) {
    return <Redirect to="/error" />;
  }

  return (
    <div>
      <DebugHeader />
      <Switch>
        <Route path={`${path}/spotify-integration`}>
          <SpotifyIntegrationDebugPage />
        </Route>
        <Route path={`${path}/youtube-music-integration`}>
          <YoutubeMusicIntegrationDebugPage />
        </Route>
      </Switch>
    </div>
  );
};

export default DebugRouter;
