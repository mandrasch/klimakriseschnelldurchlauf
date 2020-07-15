import React from 'react';
import config from '../../config';
import logo from "../assets/gifs/logo_klimakrise_schnelldurchlauf.gif" // Tell webpack this JS file uses this image


// 2dO: change author to yaml front matter
export default function Header() {
  return (
    <div>
      <div id="logoHeader">
      <h1>{config.heading}</h1>
      <div className="descriptionTop">{config.descriptionTop}</div>
      <a href="#letsGo" className="imgLink"><img src={logo} role="presentation" className="logo" /></a>
      <div className="descriptionBottom">{config.descriptionBottom}</div>
      <div className="privacyNotice">Diese Webseite bindet Videos von YouTube (via youtube-nocookie.com, <a href="https://policies.google.com/privacy" target="_blank">Datenschutzerklärung</a>) und Wikimedia Commons (Schwester-Projekt der Wikipedia, <a href="https://meta.wikimedia.org/wiki/Privacy_policy/de" target="_blank">Datenschutzerklärung</a>) ein. Mit der Benutzung der Webseite erklärst du dich hiermit einverstanden. Ansonsten ist diese Seite trackingfrei und auf gar keinen Fall langweilig, versprochen! 😉</div>

      <div><a className="button" href="#letsGo">{config.buttonText}</a></div>
      </div>

    </div>
  );
}
