import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";

const useFetchReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthContext();

  // HENT ALLE UDTALELSER – memoiseret med useCallback, så referencen forbliver stabil (dvs at den ikke bliver genoprettet ved hver render)
  const fetchReviews = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/reviews");
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refetch-funktion, der blot kalder fetchReviews
  const refetch = useCallback(() => {
    fetchReviews();
  }, [fetchReviews]);

  // OPRET UDTALELSE
  const createReview = async (reviewData) => {
    try {
      const response = await fetch("http://localhost:3042/review", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error("Fejl ved oprettelse af ophold");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      throw error;
    }
  };

  // SLET UDTALELSE
  const deleteReview = async (params) => {
    await fetch(`http://localhost:3042/review/${params}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    /* Filter all the reviews without the matching ID. */
    const filteredArray = reviews.filter((act) => act._id !== params);

    setReviews(filteredArray);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    createReview,
    deleteReview,
    setReviews,
    fetchReviews,
    isLoading,
    refetch,
    error,
  };
};

export { useFetchReviews };
