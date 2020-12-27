import { useEffect, useState } from "react";

function useField(name: string, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [hasChanged, setHasChanged] = useState(false);

  // Reset the local state to the value from props.
  useEffect(() => {
    setHasChanged(false);
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!hasChanged) {
      setHasChanged(true);
    }
    setValue(event.target.value);
  };

  return {
    name,
    value,
    hasChanged,
    onChange,
  };
}

export default useField;
