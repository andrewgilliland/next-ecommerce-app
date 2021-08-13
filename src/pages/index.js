import Head from "next/head";
import Image from "next/image";

import Header from "@components/Header";
import Container from "@components/Container";
import Button from "@components//Button";

import styles from "@styles/Home.module.scss";

import products from "@data/products.json";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Container>
          <h1>Strange Wilderness Granola</h1>
          <p>Get Wierd with Your Granola</p>
          <h2>Available Flavors</h2>
          <ul className={styles.products}>
            {products.map((product) => {
              return (
                <li key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>

                  <Button>Add to Cart</Button>
                </li>
              );
            })}
          </ul>
        </Container>
      </main>

      <footer className={styles.footer}>
        Strange Wilderness Granola {new Date().getFullYear()}
      </footer>
    </div>
  );
}
