// Versión skeleton de ProductCard: misma estructura, mientras cargan los resultados.
import Skeleton from "../ui/Skeleton";
import styles from "./ProductCard.module.css";

export default function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton shape="block" className={styles.foto} />
      <div className={styles.body}>
        <Skeleton width="40%" height={10} />
        <Skeleton width="70%" height={22} />
        <Skeleton width="55%" />
        <div className={styles.actions}>
          <Skeleton shape="block" height={44} />
          <Skeleton shape="block" height={44} />
        </div>
      </div>
    </div>
  );
}