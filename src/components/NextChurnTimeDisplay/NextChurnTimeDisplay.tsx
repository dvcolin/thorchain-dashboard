import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import { formatNextChurnTime } from "../../util";
import Text from "../Text/Text";
import styles from "./NextChurnTimeDisplay.module.scss";

const NextChurnTimeDisplay = () => {
  const [data] = useContext(AppContext);
  const { nextChurnTime } = data;
  return (
    <div className={styles.container}>
      <h1>Next Churn ETA</h1>
      <Text>{formatNextChurnTime(nextChurnTime)}</Text>
    </div>
  );
};

export default NextChurnTimeDisplay;
