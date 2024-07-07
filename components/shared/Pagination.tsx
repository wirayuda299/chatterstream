"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";

import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

export default function Pagination({ totalPage }: { totalPage: number }) {
  const params = useSearchParams();
  const router = useRouter();
  let page = params.get("page") ?? 1;

  const handlePagination = (direction: string) => {
    if (direction === "prev") {
      page = +page - 1;
    } else {
      page = +page + 1;
    }

    const newQueryString = formUrlQuery(
      params.toString(),
      "page",
      page.toString()
    );
    router.prefetch(newQueryString, { kind: PrefetchKind.AUTO });
    router.replace(newQueryString, { scroll: true });
  };
  return (
    <div className="mt-3 flex  w-full justify-between gap-5">
      <Button
        className="size-12 min-h-12 min-w-12 rounded-full border border-gray-500 !bg-main shadow-lg disabled:cursor-not-allowed"
        aria-disabled={+page === 1}
        disabled={+page === 1}
        onClick={() => handlePagination("prev")}
      >
        <ArrowLeft size={25} className="text-2xl" />
      </Button>
      <Button
        className="size-12 min-h-12 min-w-12 rounded-full border border-gray-500 !bg-main shadow-lg disabled:cursor-not-allowed"
        aria-disabled={page ? +page >= totalPage : false}
        disabled={page ? +page >= totalPage : false}
        onClick={() => handlePagination("next")}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
