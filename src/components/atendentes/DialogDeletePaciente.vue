<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5">Apagar Paciente</v-card-title>
      <v-card-text> Tem certeza que deseja apagar esse paciente? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn color="red darken-1" dark @click="dialog = false">
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

@Component({
  components: {},
})
export default class DialogDeletePaciente extends Vue {
  @Prop({ required: true }) dialog!: boolean;
  @Watch("dialog")
  dialogRootChange() {
    this.$emit("update:dialog", this.dialog);
  }
}
</script>

<style scoped>
</style>