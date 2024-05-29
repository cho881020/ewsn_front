"use client";

import { useEffect, useState } from "react";
import api from "@/apis/client";

import Client from "@/components/templates/main";

export default function Home() {
  const [postings, setPostings] = useState([]);
  const [hotPostings, setHotPostings] = useState([]);

  useEffect(() => {
    async function getPostings() {
      try {
        const response = await api.get("posting", {
          params: { page: 1 },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    async function getHotPostings() {
      try {
        const response = await api.get("posting/hot", {
          params: { page: 1 },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    getPostings().then((data) => setPostings(data?.postings));
    getHotPostings().then((data) => setHotPostings(data?.postings));
  }, []);

  return <Client postings={postings} hotPostings={hotPostings} />;
}
