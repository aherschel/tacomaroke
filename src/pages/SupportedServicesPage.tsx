import React from "react";
import { Jumbotron } from "react-bootstrap";

const SupportedServicesPage = () => {
  return (
    <>
      <br />
      <Jumbotron>
        <h1>Supported Music Services</h1>
        <p>
          We are continually working on the support for different streaming
          services in tacomaroke. Information on supported streaming services
          can be found below.
        </p>
        <p>
          Requests for additional streaming service support can be made by
          opening a request using{" "}
          <a href="https://github.com/aherschel/tacomaroke/issues/new">
            this link.
          </a>
        </p>
      </Jumbotron>
      <ul>
        <li>
          last.fm
          <ul>
            <li>
              <span role="img" aria-label="green-checkmark">
                ✔️
              </span>{" "}
              <b>Supported</b> - loading playlists based on tags, pulling songs,
              and linking to song pages.
            </li>
          </ul>
        </li>
        <li>
          Apple Music
          <ul>
            <li>
              <span role="img" aria-label="circle-with-line">
                🚫
              </span>{" "}
              <b>Unsupported</b> - they require a $99 membership to access their
              SDK, which I&apos;m unwilling to pay right now.
            </li>
          </ul>
        </li>
        <li>
          Amazon Music
          <ul>
            <li>
              <span role="img" aria-label="circle-with-line">
                🚫
              </span>{" "}
              <b>Unsupported</b> - There is no officially provided API for
              amazon music, though there is work to reverse engineer. Given lack
              of support I plan to prioritize more user-friendly services.
            </li>
          </ul>
        </li>
        <li>
          Spotify
          <ul>
            <li>
              <span role="img" aria-label="construction-worker">
                👷
              </span>{" "}
              <b>Under Development</b> - logging in to a user account and
              pulling your playlists, loading playlists, embedded playback (for
              premium members), and linking to song pages.
            </li>
            <li>
              <a href="https://github.com/aherschel/tacomaroke/issues/48">
                Tracking Issue
              </a>
            </li>
          </ul>
        </li>
        <li>
          Youtube Music
          <ul>
            <li>
              <span role="img" aria-label="construction-worker">
                👷
              </span>{" "}
              <b>Under Development</b> - logging in to a user account and
              pulling your playlists, loading playlists, embedded playback (for
              premium members), and linking to song pages.
            </li>
            <li>
              <a href="https://github.com/aherschel/tacomaroke/issues/49">
                Tracking Issue
              </a>
            </li>
          </ul>
        </li>
        <li>
          SoundCloud
          <ul>
            <li>
              <span role="img" aria-label="empty-checkbox">
                ⬜
              </span>{" "}
              <b>Not Started</b> - I haven&apos;t looked into this yet.
            </li>
            <li>
              <a href="https://github.com/aherschel/tacomaroke/issues/51">
                Tracking Issue
              </a>
            </li>
          </ul>
        </li>
        <li>
          Napster
          <ul>
            <li>
              <span role="img" aria-label="empty-checkbox">
                ⬜
              </span>{" "}
              <b>Not Started</b> - I haven&apos;t looked into this yet.
            </li>
            <li>
              <a href="https://github.com/aherschel/tacomaroke/issues/52">
                Tracking Issue
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default SupportedServicesPage;
