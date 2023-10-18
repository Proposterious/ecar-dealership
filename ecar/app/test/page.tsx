'use client'

import SearchBar from "../service/components/SortByPage";
import SortBy from "../service/components/SortByOrder";

export default function Test() {
    return (
    <>
        <SortBy />

        <span className='my-6'/>

        <SearchBar />
      </>
    )
  }