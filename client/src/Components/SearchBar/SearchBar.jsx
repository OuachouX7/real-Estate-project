import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("Apartment");
  const [priceRange, setPriceRange] = useState("$106 - $948");
  const [category, setCategory] = useState("");
  const { t } = useTranslation();

  const handleSearch = () => {
    onSearch({ location, priceRange, category });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xl mx-auto">
  <div className="flex space-x-2 mb-4"></div>
  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      className="p-2 border rounded"
      placeholder={t('Location')}
      onChange={(e) => setLocation(e.target.value)}
    />
    <input
      type="number"
      className="p-2 border rounded"
      placeholder={t('Enter price range')}
      onChange={(e) => setPriceRange(e.target.value)}
    />
    <div>
      <select
        name="category"
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">{t('Select property category')}</option>
        <option value="House">{t('House')}</option>
        <option value="Apartment">{t('Apartment')}</option>
        <option value="Condo">{t('Bureau')}</option>
        <option value="Condo">{t('Garage')}</option>
      </select>
    </div>
    <button
      onClick={handleSearch}
      className="bg-orange-500 text-white p-2 rounded col-span-3"
    >
      {t('Search')}
    </button>
  </div>
</div>

  );
}
