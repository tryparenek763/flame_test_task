<template>
  <div class="home">
      <router-link
        class="home__link"
        to="/Peoples"
      >
        Peoples
      </router-link>

      <router-link
        class="home__link"
        to="/favorites"
      >
        Favorites
      </router-link>
  </div>
</template>

<style lang="scss" scoped>
#app {
  display: flex;
  font-family: 'Inter';

  .home {
    margin: auto;
    display: flex;

    &__link {
      margin: 16px;
      font-size: 32px;
      color: #333333;
      text-decoration: none;

      &:hover {
        color: #828282;
      }
    }
  }
}
</style>
