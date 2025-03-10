import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Property Details</h1>
      <p>Property ID: {id}</p>
      <>
        // write code here
      </>
    </div>
  );
};

export default PropertyDetails;
