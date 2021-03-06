import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Header from "@components/Header";
import Container from "@components/Container";
import Button from "@components/Button";

import styles from "@styles/Product.module.scss";
import Layout from "@components/Layout";

export default function Product({ product }) {
  const { featuredImage } = product;

  return (
    <div>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Layout>
        <Container>
          <h1>{product.title}</h1>
          <div className={styles.productWrapper}>
            <div className={styles.productImage}>
              <Image
                width={featuredImage.mediaDetails.width}
                height={featuredImage.mediaDetails.height}
                src={featuredImage.sourceUrl}
                alt={featuredImage.altText}
              />
            </div>
            <div className={styles.productContent}>
              <div dangerouslySetInnerHTML={{ __html: product.content }} />
              <p>${product.productPrice}</p>

              <Button
                className="snipcart-add-item"
                data-item-id={product.productId}
                data-item-price={product.productPrice}
                data-item-url="/"
                data-item-description=""
                data-item-image={featuredImage.sourceUrl}
                data-item-name={product.title}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { productSlug } = params;

  const client = new ApolloClient({
    uri: "http://44.197.223.104/graphql",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query ProductBySlug($slug: ID!) {
        product(id: $slug, idType: SLUG) {
          title
          product {
            productId
            productPrice
          }
          content
          featuredImage {
            node {
              altText
              sourceUrl
              mediaDetails {
                height
                width
              }
            }
          }
          id
        }
      }
    `,
    variables: {
      slug: productSlug,
    },
  });

  const product = {
    ...response.data.product,
    ...response.data.product.product,
    featuredImage: {
      ...response.data.product.featuredImage.node,
    },
  };

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "http://44.197.223.104/graphql",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query AllProducts {
        products {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `,
  });

  const paths = response.data.products.edges.map(({ node }) => {
    return {
      params: {
        productSlug: node.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
