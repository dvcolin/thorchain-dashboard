import styles from "./StatusButton.module.scss";

interface StatusButtonProps {
  isActive: boolean;
  variant: "active" | "ready" | "disabled";
  children: React.ReactNode;
  onClick: () => void;
}

const StatusButton = ({
  isActive,
  variant,
  children,
  onClick,
}: StatusButtonProps) => {
  return (
    <button
      className={`${styles.statusButton} ${styles[variant]} ${
        isActive ? styles[`${variant}--active`] : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StatusButton;
