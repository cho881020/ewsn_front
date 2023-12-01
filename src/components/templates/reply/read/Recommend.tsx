import Image from "next/image";
import { useRecoilValue } from "recoil";

import useReplyRecommend from "@/apis/mutations/useReplyRecommend";
import usePatchReplyRecommend from "@/apis/mutations/usePatchReplyRecommend";
import { Posting, Replies } from "@/types/posting";
import authState from "@/stores/authState";

import like from "@/assets/reply/like.png";
import hate from "@/assets/reply/hate.png";
import likeFill from "@/assets/reply/likeFill.png";
import hateFill from "@/assets/reply/hateFill.png";

import { Content } from "@/ui/fonts";
import COLORS from "@/ui/colors";

interface Props {
  post: Posting;
  reply: Replies;
}

const Recommend = ({ reply, post }: Props) => {
  const { userReplyLikes } = reply;
  const { id, isAdmin, politicalOrientationId } = useRecoilValue(authState);

  const { mutate: recommendMutate } = useReplyRecommend(post.id);
  const { mutate: patchRecommendMutate } = usePatchReplyRecommend(post.id);

  const myRecommend = reply.userReplyLikes.find(({ userId }) => userId === id);
  const handleRecommend = (likeType: string) => {
    if (!id) return alert("비회원은 좋아요/싫어요를 할 수 없습니다.");
    if (reply.userId === id)
      return alert("자신의 글에는 좋아요/싫어요를 할 수 없습니다.");
    if (
      !isAdmin &&
      post.politicalOrientationId !== 5 &&
      politicalOrientationId !== post.politicalOrientationId
    ) {
      return alert("다른 진영의 글에는 좋아요/싫어요를 할 수 없습니다.");
    }

    myRecommend
      ? patchRecommendMutate({ id: reply.id, likeType })
      : recommendMutate({ id: reply.id, likeType });
  };

  return (
    <div className="flex gap-1 items-center">
      <Image
        alt="like"
        src={myRecommend?.likeType === "LIKE" ? likeFill : like}
        onClick={() => handleRecommend("LIKE")}
      />
      <Content level="cap2" color={COLORS.RED} className="mr-4">
        {userReplyLikes.filter(({ likeType }) => likeType === "LIKE").length}
      </Content>
      <Image
        alt="hate"
        src={myRecommend?.likeType === "DISLIKE" ? hateFill : hate}
        onClick={() => handleRecommend("DISLIKE")}
      />
      <Content level="cap2" color={COLORS.BLUE}>
        {userReplyLikes.filter(({ likeType }) => likeType === "DISLIKE").length}
      </Content>
    </div>
  );
};

export default Recommend;
