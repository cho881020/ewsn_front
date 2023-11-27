"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";

import useReport from "@/apis/mutations/useReport";
import authState from "@/stores/authState";

import COLORS from "@/ui/colors";
import { BtnGray } from "@/ui/buttons";
import { Title } from "@/ui/fonts";
import ModalReport from "@/components/organisms/ModalReport";
import ModalSuccess from "@/components/organisms/ModalSuccess";

const Report = ({ politicalOrientation }: { politicalOrientation: number }) => {
  const { id: postingId } = useParams();
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
    postingId: Number(postingId),
    onSuccess: () => setIsOpenSuccessModal(true),
  });
  return (
    <div className="mt-10 w-full flex justify-end relative">
      <BtnGray width="52px" height="32px" $small onClick={handleOpenReport}>
        <Title level="sub1" color={COLORS.TEXT02}>
          신고
        </Title>
      </BtnGray>
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
    </div>
  );
};

export default Report;
