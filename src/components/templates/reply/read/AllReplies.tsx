import Image from "next/image";
import styled from "styled-components";

import { Replies } from "@/types/posting";
import { getDateTimeSecond } from "@/utils/getDate";

import like from "@/assets/reply/like.png";
import hate from "@/assets/reply/hate.png";
import comment from "@/assets/reply/comment.png";

import { Content } from "@/ui/fonts";
import { Btn } from "@/ui/buttons";
import COLORS, { CAMP_COLORS } from "@/ui/colors";

interface Props {
  replies: Replies[];
  myId: number | null;
}

const AllReplies = ({ replies, myId }: Props) => {
  return (
    <Container>
      {replies.map(
        ({ id, content, user, createdAt, userReplyLikes, comments }) => (
          <>
            <Reply key={id}>
              <Info>
                <div className="flex gap-2 items-center">
                  <Color
                    $color={CAMP_COLORS[user.politicalOrientationId - 1].color}
                  />
                  <Content level="body1" color={COLORS.TEXT02}>
                    {user.nickName}
                  </Content>
                  <Content level="cap2" color={COLORS.TEXT05} className="mr-3">
                    {getDateTimeSecond(createdAt)}
                  </Content>
                  <Content
                    level="cap2"
                    color={COLORS.TEXT04}
                    className="cursor-pointer"
                  >
                    답글쓰기
                  </Content>
                  {myId === user.id ? (
                    <>
                      <Content
                        level="cap2"
                        color={COLORS.TEXT04}
                        className="cursor-pointer"
                      >
                        수정
                      </Content>
                      <Content
                        level="cap2"
                        color={COLORS.TEXT04}
                        className="cursor-pointer"
                      >
                        삭제
                      </Content>
                    </>
                  ) : (
                    <Content
                      level="cap2"
                      color={COLORS.TEXT04}
                      className="cursor-pointer"
                    >
                      신고
                    </Content>
                  )}
                </div>
                <div className="flex gap-1 items-center">
                  <Image src={like} alt="like" />
                  <Content level="cap2" color={COLORS.RED} className="mr-4">
                    {
                      userReplyLikes.filter(
                        ({ likeType }) => likeType === "LIKE"
                      ).length
                    }
                  </Content>
                  <Image src={hate} alt="hate" />
                  <Content level="cap2" color={COLORS.BLUE}>
                    {
                      userReplyLikes.filter(
                        ({ likeType }) => likeType === "DISLIKE"
                      ).length
                    }
                  </Content>
                </div>
              </Info>
              <Content level="body1l">{content}</Content>
            </Reply>
            {comments?.map(
              ({ id, content, user, createdAt, userReplyLikes }) => (
                <Reply key={id}>
                  <Info>
                    <div className="flex gap-2 items-center">
                      <Image src={comment} alt="comment" />
                      <Color
                        $color={
                          CAMP_COLORS[user.politicalOrientationId - 1].color
                        }
                      />
                      <Content level="body1" color={COLORS.TEXT02}>
                        {user.nickName}
                      </Content>
                      <Content
                        level="cap2"
                        color={COLORS.TEXT05}
                        className="mr-3"
                      >
                        {getDateTimeSecond(createdAt)}
                      </Content>
                      <Content
                        level="cap2"
                        color={COLORS.TEXT04}
                        className="cursor-pointer"
                      >
                        신고
                      </Content>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Image src={like} alt="like" />
                      <Content level="cap2" color={COLORS.RED} className="mr-4">
                        {
                          userReplyLikes.filter(
                            ({ likeType }) => likeType === "LIKE"
                          ).length
                        }
                      </Content>
                      <Image src={hate} alt="hate" />
                      <Content level="cap2" color={COLORS.BLUE}>
                        {
                          userReplyLikes.filter(
                            ({ likeType }) => likeType === "DISLIKE"
                          ).length
                        }
                      </Content>
                    </div>
                  </Info>
                  <Content level="body1l">{content}</Content>
                </Reply>
              )
            )}
          </>
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  border-top: 1px solid ${COLORS.LINE03};
  width: 100%;
  margin-bottom: 40px;
`;

const Reply = styled.div`
  padding: 20px 12px;
  border-bottom: 1px solid ${COLORS.LINE03};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  img {
    cursor: pointer;
  }
`;

const BtnRed = styled(Btn)`
  background-color: ${COLORS.RED};
  border: none;
  font-weight: 400;
`;

const Color = styled.div<{ $color: string }>`
  width: 4px;
  height: 20px;
  background-color: ${({ $color }) => $color};
`;
export default AllReplies;
