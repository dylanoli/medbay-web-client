<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5" v-if="isCreate">
        Cadastro médico
      </v-card-title>
      <v-card-title class="text-h5" v-else> Alterar médico </v-card-title>
      <div style="margin: 20px">
        <v-text-field
          v-model="cpf"
          label="CPF*"
          type="text"
          v-mask="'###.###.###-##'"
          :rules="[(v) => !!v || 'CPF é obrigatório']"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          id="name"
          v-model="nome"
          label="Nome*"
          type="text"
          outlined
          :rules="[(v) => !!v || 'nome é obrigatório']"
          dense
        ></v-text-field>
        <v-btn
          class="mr-5 mb-5"
          :color="genero == 'masculino' ? 'primary' : ''"
          @click="genero = 'masculino'"
          >Masculino</v-btn
        >
        <v-btn
          class="mb-5"
          :color="genero == 'feminino' ? 'primary' : ''"
          @click="genero = 'feminino'"
          >Feminino</v-btn
        >
        <v-text-field
          v-model="dataNascimento"
          label="Data de nascimento"
          type="text"
          v-mask="'##/##/####'"
          outlined
          dense
        ></v-text-field>
        <EnderecoInput :target.sync="endereco" />
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn color="primary" dark @click="dialog = false" v-if="isCreate">
          Cadastrar
        </v-btn>
        <v-btn color="primary" dark @click="dialog = false" v-else>
          Alterar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EnderecoDTO from "@/models/EnderecoDTO";
import EnderecoInput from "@/components/EnderecoInput.vue";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    EnderecoInput,
  },
})
export default class DialogActionMedico extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop({ default: true }) isCreate!: boolean;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
  }
  cpf = "";
  nome = "";
  dataNascimento = "";
  genero = "masculino";
  endereco = new EnderecoDTO();
}
</script>

<style scoped>
</style>