import api from "@/apis/client";
import Client from "@/components/templates/board";

export default async function Board() {
  async function getAds() {
    try {
      const response = await api.get("ad");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const ads = await getAds();

  return <Client ads={ads} />;
}
