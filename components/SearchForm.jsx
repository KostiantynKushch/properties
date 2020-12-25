import { useRouter } from 'next/router';

const SearchForm = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('search');
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="city"></label>
        <input type="text" id="city" placeholder="Anywhere" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
