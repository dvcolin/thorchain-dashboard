import Text from "../Text/Text";
import styles from "./NodesInfoCard.module.scss";

interface NodesInfoCardProps {
  title: string;
  value: string | number;
}

const NodesInfoCard = ({ title, value }: NodesInfoCardProps) => {
  return (
    <div className={styles.nodesInfoCard}>
      <div className={styles.titleBox}>
        <Text className={styles.title}>{title}</Text>
      </div>
      <div className={styles.valueBox}>
        <Text className={styles.value}>{value}</Text>
      </div>
    </div>
  );
};

export default NodesInfoCard;
