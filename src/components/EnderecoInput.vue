<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" style="margin-top: 5px; display: flex">
        <v-text-field
          id="cep"
          label="CEP"
          outlined
          type="text"
          dense
          style="padding-right: 10px"
          v-mask="'#####-###'"
          v-model="endereco.cep"
          :readonly="readonly"
        ></v-text-field>
        <v-btn
          v-if="!readonly"
          id="btn-busca-cep"
          height="40"
          outlined
          @click="buscaCep()"
          :loading="loadCep"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="9" class="pr-5">
        <v-text-field
          :readonly="readonly"
          id="rua"
          label="Rua"
          outlined
          type="text"
          dense
          v-model="endereco.street"
        ></v-text-field>
      </v-col>
      <v-col md="3" cols="3">
        <v-text-field
          :readonly="readonly"
          label="Numero"
          outlined
          type="text"
          dense
          v-model="endereco.number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          :readonly="readonly"
          label="Bairro"
          outlined
          type="text"
          dense
          v-model="endereco.country"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="9" cols="12" style="padding-right: 12px">
        <v-text-field
          :readonly="readonly"
          label="Cidade"
          outlined
          type="text"
          dense
          v-model="endereco.city"
        ></v-text-field>
      </v-col>
      <v-col md="3" cols="12" style="padding-left: 12px">
        <v-combobox
          :readonly="readonly"
          v-model="endereco.uf"
          @change="formatUf()"
          :items="estados"
          label="UF"
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import EnderecoDTO from "@/models/EnderecoDTO";
import { api } from "@/services";
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";
@Component({
  components: {},
})
export default class EnderecoInput extends Vue {
  @Prop({ required: true }) target!: EnderecoDTO;
  @Prop({ default: false }) readonly!: boolean;

  mounted() {
    this.endereco = this.target;
  }
  @Watch("endereco")
  changeEndereco() {
    if (this.endereco != undefined) this.$emit("update:target", this.endereco);
  }
  @Watch("target")
  changeTarget(newValue: EnderecoDTO) {
    this.endereco = newValue;
  }

  loadCep = false;
  endereco = new EnderecoDTO();
  estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  formatUf() {
    const vm = this;
    vm.endereco.uf = vm.endereco.uf.toLocaleUpperCase();
  }
  async buscaCep() {
    this.loadCep = true;
    try {
      const cep = this.endereco.cep.replace("-", "");
      const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
      this.loadCep = false;
      if (response.data.erro == undefined) {
        this.endereco = {
          ...this.endereco,
          cep: response.data.cep,
          street: response.data.logradouro,
          country: response.data.bairro,
          uf: response.data.uf,
          city: response.data.localidade,
        };
      } else {
        this.loadCep = false;
        this.$store.commit("setError", "CEP não encontrado");
      }
    } catch (error) {
      this.loadCep = false;
      this.$store.commit("setError", "CEP não encontrado");
    }
  }
}
</script>