"use client";

import Image from "next/image";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useRecommend from "@/apis/mutations/useRecommend";
import usePatchRecommend from "@/apis/mutations/usePatchRecommend";
import { Posting } from "@/types/posting";
import authState from "@/stores/authState";

import like from "@/assets/post/like.png";
import likeFill from "@/assets/post/likeFill.png";
import hate from "@/assets/post/hate.png";
import hateFill from "@/assets/post/hateFill.png";

import COLORS from "@/ui/colors";
import { Title } from "@/ui/fonts";

interface Props {
  post: Posting;
  likeCounts: {
    likes: number;
    disLikes: number;
  };
}

const Recommend = ({ post, likeCounts }: Props) => {
  const { mutate } = useRecommend(post.id);
  const { mutate: patchMutate } = usePatchRecommend(post.id);
  const { id, isAdmin, politicalOrientationId } = useRecoilValue(authState);

  const myRecommend = post.userPostLikes.find(({ userId }) => userId === id);

  const handleRecommend = (likeType: string) => {
    if (post.userId === id)
      return alert("자신의 글에는 좋아요/싫어요를 할 수 없습니다.");
    if (!id) return alert("비회원은 좋아요/싫어요를 할 수 없습니다.");
    if (
      !isAdmin &&
      post.politicalOrientationId !== 5 &&
      politicalOrientationId !== post.politicalOrientationId
    ) {
      return alert("다른 진영의 글에는 좋아요/싫어요를 할 수 없습니다.");
    }

    myRecommend
      ? patchMutate({ id: post.id, likeType })
      : mutate({ id: post.id, likeType });
  };

  return (
    <Container>
      <Btn>
        <Image
          src={myRecommend?.likeType === "LIKE" ? likeFill : like}
          alt="like"
          className="w-[72px]"
          onClick={() => handleRecommend("LIKE")}
        />
        <Title level="sub1" color={COLORS.TEXT01}>
          {likeCounts?.likes || 0}
        </Title>
      </Btn>
      <Btn>
        <Image
          src={myRecommend?.likeType === "DISLIKE" ? hateFill : hate}
          alt="dislike"
          className="w-[72px]"
          onClick={() => handleRecommend("DISLIKE")}
        />
        <Title level="sub1" color={COLORS.TEXT01}>
          {likeCounts?.disLikes || 0}
        </Title>
      </Btn>
    </Container>
  );
};

const Container = styled.div`
  width: 156px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
`;

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export default Recommend;
