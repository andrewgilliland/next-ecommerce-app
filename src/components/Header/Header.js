import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import { useSnipcart } from "@hooks/use-snipcart";

import Container from "@components/Container";

import styles from "./Header.module.scss";

const Header = () => {
  const { cart = {} } = useSnipcart();
  const { subtotal = "0.00" } = cart;

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <Link href="/">
          <a>
            <p className={styles.headerTitle}>Strange Wilderness Granola</p>
          </a>
        </Link>
        <div className={styles.headerCart}>
          <button className="snipcart-checkout">
            <FaShoppingCart />
            <span>${subtotal}</span>
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
