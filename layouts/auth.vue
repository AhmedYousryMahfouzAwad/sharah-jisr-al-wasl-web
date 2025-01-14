<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">

  <Body>
    <div class="flex flex-col h-screen   overflow-auto">
      <HeaderAuth />

      <main class="flex-grow flex items-center py-5">
        <slot />
      </main>

    </div>
  </Body>

  </Html>
</template>


<script setup>
// locale head
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});


</script>