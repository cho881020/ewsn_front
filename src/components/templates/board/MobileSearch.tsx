"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import search from "@/assets/board/search.png";
import Input from "@/ui/input";
import { Btn } from "@/ui/buttons";

interface Props {
  categoryId: number | null;
}
const MobileSearch = ({ categoryId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const isHot = searchParams.has("hot");

  const camp = Number(searchParams.get("camp"));
  const hot = `${isHot ? "&hot" : ""}`;
  const camps = camp ? `camp=${camp}` : "";
  const category = categoryId ? `&category=${categoryId}` : "";
  const keywords = keyword ? `&keyword=${keyword}` : "";

  const handleSearch = () => {
    camp
      ? router.push(`${pathname}?${camps}&page=1${hot}${keywords}${category}`)
      : router.push(`${pathname}?page=1&keyword=${keyword}`);
  };

  return (
    <div className="flex gap-2 min-w-[335px] hidden sm:flex relative">
      <Input
        placeholder="제목,내용,닉네임"
        padding="11px 12px 11px 40px"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Image src={search} alt="" className="absolute left-[10px] top-[10px]" />
      <Btn $middle width="80px" height="44px" onClick={handleSearch}>
        검색
      </Btn>
    </div>
  );
};

export default MobileSearch;
