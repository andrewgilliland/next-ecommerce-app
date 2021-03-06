import { useState } from "react";
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Fuse from "fuse.js";

import Container from "@components/Container";
import Product from "@components/Product";
import Button from "@components/Button";

import styles from "@styles/Home.module.scss";
import Layout from "@components/Layout";

export default function Home({ products, groceries }) {
  const [activeGrocery, setActiveGrocery] = useState();
  const [query, setQuery] = useState();

  let activeProducts = products;

  if (activeGrocery) {
    activeProducts = activeProducts.filter(({ groceries }) => {
      const groceryIds = groceries.map(({ slug }) => slug);

      return groceryIds.includes(activeGrocery);
    });
  }

  const fuse = new Fuse(activeProducts, {
    keys: ["title", "groceries.name"],
  });

  if (query) {
    const results = fuse.search(query);
    activeProducts = results.map(({ item }) => item);
  }

  function handleOnSearch(event) {
    const value = event.currentTarget.value;
    setQuery(value);
  }

  return (
    <Layout>
      <Head>
        <title>Strange Wilderness Granola</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1 className="sr-only">Strange Wilderness Granola</h1>
        <p>Get Wierd with Your Granola</p>

        <div className={styles.discover}>
          <div className={styles.groceries}>
            <h2>Filter by Product</h2>
            <ul>
              {groceries.map((grocery) => {
                const isActive = grocery.slug === activeGrocery;
                let groceryClassName;

                if (isActive) {
                  groceryClassName = styles.groceryIsActive;
                }

                return (
                  <li key={grocery.id}>
                    <Button
                      className={groceryClassName}
                      color="blue"
                      onClick={() => setActiveGrocery(grocery.slug)}
                    >
                      {grocery.name}
                    </Button>
                  </li>
                );
              })}
              <li>
                <Button
                  className={!activeGrocery && styles.groceryIsActive}
                  color="blue"
                  onClick={() => setActiveGrocery(undefined)}
                >
                  View All
                </Button>
              </li>
            </ul>
          </div>
          <div className={styles.search}>
            <h2>Search</h2>
            <form>
              <input onChange={handleOnSearch} type="search" />
            </form>
          </div>
        </div>

        <h2>Available Flavors</h2>
        <ul className={styles.products}>
          {activeProducts.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "http://44.197.223.104/graphql",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query AllProductsAndGroceries {
        products {
          edges {
            node {
              id
              content
              uri
              title
              product {
                productPrice
                productId
              }
              slug
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
              groceries {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        groceries {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `,
  });

  const products = response.data.products.edges.map(({ node }) => {
    const data = {
      ...node,
      ...node.product,
      featuredImage: {
        ...node.featuredImage.node,
      },
      groceries: node.groceries.edges.map(({ node }) => node),
    };
    return data;
  });

  const groceries = response.data.groceries.edges.map(({ node }) => node);

  return {
    props: {
      products,
      groceries,
    },
  };
}
