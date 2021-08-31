<template>
  <Dropzone
    id="generaldropzone"
    ref="dropzone"
    :options="localOptions"
    :use-custom-slot="true"
    @vdropzone-success="$emit('vdropzone-success', $event)"
    @vdropzone-file-added="fileAdded"
  >
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">
        İçerik yüklemek için sürükleyip bırakın!
      </h3>
      <div class="subtitle">
        ...veya bilgisayarınızdan bir dosya seçmek için tıklayın
      </div>
    </div>
  </Dropzone>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
export default {
  components: {
    Dropzone,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      localOptions: {
        url: 'http://httpbin.org/anything',
        // thumbnailHeight: 50,
        // thumbnailWidth: 50,
        thumbnailMethod: 'contain',
        ...this.options,
      },
      imageUrl: null,
    }
  },
  methods: {
    fileAdded(file) {
      const files = this.$refs.dropzone.getAcceptedFiles()
      if (files.length > this.options.maxFiles - 2)
        this.$refs.dropzone.removeFile(files[0])
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-dropzone {
  background-color: var(--background-color-primary);
  border-radius: 5px;
  border-color: rgba(var(--b-color-primary-rgb), 0.3);
  border-style: dashed;
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.dropzone-custom-title {
  font-size: 16px;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 12px;
  opacity: 0.8;
}
</style>