import React from "react"
import { Link, graphql } from "gatsby"
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase';
import Bio from "../components/bio"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext
  let featuredImgFluid = get(post, 'frontmatter.featuredImage.childImageSharp.fluid', undefined);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={data.site.siteMetadata.siteUrl + get(post, 'frontmatter.featuredImage.childImageSharp.fluid.src', '')}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div><strong>Published:</strong> {post.frontmatter.date}</div>
          {post.frontmatter.tags.length > 0 && (
            <div>
              <strong>Tags: </strong>
              {post.frontmatter.tags.map((tag, index) => {
                let separator = index < post.frontmatter.tags.length - 1 ? ', ' : '';
                return(
                  <span key={`post-tag-${index}`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>
                      {tag}
                    </Link>
                    {separator}
                  </span>
                );
              })}
            </div>
          )}
          <hr />
        </header>
        {featuredImgFluid && (
          <Img fluid={featuredImgFluid} />
        )}
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
