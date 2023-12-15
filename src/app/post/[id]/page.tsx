import api from "@/apis/client";

import Client from "@/components/templates/post";

export default async function Post({ params }: { params: { id: number } }) {
  const { id } = params;
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

  const post = await getPosting();
  const reply = await getReply();

  return <Client post={post} reply={reply} />;
}
