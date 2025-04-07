import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  // Load the Google Translate script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    // Handle script loading and error
    script.onload = () => {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,de,ar,it', // Add or remove languages as needed
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };
    };

    script.onerror = (error) => {
      console.error("Google Translate script failed to load", error);
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element" className="translate"></div>
    </div>
  );
};

export default GoogleTranslate;
