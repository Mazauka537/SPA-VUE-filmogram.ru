<template>
  <PopUp title="О проете">
    <div class="about">
      <p>
        Добро пожаловать на сайт Filmogram.ru.
        Здесь вы найдете любой фильм или сериал на ваш вкус,
        для этого на сайте есть удобный <router-link to="/search">поисковик</router-link>.
        Также вы можете проссматривать коллекции с подборками разных фильмов и сериал от других пользователей.
        <router-link to="/auth">Регистрируйтесь</router-link> и создавайте собственные коллекции,
        а также не забывайте делиться ими с друзьями. Удачного вам для!
      </p>
      <p>
        Данный проект создан на основе базе данных сайта kinopoisk.ru.
        Сайт создавался одним человеком и скорее является проверкой способностей разработчика,
        поэтому вполне возможны небольшие неполадки,
        будем рады если вы сообщите нам о них на email filmogram.ru@gmail.com
        или через <router-link to="/settings?popUp=support">службу поддержки</router-link>,
        постараемя исправить их как можно скорее.
        Но не смотря на возможные проблемы, сайтом уже можно комфортно пользоваться,
        и гарантируем что ваши данные останутся конфиденциальными.
      </p>
    </div>
  </PopUp>
</template>

<script>
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp}
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.about {
  text-align: justify;

  p {
    padding: 0 0 20px 0;
  }

  a {
    color: $color-text-light
  }
}

@media screen and (max-width: 560px) {
  .about {

    p {
      padding: 10px 0;
    }
  }
}
</style>
