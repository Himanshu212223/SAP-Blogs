"use client";

import { fiori, capm } from "@/app/Resources/ContentList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContextProvider";
import Link from "next/link";

const SideBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [fioriItem, setFioriItem] = useState(fiori);
  const [capmItem, setCapmItem] = useState(capm);

  const onHandleSearch = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value === "") {
      setFioriItem(fiori);
      setCapmItem(capm);
      console.log("it is empty");
      return;
    }

    const fioriTopicList = [];

    const capmTopicList = [];

    fiori.forEach((fioriElement) => {
      const topic = fioriElement.tag.toLowerCase();
      const searchedTopic = searchValue.toLowerCase();
      if (topic.includes(searchedTopic)) {
        fioriTopicList.push(fioriElement);
      }
    });

    capm.forEach((capmElement) => {
      const topic = capmElement.tag.toLowerCase();
      const searchedTopic = searchValue.toLowerCase();
      if (topic.includes(searchedTopic)) {
        capmTopicList.push(capmElement);
      }
    });

    setFioriItem(fioriTopicList);
    setCapmItem(capmTopicList);
  };

  //  Get the Hamburger details from AppContext

  const { visibleHamburger } = useContext(AppContext);

  // SideBar UI
  return (
    <aside
      className={`bg-gray-100 h-[90vh] p-2 border-r-2 absolute top-16 left-0 w-full z-50 
  md:relative md:w-[20%] md:top-0 md:left-0 md:translate md:bg-transparent bg-gray-200-x-0
  transition-transform duration-300 overflow-hidden
  ${visibleHamburger ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >

      <div className="flex flex-col gap-4 h-full">
        {/* Search Bar */}
        <Input
          placeholder="search here"
          value={searchValue}
          onChange={onHandleSearch}
        />

        <div className="relative h-full py-3 overflow-y-scroll no-scrollbar">
          
          <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar h-full">
            
            {/* Fiori Section */}
            {fioriItem && (
              <p className="text-gray-400 text-sm mt-3">Section - Fiori</p>
            )}

            {fioriItem &&
              fioriItem.map((element) => {
                return (
                  <Link
                    key={element.title}
                    href={element.link}
                    className="text-gray-600 border border-transparent text-sm hover:text-black hover:border hover:border-gray-300 hover:bg-gray-100 hover:rounded-md px-5 py-2 cursor-pointer transition-all"
                  >
                    {element.topic}
                  </Link>
                );
              })}

            {/* CAPM Section */}
            {capmItem && (
              <p className="text-gray-400 text-sm">Section - CAPM</p>
            )}

            {capmItem &&
              capmItem.map((element) => {
                return (
                  <p
                    key={element.link}
                    className="text-gray-600 border border-transparent text-sm hover:text-black hover:border hover:border-gray-300 hover:bg-gray-100 hover:rounded-md px-5 py-2 cursor-pointer transition-all"
                  >
                    {element.topic}
                  </p>
                );
              })}

            {/* <!-- Top Fade --> */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-100 md:from-white to-transparent"></div>

            {/* <!-- Bottom Fade --> */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-100 md:from-white to-transparent"></div>
          </div>
        </div>

        {/* <Button className="cursor-pointer">This </Button> */}
      </div>
    </aside>
  );
};

export default SideBar;
