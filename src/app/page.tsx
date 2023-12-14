"use server";

import api from "@/apis/client";

import Client from "@/components/templates/main";

export default async function Home() {
  async function getPostings() {
    try {
      const response = await api.get("posting", { params: { page: 1 } });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getHotPostings() {
    try {
      const response = await api.get("posting/hot", { params: { page: 1 } });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const postings = await getPostings();
  const hotPostings = await getHotPostings();

  return (
    <Client postings={postings.postings} hotPostings={hotPostings.postings} />
  );
}
