import Image from "next/image";

import { Title } from "@/ui/fonts";
import east from "@/assets/board/east.svg";
import west from "@/assets/board/west.svg";
import sourth from "@/assets/board/sourth.svg";
import north from "@/assets/board/north.svg";
import center from "@/assets/board/center.svg";

export const HEADERS = ["번호", "카테고리", "제목", "작성자", "작성일", "조회"];
export const CATEGORIES = [
  { id: 0, title: "인기" },
  { id: 1, title: "전체" },
  { id: 2, title: "사회" },
  { id: 3, title: "경제" },
  { id: 4, title: "인권/노동" },
  { id: 5, title: "환경" },
  { id: 6, title: "국방" },
  { id: 7, title: "해외" },
  { id: 8, title: "기타" },
  { id: 9, title: "자유" },
  { id: 10, title: "유머" },
  { id: 11, title: "토론" },
  { id: 12, title: "공지" },
];

export const MOBILE_HEADER = [
  {
    id: 0,
    btn: (
      <Title level="sub1" color="#242424">
        전체
      </Title>
    ),
  },
  {
    id: 1,
    camp: "1",
    name: "동",
    btn: <Image src={east} alt="" />,
  },
  {
    id: 2,
    camp: "2",
    name: "서",
    btn: <Image src={west} alt="" />,
  },
  {
    id: 3,
    camp: "3",
    name: "남",
    btn: <Image src={sourth} alt="" />,
  },
  {
    id: 4,
    camp: "4",
    name: "북",
    btn: <Image src={north} alt="" />,
  },
  {
    id: 5,
    camp: "5",
    name: "중",
    btn: <Image src={center} alt="" />,
  },
];
