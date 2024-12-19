import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  const [languages, setLanguages] = useState([]);
  // const user = useSelector((state) => state.user.value);

  // Handler for when selected language changes
  const handleSelectedLanguageChange = (event) => {
    setSelectedLanguage(
      languages.find((language) => language.displayValue === event.target.value)
    );
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${backendUrl}/dev/languages`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (!data.result)
        throw new Error('Error retrieving languages from backedn');

      setLanguages(data.dev_languages);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const container = 'flex w-[100%]';
  const selector =
    'border rounded-md text-center p-1 bold text-darkPurple focus:border-darkPurple focus:outline-none w-[150px]';

  return (
    <div className={container}>
      <select
        id='language-select'
        value={selectedLanguage.displayValue}
        onChange={handleSelectedLanguageChange}
        className={selector}
      >
        {languages.map((language) => (
          <option key={language.displayValue} value={language.displayValue}>
            {language.displayValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
