import Text from "../Text/Text";
import styles from "./NodeCardPropertyTitle.module.scss";

interface NodeCardPropertyTitleProps {
  children: React.ReactNode;
}

const NodeCardPropertyTitle = ({ children }: NodeCardPropertyTitleProps) => {
  return (
    <div className={styles.nodeCardPropertyTitle}>
      <Text>{children}</Text>
    </div>
  );
};

export default NodeCardPropertyTitle;
