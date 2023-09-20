<template>
  <section class="container-fluid">

    <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
      class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div>

  <section class="row">
    Yo, new row!
    <div class="rounded my-2">

      <img src="https://images.unsplash.com/photo-1582091652153-eb8f55ff7cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" class="rounded cover-img elevation-2">
    </div>
  </section>
</section>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.cover-img{
  height: 18vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
// elevation-2 settings
  box-shadow: 0 3px 3px -1px rgba(0, 0, 0, 0.2), 
  0 5px 6px 0 rgba(0, 0, 0, 0.14), 
  0 1px 8px 0 rgba(0, 0, 0, 0.12);
}
</style>
