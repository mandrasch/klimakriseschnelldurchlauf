import React from 'react';

import Layout from '../components/Layout';
import { graphql } from "gatsby"

import Header from '../components/Header';
import Footer from '../components/Footer';

import ScrollProgressRead from 'react-scroll-progress-read';


/* 2DO: add data to header
 <Header data={data} /> did not work */

         /* 2DO: use 2 click solution like borlabs: https://de.borlabs.io/borlabs-cookie/iframe-demo/ */

         /*<CookieConsent
           location="bottom"
           buttonText="Okay, einverstanden."
           declineButtonText="Webseite verlassen"
           cookieName="schnelldurchlaufCookieNotice"
           style={{ background: "#2B373B", padding: "10px 0px" }}
           buttonStyle={{ color: "#4e503b", fontSize: "12px" }}
           enableDeclineButton
           onDecline={() => {
             window.location = 'https://www.ecosia.org/';
           }}
           debug={true}
           flipButtons={true}
         >
           Diese Webseite bindet Videos von YouTube (<a href="https://policies.google.com/privacy" target="_blank">Datenschutzerklärung</a>) und Wikimedia Commons (<a href="https://meta.wikimedia.org/wiki/Privacy_policy/de" target="_blank">Datenschutzerklärung</a>) ein. Mit der Benutzung der Webseite erklärst du dich hiermit einverstanden.
         </CookieConsent>*/

const IndexPage = ({data}) => {
    return (
        <Layout>

        <div id="progressBarRead" style={{ margin: 0, padding: 0, position: "fixed", left: 0, top: 0, zIndex: 1000}}>
        <ScrollProgressRead
          backgroundColor="white"
          height="10px"
          target="mainArticleContentForScrollProgress"
        />
        </div>




          <Header />

          <div id="main">



            <div className="box container" id="letsGo">
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />

            </div>

          </div>

        </Layout>
    )
}

export default IndexPage

/* frontmatter {
  credits
}*/

export const pageQuery = graphql`
query IndexPageQuery {
    markdownRemark(fileAbsolutePath: {regex: "/index.md/"}) {
        id
        html
  }
}
`
