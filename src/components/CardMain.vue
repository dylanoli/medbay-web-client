<template>
  <div>
    <div class="container">
      <div class="card pt-2">
        <v-btn text dark block class="mb-2" @click="back">
          <v-icon>mdi-arrow-left-thin-circle-outline</v-icon>
          Voltar
        </v-btn>
        <div class="card-sub pt-5">
          <img :src="getImgUrl(img)" height="200" />
        </div>
        <div class="card-content">
          <h2 class="mb-3">{{ titulo }}</h2>
          <v-btn color="primary" block rounded @click.stop="dialog = true"
            >Cadastrar</v-btn
          >
        </div>
      </div>
    </div>
    <DialogActionMedico :dialog.sync="dialog" v-if="mode == 'medico'" />
    <DialogActionPaciente :dialog.sync="dialog" v-if="mode == 'paciente'" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DialogActionMedico from "@/components/medicos/DialogActionMedico.vue";
import DialogActionPaciente from "@/components/paciente/DialogActionPaciente.vue";

@Component({
  components: {
    DialogActionMedico,
    DialogActionPaciente,
  },
})
export default class CardMain extends Vue {
  @Prop({ required: true }) readonly titulo?: string;
  @Prop({ required: true }) readonly img?: string;
  @Prop({ default: "medico" }) readonly mode?: string;

  dialog = false;
  constructor() {
    super();
  }

  getImgUrl(url: string) {
    var images = require.context("../assets/", false, /\.png$/);
    return images("./" + url + ".png");
  }

  back() {
    this.$router.push("/");
  }
}
</script>

<style scoped>
.container {
  padding: 20px 15%;
  display: flex;
  justify-content: space-around;
}
.card {
  width: 250px;
  height: 420px;
  border-radius: 35px;
  background-color: var(--secondary);
}
.card-sub {
  text-align: center;
  width: 250px;
  height: 240px;
  border-radius: 35px;
  background-color: var(--accent);
}
.card-content {
  padding: 15px;
  color: white;
}
.card-text {
  height: 100px;
}
</style>
