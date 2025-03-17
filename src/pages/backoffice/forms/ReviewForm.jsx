import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFetchReviews } from "../../../components/hooks/useFetchReviews";
import styles from "./form.module.css";
import Button from "../../../components/button/Button";

const ReviewForm = ({ isEditMode }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stay, setStay] = useState("");
  const [review, setReview] = useState("");
  const { refetch } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { createReview, isLoading, updateReview } = useFetchReviews();

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    // Opret et JSON-objekt
    const reviewData = {
      name,
      age,
      stay,
      review,
    };

    if (isEditMode && id) {
      reviewData.id = id;
    }

    try {
      let response;
      if (isEditMode && id) {
        response = await updateReview(reviewData);
      } else {
        response = await createReview(reviewData);
      }

      console.log(
        isEditMode ? "Udtalelse opdateret" : "Ophold oprettet",
        response
      );

      if (response) {
        await refetch();
        navigate("/reviews");
      }
    } catch (error) {
      console.error("Fejl ved håndtering af udtalelse:", error);
    }
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <form onSubmit={handleSubmitReview} className={styles.form}>
      <h2>{isEditMode ? "Opdater review" : "Tilføj udtalelse"}</h2>
      <div>
        {/* 
        Når htmlFor-attributten på en <label> matcher id-attributten på et <input>-element, oprettes der en forbindelse mellem dem.
        Dette betyder, at når brugeren klikker på etiketten, bliver det tilknyttede inputfelt automatisk aktiveret eller fokuseret. 
        Dette gør både brugervenligheden og tilgængeligheden (accessibility) bedre
        */}
        <label htmlFor='name'>Navn:</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='age'>Alder:</label>
        <input
          id='age'
          type='text'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='stay'>Ophold:</label>
        <input
          id='stay'
          type='text'
          value={stay}
          onChange={(e) => setStay(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='review'>Udtalelse:</label>
        <input
          id='review'
          type='text'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </div>

      <Button
        type='submit'
        buttonText={isEditMode ? "Opdater review" : "Tilføj review"}
        background={!isEditMode && "green"}
      />
    </form>
  );
};

export default ReviewForm;
