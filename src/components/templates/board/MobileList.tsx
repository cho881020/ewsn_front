"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

import { Posting } from "@/types/posting";
import { getDate } from "@/utils/getDate";

import { Content, Title } from "@/ui/fonts";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

import ModalEnter from "@/components/organisms/ModalEnter";

const MobileList = ({
  list,
  fixList,
}: {
  list: Posting[];
  fixList: Posting[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const camp = searchParams.get("camp");
  const type = searchParams.get("type") || "";
  const page = searchParams.get("page") || 1;
  const categoryId = Number(searchParams.get("category")) || null;

  const handleEnterPost = (id: number, isRestrict: boolean) => {
    const hot = `${searchParams.has("hot") ? "&hot" : ""}`;
    const camps = camp ? `camp=${camp}` : "";
    const types = type ? `&type=${type}` : "";
    const category = categoryId ? `&category=${categoryId}` : "";
    isRestrict
      ? setIsOpenModal(true)
      : router.push(
          `/post/${id}?${camps}&page=${page}${hot}${category}${types}`
        );
  };

  return (
    <div className="w-full max-w-full hidden sm:block">
      <Container>
        {fixList?.map(({ id, title, createdAt, hits, user, replies }) => (
          <Item
            key={id}
            $active
            className="h-[44px] border-b border-[#f0f0f0] last:border-none cursor-pointer"
            onClick={() => {
              setId(id);
              handleEnterPost(id, false);
            }}
          >
            <div className="flex flex-col">
              <div className="flex gap-2 mb-[5px]">
                <Button>필독</Button>
                <TextWrap>
                  <EllipsisTitle level="sub3" color={COLORS.TEXT01}>
                    {title}
                  </EllipsisTitle>
                </TextWrap>
              </div>
              <div className="flex gap-2">
                <Content level="cap2" color={COLORS.TEXT04}>
                  {user.nickName}
                </Content>
                <Content level="cap2" color={COLORS.TEXT04}>
                  {getDate(createdAt, "m")}
                </Content>
                <Content level="cap2" color={COLORS.TEXT04}>
                  조회 {hits}
                </Content>
              </div>
            </div>
            <ReplyBox>
              <Title level="sub2">{replies?.length || 0}</Title>
            </ReplyBox>
          </Item>
        ))}
        {list.map(
          ({
            id,
            title,
            category,
            userPoliticalOrientationId,
            createdAt,
            hits,
            user,
            isRestrict,
            replies,
          }) => (
            <Item
              key={id}
              className="h-[44px] border-b border-[#f0f0f0] last:border-none cursor-pointer"
              onClick={() => {
                setId(id);
                handleEnterPost(id, isRestrict);
              }}
            >
              <div className="flex flex-col flex-1">
                <TextWrap className="flex gap-2">
                  {!!CAMP_COLORS[userPoliticalOrientationId - 1] && (
                    <Color
                      $color={CAMP_COLORS[userPoliticalOrientationId - 1].color}
                    />
                  )}
                  <Content color={COLORS.TEXT03} className="min-w-fit">
                    {category.name}
                  </Content>
                  {isRestrict ? (
                    <Ellipsis color={COLORS.TEXT05} className="line-through">
                      {title}
                    </Ellipsis>
                  ) : (
                    <Ellipsis color={COLORS.TEXT01}>{title}</Ellipsis>
                  )}
                </TextWrap>
                <div className="flex gap-2">
                  <Content level="cap2" color={COLORS.TEXT04}>
                    {user.nickName}
                  </Content>
                  <Content level="cap2" color={COLORS.TEXT04}>
                    {getDate(createdAt, "m")}
                  </Content>
                  <Content level="cap2" color={COLORS.TEXT04}>
                    조회 {hits}
                  </Content>
                </div>
              </div>
              <ReplyBox>
                <Title level="sub2">{replies?.length || 0}</Title>
              </ReplyBox>
            </Item>
          )
        )}
      </Container>
      {isOpenModal && (
        <ModalEnter
          onClose={() => setIsOpenModal(false)}
          onEnter={() => handleEnterPost(id, false)}
        />
      )}
    </div>
  );
};

const Button = styled.button`
  width: 37px;
  height: 24px;
  border-radius: 4px;
  background-color: #fedbd9;
  font-size: 12px;
  color: ${COLORS.RED};
`;

const Color = styled.div<{ $color: string }>`
  min-width: 4px;
  height: 20px;
  background-color: ${({ $color }) => $color};
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid ${COLORS.LINE03};
  border-left: 0;
  border-right: 0;
`;

const Item = styled.div<{ $active?: boolean }>`
  background-color: ${({ $active }) => $active && COLORS.BG};
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  max-width: 100vw;
  width: 100%;
  overflow: hidden;
`;

const ReplyBox = styled.div`
  min-width: 36px;
  height: 36px;
  border-radius: 4px;
  padding: 4px;
  background-color: ${COLORS.BG};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ellipsis = styled(Content)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EllipsisTitle = styled(Title)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TextWrap = styled.div`
  max-width: calc(100vw - 130px);
  display: flex;
`;

export default MobileList;
