"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  formUrlQuery,
  removeKeysFromUrlQuery,
} from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("topic") || ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentTopic = searchParams.get("topic") || "";

      // Nothing changed
      if (searchQuery === currentTopic) {
        return;
      }

      let newUrl: string;

      if (searchQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
      } else {
        if (pathname !== "/companions") {
          return;
        }

        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["topic"],
        });
      }

      const currentUrl =
        window.location.pathname + window.location.search;

      if (newUrl !== currentUrl) {
        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, searchParams, pathname, router]);

  return (
    <div className="relative border-8 rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image
        src="/icons/search.svg"
        alt="search"
        width={15}
        height={15}
      />

      <input
        placeholder="Search companions..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;