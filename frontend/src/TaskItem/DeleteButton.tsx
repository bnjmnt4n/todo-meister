import { useState } from "react";

type DeleteButtonProps = {
  onDelete: () => void;
};

function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);

  const handleClick = () => {
    if (!shouldShowConfirmation) {
      setShouldShowConfirmation(true);
    } else {
      onDelete();
      setShouldShowConfirmation(true);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        {shouldShowConfirmation ? "Confirm?" : "Delete task"}
      </button>
    </div>
  );
}

export default DeleteButton;
