<template>
  <Card class="m-auto mt-10" column-layout>
    <Button
      v-if="!article.isPublished"
      class="self-end"
      light
      :disabled="!article.uid || saveInProgress"
      @click="openPublishModal = true"
      v-text="'Publicar'"
    />
    <Field
      label="Título"
      placeholder="¿De qué trata el artículo?"
      :value="article.title"
      :attributes="{ maxlenght: 150 }"
      :disabled="article.isPublished"
      @input="setValue('title', $event)"
    />
    <Field
      label="Etiquetas"
      placeholder="Frontend; Backend; Machine Learning;"
      :value="article.tags"
      :attributes="{ maxlenght: 150 }"
      :disabled="article.isPublished"
      @input="setValue('tags', $event)"
    />
    <p>
      Puedes usar markdown para el contenido
      <span
        class="text-secondary font-bold cursor-pointer"
        @click="previewMd = !previewMd"
        v-text="!previewMd ? 'Preview' : 'Editar'"
      />
    </p>
    <Field
      v-if="!previewMd"
      class="mt-8"
      f-type="textarea"
      :value="article.content"
      no-border
      placeholder="Desborda tu creatividad..."
      :disabled="article.isPublished"
      :attributes="{ rows: 10, cols: 40, maxlenght: 500000 }"
      @input="setValue('content', $event)"
    />
    <div
      v-if="previewMd"
      class="p-4"
      v-html="compiledMarkdown"
    />
    <p
      class="text-gray-dark self-end"
      v-text="saveInProgress ? 'Guardando...':'Guardado'"
    />
    <BaseModal
      :is-open="openPublishModal"
      ok-button-text="Publicar"
      @cancel="openPublishModal = false"
      @ok="publishArticle"
    >
      <div class="pb-4">
        <h1>Estas a punto de Publicar</h1>
        <p>Una vez publicado tu artículo ya no podrás realizar modificaciones</p>
      </div>
    </BaseModal>
  </Card>
</template>
<script>
import Card from '@/components/Layout/Card';
import Field from '@/components/Controls/Field';
import Button from '@/components/Button/Button';
import BaseModal from '@/components/Modals/BaseModal';
import marked from 'marked';
import debounce from 'lodash/debounce';

export default {
  components: {
    Card,
    Field,
    Button,
    BaseModal,
  },
  middleware: ['auth'],
  data () {
    return {
      previewMd: false,
      markdownContent: '',
      openPublishModal: false,
      saveInProgress: false,
      article: {
        uid: '',
        title: '',
        tags: '',
        content: '',
        isPublished: false,
      },
    };
  },
  async fetch () {
    const { articleId } = this.$route.params;
    try {
      const article = await this.$axios.$get(`/articles/${articleId}`);
      const tags = this.strTags(article.tags);
      this.article = {
        ...article,
        tags,
      };
    } catch (e) {
      this.handleError(e);
    }
  },
  computed: {
    tags () {
      const t = this.article.tags || '';
      return t.split(';').filter(Boolean).map(tag => tag.trim());
    },
    payload () {
      return {
        ...(this.uid && { uid: this.uid }),
        title: this.article.title || 'Sin Título',
        tags: this.tags,
        content: this.article.content,
      };
    },
    compiledMarkdown () {
      return marked(this.markdownContent, { sanitize: true });
    },
  },
  created () {
    this.markdownContent = this.article.content;
  },
  methods: {
    setValue (field, val) {
      this.article[field] = val;
      this.triggerSave();
    },
    strTags (arrayTags = []) {
      return arrayTags.filter(Boolean).join(';');
    },
    triggerSave: debounce(
      function () {
        this.markdownContent = this.article.content;
        this.saveArticle(this.payload).catch(this.handleError);
      }, 1500),

    publishArticle () {
      if (this.article.uid) {
        this.saveInProgress = true;
        const payload = {
          ...this.payload,
          isPublished: true,
        };
        this.saveArticle(payload).catch(this.handleError);
        this.article.isPublished = true;
        this.saveInProgress = false;
        this.$toast.success('Artículo Publicado ✅!');
        this.$router.push('/account/articles');
      }
    },

    async saveArticle (savePayload) {
      this.saveInProgress = true;
      const url = `/articles/${this.article.uid}`;
      await this.$axios.patch(url, savePayload);
      this.saveInProgress = false;
    },

    handleError (e) {
      // TODO: log errors
      // console.error(e);
      this.saveInProgress = false;
      this.$toast.error('Hubo un problema al procesar el artículo');
    },
  },
};
</script>
