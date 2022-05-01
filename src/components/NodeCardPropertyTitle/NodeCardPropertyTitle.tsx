import Text from "../Text/Text";
import styles from "./NodeCardPropertyTitle.module.scss";

interface NodeCardPropertyTitleProps {
  centered?: boolean;
  children: React.ReactNode;
}

const NodeCardPropertyTitle = ({
  centered,
  children,
}: NodeCardPropertyTitleProps) => {
  return (
    <th
      className={`${styles.nodeCardPropertyTitle} ${
        centered ? `${styles.centered}` : ""
      }`}
    >
      <Text className={styles.nodeCardPropertyTitleText}>{children}</Text>
    </th>
  );
};

export default NodeCardPropertyTitle;
