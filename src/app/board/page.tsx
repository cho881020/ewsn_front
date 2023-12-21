import api from "@/apis/client";
import { getPeriod } from "@/utils/getDate";

import Client from "@/components/templates/board";

export default async function Board({ searchParams }: any) {
  const { page, camp, category, type, keyword } = searchParams;
  const { startDate, endDate } = getPeriod(type || "d");
  const isCamp = !!camp;

  const campParams = {
    page: page || 1,
    keyword: keyword || "",
    politicalOrientationId: camp || null,
    categoryId: category || null,
  };

  const params = {
    page: page || 1,
    keyword: keyword || "",
    politicalOrientationId: camp || null,
    categoryId: category || null,
    startDate,
    endDate,
  };

  async function getAds() {
    try {
      const response = await api.get("ad");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPostings() {
    try {
      const response = await api.get("posting", {
        params: isCamp ? campParams : params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getHotPostings() {
    try {
      const response = await api.get("posting/hot", {
        params: isCamp ? campParams : params,
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

  const ads = await getAds();
  const posts = await getPostings();
  const hotPosts = await getHotPostings();
  const fixList = await getFix();

  return (
    <Client ads={ads} posts={posts} hotPosts={hotPosts} fixList={fixList} />
  );
}
