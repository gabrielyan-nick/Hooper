import React, { useState, useEffect } from "react";

const useMount = ({ opened }) => {
  const [mounted, setMounted] = useState(false);
  const animationTime = 300;

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, animationTime);
    }
  }, [opened]);

  return { mounted };
};

export default useMount;
