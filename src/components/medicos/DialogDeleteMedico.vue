<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5">Apagar médico</v-card-title>
      <v-card-text> Tem certeza que deseja apagar esse médico? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn color="red darken-1" dark @click="deletePessoa()">
          Apagar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EnderecoInput from "@/components/EnderecoInput.vue";
import { Prop, Watch } from "vue-property-decorator";
import MedicoService from "@/services/MedicoService";

@Component({
  components: {
    EnderecoInput,
  },
})
export default class DialogDeleteMedico extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Prop() pessoaId!: number;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
  }
  async deletePessoa() {
    await MedicoService.delete(this.pessoaId);
    this.dialog = false;
  }
}
</script>

<style scoped>
</style>