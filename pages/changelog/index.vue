<script setup lang="ts">
const { data: page } = await useAsyncData("changelog", () =>
  queryContent("/changelog").findOne(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: versions } = await useAsyncData("versions", () =>
  queryContent("/changelog/")
    .where({ _extension: "md" })
    .sort({ date: -1, title: -1 })
    .find(),
);

const { format } = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

useSeoMeta({
  title: page.value.title,
  ogTitle: `${page.value.title} – Kirby SEO Audit`,
  description: page.value.description,
  ogDescription: page.value.description,
});

defineOgImageComponent("Default", {
  title: page.value.title,
  description: page.value.description,
});
</script>

<template>
  <UContainer v-if="page">
    <UPageHeader :title="page.title" :description="page.description" />

    <UPageBody
      prose
      :ui="{
        wrapper: 'pb-0',
        prose: 'max-w-prose',
      }"
    >
      <ContentRenderer v-if="page.body" :value="page" />
    </UPageBody>

    <div class="divide-y divide-gray-200 pb-24 dark:divide-gray-800">
      <div
        v-for="version in versions"
        :key="version.title"
        class="relative grid gap-[16px] py-[48px] md:grid-cols-3"
      >
        <div>
          <h2 class="text-xl font-semibold">
            {{ version.title }}
          </h2>
          <p class="mt-2 text-gray-500 dark:text-gray-400">
            {{ format(new Date(version.date)) }}
          </p>
        </div>

        <div
          class="prose prose-primary dark:prose-invert max-w-none md:col-span-2"
        >
          <ContentRenderer
            :value="version"
            class="[&>:first-child]:first:mt-0"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
