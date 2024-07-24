import React, { useState } from 'react';

// components
import MessageLayout from "../components/aside/MessageLayout";
import SearchBar from "../components/search/SearchBar";
import RecommendedItems from '../components/search/RecommandedItems';
import RealtimeList from "../components/search/RealtimeList";

// icons
import { FaList } from "react-icons/fa";

// stores
import { asideStore } from "../stores/asideStore";

const About: React.FC = () => {
  const isMessageOpen = asideStore(state => state.isMessageOpen);
  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('grid');

  return (
    <>
      <div id='Body' className="grid grid-cols-8 gap-4">
        <div id="aside" className="col-start-2 col-span-2 hidden xl:block ">
          {/* aside 자리 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
            {isMessageOpen && <MessageLayout />}
          </div>
        </div>

        {/* main자리 */}
        <div id="Main" className="lg:col-start-3 lg:col-span-4 md:col-start-2 md:col-span-5 sm:col-start-2 sm:col-span-6">
          <div className="container mx-auto p-4">
            <div className=" md:flex-row justify-between gap-4 mb-4">
              <div className="w-full">
                <SearchBar />
              </div>
              <div className="mt-4">
                <div className="flex justify-end mb-4">
                  <button className="btn btn-sm mr-2" onClick={() => setViewMode('grid')}>Grid</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => setViewMode('list')}>
                    <FaList />
                  </button>
                </div>
                <RecommendedItems />
              </div>
            </div>
            <div className="w-1/4">
              <RealtimeList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;