import React from "react";
import { withLocalize } from "react-localize-redux";
import MenuItem from '@material-ui/core/MenuItem';
const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => {

  const handleMenuClose = (langCode) => {
    console.log("Testtttt", langCode)
    setActiveLanguage(langCode)
  };
  return (
    <div>
      {languages.map((lang) => (
        <MenuItem key={lang.code}
          onClick={() => handleMenuClose(lang.code)}>
          {lang.name}
        </MenuItem>
      ))}
    </div>
  );
};
export default withLocalize(LanguageToggle);
