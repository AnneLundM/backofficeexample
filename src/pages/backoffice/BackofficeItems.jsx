// ACTIVITIES
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useFetchActivities } from "../../components/hooks/useFetchActivities";
import { useAlert } from "../../context/alertContext";
import { useFetchReviews } from "../../components/hooks/useFetchReviews";
const BackofficeActivities = () => {
  const { activities, deleteActivity, refetch } = useFetchActivities();
  const navigate = useNavigate();
  const { showError, showConfirmation } = useAlert();

  const handleAddActivity = () => {
    navigate("/activities/add");
  };

  const handleEdit = (activityId) => {
    navigate(`/activities/edit/${activityId}`);
  };

  const handleConfirmation = (activityId) => {
    showConfirmation(
      "Du er ved at slette denne aktivitet",
      "Er du sikker?",
      () => deleteActivity(activityId),
      () => showError("Sletning annulleret.")
    );
  };

  console.log(activities);
  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Ugedage</th>
            <th>Tidspunkt</th>
            <th>Billede</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities?.map((activity) => (
            <tr key={activity._id} className='backofficeItem'>
              <td>{activity.title}</td>
              <td>{`${activity.description.slice(0, 10)}...`}</td>
              <td>{activity.date}</td>
              <td>{activity.time}</td>
              <td>
                <img src={activity.image}></img>
              </td>
              <td className='buttons'>
                <Button
                  buttonText='Slet'
                  background='red'
                  onClick={() => handleConfirmation(activity._id)}
                />
                <Button
                  buttonText='Redigér'
                  onClick={() => handleEdit(activity._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText='Tilføj aktivitet'
                background='green'
                onClick={() => handleAddActivity()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  );
};

// STAYS

// REVIEWS

const BackofficeReviews = () => {
  const { reviews, deleteReview, refetch } = useFetchReviews();
  const navigate = useNavigate();
  const { showError, showConfirmation } = useAlert();

  const handleAddActivity = () => {
    navigate("/reviews/add");
  };

  const handleEdit = (activityId) => {
    navigate(`/reviews/edit/${activityId}`);
  };

  const handleConfirmation = (reviewId) => {
    showConfirmation(
      "Du er ved at slette denne udtalelse",
      "Er du sikker?",
      () => deleteReview(reviewId),
      () => showError("Sletning annulleret.")
    );
  };
  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Review</th>
            <th>Stay</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review) => (
            <tr key={review._id} className='backofficeItem'>
              <td>{review.name}</td>
              <td>{review.age}</td>
              <td>{review.review}</td>
              <td>{review.stay}</td>
              <td className='buttons'>
                <Button
                  buttonText='Slet'
                  background='red'
                  onClick={() => handleConfirmation(review._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText='Tilføj udtalelse'
                background='green'
                onClick={() => handleAddActivity()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  );
};

export { BackofficeActivities, BackofficeReviews };
