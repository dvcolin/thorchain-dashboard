import styles from "./NodeCardProperty.module.scss";
import Text from "../Text/Text";

interface NodeCardPropertyProps {
  children: React.ReactNode;
}

const NodeCardProperty = ({ children }: NodeCardPropertyProps) => {
  return (
    <div className={styles.nodeCardProperty}>
      <Text>{children}</Text>
    </div>
  );
};

export default NodeCardProperty;
