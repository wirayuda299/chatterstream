"use client";

import { Search } from "lucide-react";
import type { User } from "@prisma/client";
import { ChangeEvent, useState } from "react";

import useDebounce from "@/hooks/useDobounce";
import SearchResult, { Results } from "./search-result";

export default function SearchForm({
  followers,
  userId,
  defaultValues,
}: {
  followers: User[];
  userId: string;
  defaultValues: Results["results"];
}) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <section className=" no-scrollbar h-full max-h-full overflow-y-auto rounded-3xl p-2 sm:bg-main ">
      <div className="mb-5 flex w-full items-center gap-2  rounded-2xl bg-black p-2 ">
        <label htmlFor="search">
          <Search size={18} />
        </label>
        <input
          aria-label="search"
          autoComplete="off"
          placeholder="Search user..."
          value={value}
          onChange={handleChange}
          className="w-full border-none bg-transparent focus-visible:outline-none"
          type="text"
          id="search"
        />
      </div>

      <SearchResult
        defaultValues={defaultValues}
        query={debouncedValue}
        followers={followers}
        userId={userId}
      />
    </section>
  );
}
