/* 2DO: this is double coded, use gatsby-node and type */

import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgressRead from 'react-scroll-progress-read';
import { Link } from "gatsby";

const IndexPage = ({data}) => {
    return (
        <Layout>
          <div id="main">
            <div className="box container">
            <Link to="/">&laquo; Zurück</Link>
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
            </div >
          </div>
        </Layout>
    )
}

export default IndexPage;

export const pageQuery = graphql`
query {
    markdownRemark(fileAbsolutePath: {regex: "/bonus.md/"}) {
        id
        html
  }
}
`
