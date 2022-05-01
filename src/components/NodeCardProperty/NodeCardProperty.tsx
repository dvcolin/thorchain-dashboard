import styles from "./NodeCardProperty.module.scss";
import Text from "../Text/Text";

interface NodeCardPropertyProps {
  centered?: boolean;
  nodeNumberCell?: boolean;
  children: React.ReactNode;
}

const NodeCardProperty = ({
  centered,
  nodeNumberCell,
  children,
}: NodeCardPropertyProps) => {
  return (
    <td
      className={`${styles.nodeCardProperty} ${
        centered ? `${styles.centered}` : ""
      } ${nodeNumberCell ? `${styles.nodeNumberCell}` : ""}`}
    >
      <Text>{children}</Text>
    </td>
  );
};

export default NodeCardProperty;
