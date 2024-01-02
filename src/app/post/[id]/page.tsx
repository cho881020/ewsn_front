import api from "@/apis/client";

import { getPeriod } from "@/utils/getDate";

import Client from "@/components/templates/post";

export default async function Post({ params, searchParams }: any) {
  const { id } = params;
  const { page, camp, category, type, keyword } = searchParams;
  const { startDate, endDate } = getPeriod(type || "d");
  const isCamp = !!camp;
  const campParams = {
    page: page || 1,
    keyword: keyword || "",
    politicalOrientationId: camp || null,
    categoryId: category || null,
  };

  const noCampParams = {
    page: page || 1,
    keyword: keyword || "",
    politicalOrientationId: camp || null,
    categoryId: category || null,
    startDate,
    endDate,
  };

  async function getPosting() {
    try {
      const response = await api.get(`posting/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getReply() {
    try {
      const response = await api.get(`posting/${id}/reply`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPostings() {
    try {
      const response = await api.get("posting", {
        params: isCamp ? campParams : noCampParams,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getHotPostings() {
    try {
      const response = await api.get("posting/hot", {
        params: isCamp ? campParams : noCampParams,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getFix() {
    try {
      const response = await api.get("posting/fix", {
        params: {
          politicalOrientationId: camp || null,
          categoryId: category || null,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const posts = await getPostings();
  const hotPosts = await getHotPostings();
  const post = await getPosting();
  const reply = await getReply();
  const fixList = await getFix();

  return (
    <Client
      post={post}
      reply={reply}
      id={id}
      hotPosts={hotPosts}
      posts={posts}
      fixList={fixList}
      params={isCamp ? campParams : noCampParams}
    />
  );
}
