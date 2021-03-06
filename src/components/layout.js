/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.scss";

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            portrait {
              fluid(
                maxWidth: 200
                imgixParams: { fm: "png", auto: "compress" }
              ) {
                ...GatsbyDatoCmsSizes_noBase64
              }
            }
            copyrightNode {
              internal {
                content
              }
            }
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className={`container ${showMenu ? "is-open" : ""}`}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div className="container__sidebar">
            <div className="sidebar">
              <Img
                fluid={data.datoCmsHome.portrait.fluid}
                className="sidebar__logo"
              />
              <ul className="sidebar__menu">
                <li>
                  <Link to="/" activeClassName="active-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/stickers"
                    activeClassName="active-link"
                  >
                    Stickers
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" activeClassName="active-link">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/about" activeClassName="active-link">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" activeClassName="active-link">
                    Contact
                  </Link>
                </li>
              </ul>
              <div
                className="sidebar__intro"
                dangerouslySetInnerHTML={{
                  __html:
                    data.datoCmsHome.introTextNode.childMarkdownRemark.html,
                }}
              />
              <p className="sidebar__social">
                {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                  <a
                    key={profile.profileType}
                    href={profile.url}
                    target="blank"
                    className={`social social--${profile.profileType.toLowerCase()}`}
                  >
                    {" "}
                  </a>
                ))}
              </p>
              <div
                className="sidebar__copyright"
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsHome.copyrightNode.internal.content,
                }}
              />
            </div>
          </div>
          <div className="container__body">
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                <div className="mobile-header__logo">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object,
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
