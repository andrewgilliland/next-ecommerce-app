import styles from "./Footer.module.scss";

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      Strange Wilderness Granola {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
