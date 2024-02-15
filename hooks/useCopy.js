import React, { useEffect, useState } from 'react';

const useCopy = () => {
  const [copiedText, setCopiedText] = useState('');

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('clipboard is not supported');
      return false;
    }

    try {
      await navigator?.clipboard?.writeText(text);
      setCopiedText(text);
    } catch (error) {
      console.error(`Failed copying the text ${text}`, error);
      setCopiedText(null);
    }
  };

  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => {
        setCopiedText('');
      }, 500); // Adjust this delay as needed
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  // The issue you're encountering is likely due to React's optimization mechanism, which tries to avoid unnecessary re-renders. When the state copiedText is set to the same value repeatedly, React might not trigger a re-render because it perceives the state update as redundant.

  // To fix this issue, you can modify your copy function to reset the copiedText state to an empty string after a certain delay, ensuring that subsequent copies trigger a re-render. Here's how you can modify your useCopy hook to achieve this:

  console.log({ copiedText });

  return [copiedText, copy];
};

export default useCopy;
