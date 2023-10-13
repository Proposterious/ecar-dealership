'use client'

import Link from "next/link";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import ExampleParams from "./ExampleParams";

export default function Test() {
    return (
    <>
        <ExampleParams />

        <span className='my-6'/>

        <SearchBar />
      </>
    )
  }