import { useState } from 'react';
import HeroSection from './HeroSection';
import MainEventsCarousel from './MainEventsCarousel';
import EventsTabs from './EventsTabs';
import ChallengesSection from './ChallengesSection';
import ResultsSection from './ResultsSection';
import SearchBar from './SearchBar';

const Contest = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <HeroSection />
      <SearchBar onSearch={handleSearch} />
      <MainEventsCarousel searchQuery={searchQuery} />
      <EventsTabs searchQuery={searchQuery} />
      <ChallengesSection searchQuery={searchQuery} />
      <ResultsSection searchQuery={searchQuery} />
    </>
  );
};

export default Contest;
