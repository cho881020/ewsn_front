"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";

import useReport from "@/apis/mutations/useReport";
import authState from "@/stores/authState";

import COLORS from "@/ui/colors";
import { Content } from "@/ui/fonts";
import ModalReport from "@/components/organisms/ModalReport";
import ModalSuccess from "@/components/organisms/ModalSuccess";

interface Props {
  replyId: number;
  politicalOrientation: number;
}

const Report = ({ replyId, politicalOrientation }: Props) => {
  const [reason, setReason] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const { id, isAdmin, politicalOrientationId } = useRecoilValue(authState);

  const handleOpenReport = () => {
    if (!id) return alert("비회원은 신고를 할 수 없습니다.");
    if (
      !isAdmin &&
      politicalOrientation !== 5 &&
      politicalOrientationId !== politicalOrientation
    ) {
      return alert("다른 진영의 글은 신고할 수 없습니다.");
    }

    setIsOpenModal(true);
  };

  const { mutate } = useReport({
    reason,
    replyId,
    onSuccess: () => setIsOpenSuccessModal(true),
  });

  return (
    <>
      <Content
        level="cap2"
        color={COLORS.TEXT04}
        className="cursor-pointer"
        onClick={handleOpenReport}
      >
        신고
      </Content>
      {isOpenModal && (
        <ModalReport
          reason={reason}
          onChangeReason={(e: string) => setReason(e)}
          onClose={() => setIsOpenModal(false)}
          onReport={mutate}
        />
      )}
      {isOpenSuccessModal && (
        <ModalSuccess onClose={() => setIsOpenSuccessModal(false)} />
      )}
    </>
  );
};

export default Report;
