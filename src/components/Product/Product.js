import Link from "next/link";
import Image from "next/image";

import Button from "@components/Button";

import styles from "./Product.module.scss";

const Product = ({ product, className, ...rest }) => {
  const { featuredImage } = product;

  let productClassName = styles.product;

  if (className) {
    productClassName = `${productClassName} ${className}`;
  }

  return (
    <li className={productClassName} {...rest}>
      <Link href={`/products/${product.slug}`}>
        <a>
          <Image
            width={featuredImage.mediaDetails.width}
            height={featuredImage.mediaDetails.height}
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText}
          />
          <h3>{product.title}</h3>
          <p>${product.productPrice}</p>
        </a>
      </Link>

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
    </li>
  );
};

export default Product;
