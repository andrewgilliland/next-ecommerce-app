import Image from "next/image";

import Button from "@components/Button";

import styles from "./Product.module.scss";

const Product = ({ product, className, ...rest }) => {
  let productClassName = styles.product;

  if (className) {
    productClassName = `${productClassName} ${className}`;
  }

  return (
    <li className={productClassName} {...rest}>
      <Image
        width="1777"
        height="999"
        src={product.image}
        alt={product.title}
      />
      <h3>{product.title}</h3>
      <p>${product.price}</p>

      <Button>Add to Cart</Button>
    </li>
  );
};

export default Product;
