import moment from "moment";
import { Rating } from "@mui/material";

import Heading from "../Heading";

interface ListRatingsProps {
	product: any;
}

const ListRatings: React.FC<ListRatingsProps> = ({ product }) => {
	return (
		<div>
			<Heading titlle="Product Review" />
			<div className="text-sm mt-2 ">
				{product.reviews &&
					product.reviews.map((review: any) => {
						return (
							<div key={review.id} className="max-w-[300px]">
								<div className="flex gap-2 items-center ">
									<div> Avatar </div>
									<div className="font-semibold"> {review?.user.name} </div>
									<div className="font-light">
										{moment(review.createdDate).fromNow()}
									</div>
								</div>
								<div className="mt-2">
									<Rating value={review.rating} readOnly />
									<div className="ml-2">{review.comment}</div>
									<hr className="mt-4 mb-4" />
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ListRatings;
