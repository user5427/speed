import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { LanguagesConstants } from '../../.constants/MainConstants';
import "../../styles/languageSelector.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const toggleRef = useRef(null);
  const [menuWidth, setMenuWidth] = useState(null);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    if (toggleRef.current) {
      setMenuWidth(toggleRef.current.offsetWidth);
    }
  }, []);

  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle 
        variant="dark" 
        id="dropdown-basic" 
        className="d-flex align-items-center" 
        ref={toggleRef}
      >
        <span className="flag-label">
          {LanguagesConstants.find(lang => lang.code === i18n.language)?.flag}
          {LanguagesConstants.find(lang => lang.code === i18n.language)?.label}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: menuWidth || 'auto' }}>
        {LanguagesConstants.map(({ code, label, flag }) => (
          <Dropdown.Item key={code} onClick={() => handleLanguageChange(code)}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              {flag}
              {label}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
