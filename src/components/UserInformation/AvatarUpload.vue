<template>
  <div>
    <label class="image is-128x128" :class="uploaded ? 'uploaded' : 'not-uploaded'">
      <input type="file" accept="image/jpeg" style="display: none;" @change="uploadAvatar" />
      <div class="avatar-image" :style="{backgroundImage: 'url(' +  img_url + ')'}"></div>
    </label>
    <div class="status ld ld-dim" v-if="uploading">Đang tải lên ...</div>
  </div>
</template>

<script>
import uniqid from "uniqid";
import { fb } from "../../firebase";
import axios from "axios";

export default {
  name: "AvatarUpload",
  props: {
    user: Object,
  },
  data() {
    return {
      img_url:
        typeof this.user.img_url === "undefined"
          ? "https://bulma.io/images/placeholders/128x128.png"
          : this.user.img_url,
      uploading: false,
      uploaded: false,
    };
  },
  methods: {
    uploadAvatar(e) {
      // delete just uploaded picture
      if (this.img_url.startsWith("https://firebasestorage.googleapis.com/")) {
        let image = fb.storage().refFromURL(this.img_url);
        image.delete();
      }

      if (e.target.files.length > 0) {
        // reset uploaded state every time re-select image
        this.uploaded = false;
        this.uploading = true;
        // get image
        const image = e.target.files[0];
        console.log("front");
        const reader = new FileReader();
        reader.readAsDataURL(image);
        // load image locally
        // reader.onload = (e) => {
        //   this.previewFrontImage = e.target.result;
        // };

        let vm = this;

        // define path to upload
        let user_dir = this.$store.state.user.img_dir;
        let filename = uniqid().concat(image.name);

        // generate ref
        let uploadTask = fb.storage().ref(`${user_dir}/${filename}`).put(image);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            vm.error = error.message;
          },
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                vm.img_url = downloadURL;
                vm.uploaded = true;
                vm.uploading = false;
              })
              .then(() => {
                axios.put("/user/avatar", {
                  id: vm.$store.state.user.id,
                  img_url: vm.img_url,
                });
              })
              .then(() => {
                vm.$router.go(vm.$router.currentRoute);
              });
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.avatar-image {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 0px solid #ffffff;
  transition: 0.25s;
}

.avatar-image:hover {
  box-shadow: 0 3px 9px #00000016;
  border: 0.5px solid #adadad;
}
</style>