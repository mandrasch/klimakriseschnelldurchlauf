import React from 'react';
import config from '../../config';
import { Link } from "gatsby";
export default function Footer() {
  return (
    <div id="footer">

    Datenschutz
    Diese Webseite bindet Videos von Wikimedia Commons (<a href="https://meta.wikimedia.org/wiki/Privacy_policy/de" target="_blank">Datenschutz</a>), Google Fonts (<a href="https://policies.google.com/privacy" target="_blank">Datenschutz</a>) sowie Inhalte von YouTube (<a href="https://policies.google.com/privacy" target="_blank">Datenschutz</a>) ein (bessere Lösung in Arbeit). Der Webserver ist so konfiguriert, dass keine Analysedaten erhoben werden, ebenso läuft derzeit keine Analysesoftware wie Google Analytics. Die Webseite wird bei All-Inkl gehostet (Ökostrom, Serverstandort: Deutschland.)  Alle weiteren Infos:
    <a href="https://matthias-andrasch.eu/blog/impressum-datenschutz/">Datenschutzerklärung sowie Impressum</a>

      <div className="container medium">

        <ul className="copyright">
          <li>CC BY - SA 4.0, Wien 2020 2DO: a rel=license</li>
          <li>
            <Link to="credits/">Credits / Urheberrecht</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
