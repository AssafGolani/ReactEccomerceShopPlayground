import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <Button onClick={onDecrease}>-</Button>
        <span>{quantity}</span>
        <Button onClick={onIncrease}>+</Button>
      </p>
    </li>
  );
}
