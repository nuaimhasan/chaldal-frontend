import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ rating }) {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div className="flex items-center gap-1 text-xs text-yellow-400">
      {stars}
    </div>
  );
}
