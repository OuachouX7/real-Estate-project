import React, { useEffect } from 'react';
import "../../App.css"

const GoogleTranslate = () => {
  // Load the Google Translate script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onload = () => {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en', // Default page language
            includedLanguages: 'en,fr,es,de,it', // List of supported languages
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element' // The div ID where the widget will be inserted
        );
      };
    };

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array to run this effect once
};

export default GoogleTranslate;
