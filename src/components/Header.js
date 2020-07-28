import React from 'react';
import config from '../../config';
import logo from "../assets/gifs/logo_klimakrise_schnelldurchlauf.gif" // Tell webpack this JS file uses this image

import ReactTooltip from "react-tooltip";
import Scroll from 'react-scroll-to-element';

// 2dO: change author to yaml front matter
export default function Header() {
  return (
    <div>
      <div id="logoHeader">
      <h1>{config.heading}</h1>
      <ReactTooltip />
      <div className="descriptionTop">{config.descriptionTopLeft} | 👨‍💻 Text: <a data-tip={config.descriptionAuthorTooltip}>{config.descriptionAuthor}</a></div>
      <a href="#letsGo" className="imgLink"><img src={logo} role="presentation" className="logo" /></a>
      <div className="descriptionBottom">{config.descriptionBottom}</div>
      <div className="privacyNotice">Diese Webseite bindet Videos von Wikimedia Commons (<a href="https://meta.wikimedia.org/wiki/Privacy_policy/de" target="_blank">Datenschutz</a>), Google Fonts (<a href="https://policies.google.com/privacy" target="_blank">Datenschutz</a>) sowie Inhalte von YouTube (<a href="https://policies.google.com/privacy" target="_blank">Datenschutz</a>) ein (bessere Lösung in Arbeit). Davon abgesehen ist diese Seite trackingfrei und auf gar keinen Fall langweilig, versprochen! 😉</div>

      <Scroll type="id" element="letsGo">
        <a className="button">{config.buttonText}</a>
      </Scroll>

      <div><a className="button" href="#letsGo">{config.buttonText}</a></div>
      </div>

    </div>
  );
}
