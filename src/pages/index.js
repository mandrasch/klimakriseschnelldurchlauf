import React from 'react';

import Layout from '../components/Layout';
import { graphql } from "gatsby"

import Header from '../components/Header';
import Footer from '../components/Footer';

import ScrollProgressRead from 'react-scroll-progress-read';
import { Link } from "gatsby";

const IndexPage = ({data}) => {
    return (
        <Layout>

        <div id="progressBarRead" style={{ margin: 0, padding: 0, position: "fixed", left: 0, top: 0, zIndex: 1000}}>
        <ScrollProgressRead
          backgroundColor="white"
          height="10px"
          target="letsGo"
        />
        </div>

          <Header />

          <div id="main">

            <div className="box container" id="letsGo">
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
            </div>
            <div className="box container">
            <ul>
              <li><Link to="credits/">Credits</Link></li>
              <li><Link to="bonus/">Bonus</Link></li>
            </ul>
            </div>


          </div>
          <Footer />
        </Layout>
    )
}

export default IndexPage

/* frontmatter {
  credits
}*/

/* 2DO: use type and gatsby-node.js to use it better */
export const pageQuery = graphql`
query IndexPageQuery {
    markdownRemark(fileAbsolutePath: {regex: "/index.md/"}) {
        id
        html
  }
}
`
