import { userCollectImage } from "@/api/upload";

export function collectImageData(img, $this, boolean) {
  userCollectImage(img.id, !img.collected).then((res) => {
    console.log(res);
    img.is_collected = !img.is_collected
    img.loading = false;
    $this.$message({
      message: img.is_collected ? "素材收藏成功" : "取消收藏",
      type: "success",
      duration: 1000,
    });
    $this.getUpload(boolean);
  });
}