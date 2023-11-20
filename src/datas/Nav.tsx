import Image from "next/image";

import { Title } from "@/ui/fonts";
import east from "@/assets/nav/east.png";
import west from "@/assets/nav/west.png";
import sourth from "@/assets/nav/sourth.png";
import north from "@/assets/nav/north.png";
import center from "@/assets/nav/center.png";
import eastActive from "@/assets/nav/eastActive.png";
import westActive from "@/assets/nav/westActive.png";
import sourthActive from "@/assets/nav/sourthActive.png";
import northActive from "@/assets/nav/northActive.png";
import centerActive from "@/assets/nav/centerActive.png";

const DATAS = [
  {
    id: 0,
    btn: (
      <Title level="sub1" color="#fff">
        전체
      </Title>
    ),
    activeBtn: (
      <Title level="sub1" color="#242424">
        전체
      </Title>
    ),
  },
  {
    id: 1,
    btn: <Image src={east} alt="" />,
    activeBtn: <Image src={eastActive} alt="" />,
  },
  {
    id: 2,
    btn: <Image src={west} alt="" />,
    activeBtn: <Image src={westActive} alt="" />,
  },
  {
    id: 3,
    btn: <Image src={sourth} alt="" />,
    activeBtn: <Image src={sourthActive} alt="" />,
  },
  {
    id: 4,
    btn: <Image src={north} alt="" />,
    activeBtn: <Image src={northActive} alt="" />,
  },
  {
    id: 5,
    btn: <Image src={center} alt="" />,
    activeBtn: <Image src={centerActive} alt="" />,
  },
];

export default DATAS;